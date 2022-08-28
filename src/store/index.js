import Vue from "vue";
import Vuex from "vuex";
import { ImagePreview } from "vant";
// import {
//   SET_USERINFO, SET_CERTIFICATION_FORM, SET_MEMBER_SORT, SET_MEMBER_THEME, MAKER_EDIT_INFOR,
//   SET_MEMBER_INFOR,
// } from './mutation-types';
import { querySystemDict } from "@/api/transaction";
import VueClipboard from 'vue-clipboard2';

Vue.use(VueClipboard);
Vue.use(Vuex);
Vue.use(ImagePreview);

export default new Vuex.Store({
  state: {
    isMemberInfor: {},
    userInfo: {},
    name: "",
    tradetime: {},
    dictValue: {},
    messageList: [],
    customermessageList: [],
    pending_order_id: null,
  },
  mutations: {
    getUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    getDictValue(state, userInfo) {
      state.dictValue = userInfo;
    },
    getTradeTime(state, userInfo) {
      console.log("getTradeTime---->", userInfo);

      state.tradetime = userInfo;
    },
    changeMessageList(state, userInfo) {
      state.messageList = userInfo;
    },
    changeCustomerMessageList(state, userInfo) {
      state.customermessageList = userInfo;
    },
    pending_order_id(state, userInfo) {
      state.pending_order_id = userInfo;
    },
  },
  actions: {
    async getDictValue({ commit }) {
      const less = await querySystemDict();
      commit("getDictValue", less[less.length - 1] || {});
    },
    async getTradeTime({ commit }) {
      const data = await querySystemDict();
      const array = data.filter((item) => item.dict_key === "trade_time");
      commit("getTradeTime", array.length ? array[array.length - 1] : {});
    }
  }
});
