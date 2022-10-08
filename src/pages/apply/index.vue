<script setup>
  import Taro from '@tarojs/taro';
  import SelectInput from '@/components/Select/Input';
  import SelectSimple from '@/components/Select/Simple';
  import SelectCascader from '@/components/Select/Cascader';
  import SelectTag from '@/components/Select/Tag';
  import SelectTagSimple from '@/components/Select/TagSimple';
  import SelectTextArea from '@/components/Select/TextArea';
  import Upload from '@/components/Select/Upload';
  import SimpleFullButton from '@/components/Button/SimpleFull';
  import styles from './index.module.scss';
</script>

<template>
  <view :class="styles.index">
    <view class="mt-10 mb-5 cl-black fs-15 fw-6">姓名</view>
    <SelectInput placeholder="请输入姓名" />
    <view class="mt-10 mb-5 cl-black fs-15 fw-6">电话</view>
    <SelectInput type="number" placeholder="请输入电话" />
    <view class="mt-10 mb-5 cl-black fs-15 fw-6">微信号</view>
    <SelectInput placeholder="请输入微信号" />
    <view class="mt-10 mb-5 cl-black fs-15 fw-6">年龄</view>
    <SelectSimple placeholder="请选择年龄" />
    <view class="mt-10 mb-5 cl-black fs-15 fw-6">所在城市/区县</view>
    <SelectCascader placeholder="请选择城市/区县" />
    <view class="mt-10 mb-5 cl-black fs-15 fw-6">性别</view>
    <SelectTag type="0" />
    <view class="mt-10 mb-5 flex-row-bc">
      <view class="cl-black fs-15 fw-6">选择照片</view>
      <view class="cl-gray-7b fs-13">(请选择最近真实生活照3-6张)</view>
    </view>
    <Upload />
    <view class="mt-10 mb-5 cl-black fs-15 fw-6">期望金额</view>
    <SelectInput type="number" placeholder="请输入每小时金额" />
    <view class="mt-10 mb-5 cl-black fs-15 fw-6">可接单时间</view>
    <SelectTagSimple />
    <view class="mt-10 mb-5 cl-black fs-15 fw-6">个人简介</view>
    <SelectTextArea placeholder="简单介绍下你自己吧～" :maxLength="50" :rows="3" />
    <view class="mt-10 mb-5 cl-black fs-15 fw-6">特长</view>
    <SelectTextArea placeholder="尽情展示你自己吧～" :maxLength="100" :rows="6" />
    <SimpleFullButton text="提交" :isBlack="true" class="mt-40" />
  </view>
</template>
