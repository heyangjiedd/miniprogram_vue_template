<script setup>
  import Taro from '@tarojs/taro';
  import NavBar from '@/components/NavBar';
  import Cell from '@/components/ListItem/Cell';
  import { useSystemInfoStore, userInfoStore } from '@/store';
  import { imgItem, qrcode, notification, document, messages } from '@/assets/imgs';
  import { login } from '@/utils/service';
  import styles from './index.module.scss';

  const systemInfo = useSystemInfoStore();
  const userInfo = userInfoStore();
  const handleLogin = () => {
    Taro.login({
      success: ({ code }) => {
        login({ code });
      },
    });
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
            <view class="cl-black-00 fs-17 fw-6" @click="handleLogin">大师傅</view>
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
      <Cell :icon="notification" title="通知" count="6" notice="有人接单了喔" class="mt-11" />
      <Cell :icon="document" title="我的订单" class="mt-11" />
      <Cell :icon="messages" title="联系客服" class="mt-11" />
    </view>
  </view>
</template>
