<script setup>
  import { computed, ref } from 'vue';
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
    modelValue: {
      default: null,
    },
  });
  const emit = defineEmits(['update:modelValue']);
  const visible = ref(false);
  const txt = computed(() => {
    return props.options.find((item) => item.value === props.modelValue)?.text;
  });
  const onChange = ({ selectedValue }) => {
    emit('update:modelValue', selectedValue[0]);
  };
</script>

<template>
  <view>
    <view :class="styles.index" @click="visible = true">
      <view class="flex-row-cc">
        <slot name="prefix"></slot>
        <view class="cl-black fs-15">{{ txt || props.placeholder }}</view>
      </view>
      <image :src="drop" class="wd-13 hg-13" />
    </view>
    <nut-picker
      v-model:visible="visible"
      :model-value="[props.modelValue]"
      :columns="options"
      :title="props.title"
      @confirm="onChange"
    />
  </view>
</template>
