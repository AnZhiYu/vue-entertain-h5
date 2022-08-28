<template>
  <div>
    <div class="item-box" v-for="item in itemList" :key="item.Id">
      <div class="item-box_content time">
        {{ item.create_time | momentTime(true) }}
      </div>
      <div class="item-box_content order">{{ item.Id }}</div>
      <div
        class="item-box_content jdl"
        :style="{ color: item.order_type === 1 ? '#F42778' : '#00F2F4' }"
      >
        {{ item.order_type === 1 ? "-" : "+" }}{{ item.amount }}
      </div>
      <div
        class="item-box_content status"
        :style="{ color: getColor(item.status, item.order_type) }"
      >
        {{ getStatus(item.status, item.order_type) }}
      </div>
      <div class="item-box_content oper" :style="{ width: '20%' }">
        <p class="detail" @click="gotoDetail(item)">
          查看详情
        </p>
        <!-- <p class="cancel" v-show="item.status === 0">撤单</p> -->
        <!-- <router-link class="link" to="/transaction/chat">交易</router-link> -->
      </div>
    </div>
  </div>
</template>

<script>
import { List } from "vant";
import moment from "moment";

export default {
  name: "MyPenddingOrderItem",
  components: {
    [List.name]: List
  },
  data() {
    return {
      selfLoading: false
      // finished: false,
      // valueLoading: this.loading
    };
  },
  props: {
    itemList: {
      type: Array,
      default() {
        return [];
      }
    },
    loading: {
      type: Boolean,
      default: true
    },
    finished: {
      type: Boolean,
      default: false
    }
  },

  watch: {
    value: {
      handler: function watchValue(val) {
        this.selfLoading = val;
      },
      immediate: true
    }
  },
  methods: {
    getColor(text, type) {
      if (text === 0) {
        return type === 2 ? "#00F2F4" : "#F42778";
      }
      if (text === 1) {
        return type === 2 ? "#00F2F4" : "#F42778";
      }
      if (text === 5) {
        return type === 2 ? "#00F2F4" : "#F42778";
      }
      return "#333";
    },
    getStatus(text, type) {
      let role = "";
      switch (text) {
        case 0:
          if (type === 2) {
            role = "挂单买入";
          } else {
            role = "挂单卖出";
          }
          break;
        case 1:
          if (type === 2) {
            role = "买入结束";
          } else {
            role = "卖出结束";
          }
          break;
        case 3:
          // 黑色
          role = "已撤单";
          break;
        case 5:
          // 黑色
          if (type === 2) {
            role = "正在买入";
          } else {
            role = "正在卖出";
          }
          break;
        default:
          role = "状态异常";
          break;
      }
      return role;
    },
    formateData(tiem) {
      return moment(tiem).format("YYYY-MM-DD");
    },
    gotoDetail(item) {
      this.$router.push({
        path: "/transaction/detail",
        query: {
          id: item.Id,
          type: "0"
        }
      });
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      console.log("加载---->");
      this.$emit("onloadPage");
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i += 1) {
      //     this.list.push(this.list.length + 1);
      //   }
      //   // 加载状态结束
      //   this.loading = false;

      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true;
      //   }
      // }, 1000);
    }
  }
};
</script>
<style lang="less" scoped>
.item {
  &-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    background: #ffffff;
    box-shadow: 0px 5px 10px 0px rgba(215, 255, 255, 0.2);
    margin-bottom: 15px;
    padding: 0 0 0 5px;
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
    .status {
      font-size: 12px;
      font-family: PingFang SC;
      color: #333;
    }
    .jdl {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #f42678;
    }
    .oper {
      height: 100%;
      // width: 68px !important;
      background: #e2ffff;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 5px 0;
      // p{
      //   align-self: center;
      //   order: 1;
      //   flex-grow: 1;
      //   line-height: 100%;
      // }

      .detail {
        font-size: 12px;
        color: #333333;
      }
      .cancel {
        font-size: 12px;
        color: #f42678;
      }
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
