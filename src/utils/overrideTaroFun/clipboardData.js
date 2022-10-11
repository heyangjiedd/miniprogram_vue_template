import Taro from '@tarojs/taro';
import TaroFun from './toast';

const setClipboardData = (data, params = {}) => {
  const { success, fail, complete, hideCopyTxt = false, copyTxt } = params;
  if (!data) {
    TaroFun.showToast('暂无可复制文案');
    return;
  }
  Taro.setClipboardData({
    data: `${data}`,
    success: () => {
      TaroFun.showToast(copyTxt || (hideCopyTxt ? '复制成功' : `复制成功：${data}`));
      success && success();
    },
    fail: () => {
      TaroFun.showToast('复制失败，请重试');
      fail && fail();
    },
    complete,
  });
};
export default {
  setClipboardData,
};
