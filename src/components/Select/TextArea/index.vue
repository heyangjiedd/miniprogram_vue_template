<script setup>
  import { reactive } from 'vue';
  import styles from './index.module.scss';
  const props = defineProps({
    maxLength: {
      default: 20,
    },
    placeholder: {
      default: '请输入',
    },
    rows: { default: 2 },
  });
  const state = reactive({
    text: '',
  });
</script>

<template>
  <view :class="styles.index">
    <nut-textarea
      v-model="state.text"
      :placeholder="props.placeholder"
      limit-show
      :rows="props.rows"
      autosize
      :max-length="props.maxLength"
    />
  </view>
</template>
