<template>
  <div class="transaction">
    <p>{{ itemData.chat_text }}</p>
    <div :class="`transaction-btns ${disabledBtn ? 'disabled' : ''}`">
      <span class="transaction-btns_y" @click="handleClickYes">我知道了</span>
      <!-- <span class="transaction-btns_n"  @click="handleClickNo">否</span> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatViewFrozen",

  data() {
    return {};
  },
  props: {
    messageId: {
      default: ""
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
        return "know_button_yes" in this.itemData.extra;
      }
      return false;
    }
  },
  methods: {
    handleClickYes() {
      if (!this.disabledBtn) {
        this.$emit("handleYes", this.messageId);
        // this.$emit("frozenAccount", this.messageId);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.transaction {
  margin: 5px 13px;
  &-btns {
    margin-top: 15px;
    text-align: center;
    &_y {
      display: inline-block;
      height: 22px;
      background: #333333;
      box-shadow: 1px 1px 5px 0px rgba(51, 51, 51, 0.2);
      border-radius: 11px;
      color: #00f1f4;
      text-align: center;
      font-size: 12px;
      line-height: 22px;
      padding: 0 18px;
    }
    &_n {
      padding: 0 18px;
      display: inline-block;
      height: 22px;
      line-height: 22px;
      border: 1px solid #333333;
      box-shadow: 1px 1px 2px 0px rgba(51, 51, 51, 0.5);
      border-radius: 11px;
      text-align: center;
      font-size: 12px;
      margin-left: 20px;
    }
  }

  .disabled {
    .transaction-btns_y {
      background: #dfdfdf;
      border-radius: 11px;
      color: #fff;
      box-shadow: unset;
    }
    .transaction-btns_n {
      border: 1px solid #dfdfdf;
      border-radius: 11px;
      box-shadow: unset;
      color: #dfdfdf;
    }
  }
}
</style>
