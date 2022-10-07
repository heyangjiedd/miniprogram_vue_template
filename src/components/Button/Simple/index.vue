<script setup>
  import styles from './index.module.scss';
  const props = defineProps(['icon', 'text']);
</script>

<template>
  <view :class="styles.index">
    <image v-if="props.icon" :src="props.icon" class="wd-17 hg-17 mr-8" />
    <text class="cl-black fs-13">{{ props.text }}</text>
  </view>
</template>
