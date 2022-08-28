import request from '@/utils/request';
import apiUrl from './apiUrl';

// 获取反馈类型
export function getFeedbackTypeList() {
  return request.get(`${apiUrl.api}/v1/set_user_info`);
}

// 获取验证码
export function getRegisterSms(data) {
  return request.post(`${apiUrl.api}/v1/register_sms`, data);
}

// 注册
export function register(data) {
  return request.post(`${apiUrl.api}/v1/register`, data, {
  });
}

// 注册
export function setUserInfo(data) {
  return request.post(`${apiUrl.api}/v1/set_user_info`, data, {
  });
}
