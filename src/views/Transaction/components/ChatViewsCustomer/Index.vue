<template>
  <div class="views">
    <div class="views-item" v-for="(item, index) in customermessageList" :key="item.id">
      <p class="views-item_time" v-show="index === 0">{{ item.time | momentTime(true) }}</p>
      <div
        :class="`views-item_info ${item.send_name === send_name ? 'views-item_own' : ''}`"
        @click="showInfo"
      >
        <div class="views-item_info-avt" v-show="item.message_type !== 5">
          <span class="avt-icon"></span>
          <div class="avt-name">{{ item.send_uid === 1 ? "客服" : item.send_name }}</div>
        </div>
        <div class="views-item_info-img" v-if="item.msg_type === 2">
          <van-image width="100" height="100" :src="item.content" @click="showImg(item.content)" />
        </div>
        <div class="views-item_info-text" v-else>
          {{ item.content }}
        </div>
      </div>
      <p class="views-item_tips" v-if="item.extra && item.extra.tip">
        <span class="views-item_tips-icon"
          ><van-icon class="warning-icon" name="warning" color="#FC3E3E" size="14"/></span
        >{{ item.extra.tip }}
      </p>
    </div>
    <div ref="solutionDetails" id="solutionDetails"></div>
  </div>
</template>

<script>
import { Icon, Image, ImagePreview } from "vant";
// import {
//   querySellerAgree,
//   querySellerRefuse,
//   querySellerConfirmMoney,
//   querySellerConfirmUnReceiveMoney,
//   querySellerAppeal,
//   queryBuyerAgree,
//   querySellerConfirm
// } from "@/api/transaction";
import storage from "@/utils/storage";
import { mapState } from "vuex";

export default {
  name: "ChatViewsCustomer",
  components: {
    [Icon.name]: Icon,
    [Image.name]: Image
  },
  data() {
    return {
      send_name: storage.getItem("user_name")
    };
  },
  computed: {
    ...mapState(["tradetime"]),
    customermessageList() {
      return this.$store.state.customermessageList || [];
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
    showImg(url) {
      ImagePreview({
        images: [url],
        showIndex: false
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
