<script setup>
  import Taro from '@tarojs/taro';
  import NavBar from '@/components/NavBar';
  import Info from '@/components/ListItem/Info';
  import { useSystemInfoStore } from '@/store';
  import styles from './index.module.scss';

  const systemInfo = useSystemInfoStore();
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
</script>

<template>
  <view :class="styles.index" :style="{ paddingTop: systemInfo.data.navBarHeight + 'px' }">
    <NavBar :isApply="true" />
    <view :class="styles.box">
      <Info v-for="(item, index) in list" :key="index" />
    </view>
  </view>
</template>
