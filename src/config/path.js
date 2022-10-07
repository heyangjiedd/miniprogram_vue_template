const main = {
  HOME_INDEX: 'pages/index/index', // 首页
  DISCOVER_INDEX: 'pages/discover/index', // 发现
  ME_INDEX: 'pages/me/index', // 个人
  NOTIFY_LIST_INDEX: 'pages/notifyList/index', // 通知列表
  ORDER_LIST_INDEX: 'pages/orderList/index', // 订单列表
  ORDER_INDEX: 'pages/order/index', // 下单
};

const subPackage = {};

module.exports = {
  main,
  ...main,
  ...subPackage,
};
