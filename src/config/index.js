// 图片基础URL
export const imgBaseUrl = 'https://cos.dajiaunion.com';

// 公众号appId
// const domainName = window.location.href.split('#')[0];
// const isProd = domainName.indexOf('h5.huopin360.com') !== -1
// || domainName.indexOf('h5.bluewhale365.com') !== -1
// || domainName.indexOf('h5.YUAN99.com') !== -1;
// export const appId = isProd ? 'wx53688b31a13b6345' : 'wxc74afa1ba76d8928';

// export const wxAgreeDomainName = isProd ? 'https://h5.YUAN99.com/' : 'https://h5-test.bluewhale365.com/';
const baseUrl = window.location.protocol === 'https:'
  ? 'https://front.wkbwkb.com/'
  : 'http://front.wkbwkb.com/';

const managerUrl = 'https://manager.dajiaunion.com';

export const isShowTime = false;

// api相关配置
console.log('process.env.NODE_ENV', process.env.NODE_ENV);
export const api = {
  // baseUrl: process.env.VUE_APP_API_URL,
  baseUrl: process.env.NODE_ENV === 'development' ? '/dev' : baseUrl,
  managerUrl: process.env.NODE_ENV === 'development' ? '/dev-m' : managerUrl,
  imgUrl: '/img',
  timeout: 20000,
  version: '1.0.0',
  modules: [
    'img',
    'api',
  ],
};

// storage配置
export const storage = {
  namespace: 'DJ__',
};
