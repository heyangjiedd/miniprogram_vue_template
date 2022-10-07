<script setup>
  import Taro from '@tarojs/taro';
  import { useSystemInfoStore } from '@/store';
  import { title, back, apply } from '@/assets/imgs';
  import styles from './index.module.scss';
  const systemInfo = useSystemInfoStore();
  const props = defineProps(['isApply', 'isBack']);
  const handleClickBack = (type, msg, cover = false) => {
    Taro.navigateBack();
  };
</script>

<template>
  <view
    :class="styles.index"
    :style="{
      height: `${systemInfo.data.navBarHeight}px`,
      paddingTop: `${systemInfo.data.statusBarHeight}px`,
    }"
  >
    <view :class="styles.left">
      <image v-if="props.isBack" @click="handleClickBack" mode="heightFix" :src="back" :class="styles.back" />
      <image v-if="props.isApply" mode="heightFix" :src="apply" :class="styles.apply" />
    </view>
    <image mode="heightFix" :src="title" :class="styles.title" />
  </view>
</template>
