const paths = require('./config/path');

const mainPagePaths = paths.main;
const subPackagePagePaths = [];

Object.keys(paths).forEach((key) => {
  if (!mainPagePaths[key] && key !== 'main') {
    subPackagePagePaths.push(paths[key]);
  }
});

const subPackagesObj = {};
subPackagePagePaths.forEach((item) => {
  const [path1, path2, ...path] = item.split('/');
  const root = `${path1}/${path2}/`;
  const page = path.join('/');
  if (subPackagesObj[root]) {
    subPackagesObj[root].pages.push(page);
  } else {
    subPackagesObj[root] = { pages: [page] };
  }
});
const subPackages = Object.keys(subPackagesObj).map((item) => ({
  root: item,
  pages: subPackagesObj[item].pages,
}));

// eslint-disable-next-line no-undef
export default defineAppConfig({
  pages: Object.values(mainPagePaths),
  subpackages: subPackages,
  tabBar: {
    list: [
      {
        pagePath: paths.HOME_INDEX,
        text: '首页',
        iconPath: 'assets/icons/home.png',
        selectedIconPath: 'assets/icons/home_s.png',
      },
      {
        pagePath: paths.LOGIN_INDEX,
        text: '登录页',
        iconPath: 'assets/icons/evaluate.png',
        selectedIconPath: 'assets/icons/evaluate_s.png',
      },
    ],
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  permission: {
    'scope.userLocation': {
      desc: '你的位置信息将用于小程序位置接口的效果展示',
    },
  },
  requiredPrivateInfos: ['chooseLocation'],
});
