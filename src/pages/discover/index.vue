<script setup>
  import Taro from '@tarojs/taro';
  import NavBar from '@/components/NavBar';
  import Info from '@/components/ListItem/Info';
  import List from '@/components/List';
  import { useSystemInfoStore } from '@/store';
  import styles from './index.module.scss';

  const systemInfo = useSystemInfoStore();
  const fetchApi = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 3000);
    });
  };
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
</script>

<template>
  <view :class="styles.index" :style="{ paddingTop: systemInfo.data.navBarHeight + 'px' }">
    <NavBar :isApply="true" />
    <view :class="styles.box">
      <Info v-for="(item, index) in list" :key="index" />
    </view>
    <List :fetchApi="fetchApi">
      <template #header>
        <div>header</div>
      </template>
      <template #item="{data}">
        <div>{{ data }}</div>
      </template>
      <template #footer>
        <div>footer</div>
      </template>
    </List>
  </view>
</template>
