<script setup>
  import Taro from '@tarojs/taro';
  import { onMounted, reactive, ref, watch } from 'vue';
  import SelectInput from '@/components/Select/Input';
  import SelectSimple from '@/components/Select/Simple';
  import SelectCascader from '@/components/Select/Cascader';
  import SelectTag from '@/components/Select/Tag';
  import SelectTextArea from '@/components/Select/TextArea';
  import Upload from '@/components/Select/Upload';
  import SimpleFullButton from '@/components/Button/SimpleFull';
  import { getProvinceCity, getAgeSelect } from '@/utils/service';
  import { SEX_TYPE_LIST, JOB_TIME_TYPE_LIST } from '@/config/constant';
  import styles from './index.module.scss';
  const ageList = ref([]);
  const cityList = ref([]);
  const state = reactive({
    name: '',
    age: null,
    city: [],
    sex: null,
    jobTime: null,
    playerLifeList: [],
  });
  onMounted(() => {
    getProvinceCity().then((res) => (cityList.value = res || []));
    getAgeSelect().then((res) => (ageList.value = (res || []).map((item) => ({ text: `${item}岁`, value: item }))));
  });
</script>
<!-- age (integer, optional): 年龄 ,
city (string, optional): 城市 ,
coverUrl (string, optional): 封面图 ,
district (string, optional): 地区 ,
id (integer, optional): 记录ID ,
jobTime (string, optional): 兼职 全职 ,
money (integer, optional): 期望金额 小时 ,
name (string, optional): 姓名 ,
nickname (string, optional): 昵称 ,
phone (string, optional): 手机号 ,
playerLifeList (Array[PlayerLife对象], optional): 生活照 ,
profile (string, optional): 简介 ,
province (string, optional): 省份 ,
sex (string, optional): 性别 ,
specialty (string, optional): 特长 ,
wechat (string, optional): 微信号 -->

<!-- createTime (string, optional): 创建时间 ,
id (integer, optional): 记录ID ,
playerId (integer, optional): player ID ,
url (string, optional): 生活照URL -->

<template>
  <view :class="styles.index">
    <view class="mt-10 mb-5 cl-black fs-15 fw-6">姓名</view>
    <SelectInput placeholder="请输入姓名" v-model="state.name" />
    <view class="mt-10 mb-5 cl-black fs-15 fw-6">电话</view>
    <SelectInput type="number" placeholder="请输入电话" />
    <view class="mt-10 mb-5 cl-black fs-15 fw-6">微信号</view>
    <SelectInput placeholder="请输入微信号" />
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
    <SelectInput type="number" placeholder="请输入每小时金额" />
    <view class="mt-10 mb-5 cl-black fs-15 fw-6">可接单时间</view>
    <SelectTag v-model="state.sex" :options="JOB_TIME_TYPE_LIST" />
    <view class="mt-10 mb-5 cl-black fs-15 fw-6">个人简介</view>
    <SelectTextArea placeholder="简单介绍下你自己吧～" :maxLength="50" :rows="3" />
    <view class="mt-10 mb-5 cl-black fs-15 fw-6">特长</view>
    <SelectTextArea placeholder="尽情展示你自己吧～" :maxLength="100" :rows="6" />
    <SimpleFullButton text="提交" :isBlack="true" class="mt-40" />
  </view>
</template>
