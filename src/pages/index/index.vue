<script setup>
  import Taro from '@tarojs/taro';
  import { onMounted, reactive, ref } from 'vue';
  import NavBar from '@/components/NavBar';
  import SimpleFullButton from '@/components/Button/SimpleFull';
  import CloseButton from '@/components/Button/Close';
  import DatePicker from '@/components/Select/DatePicker';
  import SelectTag from '@/components/Select/Tag';
  import SelectInput from '@/components/Select/Input';
  import Location from '@/components/Select/Location';
  import SelectSimple from '@/components/Select/Simple';
  import { useSystemInfoStore } from '@/store';
  import { APPLY_INDEX } from '@/config/path';
  import { money } from '@/assets/imgs';
  import { getBanner, getPlayerType, createOrder, createPay } from '@/utils/service';
  import { SEX_TYPE_LIST, TIME_NUMBER_LIST, PERSON_NUMBER_LIST } from '@/config/constant';

  import styles from './index.module.scss';

  const systemInfo = useSystemInfoStore();
  const list = ref([]);
  const bannerList = ref([]);

  const state = reactive({
    show: false,
    item: null,
  });
  const modalState = reactive({
    startTime: new Date(),
    period: '',
    playerCount: '',
    sex: '',
    detailAddress: '',
    price: '',
  });
  onMounted(() => {
    getBanner().then((res) => (bannerList.value = res || []));
    getPlayerType().then((res) => (list.value = res || []));
  });

  const handleClickApply = () => {
    Taro.fun.navigateTo({ url: APPLY_INDEX });
  };

  const handleClickSubmit = async () => {
    if (!modalState.startTime) return Taro.fun.showToastError('请选择日期');
    if (!modalState.period) return Taro.fun.showToastError('请选择时长');
    if (!modalState.playerCount) return Taro.fun.showToastError('请选择人数');
    if (!modalState.sex) return Taro.fun.showToastError('请选择性别');
    if (!modalState.detailAddress) return Taro.fun.showToastError('请选择见面地点');
    if (!modalState.price) return Taro.fun.showToastError('请填写支付金额');
    const res = await createOrder({
      ...modalState,
      orderType: 1,
      price: modalState.price * 100,
      playerType: state.item?.name,
    });
    await createPay({ orderId: res.id });
    Taro.fun.showToast('下单成功');
    // Taro.requestSubscribeMessage({
    //   tmplIds: [],
    // });
    state.show = false;
  };
  Taro.showShareMenu({
    withShareTicket: true,
    menus: ['shareAppMessage', 'shareTimeline'],
  });
</script>

<template>
  <view :class="styles.index" :style="{ paddingTop: systemInfo.data.navBarHeight + 'px' }">
    <NavBar :isApply="true" @clickApply="handleClickApply" />
    <view class="ml-15 mr-15">
      <nut-swiper :init-page="page" :pagination-visible="true" auto-play="3000">
        <nut-swiper-item v-for="(item, index) in bannerList" :key="index">
          <image :src="item.banner" :class="styles.banner_img" />
        </nut-swiper-item>
      </nut-swiper>
    </view>
    <view class="ml-15 mr-15 mt-15 fw-6 fs-19 cl-black">
      想约Ta做什么呢？
    </view>
    <view :class="styles.box">
      <view
        v-for="(item, index) in list"
        :key="index"
        :class="styles.item"
        @click="
          state.show = true;
          state.item = item;
        "
      >
        <image :src="item.url" :class="styles.item_img" />
        <view class="fs-15 cl-black mt-8">{{ item.name }}</view>
      </view>
    </view>
    <nut-popup
      z-index="999"
      position="bottom"
      round
      safe-area-inset-bottom
      :style="{ minHeight: '30%' }"
      v-model:visible="state.show"
    >
      <view class="m-15">
        <CloseButton :text="`一起${state.item?.name}吧`" :icon="state.item?.url" @close="state.show = false" />
        <view class="mt-10 mb-5 cl-black fs-15 fw-6">日期</view>
        <DatePicker v-model="modalState.startTime" />
        <view class="mt-10 mb-5 cl-black fs-15 fw-6">时长与人数</view>
        <view class="flex-row-bc">
          <view :class="[styles.item_box, 'pr-10']"
            ><SelectSimple
              v-model="modalState.period"
              placeholder="请选择时长"
              title="选择时长"
              :options="TIME_NUMBER_LIST"
            >
              <template #prefix>
                <image :src="clock" class="wd-19 hg-19 mr-6" />
              </template> </SelectSimple
          ></view>
          <view :class="[styles.item_box, 'pl-10']"
            ><SelectSimple
              v-model="modalState.playerCount"
              placeholder="请选择人数"
              title="选择人数"
              :options="PERSON_NUMBER_LIST"
            >
              <template #prefix>
                <image :src="laugh" class="wd-19 hg-19 mr-6" />
              </template> </SelectSimple
          ></view>
        </view>
        <view class="mt-10 mb-5 cl-black fs-15 fw-6">性别</view>
        <SelectTag v-model="modalState.sex" :options="SEX_TYPE_LIST" />
        <view class="mt-10 mb-5 cl-black fs-15 fw-6">见面地点</view>
        <Location v-model="modalState.detailAddress" />
        <view class="mt-10 mb-5 cl-black fs-15 fw-6">支付金额</view>
        <SelectInput type="number" v-model.number="modalState.price">
          <template #prefix>
            <image :src="money" class="wd-19 hg-19" />
          </template>
        </SelectInput>
        <SimpleFullButton text="下单" :isBlack="true" class="mt-15" @click="handleClickSubmit" />
      </view>
    </nut-popup>
  </view>
</template>
