// 用户代理
const { userAgent } = window.navigator;
// 系统语言
export const language = (navigator.browserLanguage || navigator.language).toLowerCase();
// 系统版本
export const versions = {
  trident: userAgent.indexOf('Trident') > -1,
  presto: userAgent.indexOf('Presto') > -1,
  webKit: userAgent.indexOf('AppleWebKit') > -1,
  gecko: userAgent.indexOf('Gecko') > -1 && userAgent.indexOf('KHTML') === -1,
  mobile: !!userAgent.match(/AppleWebKit.*Mobile.*/),
  ios: !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
  iosApp: userAgent.indexOf('YUANIosApp') > -1,
  android: userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1,
  androidApp: userAgent.indexOf('wkbAndroid') > -1,
  iPhone: userAgent.indexOf('iPhone') > -1,
  iPad: userAgent.indexOf('iPad') > -1,
  webApp: userAgent.indexOf('Safari') === -1,
  weixin: userAgent.indexOf('MicroMessenger') > -1,
  qq: userAgent.match(/\sQQ/i) === ' qq',
  iphoneX: !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) && window.screen.height === 812 && window.screen.width === 375,
};

/**
 * 将对象转换成url参数
 *
 * @export
 * @param paramObj {} obj
 */

export function formateObjToParamStr(paramObj) {
  const sdata = [];
  Object.keys(paramObj).forEach((key) => {
    sdata.push(`${key}=${paramObj[key]}`);
  });
  console.log('sdata', sdata);
  return sdata.join('&');
}

/**
 * 打开app
 *
 * @export
 * @param target dom元素
 * @param type 1首页 2今日比拼 3拼团详情页 4商品详情页 5商品评价页 6我的订单 7评价页 8支付成功页  9我的优惠券 10查看红包 11售后退款服务列表 12
 *     13售后具体页面  // 未提供5 7 8 9
 * @param param {} 参数
 */
