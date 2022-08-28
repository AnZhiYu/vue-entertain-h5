<template>
  <div class="views">
    <div class="views-item" v-for="(item, index) in messageList" :key="item.id">
      <p class="views-item_time" v-show="index === 0">{{ item.time | momentTime(true) }}</p>
      <div
        :class="`views-item_info ${item.current_name === current_name ? 'views-item_own' : ''}`"
        @click="showInfo"
      >
        <div class="views-item_info-avt" v-show="item.message_type !== 5">
          <span class="avt-icon"></span>
          <div class="avt-name">{{ item.current_name }}</div>
        </div>
        <div class="views-item_info-text" v-if="item.message_type === 4">
          <chat-view-countdown
            @handleYes="querySellerConfirmMoney"
            @handleNo="handleSellerConfirmUnReceiveMoney"
            @handleAppeal="querySellerAppeal"
            @frozenAccount="frozenAccount"
            :messageId="item.id"
            :itemData="item"
            :tradetime="tradetime.dict_value"
          ></chat-view-countdown>
        </div>
        <div class="views-item_info-text" v-else-if="item.message_type === 2">
          <chat-view-transaction
            @handleYes="handleSellerAgree"
            @handleNo="handleSellerRefuse"
            :messageId="item.id"
            :itemData="item"
          ></chat-view-transaction>
        </div>
        <div class="views-item_info-text" v-else-if="item.message_type === 6">
          <chat-view-frozen
            @handleYes="frozenAccount"
            :messageId="item.id"
            :itemData="item"
          ></chat-view-frozen>
        </div>
        <div class="views-item_info-text" v-else-if="item.message_type === 7">
          <chat-view-countdown-seller
            :messageId="item.id"
            :itemData="item"
            @handleAppeal="querySellerAppeal"
            :tradetime="tradetime.dict_value"
          ></chat-view-countdown-seller>
        </div>
        <div class="views-item_info-text" v-else-if="item.message_type !== 5">
          {{ item.chat_text }}
        </div>
      </div>
      <p class="views-item_tips" v-if="item.extra && item.extra.tip">
        <span class="views-item_tips-icon"
          ><van-icon class="warning-icon" name="warning" color="#FC3E3E" size="14"/></span
        >{{ item.extra.tip }}
      </p>
    </div>

    <!-- <div class="views-item">
      <p class="views-item_time">9月16日 上午12:00</p>
      <div class="views-item_info views-item_own">
        <div class="views-item_info-avt">999999</div>
        <div class="views-item_info-text">

        </div>
      </div>
      <p class="views-item_tips">
        <span class="views-item_tips-icon"
          ><van-icon class="warning-icon" name="warning" color="#FC3E3E" size="14"/></span
        >请再1小时内完成交易
      </p>
    </div> -->
    <div ref="solutionDetails" id="solutionDetails"></div>
  </div>
</template>

<script>
import { Icon, Toast } from "vant";
import {
  querySellerAgree,
  querySellerRefuse,
  querySellerConfirmMoney,
  querySellerConfirmUnReceiveMoney,
  querySellerAppeal,
  queryBuyerAgree,
  querySellerConfirm
} from "@/api/transaction";
import storage from "@/utils/storage";
import { mapState } from "vuex";
import ChatViewCountdown from "../ChatViewCountdown/Index.vue";
import ChatViewTransaction from "../ChatViewTransaction/Index.vue";
import ChatViewFrozen from "../ChatViewFrozen/Index.vue";
import ChatViewCountdownSeller from "../ChatViewCountdownSeller/Index.vue";

export default {
  name: "chatViews",
  components: {
    [Icon.name]: Icon,
    ChatViewCountdown,
    ChatViewTransaction,
    ChatViewFrozen,
    ChatViewCountdownSeller
  },
  data() {
    return {
      current_name: storage.getItem("user_name")
    };
  },
  computed: {
    ...mapState(["tradetime"]),
    messageList() {
      return this.$store.state.messageList || [];
    },
    pending_order_id() {
      return this.$store.state.pending_order_id || 0;
    }
  },
  created() {
    this.getTradeTime();
  },
  methods: {
    getTradeTime() {
      this.$store.dispatch("getTradeTime");
    },
    showCurrent() {
      // const dom = document.getElementById("solutionDetails");
      this.$refs.solutionDetails.scrollIntoView();
    },
    showInfo() {},
    handleSellerAgree(message_id) {
      Toast.loading({
        message: "正在提交",
        forbidClick: true,
        duration: 0
      });
      const {
        target_uid, order_id, order_type, record
      } = this.$route.query;
      // 卖方点击同意
      if (order_type === "1") {
        querySellerAgree({
          id: record === "1" ? Number(this.pending_order_id) : Number(order_id),
          target_uid: Number(target_uid),
          message_id: Number(message_id)
        })
          .then((res) => {
            console.log("o-id", res);
            this.$emit("getMsg");
            Toast.clear();
            Toast("操作成功");
            // this.frozenAccount(message_id);
          })
          .catch((err) => {
            Toast.clear();
            Toast.fail({
              message: err.message,
              forbidClick: true
            });
          });
      }
      if (order_type === "2") {
        queryBuyerAgree({
          id: record === "1" ? Number(this.pending_order_id) : Number(order_id),
          target_uid: Number(target_uid),
          message_id: Number(message_id)
        })
          .then((res) => {
            console.log("o-id", res);
            this.$emit("getMsg");
            Toast.clear();
            Toast("操作成功");
          })
          .catch((err) => {
            Toast.clear();
            Toast.fail({
              message: err.message,
              forbidClick: true
            });
          });
      }
    },
    handleSellerRefuse(message_id) {
      Toast.loading({
        message: "正在提交",
        forbidClick: true,
        duration: 0
      });
      console.log("message_id12", message_id);
      const { target_uid, order_id, record } = this.$route.query;
      querySellerRefuse({
        id: record === "1" ? Number(this.pending_order_id) : Number(order_id),
        target_uid: Number(target_uid),
        message_id: Number(message_id)
      })
        .then((res) => {
          this.$emit("getMsg");
          Toast.clear();
          Toast("操作成功");
          console.log("res--->", res);
        })
        .catch((err) => {
          Toast.clear();
          Toast.fail({
            message: err.message,
            forbidClick: true
          });
        });
    },

    handleSellerConfirmUnReceiveMoney(item) {
      Toast.loading({
        message: "正在提交",
        forbidClick: true,
        duration: 0
      });
      const { target_uid, order_id, record } = this.$route.query;
      querySellerConfirmUnReceiveMoney({
        id: record === "1" ? Number(this.pending_order_id) : Number(order_id),
        target_uid: Number(target_uid),
        message_id: Number(item.id),
        order_id: item.extra ? Number(item.extra.o_id) : null
      })
        .then((res) => {
          this.$emit("getMsg");
          Toast.clear();
          Toast("操作成功");
          console.log("res--->", res);
        })
        .catch((err) => {
          Toast.clear();
          Toast.fail({
            message: err.message,
            forbidClick: true
          });
        });
    },

    frozenAccount(message_id) {
      const { target_uid, order_id, record } = this.$route.query;
      Toast.loading({
        message: "正在提交",
        forbidClick: true,
        duration: 0
      });
      querySellerConfirm({
        id: record === "1" ? Number(this.pending_order_id) : Number(order_id),
        target_uid: Number(target_uid),
        message_id: Number(message_id)
      })
        .then((res) => {
          console.log("卖家确认冻结金额----", res);
          Toast("操作成功");
          Toast.clear();
        })
        .catch((err) => {
          Toast.clear();
          Toast.fail({
            message: err.message,
            forbidClick: true
          });
        });
    },

    querySellerConfirmMoney(item) {
      Toast.loading({
        message: "正在提交",
        forbidClick: true,
        duration: 0
      });
      const { target_uid, order_id, record } = this.$route.query;
      querySellerConfirmMoney({
        id: record === "1" ? Number(this.pending_order_id) : Number(order_id),
        target_uid: Number(target_uid),
        message_id: Number(item.id),
        order_id: item.extra ? Number(item.extra.o_id) : null
      })
        .then(() => {
          this.$emit("getMsg");
          Toast.clear();
          Toast("操作成功");
        })
        .catch((err) => {
          Toast.clear();
          Toast.fail({
            message: err.message,
            forbidClick: true
          });
        });
    },
    querySellerAppeal(item) {
      Toast.loading({
        message: "正在提交",
        forbidClick: true,
        duration: 0
      });
      const { target_uid, order_id, record } = this.$route.query;
      querySellerAppeal({
        id: record === "1" ? Number(this.pending_order_id) : Number(order_id),
        order_id: item.extra ? Number(item.extra.o_id) : null,
        target_uid: Number(target_uid),
        message_id: Number(item.id)
      })
        .then((res) => {
          this.$emit("getMsg");
          Toast.clear();
          Toast("投诉成功");
          console.log("res--->", res);
        })
        .catch((err) => {
          Toast.clear();
          Toast.fail({
            message: err.message,
            forbidClick: true
          });
        });
    }
  },
  mounted() {
    this.showCurrent();
  }
  // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less" scoped>
.views {
  &-item {
    text-align: center;

    &_time {
      text-align: center;
      font-size: 12px;
      font-family: PingFang SC;
      color: #dfdfdf;
    }
    &_info {
      display: flex;
      margin: 15px 0;

      &-avt {
        text-align: center;
        width: 60px;
        height: 60px;
        line-height: 20px;
        border-radius: 50%;
        background-color: #fff;
        margin: 0 15px;
        font-size: 15px;
        padding-top: 10px;
        .avt-icon {
          width: 20px;
          height: 20px;
          line-height: 25px;
          color: #fff;
          text-align: center;
          display: inline-block;
          font-size: 15px;
          background: url("../../../../assets/id-icon.png") no-repeat center/ cover;
        }
        .avt-name {
          font-size: 11px;
          font-family: PingFang SC;
          font-weight: 400;
          line-height: 10px;
          color: #333333;
        }
      }
      &-text {
        padding: 15px 12px;
        max-width: 250px;
        background: #ffffff;
        box-shadow: 0px 0px 10px 0px rgba(226, 237, 255, 0.3);
        border-radius: 5px;
        font-size: 15px;
        font-family: PingFang SC;
        min-height: 40px;
        color: #333333;
        display: table;
        text-align: left;
      }
    }

    &_own {
      flex-direction: row-reverse;
      .views-item_info-avt {
        background: #f0f0f0;
        box-shadow: 0px 0px 10px 0px rgba(226, 237, 255, 0.3);
        border-radius: 50%;
      }
    }
    &_tips {
      padding: 5px 10px;
      max-width: 330px;
      text-align: center;
      display: inline-block;
      color: #aaa;
      font-size: 12px;
      line-height: 15px;
      margin: 0 auto;
      margin-bottom: 10px;
      background: #f5f5f5;
      border-radius: 12px;
      &-icon {
        position: relative;
        width: 13px;
        height: 13px;
        display: inline-block;
        margin: 0 3px;
        vertical-align: top;
        .warning-icon {
          position: absolute;
          top: 0px;
          left: 0px;
        }
      }

      &-text {
        display: inline-block;
        width: 280px;
        text-align: left;
        word-break: break-all;
      }
    }
  }
}
</style>
