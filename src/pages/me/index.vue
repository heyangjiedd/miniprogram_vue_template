<script setup>
  import Taro from '@tarojs/taro';
  import NavBar from '@/components/NavBar';
  import Cell from '@/components/ListItem/Cell';
  import { useSystemInfoStore, userInfoStore } from '@/store';
  import { imgItem, qrcode, notification, document, messages } from '@/assets/imgs';
  import { ORDER_LIST_INDEX, NOTIFY_LIST_INDEX } from '@/config/path';
  import styles from './index.module.scss';

  const systemInfo = useSystemInfoStore();
  const userInfo = userInfoStore();
  const handleClickOrder = () => {
    Taro.fun.navigateTo({ url: ORDER_LIST_INDEX });
  };
  const handleClickNotify = () => {
    Taro.fun.navigateTo({ url: NOTIFY_LIST_INDEX });
  };
  const handleClickCall = () => {
    Taro.makePhoneCall({ phoneNumber: '13402842722' });
  };
</script>

<template>
  <view :class="styles.index" :style="{ paddingTop: systemInfo.data.navBarHeight + 'px' }">
    <NavBar :isApply="true" />
    <view :class="styles.box">
      <view class="flex-row-bc">
        <view class="flex-row-bc">
          <image :src="imgItem" :class="styles.img" />
          <view class="ml-10">
            <view class="cl-black-00 fs-17 fw-6">大师傅</view>
            <view :class="styles.phone">绑定手机号</view>
          </view>
        </view>
        <view class="flex-row-bc">
          <text class="fs-11 cl-black mr-10">微信二维码</text>
          <view :class="styles.qrcode">
            <image :src="qrcode" class="wd-17 hg-17" />
          </view>
        </view>
      </view>
      <Cell
        :icon="notification"
        title="通知"
        count="6"
        notice="有人接单了喔"
        class="mt-11"
        @click="handleClickNotify"
      />
      <Cell :icon="document" title="我的订单" class="mt-11" @click="handleClickOrder" />
      <Cell :icon="messages" title="联系客服" class="mt-11" @click="handleClickCall" />
    </view>
  </view>
</template>
