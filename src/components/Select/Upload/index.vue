<script setup>
  import { ref } from 'vue';
  import { add, remove, reload } from '@/assets/imgs';
  import { chooseImageUpload } from '@/utils/common';
  import { uploadPictureUrl } from '@/utils/service';
  import styles from './index.module.scss';
  const props = defineProps({
    maxLength: {
      default: 6,
    },
    modelValue: {
      default: [],
    },
  });
  const emit = defineEmits(['update:modelValue']);
  const loading = ref(false);
  const handleUpload = () => {
    if (loading.value) {
      return;
    }
    loading.value = true;
    chooseImageUpload(uploadPictureUrl, props.maxLength - props.modelValue.length).then(
      (res) => {
        emit('update:modelValue', [...props.modelValue, ...(res || [])]);
        loading.value = false;
      },
      () => {
        loading.value = false;
      },
    );
  };
  const handleRemove = (curr) => {
    emit(
      'update:modelValue',
      props.modelValue.filter((item) => item !== curr),
    );
  };
</script>

<template>
  <view :class="styles.index">
    <view :class="styles.img" v-for="(item, index) in props.modelValue" :key="index">
      <image :src="item" :class="styles.bg" />
      <img :src="remove" :class="styles.remove" @click="handleRemove(item)" />
    </view>
    <view v-if="props.maxLength > props.modelValue.length" :class="styles.btn_add" @click="handleUpload">
      <image :src="loading ? reload : add" class="wd-19 hg-19" />
    </view>
  </view>
</template>
