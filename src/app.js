import { createApp } from 'vue';
import Taro from '@tarojs/taro';
import { createPinia } from 'pinia';
import {
  Button,
  Toast,
  Swiper,
  SwiperItem,
  Tabs,
  TabPane,
  Popup,
  OverLay,
  DatePicker,
  Picker,
  Input,
  TextArea,
  Cascader,
} from '@nutui/nutui-taro';
import { APP_TARO_ENV } from '@/config/appConfig';
import TaroFun from '@/utils/overrideTaroFun';
import { useSystemInfoStore } from '@/store';

import './app.scss';

Taro.fun = TaroFun;
const App = createApp({
  onShow(options) {
    const systemInfo = useSystemInfoStore();
    Taro.getSystemInfo({
      success: (res) => {
        // Android导航栏高度 = 32px + 8px * 2 = 48px
        // iOS导航栏高度 = 32px + 6px * 2 = 44px
        const height = res.system.indexOf('iOS') > -1 ? 44 : 48;
        switch (process.env.TARO_ENV) {
          case APP_TARO_ENV.alipay:
            res.navBarHeight = res.statusBarHeight + res.titleBarHeight;
            break;
          case APP_TARO_ENV.weapp:
            res.navBarHeight = res.statusBarHeight + height;
            break;
        }
        systemInfo.setData(res);
      },
    });
    this.checkUpdateVersion();
  },
  setup() {
    const checkUpdateVersion = () => {
      // eslint-disable-next-line no-undef
      const updateManager = wx.getUpdateManager();
      if (updateManager) {
        updateManager.onCheckForUpdate(() => {
          // 请求完新版本信息的回调
        });
        updateManager.onUpdateReady(() => {
          Taro.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success(res) {
              if (res.confirm) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                updateManager.applyUpdate();
              }
            },
          });
        });
        updateManager.onUpdateFailed(() => Taro.fun.showToast('更新失败，请稍后再试！'));
      }
    };
    return {
      checkUpdateVersion,
    };
  },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
});

App.use(createPinia());
App.use(Button)
  .use(Toast)
  .use(Swiper)
  .use(SwiperItem)
  .use(Tabs)
  .use(TabPane)
  .use(Popup)
  .use(OverLay)
  .use(DatePicker)
  .use(Picker)
  .use(Cascader)
  .use(TextArea)
  .use(Input);
export default App;
