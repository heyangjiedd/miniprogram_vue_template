<script setup>
  import Taro from '@tarojs/taro';
  import { onMounted, reactive, ref } from 'vue';
  import SelectInput from '@/components/Select/Input';
  import SelectSimple from '@/components/Select/Simple';
  import SelectCascader from '@/components/Select/Cascader';
  import SelectTag from '@/components/Select/Tag';
  import SelectTextArea from '@/components/Select/TextArea';
  import Upload from '@/components/Select/Upload';
  import SimpleFullButton from '@/components/Button/SimpleFull';
  import { getProvinceCity, getAgeSelect, approvalPlayer } from '@/utils/service';
  import { SEX_TYPE_LIST, JOB_TIME_TYPE_LIST } from '@/config/constant';
  import styles from './index.module.scss';
  const ageList = ref([]);
  const cityList = ref([]);
  const state = reactive({
    name: '',
    phone: '',
    wechat: '',
    age: null,
    city: [],
    sex: null,
    playerLifeList: [],
    money: '',
    jobTime: null,
    profile: '',
    specialty: '',
  });
  onMounted(() => {
    getProvinceCity().then((res) => (cityList.value = res || []));
    getAgeSelect().then((res) => (ageList.value = (res || []).map((item) => ({ text: `${item}岁`, value: item }))));
  });
  const handleClickSubmit = () => {
    if (!state.name) return Taro.fun.showToastError('请填写姓名');
    if (!state.phone) return Taro.fun.showToastError('请填写电话');
    if (!state.wechat) return Taro.fun.showToastError('请填写微信');
    if (!state.age) return Taro.fun.showToastError('请选择年龄');
    if (!state.city) return Taro.fun.showToastError('请选择城市');
    if (!state.sex) return Taro.fun.showToastError('请选择性别');
    if (state.playerLifeList.length < 3) return Taro.fun.showToastError('请选择3-6张照片');
    if (!state.jobTime) return Taro.fun.showToastError('请选择接单时间');
    if (!state.money) return Taro.fun.showToastError('请填写期望金额');
    if (!state.profile) return Taro.fun.showToastError('请填写简介');
    if (!state.specialty) return Taro.fun.showToastError('请填写特长');
    approvalPlayer({
      ...state,
      playerLifeList: state.playerLifeList.map((url) => ({ url })),
      province: state.city[0],
      city: state.city[1],
      district: state.city[2] || '',
    }).then((res) => {
      Taro.fun.showToastSuccess('申请成功', {
        success: Taro.fun.navBack,
      });
    });
  };
  Taro.showShareMenu({
    withShareTicket: true,
    menus: ['shareAppMessage', 'shareTimeline'],
  });
</script>

<template>
  <view :class="styles.index">
    <view class="mt-10 mb-5 cl-black fs-15 fw-6">姓名</view>
    <SelectInput placeholder="请输入姓名" v-model="state.name" />
    <view class="mt-10 mb-5 cl-black fs-15 fw-6">电话</view>
    <SelectInput type="number" placeholder="请输入电话" v-model="state.phone" />
    <view class="mt-10 mb-5 cl-black fs-15 fw-6">微信号</view>
    <SelectInput placeholder="请输入微信号" v-model="state.wechat" />
    <view class="mt-10 mb-5 cl-black fs-15 fw-6">年龄</view>
    <SelectSimple placeholder="请选择年龄" title="选择年龄" :options="ageList" v-model="state.age" />
    <view class="mt-10 mb-5 cl-black fs-15 fw-6">所在城市/区县</view>
    <SelectCascader placeholder="请选择城市/区县" title="城市/区县" :options="cityList" v-model="state.city" />
    <view class="mt-10 mb-5 cl-black fs-15 fw-6">性别</view>
    <SelectTag v-model="state.sex" :options="SEX_TYPE_LIST" />
    <view class="mt-10 mb-5 flex-row-bc">
      <view class="cl-black fs-15 fw-6">选择照片</view>
      <view class="cl-gray-7b fs-13">(请选择最近真实生活照3-6张)</view>
    </view>
    <Upload v-model="state.playerLifeList" />
    <view class="mt-10 mb-5 cl-black fs-15 fw-6">期望金额</view>
    <SelectInput type="number" placeholder="请输入每小时金额" v-model="state.money" />
    <view class="mt-10 mb-5 cl-black fs-15 fw-6">可接单时间</view>
    <SelectTag :options="JOB_TIME_TYPE_LIST" v-model="state.jobTime" />
    <view class="mt-10 mb-5 cl-black fs-15 fw-6">个人简介</view>
    <SelectTextArea placeholder="简单介绍下你自己吧～" :maxLength="50" :rows="3" v-model="state.profile" />
    <view class="mt-10 mb-5 cl-black fs-15 fw-6">特长</view>
    <SelectTextArea placeholder="尽情展示你自己吧～" :maxLength="100" :rows="6" v-model="state.specialty" />
    <SimpleFullButton text="提交" :isBlack="true" class="mt-40" @click="handleClickSubmit" />
  </view>
</template>
