<script setup>
  import Taro from '@tarojs/taro';
  import dayjs from 'dayjs';
  import { more } from '@/assets/imgs';
  import { ORDER_LIST_INDEX, ORDER_INDEX } from '@/config/path';
  import List from '@/components/List';
  import { getMessageList } from '@/utils/service';
  import styles from './index.module.scss';

  const handleClickOrder = ({ type, objectId }) => {
    if (type === 1) {
      Taro.fun.navigateTo({ url: ORDER_LIST_INDEX });
    } else if (type === 2) {
      Taro.fun.navigateTo({ url: ORDER_INDEX, params: { playerId: objectId } });
    }
  };
  Taro.showShareMenu({
    withShareTicket: true,
    menus: ['shareAppMessage', 'shareTimeline'],
  });
</script>

<template>
  <List :fetchApi="getMessageList">
    <template #item="{data}">
      <view :class="styles.index">
        <view :class="styles.box_item">
          <view class="cl-black fs-15 fw-6 mb-4">{{ data.title }}</view>
          <view class="flex-row align-items-center" @click="handleClickOrder(data)">
            <view class="cl-gray-7b fs-13">{{ data.content }}</view>
            <view class="cl-gray-7b fs-13" v-if="data.type === 1">看看我是谁</view>
            <view class="cl-gray-7b fs-13" v-if="data.type === 2">陪玩官主页</view>
            <img v-if="data.type === 1 || data.type === 2" :src="more" class="wd-17 hg-17" />
          </view>
          <view class="cl-gray-aa fs-13 mt-8">{{ dayjs(data.createTime).format('YYYY-MM-DD HH:mm:ss') }}</view>
        </view>
      </view>
    </template>
  </List>
</template>
