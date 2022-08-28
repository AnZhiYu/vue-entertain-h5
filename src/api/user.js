import request from "@/utils/request";
import apiUrl from "./apiUrl";

// 获取推送列表
export function queryPushList(data) {
  return request.post(`${apiUrl.api}/v1/push/list`, data);
}

// 申请jdl交换
export function queryCoinExchange(data) {
  return request.post(`${apiUrl.api}/v1/coin/exchange`, data);
}

// 交易流水
export function queryAccountFlow(data) {
  return request.post(`${apiUrl.api}/v1/account/flow`, data);
}

// 币申请记录
export function queryCoinExchangeList(data) {
  return request.post(`${apiUrl.api}/v1/coin/exchange/list`, data);
}

// 我的绩效接口
export function queryUserAchievement(data) {
  return request.post(`${apiUrl.api}/v1/user/achievement`, data);
}

// 我的绩效接口
export function queryUserWallet(data) {
  return request.post(`${apiUrl.api}/v1/user/wallet`, data);
}

// 设置密保问题
export function setPasswordProtected(data) {
  return request.post(`${apiUrl.api}/v1/password/setPasswordProtected`, data);
}

// 找回密码密保填写
export function findPasswordByProtected(data) {
  return request.post(`${apiUrl.api}/v1/password/findPasswordByProtected`, data);
}

// 通过密保修改密码
export function updatePassword(data) {
  return request.post(`${apiUrl.api}/v1/password/updatePassword`, data);
}

// 设置已读
// export function queryPushSetRead(data) {
//   return request.post(`${apiUrl.api}/v1/push/setRead`, data, {
//     headers: {
//       'Content-Type': 'application/json; charset=utf-8',
//     },
//   });
// }
