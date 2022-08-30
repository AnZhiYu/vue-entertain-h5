import RouteView from '@/layouts/RouteView.vue';

export default {
  path: '/',
  name: 'home',
  meta: {
    title: '共饮杯中酒, 同说此年丰!',
  },
  component: RouteView,

  children: [
    {
      path: '/',
      name: 'Entertain',
      meta: {
        title: '',
        type: 'Entertain'
      },
      component: () => import(/* webpackChunkName: "entertain" */ '@/views/Entertain/Index.vue'),
    },
  ],
};
