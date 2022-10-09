import http, { config } from '@/utils/http';

export const uploadPictureUrl = `${config.baseUrl}/file/upload/picture`;

export const getBanner = (data) => http.get({ url: '/player/banner', data });
export const getPlayerType = (data) => http.get({ url: '/player/playerType', data });
export const getProvinceCity = (data) => http.get({ url: '/player/getProvinceCity', data });
export const getAgeSelect = (data) => http.get({ url: '/player/ageSelect', data });
export const approvalPlayer = (data) => http.post({ url: '/player/approvalPlayer', data });
export const login = (data) => http.postFormData({ url: '/player/login', data });
