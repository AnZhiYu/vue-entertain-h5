<template>
  <div>
    <div class="item-box" v-for="item in itemList" :key="item.Id">
      <div class="item-box_content time"  v-show="isShowTime">
        {{ item.create_time | momentTime(true) }}
      </div>
      <div class="item-box_content order">{{ item.Id }}</div>
      <div class="item-box_content user">{{ item.name }}</div>
      <div
        class="item-box_content jdl"
        :style="{ color: item.order_type === 1 ? '#F42778' : '#00F2F4' }"
      >
        {{ item.order_type === 1 ? "-" : "+" }}{{ item.amount }}
      </div>
      <div class="item-box_content oper" :style="{ width: '15%' }">
        <a class="link" @click="handleGoto(item)">交易</a>
      </div>
    </div>
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
import { List } from "vant";
import { queryUserInfo } from "@/api/auth";
import storage from "@/utils/storage";
import wkbOverlay from "@/components/common/wkbOverlay.vue";
import { isShowTime } from "@/config";

export default {
  name: "TransactionItem",
  components: {
    wkbOverlay,
    [List.name]: List
  },
  data() {
    return {
      list: [],
      loading: false,
      page: 1,
      size: 10,
      finished: false,
      is_active: true,
      showFrozen: false,
      isShowTime
    };
  },
  props: {
    itemList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    // 0:正常挂单，1:交易成功，2:冻结，3:撤单，4:交易失败
    handleGoto(item) {
      if (this.is_active) {
        this.$router.push({
          path: "/transaction/detail",
          query: {
            id: item.Id,
            type: "2"
          }
        });
      } else {
        this.showFrozen = true;
      }
    }
  },
  created() {
    queryUserInfo().then((res) => {
      this.is_active = res.is_active;
      storage.setItem("invite_code", res.invite_code);
      storage.setItem("user_name", res.user_name);
    });
  }

  // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less" scoped>
.item {
  &-header {
    display: flex;
    justify-content: space-around;
    padding: 0 8px;

    &_type {
      width: 70px;
      text-align: center;
      font-size: 13px;
      font-family: PingFang SC;
      color: #333333;
      height: 40px;
      line-height: 40px;
    }
  }
  &-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    background: #ffffff;
    box-shadow: 0px 5px 10px 0px rgba(215, 255, 255, 0.2);
    margin-bottom: 15px;
    padding: 0 5px;
    &_content {
      width: 80px;
      font-size: 12px;
      font-family: PingFang SC;
      color: #898989;
      width: 20%;
      text-align: center;
    }
    .time {
      color: #333;
    }
    .order {
      font-size: 12px;
      font-family: PingFang SC;
      color: #898989;
    }
    .user {
      font-size: 12px;
      font-family: PingFang SC;
      color: #898989;
    }
    .jdl {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #f42678;
    }
    .oper {
      .link {
        display: inline-block;
        width: 45px;
        height: 24px;
        line-height: 24px;
        background: #00f1f4;
        color: #333333;
        box-shadow: 0px 0px 5px 0px rgba(0, 241, 244, 0.22);
      }
    }
  }
}
</style>
