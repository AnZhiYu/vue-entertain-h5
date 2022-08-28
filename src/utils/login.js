// import { TOKEN } from '@/store/mutation-types';
// import { appId, wxAgreeDomainName } from '@/config';
// import { getUrlParamValue, getHashParamValue } from '@/utils/util';
// import storage from '@/utils/storage';
// import { loginByWechat } from '@/api/auth';

// // 登录
// export function login() {
//   const token = getHashParamValue('token') || getUrlParamValue('token');
//   if (token) {
//     storage.setItem(TOKEN, token);
//   }
// }

// // 异步登录
// /**
//  * @param needMobile 校验是否需要绑定手机号
//  */

// export function loginAsync(needMobile) {
//   return new Promise((resolve, reject) => {
//     // const token = storage.getItem(TOKEN);
//     const code = getUrlParamValue('code');
//     const state = getUrlParamValue('state') || 'bw_mall_state';
//     // if (token) {
//     //   resolve();
//     // } else
//     // 不管有没有token 都刷一遍 保证用户信息
//     if (code && state) {
//       const params = { code, state };
//       if (storage.getItem('utm_cid')) {
//         params.utmCid = storage.getItem('utm_cid');
//       }
//       const { origin, hash } = window.location;
//       window.history.pushState('', '', `${origin}/${hash}`);
//       loginByWechat(params)
//         .then((res) => {
//           if (needMobile) {
//             resolve(res);
//           } else {
//             storage.setItem(TOKEN, res.jwt);
//             // eslint-disable-next-line no-undef
//             sensors.login(res.user.userId, () => {
//               console.log('用户登录关联');
//             });
//             resolve();
//           }
//         })
//         .catch((err) => {
//           reject(err);
//         });
//     } else {
//       const { hash = '' } = window.location;
//       storage.setItem('isRedirect', 'isRedirect');
//       window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${encodeURIComponent(wxAgreeDomainName + hash)}&response_type=code&scope=snsapi_userinfo&state=bw_mall_state#wechat_redirect`;
//     }
//   });
// }

// export function getCodeAsync() {
//   const { hash = '' } = window.location;
//   window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${encodeURIComponent(wxAgreeDomainName + hash)}&response_type=code&scope=snsapi_base&state=bw_mall_state#wechat_redirect`;
// }
