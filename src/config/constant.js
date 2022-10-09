import { infinite, female, male } from '@/assets/imgs';

export const SEX_TYPE_LIST = [
  {
    text: '男',
    value: '男',
    icon: male,
  },
  {
    text: '女',
    value: '女',
    icon: female,
  },
];
export const SEX_TYPE_PLUS_LIST = [
  ...SEX_TYPE_LIST,
  {
    text: '不限',
    value: '',
    icon: infinite,
  },
];

export const JOB_TIME_TYPE_LIST = [
  {
    text: '全职',
    value: '全职',
  },
  {
    text: '兼职',
    value: '兼职',
  },
];
export const TIME_NUMBER_LIST = new Array(24)
  .fill(0)
  .map((item, index) => ({ text: `${index + 1} 小时`, value: index + 1 }));
export const PERSON_NUMBER_LIST = new Array(10)
  .fill(0)
  .map((item, index) => ({ text: `${index + 1} 人`, value: index + 1 }));
