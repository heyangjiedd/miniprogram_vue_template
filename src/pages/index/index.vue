<script setup>
  import Taro from '@tarojs/taro';
  import List from '@/components/List';
  const fetchApi = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  };
  const handleClick = () => {
    Taro.chooseLocation();
  };
</script>

<template>
  <view style="height: 100% ;padding-top: 30px;box-sizing: border-box;">
    <view style="height: 30px, background: red;position: absolute;top:0" @click="handleClick">343243</view>
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
