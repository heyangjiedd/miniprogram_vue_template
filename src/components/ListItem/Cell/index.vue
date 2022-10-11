<script setup>
  import { more } from '@/assets/imgs';
  import styles from './index.module.scss';
  defineProps(['icon', 'title', 'count', 'notice']);
</script>

<template>
  <view :class="styles.index">
    <view class="flex-row-cc">
      <image mode="heightFix" :src="icon" class="wd-23 hg-23" />
      <view
        ><text class="fs-15 cl-black fw-6 ml-8">{{ title }}</text
        ><text v-if="!!count" :class="styles.count">{{ count }}</text></view
      >
    </view>
    <view class="flex-row-cc">
      <view v-if="!!notice" class="cl-gray-aa fs-13">{{ notice }}</view>
      <image mode="heightFix" :src="more" class="wd-17 hg-17 ml-10" />
    </view>
  </view>
</template>
