<script setup>
  import Taro from '@tarojs/taro';
  import NavBar from '@/components/NavBar';
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
      <view v-for="(item, index) in list" :key="index" :class="styles.item">
        <image :src="item.icon" :class="styles.item_img" />
        <view class="fs-15 cl-black mt-8">{{ item.title }}</view>
      </view>
    </view>
  </view>
</template>
