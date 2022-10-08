import Taro from '@tarojs/taro';

// 路径拼接
function handelPath(url) {
  return `/${url}`;
}

// 参数转换拼接
function handleParams(params) {
  let paramsStr = '';
  if (params && typeof params === 'object') {
    Object.keys(params).forEach((key, index) => {
      paramsStr += `${index === 0 ? '?' : '&'}${key}=${params[key]}`;
    });
  }
  return paramsStr;
}

// 打开新页面并跳转
function navigateTo({ url, params, ...otherParams }) {
  const paramsStr = handleParams(params);
  Taro.navigateTo({
    url: handelPath(url + paramsStr),
    ...otherParams,
  });
}

// 关闭当前页面并跳转新的页面
function redirectTo({ url, params, ...otherParams }) {
  const paramsStr = handleParams(params);
  Taro.redirectTo({
    url: handelPath(url + paramsStr),
    ...otherParams,
  });
}

// 关闭所有页面并跳转到tabBar页面
function switchTab({ url, params, ...otherParams }) {
  const paramsStr = handleParams(params);
  Taro.switchTab({
    url: handelPath(url + paramsStr),
    ...otherParams,
  });
}

// 关闭所有页面，打开到应用内的某个页面
function reLaunch({ url, params, ...otherParams }) {
  const paramsStr = handleParams(params);
  Taro.reLaunch({
    url: handelPath(url + paramsStr),
    ...otherParams,
  });
}

// 返回上级页面
function navBack(data = {}) {
  const { delta, ...otherParams } = data;
  let currentDelta = delta;
  if (!delta || typeof delta !== 'number') {
    currentDelta = 1;
  }
  Taro.navigateBack({ delta: currentDelta, ...otherParams });
}

export default { navigateTo, redirectTo, navBack, switchTab, reLaunch };
