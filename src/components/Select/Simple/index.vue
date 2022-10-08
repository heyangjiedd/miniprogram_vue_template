<script setup>
  import { reactive } from 'vue';
  import { drop } from '@/assets/imgs';
  import styles from './index.module.scss';
  const props = defineProps({
    placeholder: {
      default: '请选择',
    },
    title: {
      default: '请选择',
    },
    options: {
      default: [],
    },
  });
  const state = reactive({
    time: '',
    timeShow: false,
  });
  const timeChange = ({ selectedOptions }) => {
    state.time = selectedOptions[0].text;
  };
</script>

<template>
  <view>
    <view :class="styles.index" @click="state.timeShow = true">
      <view class="cl-black fs-15">{{ state.time || props.placeholder }}</view>
      <image :src="drop" class="wd-13 hg-13" />
    </view>
    <nut-picker v-model:visible="state.timeShow" :columns="options" :title="props.title" @confirm="timeChange" />
  </view>
</template>
