<script setup>
  import styles from './index.module.scss';
  const props = defineProps({
    type: {
      default: 'text',
    },
    placeholder: {
      default: '请输入',
    },
    modelValue: {
      default: '',
    },
  });
  const emit = defineEmits(['update:modelValue']);
  const onInput = (val) => {
    emit('update:modelValue', val);
  };
</script>

<template>
  <view :class="styles.index">
    <slot name="prefix"></slot>
    <nut-input
      :model-value="props.modelValue"
      @update:model-value="onInput"
      :type="props.type"
      :placeholder="props.placeholder"
    />
  </view>
</template>
