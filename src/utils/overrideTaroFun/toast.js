import Taro from '@tarojs/taro';
import delay from 'lodash/delay';

const DURATION = 3000; // toast时长
const DURATION_SUCCESS = 2000; // toast_success/toast_error时长
const TIMEOUT = 300; // 延时展示taost,主要是配合请求延时loading

const showToast = (title, params, duration = DURATION) => {
  Taro.showToast({
    title,
    duration,
    icon: 'none',
    mask: true,
    ...params,
    success: () => {
      setTimeout(() => params?.success(), duration);
    },
    fail: () => {
      setTimeout(() => params?.fail(), duration);
    },
  });
};

const showToastSuccess = (title, params, duration = DURATION_SUCCESS) => {
  Taro.showToast({
    title,
    duration,
    icon: 'success',
    mask: true,
    ...params,
    success: () => {
      setTimeout(() => params?.success(), duration);
    },
    fail: () => {
      setTimeout(() => params?.fail(), duration);
    },
  });
};

const showToastError = (title, params, duration = DURATION_SUCCESS) => {
  Taro.showToast({
    title,
    duration,
    icon: 'error',
    mask: true,
    ...params,
    success: () => {
      setTimeout(() => params?.success(), duration);
    },
    fail: () => {
      setTimeout(() => params?.fail(), duration);
    },
  });
};

const showToastDelay = (title, params, timeout = TIMEOUT, duration) => {
  delay(showToast, timeout, title, params, duration);
};

const showToastSuccessDelay = (title, params, timeout = TIMEOUT, duration) => {
  delay(showToastSuccess, timeout, title, params, duration);
};

const showToastErrorDelay = (title, params, timeout = TIMEOUT, duration) => {
  delay(showToastError, timeout, title, params, duration);
};

export default {
  showToast,
  showToastSuccess,
  showToastError,
  showToastDelay,
  showToastSuccessDelay,
  showToastErrorDelay,
};
