<script setup>
  import { reactive } from 'vue';
  import { useSystemInfoStore } from '@/store';
  const systemInfo = useSystemInfoStore();
  const state = reactive({
    msg: '欢迎使用 NutUI3 开发小程序',
    msg2: '你成功了～',
    type: 'text',
    show: false,
    cover: false
  });

  const handleClick = (type, msg, cover = false) => {
    state.show = true;
    state.msg2 = msg;
    state.type = type;
    state.cover = cover;
  };
</script>

<template>
  <view class="index">
    <view class="btn">
      <nut-button type="primary" @click="handleClick('text', msg2, true)">点我</nut-button>
    </view>
    <view>{{ systemInfo.data.system }}</view>
    <nut-toast v-model:visible="state.show" :msg="state.msg" :type="state.type" :cover="state.cover" />
  </view>
</template>

<style lang="scss">
  .index {
  }
</style>
