<template>
  <div class="countdown">
    <p class="countdown-text">
      <span class="countdown-btns_app" v-if="isReceive">交易倒计时</span
      >
      <span v-else>交易倒计时：</span>
      <van-count-down ref="countDown" @finish="finishTime" :time="countDown(itemData.time)" />
    </p>
    <div v-if="!isReceive" :class="`countdown-btns ${disabledComplaintBtn ? 'disabled' : ''}`">
      <span class="countdown-btns_app" @click="handleClickAppeal">我要投诉</span>
    </div>
  </div>
</template>

<script>
import { CountDown } from "vant";
import moment from "moment";

export default {
  name: "ChatViewCountdownSeller",
  components: {
    [CountDown.name]: CountDown
  },
  data() {
    return {
      btnDisabled: false,
      time: 10000,
      isReceive: true,
      m1: null
    };
  },
  props: {
    messageId: {
      default: ""
    },
    tradetime: {
      default: 0
    },
    itemData: {
      type: Object,
      default: () => ({
        extra: {}
      })
    }
  },
  computed: {
    disabledBtn() {
      if (this.itemData.extra) {
        if ("receive_money" in this.itemData.extra) {
          return "receive_money" in this.itemData.extra;
        }
      }
      return false;
    },
    enderTime() {
      const array = this.$store.state.messageList || [];
      return !!array.find((item) => {
        if (item.extra) {
          if ("ender_oder" in item.extra) {
            this.m1 = item.time * 1000;
            if (this.$refs.countDown) {
              this.pauseTime();
            }
            return true;
          }
        }
        return false;
      });
    },
    disabledComplaintBtn() {
      if (this.itemData.extra) {
        return "complaint_button_yes" in this.itemData.extra;
      }
      return false;
    },
    countDown() {
      return function time(m2) {
        const tradeTime = this.tradetime ? this.tradetime * 60 * 1000 : 0;
        // const tradeTime = this.tradetime ? 1 * 60 * 1000 : 0;
        const m1 = moment().valueOf();
        let du = 0;
        if (this.enderTime) {
          du = m2 * 1000 + tradeTime - this.m1;
          console.log("暂停1", du);
          // this.pauseTime();
        } else {
          du = m2 * 1000 + tradeTime - m1;
        }
        if (du < 1) {
          return 0;
        }
        console.log("倒计时", du);
        return du;
      };
    }
  },
  mounted() {
    if (this.enderTime) {
      this.pauseTime();
    }
  },
  methods: {
    pauseTime() {
      console.log("时间停止2");
      this.$refs.countDown.pause();
    },
    handleClickYes() {
      if (!this.disabledBtn) {
        this.$emit("handleYes", this.itemData);
      }
    },
    handleClickNo() {
      if (!this.disabledBtn) {
        this.$emit("handleNo", this.itemData);
        // this.$emit("frozenAccount", this.messageId);
      }
    },
    handleClickAppeal() {
      if (!this.disabledComplaintBtn) {
        this.$emit("handleAppeal", this.itemData);
      }
    },
    finishTime() {
      this.isReceive = false;
    }
  },

};
</script>
<style lang="less" scoped>
.countdown {
  // margin: 5px 13px;

  &-text {
    text-align: center;

    /deep/ .van-count-down {
      display: inline-block;
      font-size: 15px;
      color: #333333;
    }
  }
  &-btns {
    margin-top: 15px;
    text-align: center;
    display: flex;
    justify-content: center;
    flex-wrap: nowrap;
    &_y {
      display: inline-block;
      width: 84px;
      height: 22px;
      background: #333333;
      box-shadow: 1px 1px 5px 0px rgba(51, 51, 51, 0.2);
      border-radius: 11px;
      color: #00f1f4;
      text-align: center;
      font-size: 12px;
      line-height: 22px;
    }
    &_app {
      display: inline-block;
      width: 84px;
      height: 22px;
      background: #333333;
      box-shadow: 1px 1px 5px 0px rgba(51, 51, 51, 0.2);
      border-radius: 11px;
      color: #00f1f4;
      text-align: center;
      font-size: 12px;
      line-height: 22px;
      margin-right: 5px;
    }
    &_n {
      display: inline-block;
      width: 84px;
      height: 22px;
      line-height: 22px;
      border: 1px solid #333333;
      box-shadow: 1px 1px 2px 0px rgba(51, 51, 51, 0.5);
      border-radius: 11px;
      text-align: center;
      font-size: 12px;
      margin-left: 10px;
    }
  }

  .disabled {
    .countdown-btns_y {
      background: #dfdfdf;
      border-radius: 11px;
      color: #fff;
      box-shadow: unset;
    }
    .countdown-btns_app {
      background: #dfdfdf;
      border-radius: 11px;
      color: #fff;
      box-shadow: unset;
    }
    .countdown-btns_n {
      border: 1px solid #dfdfdf;
      border-radius: 11px;
      box-shadow: unset;
      color: #dfdfdf;
    }
  }
}
</style>
