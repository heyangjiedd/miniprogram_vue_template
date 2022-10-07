<script setup>
  import { imgItem, female, male } from '@/assets/imgs';
  import styles from './index.module.scss';
  const props = defineProps(['icon', 'title', 'count', 'notice']);
</script>

<template>
  <view :class="styles.item">
    <image :src="imgItem" :class="styles.item_img" />
    <view class="fs-13 flex-row-cc">
      <image :src="female" class="wd-11 hg-11" />
      <text class="ml-4">okitari酱</text>
      <text class="ml-6">24岁</text>
    </view>
    <view class="fs-11 mt-10">别呼吸，都已经过去了</view>
  </view>
</template>
