<script setup>
  import Taro from '@tarojs/taro';
  import { reactive } from 'vue';
  import NavBar from '@/components/NavBar';
  import Info from '@/components/ListItem/Info';
  import SimpleButton from '@/components/Button/Simple';
  import SimpleFullButton from '@/components/Button/SimpleFull';
  import { useSystemInfoStore } from '@/store';
  import { checkCircle, imgItem } from '@/assets/imgs';
  import LabelValue from './components/LabelValue';
  import styles from './index.module.scss';

  const systemInfo = useSystemInfoStore();
  const state = reactive({
    tab1value: '0',
  });
  const list = [1, 2];
</script>

<template>
  <view :class="styles.index" :style="{ paddingTop: systemInfo.data.navBarHeight + 'px' }">
    <NavBar :isBack="true" />
    <nut-tabs v-model="state.tab1value" background="#ffffff" color="#333333">
      <nut-tabpane title="发布中"> </nut-tabpane>
      <nut-tabpane title="进行中"> </nut-tabpane>
      <nut-tabpane title="已完成"> </nut-tabpane>
    </nut-tabs>
    <view :class="styles.box" v-show="state.tab1value === '0'">
      <LabelValue label="订单信息" value="1283687647" />
      <LabelValue label="开始时间" value="2022-10-03 上午12:00" />
      <LabelValue label="结束时间" value="2022-10-03 上午12:00" />
      <LabelValue label="金额" value="¥200" />
      <LabelValue label="见面地点" value="成都市-xx区-xx市787号" />
      <LabelValue label="类型" value="唱歌" />
      <LabelValue label="已接单陪玩官" />
      <view :class="styles.infos">
        <view v-for="(item, index) in list" :key="index" class="mb-20">
          <Info />
          <SimpleButton :icon="checkCircle" text="选择该陪玩" />
        </view>
      </view>
      <SimpleFullButton text="取消订单" class="mt-40 mb-20" />
    </view>
    <view :class="styles.item_box" v-show="state.tab1value !== '0'">
      <LabelValue label="照片" />
      <view :class="styles.img_box">
        <image v-for="it in [1, 2]" :key="it" :src="imgItem" :class="styles.img" />
      </view>
      <LabelValue label="姓名" value="12书法考级" />
      <LabelValue label="金额" value="¥200" />
      <LabelValue label="开始时间" value="开始时间" />
      <SimpleButton text="点击进入陪玩官主页" />
    </view>
  </view>
</template>
