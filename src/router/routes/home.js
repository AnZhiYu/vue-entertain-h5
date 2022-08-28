import RouteView from '@/layouts/RouteView.vue';

export default {
  path: '/',
  name: 'home',
  meta: {
    title: '首页',
  },
  component: RouteView,

  children: [
    {
      path: '/home',
      name: 'Entertain',
      meta: {
        title: '邀请',
        type: 'Entertain'
      },
      component: () => import(/* webpackChunkName: "entertain" */ '@/views/Entertain/Index.vue'),
    },
    {
      path: '/home1',
      name: 'entertain2',
      meta: {
        title: '邀请2',
        type: 'entertain2'
      },
      component: () => import(/* webpackChunkName: "entertain" */ '@/views/Entertain2/Index.vue'),
    },
  ],
};
