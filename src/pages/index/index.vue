<script setup>
  import Taro from '@tarojs/taro';
  import { onMounted, reactive, ref } from 'vue';
  import NavBar from '@/components/NavBar';
  import SimpleFullButton from '@/components/Button/SimpleFull';
  import CloseButton from '@/components/Button/Close';
  import DatePicker from '@/components/Select/DatePicker';
  import TimePerson from '@/components/Select/TimePerson';
  import SelectTag from '@/components/Select/Tag';
  import SelectInput from '@/components/Select/Input';
  import Location from '@/components/Select/Location';
  import { useSystemInfoStore } from '@/store';
  import { APPLY_INDEX } from '@/config/path';
  import { money } from '@/assets/imgs';
  import { getBanner, getPlayerType } from '@/utils/service';

  import styles from './index.module.scss';

  const systemInfo = useSystemInfoStore();
  const list = ref([]);
  const bannerList = ref([]);

  const state = reactive({
    show: false,
  });
  onMounted(() => {
    getBanner().then((res) => (bannerList.value = res || []));
    getPlayerType().then((res) => (list.value = res || []));
  });

  const handleClickApply = () => {
    Taro.fun.navigateTo({ url: APPLY_INDEX });
  };
</script>

<template>
  <view :class="styles.index" :style="{ paddingTop: systemInfo.data.navBarHeight + 'px' }">
    <NavBar :isApply="true" @clickApply="handleClickApply" />
    <view class="ml-15 mr-15">
      <nut-swiper :init-page="page" :pagination-visible="true" auto-play="3000">
        <nut-swiper-item v-for="(item, index) in bannerList" :key="index">
          <image :src="item.banner" :class="styles.banner_img" />
        </nut-swiper-item>
      </nut-swiper>
    </view>
    <view class="ml-15 mr-15 mt-15 fw-6 fs-19 cl-black">
      想约Ta做什么呢？
    </view>
    <view :class="styles.box">
      <view v-for="(item, index) in list" :key="index" :class="styles.item" @click="state.show = true">
        <image :src="item.url" :class="styles.item_img" />
        <view class="fs-15 cl-black mt-8">{{ item.name }}</view>
      </view>
    </view>
    <nut-popup
      z-index="999"
      position="bottom"
      round
      safe-area-inset-bottom
      :style="{ minHeight: '30%' }"
      v-model:visible="state.show"
    >
      <view class="m-15">
        <CloseButton text="一起K歌吧" @close="state.show = false" />
        <view class="mt-10 mb-5 cl-black fs-15 fw-6">日期</view>
        <DatePicker />
        <view class="mt-10 mb-5 cl-black fs-15 fw-6">时长与人数</view>
        <TimePerson />
        <view class="mt-10 mb-5 cl-black fs-15 fw-6">性别</view>
        <SelectTag type="1" />
        <view class="mt-10 mb-5 cl-black fs-15 fw-6">见面地点</view>
        <Location />
        <view class="mt-10 mb-5 cl-black fs-15 fw-6">支付金额</view>
        <SelectInput type="number">
          <template #prefix>
            <image :src="money" class="wd-19 hg-19" />
          </template>
        </SelectInput>
        <SimpleFullButton text="下单" :isBlack="true" @click="state.showNotice = true" class="mt-15" />
      </view>
    </nut-popup>
  </view>
</template>
