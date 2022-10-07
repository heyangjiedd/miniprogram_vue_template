<script setup>
  import Taro from '@tarojs/taro';
  import { reactive } from 'vue';
  import NavBar from '@/components/NavBar';
  import SimpleFullButton from '@/components/Button/SimpleFull';
  import CloseButton from '@/components/Button/Close';
  import DatePicker from '@/components/Select/DatePicker';
  import TimePerson from '@/components/Select/TimePerson';
  import SelectTag from '@/components/Select/Tag';
  import SelectInput from '@/components/Select/Input';
  import Location from '@/components/Select/Location';
  import { useSystemInfoStore } from '@/store';
  import {
    banner,
    type1,
    type2,
    type3,
    type4,
    type5,
    type6,
    type7,
    type8,
    type9,
    type10,
    type11,
    type12,
    type13,
    type14,
    type15,
  } from '@/assets/imgs';
  import styles from './index.module.scss';

  const systemInfo = useSystemInfoStore();
  const list = [
    { title: '唱歌', icon: type3 },
    { title: '干饭', icon: type5 },
    { title: '逛街', icon: type6 },
    { title: '密室', icon: type13 },
    { title: '剧本杀', icon: type8 },
    { title: '酒吧', icon: type7 },
    { title: '聊天', icon: type10 },
    { title: '打游戏', icon: type4 },
    { title: '蹦迪', icon: type2 },
    { title: '看电影', icon: type9 },
    { title: '露营', icon: type11 },
    { title: '旅游', icon: type12 },
    { title: '运动', icon: type15 },
    { title: '咖啡', icon: type1 },
    { title: '其他', icon: type14 },
  ];
  const state = reactive({
    show: false,
  });
</script>

<template>
  <view :class="styles.index" :style="{ paddingTop: systemInfo.data.navBarHeight + 'px' }">
    <NavBar :isApply="true" />
    <view class="ml-15 mr-15">
      <nut-swiper :init-page="page" :pagination-visible="true" auto-play="3000">
        <nut-swiper-item>
          <image :src="banner" :class="styles.banner_img" />
        </nut-swiper-item>
        <nut-swiper-item>
          <image :src="banner" :class="styles.banner_img" />
        </nut-swiper-item>
      </nut-swiper>
    </view>
    <view class="ml-15 mr-15 mt-15 fw-6 fs-19 cl-black">
      想约Ta做什么呢？
    </view>
    <view :class="styles.box">
      <view v-for="(item, index) in list" :key="index" :class="styles.item" @click="state.show = true">
        <image :src="item.icon" :class="styles.item_img" />
        <view class="fs-15 cl-black mt-8">{{ item.title }}</view>
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
        <CloseButton text="一起K歌吧" @close="state.show = false" />
        <view class="mt-10 mb-5 cl-black fs-15 fw-6">日期</view>
        <DatePicker />
        <view class="mt-10 mb-5 cl-black fs-15 fw-6">时长与人数</view>
        <TimePerson />
        <view class="mt-10 mb-5 cl-black fs-15 fw-6">性别</view>
        <SelectTag />
        <view class="mt-10 mb-5 cl-black fs-15 fw-6">见面地点</view>
        <Location />
        <view class="mt-10 mb-5 cl-black fs-15 fw-6">支付金额</view>
        <SelectInput />
        <SimpleFullButton text="下单" :isBlack="true" @click="state.showNotice = true" class="mt-15" />
      </view>
    </nut-popup>
  </view>
</template>
