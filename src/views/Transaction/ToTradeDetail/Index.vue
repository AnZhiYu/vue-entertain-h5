<template>
  <div class="page trade">
    <common-title :title="title" isBack />
    <loading-page v-if="pageLoading" type="loading" />
    <!-- <div class="trade-title">
      当前价：{{ dictValue.dict_value ? `1 YUAN = ${dictValue.dict_value}RMB` : "正在获取" }}
    </div> -->
    <div class="trade-box">
      <div class="trade-box_title" v-show="type !== '1'">
        {{ orderInfo.order_type === 1 ? "卖" : "买" }}家标的单
      </div>
      <div class="trade-box_item">
        <div class="trade-box_item-title">订单号</div>
        <div class="trade-box_item-value">{{ orderInfo.Id }}</div>
      </div>

      <div class="trade-box_item" v-if="type === '1'">
        <div class="trade-box_item-title">时间</div>
        <div class="trade-box_item-value">{{ orderInfo.order_time | momentTime(true) }}</div>
      </div>

      <div class="trade-box_item" v-else v-show="type === '2' && isShowTime">
        <div class="trade-box_item-title">时间</div>
        <div class="trade-box_item-value">{{ orderInfo.create_time | momentTime(true) }}</div>
      </div>

      <div v-if="type === '1'">
        <div class="trade-box_item">
          <div class="trade-box_item-title">买家</div>
          <div class="trade-box_item-value">{{ orderInfo.buyer_name }}</div>
        </div>

        <div class="trade-box_item">
          <div class="trade-box_item-title">卖家</div>
          <div class="trade-box_item-value">{{ orderInfo.seller_name }}</div>
        </div>
      </div>
      <div class="trade-box_item" v-else>
        <div class="trade-box_item-title">用户ID</div>
        <div class="trade-box_item-value">{{ orderInfo.name }}</div>
      </div>

      <div class="trade-box_item">
        <div class="trade-box_item-title">YUAN</div>
        <div class="trade-box_item-value">{{ orderInfo.amount }}</div>
      </div>

      <div class="trade-box_item">
        <div class="trade-box_item-title">折合</div>
        <div class="trade-box_item-value">
          {{ orderInfo.amount || "计算中" }}
        </div>
      </div>
      <div class="trade-box_item">
        <div class="trade-box_item-title ">交易状态</div>
        <div class="trade-box_item-value trade-status">
          {{ type === "1" ? getOrderStatus(orderInfo.status) : getStatus(orderInfo.status) }}
        </div>
      </div>
    </div>

    <div class="trade-btn">
      <div class="trade-btn_cancel" @click="handleCancel(orderInfo)">
        {{ type === "1" ? "取消" : "取消交易" }}
      </div>
      <div
        :class="`${orderInfo.status === 0 ? 'trade-btn_confirm' : 'trade-btn_diseable'}`"
        @click="showOverlay(orderInfo.status)"
        v-if="type === '0'"
      >
        立即撤单
      </div>
      <div v-else class="trade-btn_confirm" @click="openShow(orderInfo)">
        {{ type === "1" ? "交易" : "开始交易" }}
      </div>
    </div>
    <wkb-overlay v-model="show" @confirm="cancelPendingOrder" title="是否撤销订单？" />
  </div>
</template>

<script>
import CommonTitle from "@/components/common/CommonTitle.vue";
import { queryUserInfo } from "@/api/auth";
import { queryTradeDetail, queryOrderDetail, queryCancelPendingOrder } from "@/api/transaction";
import LoadingPage from "@/components/common/LoadingPage.vue";
import {
  Tab, Tabs, Toast, Field
} from "vant";
import { mapState } from "vuex";
import wkbOverlay from "@/components/common/wkbOverlay.vue";
import { isShowTime } from "@/config";

export default {
  name: "trade",
  components: {
    CommonTitle,
    LoadingPage,
    wkbOverlay,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Field.name]: Field,
    [Toast.name]: Toast
  },
  data() {
    return {
      title: "交易详情",
      balance: 0,
      active: 0,
      show: false,
      orderInfo: {},
      sell_amount: null,
      current_name: "",
      pageLoading: true,
      type: this.$route.query.type || "2",
      isShowTime
    };
  },
  computed: {
    ...mapState(["dictValue"])
  },
  methods: {
    cancelPendingOrder() {
      Toast.loading({
        message: "撤销中...",
        forbidClick: true,
        duration: 0
      });
      queryCancelPendingOrder({
        id: this.orderInfo.Id
      })
        .then(() => {
          this.show = false;
          Toast.clear();
          Toast.success("撤销成功");
          this.queryTradeDetail();
        })
        .catch((err) => {
          Toast.clear();
          Toast.fail({
            message: err.message,
            forbidClick: true
          });
        });
    },
    showOverlay(status) {
      if (status === 0) {
        this.show = true;
      }
      // this.$emit("cancelPendingOrder", id);
    },
    getStatus(text) {
      let role = "";
      switch (text) {
        case 0:
          role = "正常挂单";
          break;
        case 1:
          role = "交易结束";
          break;
        case 3:
          role = "已撤单";
          break;
        case 5:
          role = "正在交易";
          break;
        default:
          role = "状态异常";
          break;
      }
      return role;
    },
    getOrderStatus(text) {
      let role = "";
      switch (text) {
        case 0:
          role = "正在交易";
          break;
        case 1:
          role = "交易成功";
          break;
        case 3:
          role = "冻结";
          break;
        case 4:
          role = "交易失败";
          break;
        default:
          role = "状态异常";
          break;
      }
      return role;
    },

    handleCancel() {
      this.$router.go(-1);
    },
    openShow(item) {
      if (!item.Id) {
        Toast("订单状态异常, 不能发起交易");
        return;
      }
      console.log("item.name === this.current_name", item.name, this.current_name);
      if (item.name === this.current_name) {
        Toast("不能交易自己发起的单");
      } else {
        let target_uid = item.uid;
        let { order_type } = item;
        if (this.type === "1") {
          target_uid = this.current_name === item.seller_name ? item.buyer_uid : item.seller_uid;
          order_type = this.current_name === item.seller_name ? 1 : 2;
        }
        this.$router.push({
          path: "/transaction/chat",
          query: {
            target_uid,
            order_id: item.Id,
            order_type,
            record: this.type
          }
        });
      }
    },
    formatter(value) {
      if (value === "") {
        return value;
      }
      const val = Math.abs(value);
      if (val < 1) {
        return 1;
      }
      return val;
    },
    queryTradeDetail() {
      const { id, type } = this.$route.query;
      if (type === "1") {
        queryOrderDetail({
          order_id: id
        })
          .then((res) => {
            this.pageLoading = false;
            this.orderInfo = res;
          })
          .finally(() => {
            this.pageLoading = false;
          });
      } else {
        queryTradeDetail({
          id
        })
          .then((res) => {
            this.pageLoading = false;
            this.orderInfo = res;
          })
          .finally(() => {
            this.pageLoading = false;
          });
      }
    }
  },
  created() {
    this.$store.dispatch("getDictValue");
    queryUserInfo().then((res) => {
      this.balance = res.balance;
      this.current_name = res.user_name;
    });
    this.queryTradeDetail();
    if (this.$route.query.type === "0") {
      this.title = "挂单详情";
    } else if (this.$route.query.type === "1") {
      this.title = "订单详情";
    } else {
      this.title = "交易详情";
    }
  }

  // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less" scoped>
.trade {
  font-size: 15px;
  padding: 0 25px;

  &-status {
    color: #f42678 !important;
  }

  &-title {
    text-align: center;
    margin: 0 auto;
    width: 290px;
    height: 29px;
    // border: 1px solid #00f1f4;
    border: 2px solid;
    border-image: linear-gradient(35deg, #00f1f4 45%, #00f1f4 50%, #f42678 55%, #f42678 100%) 10;
    box-shadow: inset 0px 3px 2px 0px rgba(244, 38, 120, 0.1),
      0px 3px 2px 0px rgba(244, 38, 120, 0.1);
    border-radius: 1px;
    margin: 23px auto 7px;
    margin-bottom: 20px;
  }

  &-box {
    overflow: hidden;
    padding-bottom: 25px;
    background: #ffffff;
    box-shadow: 1px 5px 10px 0px rgba(215, 255, 255, 0.2);
    margin-top: 20px;

    &_title {
      width: 100%;
      height: 31px;
      line-height: 31px;
      text-align: center;
      color: #ffffff;
      background: #000000;
      box-shadow: 1px 5px 10px 0px rgba(215, 255, 255, 0.2);
    }
    &_item {
      display: flex;
      line-height: 31px;
      margin-top: 25px;
      &-title {
        width: 325px;
        height: 386px;
        color: #343434;
        text-align: center;
        box-shadow: 1px 5px 10px 0px rgba(215, 255, 255, 0.2);
        background-color: #8dfeff;
        width: 90px;
        height: 31px;
        margin: 0 25px 0 15px;
      }
      &-value {
        color: #343434;
      }
    }
  }

  &-btn {
    width: 330px;
    height: 40px;
    margin: 0 auto;
    line-height: 40px;
    margin-top: 25px;
    display: flex;
    justify-content: space-between;
    text-align: center;

    &_cancel {
      width: 130px;
      height: 34px;
      line-height: 34px;
      border: 1px solid #000000;
      box-shadow: inset 3px 2px 2px 0px rgba(0, 0, 0, 0.18), 3px 2px 2px 0px rgba(0, 0, 0, 0.18);
    }

    &_confirm {
      width: 130px;
      height: 34px;
      background: #000000;
      line-height: 34px;
      box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.18);
      color: #00f2f4;
    }

    &_diseable {
      width: 130px;
      height: 34px;
      background: #dfdfdf;
      line-height: 34px;
      box-shadow: 2px 1px 5px 0px rgba(0, 0, 0, 0.18);
      color: #ffffff;
    }
  }
}
</style>
