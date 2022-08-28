<template>
  <div class="page user">
    <loading-page v-if="pageLoading" type="loading" />
    <div class="user-title">
      <div class="user-title_login" @click="gotoLogin">
        <img class="user-price_title-back" src="../../assets/tuichu.png" />
      </div>
      <div class="user-title_text">我的</div>
      <div class="user-title_news" @click="gotoNews">
        <van-icon size="20" name="envelop-o" :dot="hasNews" />
      </div>
    </div>
    <van-pull-refresh v-model="refreshLoading" @refresh="onRefresh">
      <div class="user-price">
        <div class="user-price_title">
          <img class="user-price_title-icon" src="../../assets/qianbao.png" />
          <span class="user-price_title-pack"> 钱包</span>
        </div>
        <div class="user-price_count">
          <div class="user-price_count-list">
            <span class="user-price_count-list-title"
              >总收益:
              <span
                class="price"
                :style="{ fontSize: total_award.toString().length > 6 ? '12px' : '' }"
                >{{ total_award | formatNumber }}</span
              >
            </span>
            <span>
              合计:
              <span
                class="price"
                :style="{ fontSize: total_award.toString().length > 6 ? '12px' : '' }"
                >{{ (1 * total_award) | formatNumber }} RMB</span
              ></span
            >
          </div>
          <div class="user-price_count-list">
            <span class="user-price_count-list-title"
              >已交易:
              <span
                class="price"
                :style="{ fontSize: total_sell.toString().length > 6 ? '12px' : '' }"
                >{{ total_sell | formatNumber }}</span
              ></span
            >
            <span>
              合计:
              <span
                class="price"
                :style="{ fontSize: total_sell.toString().length > 6 ? '12px' : '' }"
                >{{ (1 * total_sell) | formatNumber }} RMB</span
              ></span
            >
          </div>
          <div class="user-price_count-list">
            <span class="user-price_count-list-title"
              >YUAN余额:
              <span
                class="price"
                :style="{ fontSize: jdlbalance.toString().length > 4 ? '12px' : '' }"
                >{{ jdlbalance | formatNumber }}</span
              ></span
            >
            <span>
              挂单冻结:
              <span
                class="price"
                :style="{ fontSize: frozen.toString().length > 6 ? '12px' : '' }"
                >{{ frozen | formatNumber }}</span
              ></span
            >
          </div>

          <div class="user-price_count-list">
            <span>
              WKB令牌:
              <span class="price" :style="{ fontSize: token.toString().length > 6 ? '12px' : '' }"
                >{{ token | formatNumber }}枚</span
              ></span
            >
          </div>
          <div class="content">
            <span class="user-price_count-btn" @click="handelGotoTransfer" v-show="can_exchange">
              申请YUAN充值
            </span>
          </div>
        </div>
      </div>
      <div class="user-info">
        <div
          class="user-info_id"
          v-clipboard:copy="user_name"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
        >
          <span class="user-info_id-title">用户ID </span> <span> {{ user_name }}</span>
        </div>
        <div
          class="user-info_code"
          v-clipboard:copy="invite_code"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
        >
          <span class="user-info_id-title">邀请码</span> <span> {{ invite_code }}</span>
        </div>
      </div>
      <div class="user-setting">
        <div class="user-search" @click="handleGoSearch('statistic')">
          <div class="user-search_title">
            <img class="user-search_title-icon" src="../../assets/leijiweike.png" />
            查业绩
          </div>
        </div>
        <div class="user-search" @click="handleGoSearch('checkPassword')">
          <div class="user-search_title">
            <img class="user-search_title-icon" src="../../assets/mibao.png" />
            {{ this.is_setPasswordProtected ? "改密码" : "设密保" }}
          </div>
        </div>
        <div class="user-search" @click="handleGoSearch('customer')">
          <div class="user-search_title">
            <img class="user-search_title-icon" src="../../assets/kefu.png" />
            找客服
          </div>
        </div>
      </div>
      <van-list
        class="user-flow"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        immediate-check
        @load="queryAccountFlow"
      >
        <user-item :itemList="itemList"></user-item>
      </van-list>
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
    </van-pull-refresh>
    <bottom-tab-bar :defaultActive="3" />
  </div>
</template>

<script>
import { Icon, List, PullRefresh, Toast } from "vant";
import BottomTabBar from "@/components/common/BottomTabBar.vue";
import { queryUserInfo } from "@/api/auth";
import { queryAccountFlow, queryUserWallet, queryPushList } from "@/api/user";
import LoadingPage from "@/components/common/LoadingPage.vue";
import { mapState } from "vuex";
import storage from "@/utils/storage";
import { TOKEN } from "@/store/mutation-types";
import wkbOverlay from "@/components/common/wkbOverlay.vue";
import VueClipboard from "vue-clipboard2";
import { versions } from "@/utils/browser";
import UserItem from "./components/UserItem/Index.vue";

// queryCoinExchange,
// queryCoinExchangeList,

export default {
  name: "user",
  components: {
    BottomTabBar,
    UserItem,
    wkbOverlay,
    LoadingPage,
    [Icon.name]: Icon,
    [VueClipboard.name]: VueClipboard,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh
  },
  data() {
    return {
      itemList: [],
      user_name: storage.getItem("user_name"),
      invite_code: storage.getItem("invite_code"),
      page: 1,
      size: 10,
      loading: false,
      finished: false,
      pageLoading: true,
      jdlbalance: 0,
      total_award: 0,
      frozen: 0,
      total_sell: 0,
      token: 0,
      can_exchange: 0,
      refreshLoading: false,
      hasNews: false,
      is_active: true,
      is_setPasswordProtected: 0,
      showFrozen: false,
      myInterval: null
    };
  },
  computed: {
    ...mapState(["dictValue"])
  },
  methods: {
    onCopy() {
      Toast("复制成功");
    },
    onError() {
      Toast("复制失败");
    },
    gotoNews() {
      this.$router.push({
        path: "/user/news"
      });
    },
    handleGoSearch(name) {
      if (name === "checkPassword") {
        if (this.is_setPasswordProtected) {
          this.$router.push({
            name
          });
        } else {
          this.$router.push({
            name: "setPassword"
          });
        }
      } else {
        this.$router.push({
          name
        });
      }
    },
    queryAccountFlow() {
      queryAccountFlow({
        page: this.page,
        size: this.size
      }).then(res => {
        this.loading = false;
        this.finished = false;
        this.pageLoading = false;
        this.itemList = this.itemList.concat(res.list);
        if (res.page * res.size < res.total) {
          this.page = res.page * 1 + 1;
        } else {
          this.finished = true;
        }
      });
    },
    gotoLogin() {
      // 清除token
      storage.removeItem(TOKEN);
      this.$router.push({
        path: "/auth/login"
      });
    },
    handelGotoTransfer() {
      if (this.is_active) {
        this.$router.push({
          path: "/user/transfer"
        });
      } else {
        this.showFrozen = true;
      }
    },
    onRefresh() {
      this.refreshLoading = true;
      this.init();
      this.page = 1;
      this.itemList = [];
      this.queryAccountFlow();
    },
    getDot() {
      const time = storage.getItem("news_time");
      const myInterval = setInterval(() => {
        if (!this.hasNews) {
          console.log("我的页面 清除定时器");
          if (versions.androidApp) {
            const messageList = storage.getItem("wkb_message") || [];
            if (!messageList) return;
            if (messageList[0].push_time * 1000 >= Number(time)) {
              this.hasNews = true;
            }
          } else {
            queryPushList().then(res => {
              if (!res) return;
              console.log("Number(time)", res[0].push_time * 1000, Number(time));
              if (res[0].push_time * 1000 >= Number(time)) {
                this.hasNews = true;
              }
            });
          }
        }
      }, 20000);
      this.$once("hook:beforeDestroy", () => {
        window.clearInterval(myInterval);
      });
    },
    init() {
      this.$store.dispatch("getDictValue");
      queryUserWallet().then(res => {
        this.jdlbalance = res.balance;
        this.total_award = res.total_award;
        this.total_sell = res.total_sell;
        this.token = res.token;
        this.refreshLoading = false;
      });
      queryUserInfo().then(res => {
        this.refreshLoading = false;
        this.balance = res.balance;
        this.frozen = res.frozen;
        this.invite_code = res.invite_code;
        this.user_name = res.user_name;
        this.can_exchange = res.can_exchange;
        this.is_active = res.is_active;
        this.is_setPasswordProtected = res.is_setPasswordProtected;
        storage.setItem("invite_code", res.invite_code);
        storage.setItem("user_name", res.user_name);
      });
    }
  },
  created() {
    const time = storage.getItem("news_time");
    if (versions.androidApp) {
      const messageList = storage.getItem("wkb_message") || [];
      if (!messageList) return;
      if (messageList[0].push_time * 1000 >= Number(time)) {
        this.hasNews = true;
      }
    } else {
      queryPushList().then(res => {
        if (!res) return;
        if (res[0].push_time * 1000 >= Number(time)) {
          this.hasNews = true;
        }
      });
    }

    this.getDot();
    this.init();
  }
};
</script>
<style lang="less" scoped>
.user {
  font-size: 15px;
  padding: 0 20px;
  padding-bottom: 59px;
  padding-top: 44px;

  /deep/ .van-info--dot {
    background-color: #f42678;
    box-shadow: 0px 0px 3px 0px #f42678;
    border: unset;
    top: 3px;
  }
  &-title {
    width: 100%;
    position: fixed;
    text-align: center;
    background: #fafafa;
    top: 0;
    left: 0;
    z-index: 999;
    text-align: center;
    color: #333333;
    font-size: 17px;
    font-family: PingFang SC;
    box-shadow: 0px 5px 10px 0px rgba(215, 241, 255, 0.2);
    box-shadow: 0px 5px 10px 0px rgba(215, 241, 255, 0.2);
    // border-radius: 0px 0px 30px 30px;
    padding: 10px 0;
    &_text {
      text-align: center;
    }

    &_news {
      position: absolute;
      right: 5px;
      top: 10px;
      width: 50px;
      height: 30px;
    }

    &_login {
      position: absolute;
      left: 5px;
      top: 10px;
      width: 50px;
      height: 30px;
    }
  }
  &-price {
    color: #343434;
    margin: 0 auto;
    width: 335px;
    // height: 170px;
    background: #ffffff;
    box-shadow: 0px 0px 10px 0px rgba(226, 237, 255, 0.3);
    padding: 21px;

    &_title {
      font-size: 14px;
      text-align: center;
      margin: 0 auto;
      width: 150px;
      height: 32px;
      line-height: 32px;
      border: 2px solid;
      border-image: linear-gradient(35deg, #00f1f4 45%, #00f1f4 50%, #f42678 55%, #f42678 100%) 10;
      box-shadow: inset 1px 3px 2px 0px rgba(244, 38, 120, 0.14),
        1px 3px 2px 0px rgba(244, 38, 120, 0.14);
      border-radius: 1px;
      margin-bottom: 18px;
      &-icon {
        width: 18px;
        height: 19px;
        vertical-align: sub;
      }
      &-pack {
        margin-left: 10px;
      }
      &-back {
        width: 17px;
        height: 17px;
        vertical-align: sub;
      }
    }

    &_count {
      font-size: 14px;
      .content {
        text-align: center;
      }
      &-btn {
        // width: 85px !important;
        height: 25px;
        line-height: 25px;
        display: inline-block;
        padding: 0 5px;
        background: #00f1f4;
        box-shadow: 0px 0px 9px 0px rgba(0, 241, 244, 0.3);
        font-size: 12px;
        font-family: PingFang SC;
        color: #333333;
        text-align: center;
        margin: 10px auto 0px;
      }
      &-list {
        display: flex;
        justify-content: space-between;
        line-height: 28px;
        &-title {
          width: 50%;
          white-space: nowrap;
        }

        .jdl {
          width: 55%;
        }
        .price {
          // font-size: 12px;
          white-space: nowrap;
        }
        span {
          width: 50%;
        }
      }
    }
  }

  .size12 {
    font-size: 12px !important;
  }
  &-info {
    width: 335px;
    height: 35px;
    background: #ffffff;
    box-shadow: 0px 0px 10px 0px rgba(226, 237, 255, 0.3);
    margin: 25px auto;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 13px;
    font-family: PingFang SC;
    color: #333333;
    &_id {
      width: 50%;
      padding-left: 21px;

      &-title {
        font-size: 14px;
        font-family: PingFang SC;
        color: #b9b9b9;
        margin-right: 10px;
      }
    }
    &_code {
      width: 50%;
      position: relative;
      white-space: nowrap;
      text-align: left;
      padding-left: 20px;
      &::before {
        content: "";
        position: absolute;
        display: block;
        width: 1px;
        height: 20px;
        border-left: 1px solid #d3d3d3;
        left: 0px;
      }
    }
  }

  &-setting {
    display: flex;
    background: #ffffff;
    box-shadow: 0px 0px 10px 0px rgba(226, 237, 255, 0.3);
    justify-content: space-between;
  }

  &-search {
    // width: 335px;
    height: 35px;
    display: flex;
    margin: 0 auto;
    align-items: center;
    // margin-bottom: 10px;
    padding: 0 20px;
    &_title {
      white-space: nowrap;
      font-size: 13px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #333333;

      &-icon {
        width: 24px;
        // height: 18px;
      }
    }
    &_go {
      font-size: 12px;
      font-family: PingFang SC;
      color: #bebebe;
      &-icon {
        width: 10px;
        height: 12px;
        margin-top: -2px;
        margin-left: 10px;
      }
    }
  }
  &-flow {
    margin-top: 10px;
  }
}
</style>
