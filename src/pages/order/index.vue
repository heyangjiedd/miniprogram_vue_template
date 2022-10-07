<script setup>
  import Taro from '@tarojs/taro';
  import { reactive } from 'vue';
  import NavBar from '@/components/NavBar';
  import SimpleFullButton from '@/components/Button/SimpleFull';
  import CloseButton from '@/components/Button/Close';
  import DatePicker from '@/components/Select/DatePicker';
  import { useSystemInfoStore } from '@/store';
  import { imgItem, female, male } from '@/assets/imgs';
  import styles from './index.module.scss';
  const state = reactive({
    show: true,
  });
  const systemInfo = useSystemInfoStore();
  const list = [1, 2, 3, 4, 5, 6];
  const orderClick = () => {
    state.show = !state.show;
  };
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
      <SimpleFullButton text="下单" :isBlack="true" @click="orderClick" />
      <nut-popup
        z-index="999"
        position="bottom"
        round
        safe-area-inset-bottom
        :style="{ minHeight: '30%' }"
        v-model:visible="state.show"
      >
        <view class="m-15">
          <CloseButton text="支付" @close="orderClick" />
          <view class="mt-15 mb-10 cl-black fs-15 fw-6">日期</view>
          <DatePicker />
          <view class="mt-15 cl-black fs-15 fw-6">时长与人数</view>
          <view class="mt-15 cl-black fs-15 fw-6">见面地点</view>
          <view class="mt-15 cl-black fs-15 fw-6">支付金额</view>
        </view>
      </nut-popup>
    </view>
  </view>
</template>
