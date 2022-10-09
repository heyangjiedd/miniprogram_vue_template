<script setup>
  import { computed, reactive } from 'vue';
  import dayjs from 'dayjs';
  import { calendar, clock, drop } from '@/assets/imgs';
  import styles from './index.module.scss';
  const props = defineProps({
    modelValue: {
      default: new Date(),
    },
  });
  const emit = defineEmits(['update:modelValue']);
  const state = reactive({
    dateShow: false,
    timeShow: false,
  });
  const dateChange = ({ selectedValue }) => {
    const dateStr = selectedValue.join('-');
    emit('update:modelValue', new Date(`${dateStr} ${dayjs(props.modelValue).format('HH:mm:ss')}`));
  };
  const timeChange = ({ selectedValue }) => {
    const timeStr = selectedValue.join(':');
    emit('update:modelValue', new Date(`${dayjs(props.modelValue).format('YYYY-MM-DD')} ${timeStr}`));
  };
  const timeTxt = computed(() => (dayjs(props.modelValue).get('hour') > 12 ? '下午' : '上午'));
</script>

<template>
  <view class="flex-row-bc">
    <view :class="styles.index" @click="state.dateShow = true">
      <view class="flex-row">
        <image :src="calendar" class="wd-19 hg-19 mr-6" />
        <view class="cl-black fs-15">{{ dayjs(props.modelValue).format('YYYY-MM-DD') }}</view>
      </view>
      <image :src="drop" class="wd-13 hg-13" />
    </view>
    <view :class="styles.index" @click="state.timeShow = true">
      <view class="flex-row">
        <image :src="clock" class="wd-19 hg-19 mr-6" />
        <view class="cl-black fs-15">{{ timeTxt }}{{ dayjs(props.modelValue).format('HH:mm:ss') }}</view>
      </view>
      <image :src="drop" class="wd-13 hg-13" />
    </view>
    <nut-datepicker
      :model-value="props.modelValue"
      v-model:visible="state.dateShow"
      :is-show-chinese="true"
      :three-dimensional="false"
      @confirm="dateChange"
    />
    <nut-datepicker
      :model-value="props.modelValue"
      v-model:visible="state.timeShow"
      type="time"
      :is-show-chinese="true"
      :three-dimensional="false"
      @confirm="timeChange"
    />
  </view>
</template>
