<script setup>
  import styles from './index.module.scss';
  const props = defineProps({
    maxLength: {
      default: 20,
    },
    placeholder: {
      default: '请输入',
    },
    modelValue: {
      default: '',
    },
    rows: { default: 2 },
  });
  const emit = defineEmits(['update:modelValue']);
  const onInput = (val) => {
    emit('update:modelValue', val);
  };
</script>

<template>
  <view :class="styles.index">
    <nut-textarea
      :model-value="props.modelValue"
      @change="onInput"
      :placeholder="props.placeholder"
      limit-show
      :rows="props.rows"
      autosize
      :max-length="props.maxLength"
    />
  </view>
</template>
