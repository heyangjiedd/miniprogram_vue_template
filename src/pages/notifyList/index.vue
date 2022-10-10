<script setup>
  import Taro from '@tarojs/taro';
  import { more } from '@/assets/imgs';
  import { ORDER_LIST_INDEX } from '@/config/path';
  import styles from './index.module.scss';
  const list = [
    {
      time: '8-14 03:24',
      list: [
        { title: '有人接单了哦', desc: '看看是谁吧', more: true },
        { title: '你已选择xx陪玩官，订单已生成', desc: '陪玩官主页', more: true },
      ],
    },
    {
      time: '8-14 03:51',
      list: [
        { title: '你收到一条客服消息', desc: '你于xx年xx月xx日发布的征集在xx年xx月xx日' },
        { title: '通知', desc: '你于xx年xx月xx日发布的征集在xx年xx月xx日' },
      ],
    },
  ];
  const handleClickOrder = () => {
    Taro.fun.navigateTo({ url: ORDER_LIST_INDEX });
  };
</script>

<template>
  <view :class="styles.index">
    <view v-for="item in list" :key="item.time" class="mb-11">
      <view class="cl-gray-aa fs-13">{{ item.time }}</view>
      <view v-for="it in item.list" :key="it.title" :class="styles.box_item">
        <view class="cl-black fs-15 fw-6 mb-4">{{ it.title }}</view>
        <view class="flex-row align-items-center">
          <view class="cl-gray-7b fs-13">{{ it.desc }}</view>
          <img v-if="it.more" :src="more" class="wd-17 hg-17" @click="handleClickOrder" />
        </view>
      </view>
    </view>
  </view>
</template>
