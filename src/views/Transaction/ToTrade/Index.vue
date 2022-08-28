<template>
  <div class="page trade">
    <common-title title="我要交易" isBack />
    <!-- <div class="trade-title">
      当前价：{{ dictValue.dict_value ? `1 YUAN = ${dictValue.dict_value}RMB` : "正在获取" }}
    </div> -->
    <div class="trade-tab">
      <van-tabs v-model="active">
        <van-tab title="卖出">
          <div class="trade-tab_into">
            <div class="trade-tab_into-type">
              YUAN余额：<span class="trade-tab_into-type-count">{{ balance | formatNumber }}</span>
            </div>
            <div class="trade-tab_into-type">
              卖出YUAN：
              <van-field
                class="trade-tab_into-input"
                v-model="sell_amount"
                :formatter="formatter"
                format-trigger="onBlur"
                type="number"
                placeholder="最低卖出1.0"
              />
            </div>
          </div>
        </van-tab>
        <van-tab title="买入">
          <div class="trade-tab_into">
            <div class="trade-tab_into-type">
              买入YUAN：
              <van-field
                class="trade-tab_into-input"
                v-model="amount"
                type="number"
                :formatter="formatter"
                format-trigger="onBlur"
                placeholder="最低买入1.0"
              />
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div class="trade-btn" @click="openShow">确定</div>
    <wkb-overlay v-model="show" @confirm="addSellOrder" title="提示">
      <p class="buy_info-text">
        你要卖出YUAN: <span class="buy_info-text-count">{{ sell_amount | formatNumber }}</span>
      </p>
      <p class="buy_info-text">
        YUAN余额： <span class="buy_info-text-count">{{ balance | formatNumber }}</span>
      </p>
    </wkb-overlay>
    <wkb-overlay v-model="show1" @confirm="addBuyOrder" title="提示">
      <p class="buy_info-text">
        你要买入YUAN: <span class="buy_info-text-count">{{ amount | formatNumber }}</span>
      </p>
      <p class="buy_info-text">
        YUAN余额： <span class="buy_info-text-count">{{ balance | formatNumber }}</span>
      </p>
    </wkb-overlay>
    <wkb-overlay
      v-model="showFrozen"
      isOneBtn
      @confirm="
        () => {
          showFrozen = false;
        }
      "
      title="温馨提示"
      confirmText="我知道了"
    >
      <p style="white-space: nowrap;">
        你的状态是<span :style="{ color: '#F42678' }">冻结状态</span>，不能执行操作
      </p>
      <p style="margin-top: 5px;">请联系客服</p>
    </wkb-overlay>
  </div>
</template>

<script>
import CommonTitle from "@/components/common/CommonTitle.vue";
import wkbOverlay from "@/components/common/wkbOverlay.vue";
import { queryUserInfo } from "@/api/auth";
import { queryAddSellOrder, queryAddBuyOrder } from "@/api/transaction";
import {
  Tab, Tabs, Toast, Field
} from "vant";
import { mapState } from "vuex";

export default {
  name: "trade",
  components: {
    CommonTitle,
    wkbOverlay,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Field.name]: Field,
    [Toast.name]: Toast
  },
  data() {
    return {
      balance: 0,
      active: 0,
      show: false,
      show1: false,
      sell_amount: null,
      amount: null,
      is_active: true,
      showFrozen: false
    };
  },

  methods: {
    openShow() {
      if (this.is_active) {
        if (this.active === 1) {
          if (!this.amount) {
            Toast("卖出YUAN不能为空");
            return;
          }
          this.show1 = true;
        } else {
          if (!this.sell_amount) {
            Toast("买入YUAN不能为空");
            return;
          }
          this.show = true;
        }
      } else {
        this.showFrozen = true;
      }
    },
    addSellOrder() {
      Toast.loading({
        message: "正在提交",
        forbidClick: true,
        duration: 0
      });
      queryAddSellOrder({
        amount: this.sell_amount || 0,
        price: "20.432",
        remark: "test"
      })
        .then((res) => {
          console.log("queryAddSellOrder----", res);
          Toast.clear();
          Toast.success("新建成功");
          this.show = false;
          this.$router.push({
            path: "/transaction",
            query: {
              active: 3
            }
          });
        })
        .catch((err) => {
          Toast.clear();
          Toast.fail({
            message: err.message,
            forbidClick: true
          });
        });
    },
    addBuyOrder() {
      Toast.loading({
        message: "正在提交",
        forbidClick: true,
        duration: 0
      });
      queryAddBuyOrder({
        amount: this.amount || 0,
        price: "20.432",
        remark: "test"
      })
        .then((res) => {
          console.log("queryAddSellOrder----", res);
          Toast.clear();
          Toast.success("新建成功");
          this.show1 = false;
          this.$router.push({
            path: "/transaction",
            query: {
              active: 3
            }
          });
        })
        .catch((err) => {
          Toast.clear();
          Toast.fail({
            message: err.message,
            forbidClick: true
          });
        });
    },
    formatter(value) {
      if (value === "") {
        return value;
      }
      const val = Math.abs(value);
      if (val < 1) {
        return 1;
      }
      return Math.floor(val);
    }
  },
  created() {
    this.$store.dispatch("getDictValue");
    queryUserInfo().then((res) => {
      this.balance = res.balance;
      this.is_active = res.is_active;
    });
  },
  computed: {
    ...mapState(["dictValue"])
  }
};
</script>
<style lang="less" scoped>
.trade {
  font-size: 15px;
  padding: 0 15px;

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

  &-tab {
    padding: 10px 15px 0;
    /deep/ .van-tabs__wrap {
      box-shadow: 0px 5px 10px 0px rgba(215, 241, 255, 0.2);
      height: 40px;
    }
    /deep/ .van-tabs__line {
      width: 10% !important;
      background-color: #00f1f4;
    }

    /deep/.van-hairline--top-bottom:after,
    .van-hairline-unset--top-bottom:after {
      border-width: 0px;
    }

    &_into {
      margin: 30px 0;
      padding: 10px 0;
      background: #ffffff;
      box-shadow: 1px 5px 10px 0px rgba(215, 242, 255, 0.2);
      &-input {
        display: inline-block;
        vertical-align: middle;
        width: 150px;
        height: 29px;
        line-height: 29px;
        border: 1px solid #707070;
        box-shadow: 0px 0px 3px 0px rgba(41, 41, 41, 0.19);
        border-radius: 1px;
        padding: 0 10px;
        margin-right: 10px;
      }

      &-type {
        margin: 20px;

        &-count {
          color: #f42778;
        }
      }
    }
  }

  &-btn {
    width: 330px;
    height: 40px;
    margin: 0 auto;
    background: #242424;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.21);
    text-align: center;
    color: #00f2f4;
    line-height: 40px;
  }

  .buy_info {
    text-align: center;
    &-title {
      font-size: 17px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #333333;
      margin: 26px 0 20px;
    }
    &-text {
      font-size: 15px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #333333;

      &-count {
        color: #f42678;
      }
    }
  }
}
</style>
