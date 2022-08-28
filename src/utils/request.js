/* eslint-disable dot-notation */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-promise-reject-errors */
import axios from "axios";
import { Toast } from "vant";
import { stringify } from "qs";
import { TOKEN } from "@/store/mutation-types";
import { api } from "@/config";
import storage from "@/utils/storage";
import router from "@/router";
// import { isMini } from "./util";
// import { versions } from "./browser";

const SUCCESS_CODE = 0;
const OVER_CODE = 4;
// const UNAUTH_CODE = 1000004;

// 应用标识
// const appId = "com.jdl";
// 访问来源 0：未知 1：App 3：小程序 5：H5
// let visitorSource = 5;
// if (versions.androidApp || versions.iosApp) {
//   visitorSource = 1;
// } else if (isMini()) {
//   visitorSource = 3;
// }
// 终端类型 0：未知 1：安卓 3：ios 5:pc

// let terminalType = 0;
// if (versions.android) {
//   terminalType = 1;
// } else if (versions.ios) {
//   terminalType = 3;
// } else if (versions.trident || versions.gecko || versions.presto || versions.webKit) {
//   terminalType = 5;
// } else {
//   terminalType = 0;
// }

// 请求实例
const request = axios.create({
  baseURL: api.baseUrl,
  timeout: api.timeout,
  withCredentials: true,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
  }
});

// 拦截请求
request.interceptors.request.use(
  (config) => {
    const contentType = "application/x-www-form-urlencoded; charset=utf-8";
    const methods = ["post", "put", "delete"];
    let token = storage.getItem(TOKEN);
    if (config.headers.bindMobile) {
      token = storage.getItem("bindToken");
    }
    if (token) {
      config.headers["token"] = token;
    }
    // config.headers["version"] = api.version;
    // config.headers["appId"] = appId;
    // config.headers["visitorSource"] = visitorSource;
    // config.headers["terminalType"] = terminalType;
    if (config.headers["Content-Type"] === contentType && methods.includes(config.method)) {
      config.data = stringify(config.data);
    }
    console.log("request", config);
    return config;
  },
  (error) => Promise.reject(error)
);

// 拦截响应
request.interceptors.response.use(
  (res) => {
    if (res.data) {
      if (res.data.respCode === SUCCESS_CODE) {
        return res.data.respData;
      }
      Toast(res.data.respMsg);
      if (res.data.respCode === OVER_CODE) {
        // const url = `${window.location.pathname}${window.location.search}`;
        const url = window.location.hash.split('#')[1];
        storage.removeItem(TOKEN);
        if (window.location.hash.indexOf('#/auth/login') === -1) {
          router.push({
            name: "login",
            query: {
              redirectUrl: url,
            }
          });
        }
      }
      return Promise.reject({
        message: res.data.respMsg,
        data: res.data.respData,
        ...(res.data || {})
      });
    }
    return Promise.reject(new Error(res.data.respMsg || "请求失败"));
  },
  (error) => Promise.reject(error)
);

export default request;
