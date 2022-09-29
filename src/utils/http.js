import Taro from '@tarojs/taro';
import TaroFun from '@/utils/overrideTaroFun';
import { LOGIN } from '@/config/path';

function formatUrl(obj) {
  return Object.keys(obj)
    .map((item) => `${item}=${obj[item]}`)
    .join('&');
}

export const config = {
  baseUrl: 'http://120.24.31.219:5003',
  timeout: 8000,
  dataType: 'json',
  mode: 'cors',
  header: {
    'content-type': 'application/json' // 默认值
  }
};

function Http() {
  return {
    loading: 0,
    // 请求拦截
    request(options) {
      return {
        ...options,
        header: {
          token: Taro.getStorageSync('token'),
          ...options.header
        }
      };
    },
    // 返回拦截
    response(options) {
      const { code, msg, data } = options.data;
      if (code === 1) {
        return data;
      } else if (code === 0) {
        Taro.showToast({
          title: msg || '系统异常',
          icon: 'error',
          duration: 2000
        });
        setTimeout(() => {
          Taro.hideLoading();
        }, 2000);
        this.loading--;
        throw msg;
      } else if (code === 401) {
        TaroFun.reLaunch({ url: LOGIN });
      }
    },
    fetch(options) {
      const opt = this.request(options);
      // 返回null，可以拦截
      if (!opt) {
        return;
      }
      !this.loading &&
        Taro.showLoading({
          title: '加载中'
        });
      this.loading++;
      return new Promise((resolve, reject) => {
        const param = {
          ...config,
          ...opt,
          header: {
            ...config.header,
            ...opt.header
          },
          url: config.baseUrl + opt.url,
          success: (res) => {
            this.loading--;
            !this.loading && Taro.hideLoading();
            const result = this.response(res);
            resolve(result);
          },
          fail: (error) => {
            setTimeout(() => {
              this.loading--;
              !this.loading && Taro.hideLoading();
            }, 1000);
            reject(error);
          },
          complete: () => {}
        };
        Taro.request(param);
      });
    },
    get(options) {
      return this.fetch({ ...options, method: 'GET' });
    },
    post(options) {
      return this.fetch({
        ...options,
        data: JSON.stringify(options.data),
        method: 'POST'
      });
    },
    postQuery(options) {
      return this.fetch({
        ...options,
        url: `${options.url}?${formatUrl(options.param)}`,
        data: JSON.stringify(options.data),
        method: 'POST'
      });
    },
    postFormData(options) {
      return this.fetch({
        ...options,
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      });
    }
  };
}
const index = new Http();
export default index;
