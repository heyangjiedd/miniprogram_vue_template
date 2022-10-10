<script setup>
  import { female, male } from '@/assets/imgs';
  import styles from './index.module.scss';
  const props = defineProps(['data']);
</script>

<template>
  <view :class="styles.item">
    <image :src="props.data.coverUrl" :class="styles.item_img" />
    <view class="fs-13 flex-row-cc">
      <image v-show="props.data.sex" :src="props.data.sex === '男' ? male : female" class="wd-11 hg-11" />
      <text class="ml-4">{{ props.data.nickname }}</text>
      <text class="ml-6">{{ props.data.age }}岁</text>
    </view>
    <view class="fs-11 mt-10">{{ props.data.profile }}</view>
  </view>
</template>
