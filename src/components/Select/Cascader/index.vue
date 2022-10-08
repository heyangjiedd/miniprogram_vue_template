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
    time: [],
    timeTxt: '',
    timeShow: false,
  });
  const change = (value, pathNodes) => {
    state.timeTxt = pathNodes.map((item) => item.text).join('/');
  };
</script>

<template>
  <view>
    <view :class="styles.index" @click="state.timeShow = true">
      <view class="cl-black fs-15">{{ state.timeTxt || props.placeholder }}</view>
      <image :src="drop" class="wd-13 hg-13" />
    </view>
    <nut-cascader
      :title="props.title"
      v-model:visible="state.timeShow"
      v-model="state.time"
      @change="change"
      :options="props.options"
    ></nut-cascader>
  </view>
</template>
