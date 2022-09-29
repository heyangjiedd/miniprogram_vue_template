import taro, { authorize, getSetting, openSetting, showModal, saveImageToPhotosAlbum } from '@tarojs/taro';
import TaroFun from './toast';

/**
 * @method 检查用户权限
 * @param {*} filePath
 */
const checkAuthorize = (filePath) => {
  getSetting({
    success: (res) => {
      // 没有相册权限，请求授权
      if (!res.authSetting['scope.writePhotosAlbum']) {
        authorize({
          scope: 'scope.writePhotosAlbum',
          success: () => {
            saveToPhotoAlbum(filePath);
          },
          fail: () => {
            showModal({
              title: '下载海报需开启相册权限',
              confirmText: '前往开启',
              success: (data) => {
                if (data.confirm) {
                  openSetting();
                } else if (data.cancel) {
                  TaroFun.showToast('授权失败');
                }
              }
            });
          }
        });
      } else {
        saveToPhotoAlbum(filePath);
      }
    }
  });
};

/**
 * @method 保存图片到相册
 * @param {*} filePath
 */
const saveToPhotoAlbum = (filePath) => {
  saveImageToPhotosAlbum({
    filePath,
    success: () => TaroFun.showToastSuccess('下载成功')
  });
};

const downloadFile = ({ url, success, fail }) => {
  taro.downloadFile({
    url,
    success: (res) => {
      const filePath = res.tempFilePath;
      checkAuthorize(filePath);
      success && success();
    },
    fail: () => {
      TaroFun.showToastDelay('下载失败，请重试');
      fail && fail();
    }
  });
};
export default {
  downloadFile
};
