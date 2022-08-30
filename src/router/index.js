import Vue from "vue";
import Router from "vue-router";
import routes from "./routes";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition && to.meta.keepAlive) {
      return savedPosition;
    }

    if (to.meta.title === '聊天') {
      // 聊天滚动到底部
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('正在倒计时4');
          resolve({ x: 0, y: 10000 });
        }, 300);
      });
    }
    return null;
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     console.log('滚动');
    //     resolve({ x: 0, y: 0 });
    //   }, 300);
    // });
  },

});
