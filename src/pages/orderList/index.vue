<script setup>
  import Taro from '@tarojs/taro';
  import { reactive, onMounted, ref } from 'vue';
  import dayjs from 'dayjs';
  import NavBar from '@/components/NavBar';
  import Info from '@/components/ListItem/Info';
  import SimpleButton from '@/components/Button/Simple';
  import SimpleFullButton from '@/components/Button/SimpleFull';
  import { useSystemInfoStore } from '@/store';
  import { checkCircle, imgItem } from '@/assets/imgs';
  import { getOrderList, cancelOrder, createPay } from '@/utils/service';
  import { ORDER_INDEX } from '@/config/path';
  import LabelValue from './components/LabelValue';
  import styles from './index.module.scss';

  const systemInfo = useSystemInfoStore();
  const state = reactive({
    tabValue: 0,
  });
  const list = ref([]);
  const fetchApi = () => {
    getOrderList({ status: state.tabValue }).then(({ records }) => (list.value = records || []));
  };
  onMounted(() => {
    fetchApi();
  });
  const onChange = ({ paneKey }) => {
    state.tabValue = +paneKey;
    fetchApi();
  };
  const handleCancelOrder = async (data, isPay) => {
    if (isPay) {
      const resp = await createPay({
        orderId: data.id,
        playerIdList: data.playerList.filter((item) => item.selected).map((item) => item.playerId),
      });
      Taro.requestPayment({
        ...resp,
        success: () => {
          fetchApi();
        },
      });
    } else {
      Taro.showModal({
        title: '确认取消',
        content: '确认取消该订单？',
        success: function(res) {
          if (res.confirm) {
            cancelOrder({ orderId: data.id }).then((res) => {
              fetchApi();
            });
          }
        },
      });
    }
  };
  const handleGo = (data) => {
    Taro.fun.navigateTo({ url: ORDER_INDEX, params: { playerId: data.id } });
  };
</script>

<template>
  <view :class="styles.index" :style="{ paddingTop: systemInfo.data.navBarHeight + 'px' }">
    <NavBar :isBack="true" />
    <nut-tabs v-model="state.tabValue" background="#ffffff" color="#333333" @change="onChange">
      <nut-tabpane title="发布中" :pane-key="0"> </nut-tabpane>
      <nut-tabpane title="进行中" :pane-key="1"> </nut-tabpane>
      <nut-tabpane title="已完成" :pane-key="2"> </nut-tabpane>
    </nut-tabs>
    <view :class="styles.box" v-for="(item, index) in list" :key="index" v-show="state.tabValue === 0">
      <LabelValue label="订单信息" :value="item.orderNo" />
      <LabelValue label="开始时间" :value="dayjs(item.startTime).format('YYYY-MM-DD HH:mm:ss')" />
      <LabelValue label="结束时间" :value="dayjs(item.endTime).format('YYYY-MM-DD HH:mm:ss')" />
      <LabelValue label="金额" :value="item.price / 100" />
      <LabelValue label="见面地点" :value="item.detailAddress" />
      <LabelValue label="类型" :value="item.playerType" />
      <LabelValue label="已接单陪玩官" />
      <view :class="styles.infos">
        <view v-for="(it, index) in item.playerList" :key="index" class="mb-20">
          <Info :data="it" />
          <SimpleButton :icon="it.selected ? checkCircle : ''" text="选择该陪玩" @click="it.selected = !it.selected" />
        </view>
      </view>
      <SimpleFullButton
        :text="item.playerList.some((item) => item.selected) ? `支付 ¥${item.price / 100}` : '取消订单'"
        class="mt-40 mb-20"
        :isBlack="item.playerList.some((item) => item.selected)"
        @click="
          handleCancelOrder(
            item,
            item.playerList.some((item) => item.selected),
          )
        "
      />
    </view>
    <view :class="styles.item_box" v-for="(item, index) in list" :key="index" v-show="state.tabValue !== 0">
      <LabelValue label="照片" />
      <view :class="styles.img_box">
        <image v-for="it in item.playerList" :key="it" :src="imgItem" :class="styles.img" />
      </view>
      <LabelValue label="姓名" value="12书法考级" />
      <LabelValue label="金额" :value="item.price / 100" />
      <LabelValue label="开始时间" :value="dayjs(item.startTime).format('YYYY-MM-DD HH:mm:ss')" />
      <SimpleButton text="点击进入陪玩官主页" @click="handleGo" />
    </view>
  </view>
</template>
