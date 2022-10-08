<script setup>
  import { reactive } from 'vue';
  import styles from './index.module.scss';

  const state = reactive({
    select: '',
  });
  const list = [
    { icon: 1, text: '兼职' },
    { icon: 2, text: '全职' },
  ];
</script>

<template>
  <view class="flex-row-bc">
    <view
      v-for="item in list"
      :key="item.text"
      :style="{ width: '47%' }"
      :class="[styles.index, { [styles.select]: state.select === item.text }]"
      @click="state.select = item.text"
    >
      <view class="cl-black fs-15">{{ item.text }}</view>
    </view>
  </view>
</template>
