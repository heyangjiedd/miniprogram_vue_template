<script setup>
  import styles from './index.module.scss';
  const props = defineProps(['text', 'isBlack']);
</script>

<template>
  <view :class="[styles.index, { [styles.black]: props.isBlack }]">
    {{ props.text }}
  </view>
</template>
