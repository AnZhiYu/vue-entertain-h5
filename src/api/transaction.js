import request from '@/utils/request';
import apiUrl from './apiUrl';

// 卖单列表
export function querySellList(data) {
  return request.post(`${apiUrl.api}/v1/trade/sellList`, data);
}

// 买单列表
export function queryBuyList(data) {
  return request.post(`${apiUrl.api}/v1/trade/buyList`, data);
}

// 我的挂单列表
export function queryMyOrderList(data) {
  return request.post(`${apiUrl.api}/v1/trade/myPendingOrderList`, data);
}

// 我的订单列表
export function queryOrderPage(data) {
  return request.post(`${apiUrl.api}/v1/order/page`, data);
}

// 添加卖单列表
export function queryAddSellOrder(data) {
  return request.post(`${apiUrl.api}/v1/trade/addSellOrder`, data);
}

// 添加买单列表
export function queryAddBuyOrder(data) {
  return request.post(`${apiUrl.api}/v1/trade/addBuyOrder`, data);
}

// 发送消息
export function queryMessageSend(data) {
  return request.post(`${apiUrl.api}/v1/message/send`, data);
}

// 获取消息列表
export function queryMessageList(data) {
  return request.post(`${apiUrl.api}/v1/message/list`, data, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}

// 获取消息列表
export function queryOrderMessageList(data) {
  return request.post(`${apiUrl.api}/v1/order/message`, data, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}

// 获取当前价格
export function querySystemDict(data) {
  return request.post(`${apiUrl.api}/v1/system/dict`, data);
}

// 获取挂单详情
export function queryTradeDetail(data) {
  return request.post(`${apiUrl.api}/v1/trade/detail`, data);
}

// 获取订单详情
export function queryOrderDetail(data) {
  return request.post(`${apiUrl.api}/v1/order/detail`, data);
}

// 买家发起交易
export function queryBuyerStart(data) {
  return request.post(`${apiUrl.api}/v1/trade/buyerStart`, data);
}

// 卖家同意发起交易
export function querySellerAgree(data) {
  return request.post(`${apiUrl.api}/v1/trade/sellerAgree`, data, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}

// 卖家同意发起交易
export function querySellerRefuse(data) {
  return request.post(`${apiUrl.api}/v1/trade/sellerRefuse`, data, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}

// 卖家确认冻结金额
export function querySellerConfirm(data) {
  return request.post(`${apiUrl.api}/v1/trade/sellerConfirm`, data, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}

// 卖家确认收到钱
export function querySellerConfirmMoney(data) {
  return request.post(`${apiUrl.api}/v1/trade/sellerConfirmReceiveMoney`, data, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}

// 卖家没收到钱
export function querySellerConfirmUnReceiveMoney(data) {
  return request.post(`${apiUrl.api}/v1/trade/sellerConfirmUnReceiveMoney`, data, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}

// 投诉接口
export function querySellerAppeal(data) {
  return request.post(`${apiUrl.api}/v1/trade/appeal`, data, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}

// 卖家开始交易
export function querySellerStart(data) {
  return request.post(`${apiUrl.api}/v1/trade/sellerStart`, data, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}

// 买单，买家同意交易
export function queryBuyerAgree(data) {
  return request.post(`${apiUrl.api}/v1/trade/buyerAgree`, data, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}

// 买单，买家同意交易
export function queryCancelPendingOrder(data) {
  return request.post(`${apiUrl.api}/v1/trade/cancelPendingOrder`, data, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}

// 获取客服消息内容
export function queryCustomerMessageList(data) {
  return request.post(`${apiUrl.api}/v1/customer/chat/page`, data, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}

// 发送消息给客服
export function queryCustomerChatSend(data) {
  return request.post(`${apiUrl.api}/v1/customer/chat/send`, data, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}
