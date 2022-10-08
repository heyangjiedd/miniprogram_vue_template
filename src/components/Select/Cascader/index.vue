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
    time: [],
    timeTxt: '',
    timeShow: false,
  });
  const change = (value, pathNodes) => {
    state.timeTxt = pathNodes.map((item) => item.text).join('/');
  };
  const options = [
    {
      value: '1',
      text: '浙江',
      children: [
        {
          value: '2',
          text: '杭州',
          children: [
            { value: '3', text: '西湖区' },
            { value: '4', text: '余杭区' },
          ],
        },
      ],
    },
  ];
</script>

<template>
  <view>
    <view :class="styles.index" @click="state.timeShow = true">
      <view class="cl-black fs-15">{{ state.timeTxt || props.placeholder }}</view>
      <image :src="drop" class="wd-13 hg-13" />
    </view>
    <nut-cascader
      title="地址选择"
      v-model:visible="state.timeShow"
      v-model="state.time"
      @change="change"
      :options="options"
    ></nut-cascader>
  </view>
</template>
