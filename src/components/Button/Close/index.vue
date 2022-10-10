<script setup>
  import { close } from '@/assets/imgs';
  const props = defineProps(['text', 'icon']);
</script>

<template>
  <view class="flex-row-bc">
    <view class="flex-row-cc">
      <image v-show="icon" :src="icon" class="wd-23 hg-23 mr-8" />
      <text class="cl-black fs-19 fw-6">{{ props.text }}</text>
    </view>
    <view class="bg-gray p-7 brs-8 flex-row" @click="$emit('close')">
      <image :src="close" class="wd-17 hg-17" />
    </view>
  </view>
</template>
