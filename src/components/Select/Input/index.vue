<script setup>
  import { reactive } from 'vue';
  import { money } from '@/assets/imgs';
  import styles from './index.module.scss';
  const state = reactive({
    text: '',
  });
</script>

<template>
  <view :class="styles.index">
    <image :src="money" class="wd-19 hg-19" />
    <nut-input type="number" v-model="state.text" placeholder="请输入金额" />
  </view>
</template>
