import requestMeneger from '@/utils/requestMeneger';
import request from '@/utils/request';
import apiUrl from './apiUrl';

// 获取反馈类型
export function getGoldExchange() {
  return requestMeneger.get(`${apiUrl.api}/v1/get_gold_exchange`);
}

// 获取验证码
export function querySubmitActivities(data) {
  return request.post(`${apiUrl.api}/v1/submit_activities`, data);
}
