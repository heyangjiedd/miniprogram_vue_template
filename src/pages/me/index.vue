<script setup>
  import Taro from '@tarojs/taro';
  import { reactive } from 'vue';
  import NavBar from '@/components/NavBar';
  import Cell from '@/components/ListItem/Cell';
  import SimpleButton from '@/components/Button/Simple';
  import CloseButton from '@/components/Button/Close';
  import { useSystemInfoStore, userInfoStore } from '@/store';
  import { imgItem, qrcode, notification, document, messages } from '@/assets/imgs';
  import { ORDER_LIST_INDEX, NOTIFY_LIST_INDEX } from '@/config/path';
  import { chooseImageUpload } from '@/utils/common';
  import { uploadPictureUrl, updateUser } from '@/utils/service';
  import styles from './index.module.scss';

  const systemInfo = useSystemInfoStore();
  const userInfo = userInfoStore();
  const state = reactive({
    show: false,
  });
  const handleClickOrder = () => {
    Taro.fun.navigateTo({ url: ORDER_LIST_INDEX });
  };
  const handleClickNotify = () => {
    Taro.fun.navigateTo({ url: NOTIFY_LIST_INDEX });
  };
  const handleClickCall = () => {
    Taro.makePhoneCall({ phoneNumber: '13402842722' });
  };
  const handleUpload = async () => {
    const res = await chooseImageUpload(uploadPictureUrl, 1);
    const resp = await updateUser({ wechatUrl: res[0] });
    userInfo.setData({ ...userInfo.data, ...resp });
  };
  const getPhoneNumber = async (data) => {
    const resp = await updateUser({ code: data.detail.code });
    userInfo.setData({ ...userInfo.data, ...resp });
  };
  const handleUser = () => {
    Taro.getUserProfile({
      desc: '仅用于展示',
      success: async (data) => {
        const resp = await updateUser({ avatar: data.userInfo.avatarUrl, nickname: data.userInfo.nickName });
        userInfo.setData({ ...userInfo.data, ...resp });
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
          <img :src="userInfo.data?.avatar" :class="styles.img" @click="handleUser" />
          <view class="ml-10">
            <view class="cl-black-00 fs-17 fw-6" @click="handleUser">{{
              userInfo.data?.nickname || '获取用户名'
            }}</view>
            <view v-if="userInfo.data?.phone" :class="styles.phone">{{ userInfo.data?.phone }}</view>
            <button v-else open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" :class="styles.phone">
              绑定手机号
            </button>
          </view>
        </view>
        <view class="flex-row-bc" @click="state.show = true">
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
    <nut-popup round v-model:visible="state.show">
      <view :class="styles.modal_box">
        <view :style="{ width: '100%' }"><CloseButton text="查看二维码" @close="state.show = false"/></view>
        <image :src="userInfo.data?.wechatUrl" class="wd-138 hg-138 brs-11" />
        <SimpleButton text="更换二维码" :style="{ width: '100%' }" class="mt-10" @click="handleUpload" />
      </view>
    </nut-popup>
  </view>
</template>
