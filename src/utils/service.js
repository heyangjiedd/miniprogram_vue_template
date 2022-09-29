import http, { config } from '@/utils/http';
const { get, post, postFormData, postQuery } = http;

export const uploadPictureUrl = `${config.baseUrl}/file/upload/picture`;
