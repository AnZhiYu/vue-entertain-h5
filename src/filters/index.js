import Vue from 'vue';
import {
  formatTime,
  formatNumber,
  formatImgUrl,
  getStatusValueByKey,
  getStatusTypeByKey,
  formatPhone,
  formatMoneyInt,
  formatMoneyDec,
  timerPrefixZero,
  replaceString,
  formatTenThousand,
  momentTime
} from '@/utils/util';

Vue.filter('formatTime', formatTime);
Vue.filter('formatNumber', formatNumber);
Vue.filter('formatImgUrl', formatImgUrl);
Vue.filter('getStatusValueByKey', getStatusValueByKey);
Vue.filter('getStatusTypeByKey', getStatusTypeByKey);
Vue.filter('formatPhone', formatPhone);
Vue.filter('formatMoneyInt', formatMoneyInt);
Vue.filter('formatMoneyDec', formatMoneyDec);
Vue.filter('timerPrefixZero', timerPrefixZero);
Vue.filter('replaceString', replaceString);
Vue.filter('formatTenThousand', formatTenThousand);
Vue.filter('momentTime', momentTime);
