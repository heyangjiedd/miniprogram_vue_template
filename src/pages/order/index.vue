<script setup>
  import Taro, { useRouter } from '@tarojs/taro';
  import { onMounted, reactive, ref } from 'vue';
  import NavBar from '@/components/NavBar';
  import SimpleFullButton from '@/components/Button/SimpleFull';
  import SimpleButton from '@/components/Button/Simple';
  import CloseButton from '@/components/Button/Close';
  import DatePicker from '@/components/Select/DatePicker';
  import SelectInput from '@/components/Select/Input';
  import Location from '@/components/Select/Location';
  import SelectSimple from '@/components/Select/Simple';
  import { TIME_NUMBER_LIST } from '@/config/constant';
  import { useSystemInfoStore } from '@/store';
  import { paySuccess, female, male, money, clock } from '@/assets/imgs';
  import { getPlayerDetail, createOrder, createPay } from '@/utils/service';
  import styles from './index.module.scss';
  const state = reactive({
    show: false,
    showNotice: false,
  });
  const info = ref({});
  const { params } = useRouter();
  onMounted(() => {
    getPlayerDetail({ playerId: params.playerId }).then((res) => {
      info.value = res || {};
    });
  });
  const modalState = reactive({
    startTime: new Date(),
    period: '',
    detailAddress: '',
    price: '',
  });
  const handleClickSubmit = async () => {
    if (!modalState.startTime) return Taro.fun.showToastError('请选择日期');
    if (!modalState.period) return Taro.fun.showToastError('请选择时长');
    if (!modalState.detailAddress) return Taro.fun.showToastError('请选择见面地点');
    if (!modalState.price) return Taro.fun.showToastError('请填写支付金额');
    const res = await createOrder({
      ...modalState,
      orderType: 2,
      price: modalState.price * 100,
      playerIdList: [+params.playerId],
    });
    const resp = await createPay({ orderId: res.id });
    Taro.requestPayment({
      ...resp,
      success: () => {
        state.showNotice = true;
        // Taro.requestSubscribeMessage({
        //   tmplIds: [],
        // });
      },
    });
  };
  const systemInfo = useSystemInfoStore();
  Taro.showShareMenu({
    withShareTicket: true,
    menus: ['shareAppMessage', 'shareTimeline'],
  });
</script>

<template>
  <view :class="styles.index" :style="{ paddingTop: systemInfo.data.navBarHeight + 'px' }">
    <NavBar :isBack="true" />
    <view :class="styles.item_box">
      <view class="flex-row align-items-center mb-15 fs-19 fw-6">
        <image v-show="info.sex" :src="info.sex === '男' ? male : female" class="wd-17 hg-17" />
        <text class="ml-4">{{ info.nickname }}</text>
        <text class="ml-6">{{ info.age }}岁</text>
      </view>
      <view :class="styles.img_box">
        <img
          v-for="it in info.playerLifeList"
          :key="it"
          :src="it.url"
          :class="styles.img"
          @click="
            Taro.previewImage({
              urls: info.playerLifeList.map((item) => item.url),
              current: it.url,
            })
          "
        />
      </view>
      <view class="fs-15 cl-black mt-5 lh-21">
        {{ info.profile }}
      </view>
      <view class="fs-15 cl-black mt-5 fw-6">特长 </view>
      <view class="fs-15 cl-black mt-5 lh-21 mb-30">{{ info.specialty }} </view>
      <SimpleFullButton text="下单" :isBlack="true" @click="state.show = true" />
      <nut-popup
        z-index="999"
        position="bottom"
        round
        safe-area-inset-bottom
        :style="{ minHeight: '30%' }"
        v-model:visible="state.show"
      >
        <view class="m-15">
          <CloseButton text="支付" @close="state.show = false" />
          <view class="mt-10 mb-5 cl-black fs-15 fw-6">日期</view>
          <DatePicker v-model="modalState.startTime" />
          <view class="mt-10 mb-5 cl-black fs-15 fw-6">时长</view>
          <SelectSimple
            v-model="modalState.period"
            placeholder="请选择时长"
            title="选择时长"
            :options="TIME_NUMBER_LIST"
          >
            <template #prefix>
              <image :src="clock" class="wd-19 hg-19 mr-6" />
            </template>
          </SelectSimple>
          <view class="mt-10 mb-5 cl-black fs-15 fw-6">见面地点</view>
          <Location v-model="modalState.detailAddress" />
          <view class="mt-10 mb-5 cl-black fs-15 fw-6">支付金额</view>
          <SelectInput type="number" v-model.number="modalState.price">
            <template #prefix>
              <image :src="money" class="wd-19 hg-19" />
            </template>
          </SelectInput>
          <SimpleFullButton
            :text="`支付 ¥${modalState.price}`"
            :isBlack="true"
            @click="handleClickSubmit"
            class="mt-15"
          />
        </view>
      </nut-popup>
      <nut-popup round v-model:visible="state.showNotice">
        <view :class="styles.modal_box">
          <image :src="paySuccess" class="wd-111 hg-135" />
          <view class="cl-black fs-13 lh-23 mt-10"
            >您的陪玩官正在赶来的路上,将通过您在个人页面上传的二维码添加您的微信，与您取得联系，请注意查收</view
          >
          <SimpleButton
            text="我知道了"
            :style="{ width: '100%' }"
            class="mt-10"
            @click="
              state.showNotice = false;
              state.show = false;
            "
          />
        </view>
      </nut-popup>
    </view>
  </view>
</template>
