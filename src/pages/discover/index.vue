<script setup>
  import Taro from '@tarojs/taro';
  import NavBar from '@/components/NavBar';
  import Info from '@/components/ListItem/Info';
  import List from '@/components/List';
  import { useSystemInfoStore } from '@/store';
  import { getPlayerList } from '@/utils/service';
  import { ORDER_INDEX } from '@/config/path';
  import styles from './index.module.scss';

  const systemInfo = useSystemInfoStore();
  const handleGo = (data) => {
    Taro.fun.navigateTo({ url: ORDER_INDEX, params: { playerId: data.id } });
  };
  Taro.showShareMenu({
    withShareTicket: true,
    menus: ['shareAppMessage', 'shareTimeline'],
  });
</script>

<template>
  <view :class="styles.index" :style="{ paddingTop: systemInfo.data.navBarHeight + 'px' }">
    <NavBar :isApply="true" />
    <List :fetchApi="getPlayerList">
      <template #item="{data}">
        <Info :data="data" @click="handleGo(data)" />
      </template>
    </List>
  </view>
</template>
