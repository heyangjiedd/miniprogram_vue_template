<script setup>
  import { reactive } from 'vue';
  import { add, imgItem, remove } from '@/assets/imgs';
  import styles from './index.module.scss';
  const props = defineProps({
    maxLength: {
      default: 6,
    },
  });
  const state = reactive({
    time: [],
  });
  const change = (value, pathNodes) => {};
</script>

<template>
  <view :class="styles.index" @click="state.timeShow = true">
    <view :class="styles.img">
      <image :src="imgItem" :class="styles.bg" />
      <image :src="remove" :class="styles.remove" />
    </view>
    <view :class="styles.btn_add">
      <image :src="add" class="wd-19 hg-19" />
    </view>
  </view>
</template>
