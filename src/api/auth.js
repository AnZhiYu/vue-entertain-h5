import request from '@/utils/request';
import apiUrl from './apiUrl';

// 登陆接口
export function queryUserLogin(data) {
  return request.post(`${apiUrl.api}/v1/user/login`, data);
}

// 获取用户id
export function queryRandomName() {
  return request.post(`${apiUrl.api}/v1/user/randomName`);
}

// 注册接口
export function queryUserRegister(data) {
  return request.post(`${apiUrl.api}/v1/user/register`, data);
}

// 获取用户基本信息
export function queryUserInfo() {
  return request.post(`${apiUrl.api}/v1/user/info`);
}
