<script setup>
  import { reactive } from 'vue';
  import { infinite, female, male } from '@/assets/imgs';
  import styles from './index.module.scss';
  const state = reactive({
    select: '',
  });
  const list = [
    { icon: male, text: '男' },
    { icon: female, text: '女' },
    { icon: infinite, text: '不限' },
  ];
</script>

<template>
  <view class="flex-row-bc">
    <view
      v-for="item in list"
      :key="item.text"
      :class="[styles.index, { [styles.select]: state.select === item.text }]"
      @click="state.select = item.text"
    >
      <image :src="item.icon" class="wd-19 hg-19 mr-6" />
      <view class="cl-black fs-15">{{ item.text }}</view>
    </view>
  </view>
</template>
