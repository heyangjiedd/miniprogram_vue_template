<script setup>
  import { reactive } from 'vue';
  import { calendar, clock, drop } from '@/assets/imgs';
  import styles from './index.module.scss';
  const state = reactive({
    time: '',
    timeShow: false,
    num: '',
    numShow: false,
  });

  const timeChange = ({ selectedOptions }) => {
    state.time = selectedOptions[0].text;
  };
  const numChange = ({ selectedOptions }) => {
    state.num = selectedOptions[0].text;
  };
  const columns = [
    { text: '1小时', value: '1' },
    { text: '2小时', value: '2' },
    { text: '3小时', value: '3' },
  ];
  const columns1 = [
    { text: '1人', value: '1' },
    { text: '2人', value: '2' },
    { text: '3人', value: '3' },
  ];
</script>

<template>
  <view class="flex-row-bc">
    <view :class="styles.index" @click="state.timeShow = true">
      <view class="flex-row">
        <image :src="calendar" class="wd-19 hg-19 mr-6" />
        <view class="cl-black fs-15">{{ state.time }}</view>
      </view>
      <image :src="drop" class="wd-13 hg-13" />
    </view>
    <view :class="styles.index" @click="state.numShow = true">
      <view class="flex-row">
        <image :src="clock" class="wd-19 hg-19 mr-6" />
        <view class="cl-black fs-15">{{ state.num }}</view>
      </view>
      <image :src="drop" class="wd-13 hg-13" />
    </view>
    <nut-picker v-model:visible="state.timeShow" :columns="columns" title="时长选择" @confirm="timeChange" />
    <nut-picker v-model:visible="state.numShow" :columns="columns1" title="人数选择" @confirm="numChange" />
  </view>
</template>
