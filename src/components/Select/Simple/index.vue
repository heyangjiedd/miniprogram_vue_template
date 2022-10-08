<script setup>
  import { reactive } from 'vue';
  import { drop } from '@/assets/imgs';
  import styles from './index.module.scss';
  const props = defineProps({
    placeholder: {
      default: '请选择',
    },
  });
  const state = reactive({
    time: '',
    timeShow: false,
  });
  const timeChange = ({ selectedOptions }) => {
    state.time = selectedOptions[0].text;
  };
  const columns = [
    { text: '1小时', value: '1' },
    { text: '2小时', value: '2' },
    { text: '3小时', value: '3' },
  ];
</script>

<template>
  <view>
    <view :class="styles.index" @click="state.timeShow = true">
      <view class="cl-black fs-15">{{ state.time || props.placeholder }}</view>
      <image :src="drop" class="wd-13 hg-13" />
    </view>
    <nut-picker v-model:visible="state.timeShow" :columns="columns" title="时长选择" @confirm="timeChange" />
  </view>
</template>
