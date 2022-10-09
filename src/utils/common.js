import Taro from '@tarojs/taro';

export const uploadFile = (url = '', tempFilePaths) => {
  return new Promise((resolve, reject) => {
    Taro.uploadFile({
      url,
      filePath: tempFilePaths,
      fileName: 'file',
      fileType: 'image',
      name: 'file',
      success(resp) {
        if (resp.statusCode === 200) {
          const data = JSON.parse(resp.data);
          if (data.code === 1) {
            resolve(data.data);
          }
        }
        reject(resp);
      },
      fail(resp) {
        reject(resp);
      },
    });
  });
};

export const chooseImageUpload = (url = '', count = 1) => {
  return new Promise((resolve, reject) => {
    Taro.chooseImage({
      count,
      sourceType: ['album'],
      success({ tempFilePaths }) {
        const promises = [];
        tempFilePaths.forEach((item) => {
          promises.push(uploadFile(url, item));
        });
        Promise.all(promises).then(resolve, reject);
      },
      fail(resp) {
        reject(resp);
      },
    });
  });
};

export const chooseVideoUpload = (url = '', count = 1) => {
  return new Promise((resolve, reject) => {
    Taro.chooseVideo({
      count,
      sourceType: ['album'],
      success(res) {
        uploadFile(url, res.tempFilePaths).then(resolve, reject);
      },
      fail(resp) {
        reject(resp);
      },
    });
  });
};
