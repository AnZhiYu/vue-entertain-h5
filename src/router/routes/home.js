export default {
  path: '/',
  name: 'home',
  meta: {
    title: '首页',
  },
  component: () => import(/* webpackChunkName: "entertain" */ '@/views/Entertain/Index.vue'),
};
