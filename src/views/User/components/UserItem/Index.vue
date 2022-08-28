<template>
  <div class="item">
    <div class="item-header">
      <span class="item-header_type">时间</span>
      <span class="item-header_type">交易方</span>
      <span class="item-header_type">事件</span>
      <span class="item-header_type">YUAN收/支</span>
    </div>
    <div class="item-box" v-for="item in itemList" :key="item.id">
      <div class="item-box_content time">
        {{ item.create_time | momentTime(true) }}
      </div>
      <div class="item-box_content order">{{ item.target || "-" }}</div>
      <div class="item-box_content user">{{ item.remark || "-" }}</div>
      <div class="item-box_content jdl" :style="{ color: item.amount < 0 ? '#F42778' : '#00F2F4' }">
        {{ item.amount > 0 ? "+" : "" }}{{ item.amount | formatNumber }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserItem",

  data() {
    return {};
  },
  props: {
    itemList: {
      type: Array,
      default() {
        return [];
      }
    }
  }
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
      white-space: nowrap;
    }
  }
  &-box {
    display: flex;
    justify-content: space-around;
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
      color: #b8b8b8;
      width: 20%;
      text-align: center;
    }
    .time {
      color: #b8b8b8;
    }
    .order {
      word-break: break-all;
      font-size: 12px;
      font-family: PingFang SC;
      color: #b8b8b8;
    }
    .user {
      font-size: 12px;
      font-family: PingFang SC;
      color: #b8b8b8;
    }
    .jdl {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #f42678;
    }
    .oper {
      span {
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
