import http, { config } from '@/utils/http';

export const uploadPictureUrl = `${config.baseUrl}/file/upload/picture`;

export const getBanner = (data) => http.get({ url: '/player/banner', data });
export const getPlayerType = (data) => http.get({ url: '/player/playerType', data });
export const getProvinceCity = (data) => http.get({ url: '/player/getProvinceCity', data });
export const getAgeSelect = (data) => http.get({ url: '/player/ageSelect', data });
export const approvalPlayer = (data) => http.post({ url: '/player/approvalPlayer', data });
export const login = (data) => http.postFormData({ url: '/player/login', data });
export const getPlayerList = (data) => http.get({ url: '/player/playerList', data });
export const getPlayerDetail = (data) => http.get({ url: '/player/playerDetail', data });
export const createOrder = (data) => http.post({ url: '/player/createOrder', data });
export const cancelOrder = (data) => http.postFormData({ url: '/player/cancelOrder', data });
export const createPay = (data) => http.postFormData({ url: '/player/pay', data });
export const getOrderList = (data) => http.get({ url: '/player/orderList', data });
