<script setup>
  import styles from './index.module.scss';
  const props = defineProps({
    options: {
      default: [],
    },
    modelValue: {
      default: null,
    },
  });
  const emit = defineEmits(['update:modelValue']);
  const onChange = (value) => {
    emit('update:modelValue', value);
  };
</script>

<template>
  <view class="flex-row-bc">
    <view
      v-for="item in options"
      :key="item.value"
      :style="{ width: (1 / options.length) * 100 + '%' }"
      :class="styles.index"
    >
      <view
        :class="[styles.item_box, { [styles.select]: props.modelValue === item.value }]"
        @click="onChange(item.value)"
      >
        <image v-if="item.icon" :src="item.icon" class="wd-19 hg-19 mr-6" />
        <view class="cl-black fs-15">{{ item.text }}</view>
      </view>
    </view>
  </view>
</template>
