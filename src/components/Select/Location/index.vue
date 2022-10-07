<script setup>
  import { reactive } from 'vue';
  import { reload, map } from '@/assets/imgs';
  import styles from './index.module.scss';
  const state = reactive({ location: '成都市-xx区-xx市787号' });
</script>

<template>
  <view :class="styles.index">
    <view class="flex-row-cc">
      <image :src="map" class="wd-19 hg-19 mr-6 flex-0" />
      <view class="cl-black fs-15">{{ state.location }}</view>
    </view>
    <view class="flex-row-cc flex-0 p-8 brs-8 bg-white">
      <image :src="reload" class="wd-13 hg-13 mr-5" />
      <view class="cl-black fs-11">重新选择</view>
    </view>
  </view>
</template>
