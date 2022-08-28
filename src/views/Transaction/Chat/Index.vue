<template>
  <div class="page chat">
    <common-title title="交易" isBack />
     <loading-page v-if="loading" type="loading" />
    <chat-views ref="gotoBottom" @getMsg="getMessageList"></chat-views>
    <send-bottom @onfocusbtn="handleClickGotobottom" @seedMsg="seedMessageInfo"></send-bottom>
  </div>
</template>

<script>
import CommonTitle from "@/components/common/CommonTitle.vue";
import {
  queryMessageSend, queryMessageList, queryOrderMessageList, queryBuyerStart, querySellerStart
} from "@/api/transaction";
import { Toast } from 'vant';
import LoadingPage from "@/components/common/LoadingPage.vue";
import SendBottom from "../components/SendBottom/Index.vue";
import ChatViews from "../components/ChatViews/Index.vue";

export default {
  name: "transaction",
  components: {
    ChatViews,
    CommonTitle,
    LoadingPage,
    SendBottom
  },
  data() {
    return {
      loading: true,
    };
  },

  methods: {
    initList() {
      const myInterval = setInterval(() => {
        this.getMessageList(true);
      }, 10000);
      this.$once("hook:beforeDestroy", () => {
        window.clearInterval(myInterval);
      });
    },
    seedMessageInfo(text) {
      const {
        target_uid, order_id, order_type, record
      } = this.$route.query;
      Toast.loading({
        message: "正在发送",
        // forbidClick: true,
        duration: 0
      });
      queryMessageSend({
        target_uid: record === '1' ? this.target_uid : target_uid,
        order_type: record === '1' ? this.order_type : order_type,
        order_id: record === '1' ? this.order_id : order_id,
        chat_text: text,
        type: 1
      }).then(() => {
        this.getMessageList();
      }).catch((err) => {
        Toast.clear();
        Toast.fail({
          message: err.message,
          forbidClick: true
        });
      });
    },
    handleClickGotobottom() {
      this.$refs.gotoBottom.showCurrent();
    },
    getMessageList(type) {
      const {
        target_uid, order_id, order_type, record
      } = this.$route.query;

      // 判断是不是从我的订单详情页过来 record===1 就是
      if (record === '1') {
        queryOrderMessageList({
          order_id: Number(order_id),
        }).then((res) => {
        // res.sort((a, b) => a.id - b.id);
          this.order_type = res.pending_order_type;
          this.order_id = res.pending_order_id;
          this.target_uid = res.target_uid;
          this.$store.commit("changeMessageList", res.messages);
          this.$store.commit("pending_order_id", res.pending_order_id);
          if (!type) {
            this.handleClickGotobottom();
          }
        }).finally(() => {
          this.loading = false;
          Toast.clear();
        });
      } else {
        queryMessageList({
          target_uid: Number(target_uid),
          order_id: Number(order_id),
          order_type: Number(order_type)
        }).then((res) => {
        // res.sort((a, b) => a.id - b.id);
          this.$store.commit("changeMessageList", res);
          if (!type) {
            this.handleClickGotobottom();
          }
        }).finally(() => {
          this.loading = false;
          Toast.clear();
        });
      }
    }
  },
  created() {
    this.$store.commit("changeMessageList", []);
    const {
      target_uid, order_id, order_type, record
    } = this.$route.query;
    // 判断是不是从我的订单详情页过来
    if (record !== '1') {
      if (order_type === '1') {
        queryBuyerStart({
          id: Number(order_id),
          target_uid: Number(target_uid)
        }).finally(() => {
          this.initList();
          this.getMessageList();
        });
      }
      if (order_type === '2') {
        console.log('买单交易----', order_type);
        querySellerStart({
          pending_order_id: Number(order_id),
          target_uid: Number(target_uid)
        }).finally(() => {
          this.initList();
          this.getMessageList();
        });
      }
    } else {
      this.initList();
      this.getMessageList();
    }
  },
};
</script>
<style lang="less" scoped>
.chat {
  font-size: 15px;
  padding-bottom: 59px;
}

/deep/ .van-field__control {
  border: 1px solid #ddd;
  height: 40px;
  padding: 10px;
}
</style>
