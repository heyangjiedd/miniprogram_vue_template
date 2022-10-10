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

export const compareSDKVersion = (version1 = '', version2 = '') => {
  const v1 = version1.split('.');
  const v2 = version2.split('.');
  const maxLen = Math.max(v1.length, v2.length);
  while (v1.length < maxLen) {
    v1.push('0');
  }
  while (v2.length < maxLen) {
    v2.push('0');
  }
  for (let i = 0; i < maxLen; i++) {
    const num1 = parseInt(v1[i]);
    const num2 = parseInt(v2[i]);
    if (num1 > num2) {
      return 1;
    } else if (num1 < num2) {
      return -1;
    }
  }
  return 0;
};
