<script setup>
  import { calendar, clock, drop } from '@/assets/imgs';
  import styles from './index.module.scss';
</script>

<template>
  <view class="flex-row-bc">
    <Picker mode="date" value="{value}">
      <view :class="styles.index">
        <view class="flex-row">
          <image :src="calendar" class="wd-19 hg-19 mr-6" />
          <view class="cl-black fs-15">2022-10-03</view>
        </view>
        <image :src="drop" class="wd-13 hg-13" />
      </view>
    </Picker>
    <view :class="styles.index">
      <view class="flex-row">
        <image :src="clock" class="wd-19 hg-19 mr-6" />
        <view class="cl-black fs-15">上午09:00</view>
      </view>
      <image :src="drop" class="wd-13 hg-13" />
    </view>
  </view>
</template>
