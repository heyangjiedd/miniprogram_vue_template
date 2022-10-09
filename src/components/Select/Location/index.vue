<script setup>
  import Taro from '@tarojs/taro';
  import { reactive } from 'vue';
  import { reload, map } from '@/assets/imgs';
  import styles from './index.module.scss';
  const props = defineProps({
    placeholder: {
      default: '请选择',
    },
    modelValue: {
      default: null,
    },
  });
  const emit = defineEmits(['update:modelValue']);
  const handleChooseLocation = () => {
    Taro.chooseLocation({
      success: ({ name, address, latitude, longitude }) => {
        emit('update:modelValue', address);
      },
      fail: () => {},
    });
  };
</script>

<template>
  <view :class="styles.index">
    <view class="flex-row-cc" @click="handleChooseLocation">
      <image :src="map" class="wd-19 hg-19 mr-6 flex-0" />
      <view class="cl-black fs-15">{{ props.modelValue || props.placeholder }}</view>
    </view>
    <view v-if="props.modelValue" class="flex-row-cc flex-0 p-8 brs-8 bg-white ml-6" @click="handleChooseLocation">
      <image :src="reload" class="wd-13 hg-13 mr-5" />
      <view class="cl-black fs-11">重新选择</view>
    </view>
  </view>
</template>
