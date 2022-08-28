/* eslint-disable no-param-reassign */
import Vue from "vue";
import "amfe-flexible";
import "@/styles/app.less";
import router from "@/router";
import store from "@/store";
// import initEruda from "@/utils/eruda";
import { setTitle } from "@/utils/util";
// import storage from "@/utils/storage";
// import { TOKEN } from "@/store/mutation-types";
import bridge from '@/utils/bridge';
import App from "./App.vue";
import '@/filters';

router.beforeEach((to, form, next) => {
  // const isRedirect = storage.getItem('isRedirect');
  // const token = storage.getItem(TOKEN);
  // if (token) {
  //   next();
  // } else if (to.meta.type !== 'login') {
  //   console.log('跳转到登录-----》');
  //   next({
  //     path: "/auth/login",
  //     query: {
  //       redirectUrl: to.path,
  //       ...to.query,
  //       // ...to.meta,
  //     },
  //     replace: true
  //   });
  // } else {
  //   next();
  // }
  next();
});

router.afterEach((to) => {
  // 设置页面标题
  // ios 浏览器打开，复制链接，每次都是第一次进入的页面，需要重新设置href
  // window.location.href = `${window.location.href.split('#')[0]}#${to.fullPath}`;
  // window.location.replace(`${window.location.href.split('#')[0]}#${to.fullPath}`);
  if (to.meta) {
    setTitle(to.meta.title);
  }
});
Vue.config.productionTip = false;
Vue.prototype.$bridge = bridge;

// if (
//   !(
//     window.location.origin === "http://quickreg.dajiaunion.com"
//     || window.location.origin === "https://quickreg.dajiaunion.com"
//   )
// ) {
//   initEruda();
// }

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
