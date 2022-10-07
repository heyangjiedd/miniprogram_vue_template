<script setup>
  import { computed, reactive } from 'vue';
  import dayjs from 'dayjs';
  import { calendar, clock, drop } from '@/assets/imgs';
  import styles from './index.module.scss';
  const state = reactive({
    date: new Date(),
    dateFormat: dayjs().format('YYYY-MM-DD'),
    dateShow: false,
    time: new Date(),
    timeFormat: dayjs().format('HH:mm:ss'),
    timeShow: false,
  });
  const dateChange = ({ selectedValue }) => {
    state.dateFormat = selectedValue.join('-');
  };
  const timeChange = ({ selectedValue }) => {
    state.timeFormat = selectedValue.join(':');
  };
  const timeTxt = computed(() => (dayjs(`${state.date} ${state.time}`).get('hour') > 12 ? '下午' : '上午'));
</script>

<template>
  <view class="flex-row-bc">
    <view :class="styles.index" @click="state.dateShow = true">
      <view class="flex-row">
        <image :src="calendar" class="wd-19 hg-19 mr-6" />
        <view class="cl-black fs-15">{{ state.dateFormat }}</view>
      </view>
      <image :src="drop" class="wd-13 hg-13" />
    </view>
    <view :class="styles.index" @click="state.timeShow = true">
      <view class="flex-row">
        <image :src="clock" class="wd-19 hg-19 mr-6" />
        <view class="cl-black fs-15">{{ timeTxt }}{{ state.timeFormat }}</view>
      </view>
      <image :src="drop" class="wd-13 hg-13" />
    </view>
    <nut-datepicker
      v-model="state.date"
      v-model:visible="state.dateShow"
      :is-show-chinese="true"
      :three-dimensional="false"
      @confirm="dateChange"
    />
    <nut-datepicker
      v-model="state.time"
      v-model:visible="state.timeShow"
      type="time"
      :is-show-chinese="true"
      :three-dimensional="false"
      @confirm="timeChange"
    />
  </view>
</template>
