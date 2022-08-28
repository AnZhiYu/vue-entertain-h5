<template>
  <div class="page home">
    <common-title title="首页" />
    <van-pull-refresh v-model="refreshLoading" @refresh="onRefresh">
      <loading-page v-if="loading" type="loading" />
      <div class="home-wrapper">
        <div class="home-tips" v-show="newsTotal">
          <p class="home-tips-context">
            <img class="home-tips-context_img" src="../../assets/baojing.png" />
            已有下家开通, <span class="home-tips-context_price">{{ newsTotal | formatNumber }}</span
            >RMB
          </p>
        </div>
        <div class="count">
          <div class="count-item">
            <div class="count-item-l">
              <span>
                <img class="count-item-l_img1" src="../../assets/leijiweike.png" />累计微客</span
              >
            </div>
            <div class="count-item-r">
              {{ homeData.user_count | formatNumber }}
            </div>
          </div>

          <div class="count-item">
            <div class="count-item-l">
              <span>
                <img
                  class="count-item-l_img2"
                  src="../../assets/leijitoufang.png"
                />累计投放YUAN</span
              >
            </div>
            <div class="count-item-r">
              {{ homeData.token_count | formatNumber }}
            </div>
          </div>

          <div class="count-item">
            <div class="count-item-l">
              <span>
                <img class="count-item-l_img3" src="../../assets/dun.png" />累计激活令牌WKB</span
              >
            </div>
            <div class="count-item-r">
              {{ homeData.active_token_count | formatNumber }}
            </div>
          </div>
        </div>
        <div class="select">
          <div class="select-total">
            <div
              class="select-total-l"
              :style="{ fontSize: getRmb.toString().length > 5 ? '12px' : '15px' }"
            >
              钱包: {{ homeData.user_jdl_balance | formatNumber }} YUAN
            </div>
            <div
              class="select-total-r"
              :style="{ fontSize: getRmb.toString().length > 5 ? '12px' : '15px' }"
            >
              价值: {{ getRmb | formatNumber }} RMB
            </div>
          </div>
          <div class="select-box">
            <div
              v-for="item in selectArray"
              :key="item.level"
              :class="
                `select-box-item ${
                  item.level <= selected && !item.active ? 'select-box-selected' : ''
                }`
              "
              @click="changeSelect(item)"
            >
              <div
                :class="
                  `select-box-item-l ${
                    item.active ? 'select-box-item-diseable' : ''
                  }`
                "
              >
              <!-- || item.level > canBuyLevel -->
                {{ item.rmb | formatNumber }}
              </div>
              <div class="select-box-item-r">RMB</div>
            </div>
          </div>
          <van-button
            block
            color="#00F1F4"
            class="open-btn"
            size="normal"
            round
            type="primary"
            :style="{ color: '#343434' }"
            @click="hanadleOpen"
          >
            开 通
          </van-button>
          <wkb-overlay v-model="show" @confirm="queryBuyLevelList" title="开通点位">
            <p class="buy_info-text">
              你正在购买 <span class="buy_info-text-count">{{ countRmb | formatNumber }}</span> RMB
              点位
            </p>
            <p class="buy_info-text">
              需要消耗YUAN:
              <span class="buy_info-text-count">{{ countRmb | formatNumber }}</span>
              个
            </p>
          </wkb-overlay>
        </div>
      </div>
      <wkb-overlay v-model="showTrade" @confirm="gotoTrade" title="温馨提示" confirmText="前往">
        <p>您目前的余额为:0</p>
        <p>请前往<span :style="{ color: '#F42678' }">交易大厅</span>进行了解</p>
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
    </van-pull-refresh>
    <bottom-tab-bar :defaultActive="0" />
  </div>
</template>

<script>
import BottomTabBar from "@/components/common/BottomTabBar.vue";
import CommonTitle from "@/components/common/CommonTitle.vue";
import wkbOverlay from "@/components/common/wkbOverlay.vue";
import { queryHome, queryBuyLevel, queryUserExtra } from "@/api/home";
import LoadingPage from "@/components/common/LoadingPage.vue";
// import { queryPushList } from "@/api/user";
import {
  Button, Overlay, Toast, PullRefresh
} from "vant";
import { mapState } from "vuex";
import { queryUserInfo } from "@/api/auth";
import storage from "@/utils/storage";

export default {
  name: "home",
  components: {
    BottomTabBar,
    LoadingPage,
    CommonTitle,
    [Button.name]: Button,
    [Overlay.name]: Overlay,
    [PullRefresh.name]: PullRefresh,
    wkbOverlay
  },
  data() {
    return {
      total: 102400,
      // selectArray: [200, 400, 800, 1600, 3200, 6400, 12800, 25600, 51200, 102400],
      selectArray: [],
      selected: 0,
      selectedValue: 200,
      homeData: {},
      show: false,
      loading: true,
      showTrade: false,
      refreshLoading: true,
      newsTotal: "",
      is_active: true,
      showFrozen: false
    };
  },
  computed: {
    ...mapState(["dictValue"]),
    countRmb() {
      const data = this.selectArray.reduce((prev, next) => {
        let count = prev;
        if (next.level <= this.selected && !next.active) {
          count += next.rmb;
        }
        return count;
      }, 0);
      return data;
    },
    buyArray() {
      const dataArray = this.selectArray
        .map((item) => {
          if (item.level <= this.selected && !item.active) {
            return item;
          }
          return null;
        })
        .filter(Boolean);
      return dataArray;
    },
    getRmb() {
      const rmb = this.homeData.user_jdl_balance || 0;
      return rmb;
    },
    canBuyLevel() {
      let level = 0;
      const data = this.selectArray.reduce((prev, next) => {
        let count = prev;
        console.log("canBuyLevel-level", count, this.getRmb);
        if (!next.active) {
          count += next.rmb;
          if (count <= this.getRmb) {
            level = next.level;
          }
        }
        return count;
      }, 0);
      console.log("canBuyLevel", this.selectArray, data, level);
      return level;
    }
  },

  methods: {
    gotoTrade() {
      this.$router.push({
        path: "/transaction",
        query: {
          active: 1
        }
      });
    },
    changeSelect(item) {
      console.log("level", item, this.canBuyLevel);
      if (item.active) {
        return;
      }
      if (item.level > this.canBuyLevel) {
        Toast('余额不足，请前往交易大厅了解');
        return;
      }
      this.selectedValue = item.rmb;
      this.selected = item.level;
      console.log("buyArray---", this.buyArray);
    },
    hanadleOpen() {
      if (this.is_active) {
        if (this.getRmb === 0) {
          this.showTrade = true;
          return;
        }
        if (this.selected) {
          this.show = true;
        } else {
          Toast('请选择需要开通的点位');
        }
      } else {
        this.showFrozen = true;
      }
      // if (this.selected) {
      //   this.queryBuyLevelList();
      // }
    },
    queryBuyLevel(index = 0) {
      let idx = index;
      if (!this.buyArray[index]) {
        this.getHomeData();
        this.show = false;
        Toast.clear();
        Toast.success("开通成功");
        return;
      }
      queryBuyLevel({
        level: this.buyArray[index].level
      })
        .then(() => {
          idx += 1;
          this.queryBuyLevel(idx);
        })
        .catch((err) => {
          Toast.clear();
          Toast.fail({
            message: err.message,
            forbidClick: true
          });
        });
    },
    queryBuyLevelList() {
      Toast.loading({
        message: "正在购买...",
        forbidClick: true,
        duration: 0
      });
      this.queryBuyLevel();

      // const promiseArr = [];
      // this.buyArray.forEach((item) => {
      //   promiseArr.push(queryBuyLevel({
      //     level: item.level
      //   }));
      // });
      // console.log('promiseArr', promiseArr);
      // Promise.all(promiseArr).then((res) => {
      //   console.log('res--->', res);
      // }).catch((res) => {
      //   Toast.clear();
      //   console.log(res);
      // });
    },
    // getNews() {
    //   queryPushList().then((res) => {
    //     if (!res) return;
    //     const data = res.filter((item) => item.msg_type === 3);
    //     this.newsTotal = data[0] ? data[0].content : "";
    //   });
    // },
    getOpenInfor() {
      queryUserExtra({
        key: "child_highest_rmb"
      }).then((res) => {
        this.newsTotal = res;
      });
      queryUserInfo().then((res) => {
        this.is_active = res.is_active;
        console.log('res.is_active', res.is_active, this.is_active);
        storage.setItem("invite_code", res.invite_code);
        storage.setItem("user_name", res.user_name);
      });
    },
    initList() {
      const myInterval = setInterval(() => {
        this.getOpenInfor();
      }, 30000);
      this.$once("hook:beforeDestroy", () => {
        window.clearInterval(myInterval);
      });
    },
    getHomeData() {
      this.refreshLoading = true;
      queryHome().then((res) => {
        const data = {
          user_count: res.user_count,
          token_count: res.token_count,
          active_token_count: res.active_token_count,
          user_jdl_balance: res.user_jdl_balance,
          user_jdl_rmb_price: res.user_jdl_rmb_price
        };
        this.refreshLoading = false;
        this.loading = false;
        this.showTrade = res.user_jdl_balance === 0;
        this.homeData = data;
        this.selectArray = res.user_x3;
      });
      this.getOpenInfor();
    },
    onRefresh() {
      this.getHomeData();
    }
  },
  created() {
    this.$store.dispatch("getDictValue");
    this.getHomeData();
    this.initList();
  },
};
</script>
<style lang="less" scoped>
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

.home {
  font-size: 15px;
  padding-bottom: 59px;

  &-tips {
    font-family: PingFang SC;
    font-size: 13px;
    background: #f5f5f5;
    height: 34px;
    line-height: 34px;
    border-radius: 17px;
    color: #343434;
    text-align: center;
    margin-bottom: 12px;
    &-context {
      &_img {
        width: 26px;
        margin-right: 10px;
      }
      &_price {
        color: #fc3e3e;
        margin: 0 15px;
        font-size: 12px;
      }
    }
  }
  &-wrapper {
    padding: 10px 25px;
    .count {
      &-item {
        display: flex;
        margin-bottom: 12px;
        background: #fff;
        box-shadow: 1px 10px 10px 0px rgba(238, 233, 255, 0.2);
        border-radius: 5px;
        overflow: hidden;
        &-l {
          flex-grow: 1;
          flex-shrink: 1;
          height: 50px;
          line-height: 50px;
          width: 64%;
          font-size: 15px;

          &_img1 {
            width: 32px;
            margin: 0 6px 0 15px;
          }
          &_img2 {
            width: 28px;
            margin: 0 6px 0 18px;
          }
          &_img3 {
            width: 24px;
            margin: 0 6px 0 19px;
          }
        }
        &-r {
          flex-grow: 1;
          flex-shrink: 1;
          font-size: 15px;
          padding-left: 13px;
          height: 50px;
          line-height: 50px;
          background-color: #e0fdfe;
          width: 48%;
        }
      }
    }

    .select {
      background: #fff;
      padding: 13px;
      color: #343434;
      border-radius: 10px;

      &-total {
        font-family: PingFangSC-Regular;
        display: flex;
        margin-bottom: 10px;

        &-l {
          font-size: 15px;
          flex-grow: 5;
        }
        &-r {
          flex-grow: 5;
          font-size: 15px;
        }
      }

      &-box {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        flex-direction: column;
        height: 200px;
        align-items: center;

        &-selected {
          border: 1px solid #00f1f4 !important;
          background: #9bfeff;
          .select-box-item-r {
            color: #fff;
          }
        }

        &-item {
          border: 1px solid #eaeaea;
          display: flex;
          width: 120px;
          height: 25px;
          margin: 5px 0;
          font-size: 13px;

          &-diseable {
            color: #cecece;
          }

          &-l {
            flex-grow: 5;
            height: 25px;
            line-height: 25px;
            text-align: right;
            margin-right: 15px;
          }
          &-r {
            flex-grow: 2;
            height: 25px;
            line-height: 25px;
            color: #cecece;
          }
        }
      }

      .open-btn {
        font-size: 15px;
        margin-top: 10px;
        height: 36px;
        box-shadow: 0px 0px 9px 0px rgba(0, 244, 241, 0.35);
      }
    }
  }
}
</style>
