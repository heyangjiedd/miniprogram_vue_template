<script setup>
  import { ref, computed } from 'vue';
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
      default: [],
    },
  });
  const emit = defineEmits(['update:modelValue']);
  const visible = ref(false);
  const txt = computed(() => {
    let curArr = props.options;
    const strArr = [];
    props.modelValue.forEach((item) => {
      const currItem = curArr.find((it) => it.value === item);
      strArr.push(currItem?.text);
      curArr = currItem?.children || [];
    });
    return strArr.join('/');
  });
  const onChange = (value) => {
    emit('update:modelValue', value);
  };
</script>

<template>
  <view>
    <view :class="styles.index" @click="visible = true">
      <view class="cl-black fs-15">{{ txt || props.placeholder }}</view>
      <image :src="drop" class="wd-13 hg-13" />
    </view>
    <nut-cascader
      :title="props.title"
      v-model:visible="visible"
      :model-value="props.modelValue"
      @change="onChange"
      :options="props.options"
    ></nut-cascader>
  </view>
</template>
