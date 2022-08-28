import request from '@/utils/request';
import apiUrl from './apiUrl';

// 获取首页信息
export function queryHome(data) {
  return request.post(`${apiUrl.api}/v1/index`, data);
}

// 获取预购买状态
export function queryX3PreBuy(data) {
  return request.post(`${apiUrl.api}/v1/x3/preBuy`, data);
}

// 获取x3购买状态
export function queryX3status(data) {
  return request.post(`${apiUrl.api}/v1/x3/status`, data);
}

// 购买矩阵等级接口
export function queryBuyLevel(data) {
  return request.post(`${apiUrl.api}/v1/x3/buyLevel`, data);
}

// 获取用户扩展信息
export function queryUserExtra(data) {
  return request.post(`${apiUrl.api}/v1/user/extra`, data);
}
