<script setup>
  import Taro from '@tarojs/taro';
  import { reactive, ref } from 'vue';
  import NavBar from '@/components/NavBar';
  import SimpleFullButton from '@/components/Button/SimpleFull';
  import SimpleButton from '@/components/Button/Simple';
  import CloseButton from '@/components/Button/Close';
  import DatePicker from '@/components/Select/DatePicker';
  import SelectInput from '@/components/Select/Input';
  import Location from '@/components/Select/Location';
  import SelectSimple from '@/components/Select/Simple';
  import { SEX_TYPE_LIST, JOB_TIME_TYPE_LIST } from '@/config/constant';
  import { useSystemInfoStore } from '@/store';
  import { imgItem, female, male, money, laugh, clock } from '@/assets/imgs';
  import styles from './index.module.scss';
  const state = reactive({
    show: false,
    showNotice: false,
  });
  const date = ref(new Date());
  const location = ref('');
  const systemInfo = useSystemInfoStore();
  const list = [1, 2, 3, 4, 5, 6];
</script>

<template>
  <view :class="styles.index" :style="{ paddingTop: systemInfo.data.navBarHeight + 'px' }">
    <NavBar :isBack="true" />
    <view :class="styles.item_box">
      <view class="flex-row align-items-center mb-15 fs-19 fw-6">
        <image :src="female" class="wd-17 hg-17" />
        <text class="ml-4">okitari酱</text>
        <text class="ml-6">24岁</text>
      </view>
      <view :class="styles.img_box">
        <image v-for="it in list" :key="it" :src="imgItem" :class="styles.img" />
      </view>
      <view class="fs-15 cl-black mt-5 lh-21">
        别呼吸，都已经过去了别呼吸，都已经过去了别呼吸，都已经过去了别呼吸，都已经过去了别呼吸，都已经过去了别呼吸，都已经过去了别呼吸，都已经过去了别呼吸，都已经过去了别呼吸，都已经过去了
      </view>
      <view class="fs-15 cl-black mt-5 fw-6">特长 </view>
      <view class="fs-15 cl-black mt-5 lh-21 mb-30">别呼吸，都已经过去了别呼吸，都已经过去了别呼吸，都已经过去了 </view>
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
          <DatePicker v-model="date" />
          <view class="mt-10 mb-5 cl-black fs-15 fw-6">时长与人数</view>
          <view class="flex-row-bc">
            <view :class="[styles.item_box, 'pr-10']"
              ><SelectSimple placeholder="请选择时长" title="选择时长" :options="SEX_TYPE_LIST">
                <template #prefix>
                  <image :src="clock" class="wd-19 hg-19 mr-6" />
                </template> </SelectSimple
            ></view>
            <view :class="[styles.item_box, 'pl-10']"
              ><SelectSimple placeholder="请选择人数" title="选择人数" :options="SEX_TYPE_LIST">
                <template #prefix>
                  <image :src="laugh" class="wd-19 hg-19 mr-6" />
                </template> </SelectSimple
            ></view>
          </view>
          <view class="mt-10 mb-5 cl-black fs-15 fw-6">见面地点</view>
          <Location v-model="location" />
          <view class="mt-10 mb-5 cl-black fs-15 fw-6">支付金额</view>
          <SelectInput type="number">
            <template #prefix>
              <image :src="money" class="wd-19 hg-19" />
            </template>
          </SelectInput>
          <SimpleFullButton text="支付 ¥200" :isBlack="true" @click="state.showNotice = true" class="mt-15" />
        </view>
      </nut-popup>
      <nut-popup round v-model:visible="state.showNotice">
        <view :class="styles.modal_box">
          <image :src="imgItem" class="wd-138 hg-138" />
          <view class="cl-black fs-13 lh-23 mt-10">你的陪玩官正在赶来的路你的陪玩官正在赶来的路上上</view>
          <SimpleButton text="我知道了" :style="{ width: '100%' }" class="mt-10" @click="state.showNotice = false" />
        </view>
      </nut-popup>
    </view>
  </view>
</template>
