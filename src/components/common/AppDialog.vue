<template>
  <div>
    <van-dialog
      v-model="show"
      confirm-button-text="确认"
      confirm-button-color="#252525"
      :close-on-click-overlay="true"
      :title="title"
      @confirm="handleGotoApp"
      @close="closeDialog"
    >
    </van-dialog>
  </div>
</template>

<script>
import { Dialog } from "vant";

export default {
  name: "AppDialog",
  components: {
    [Dialog.Component.name]: Dialog.Component
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    message: {
      type: String,
      default: ""
    },
    value: {
      type: Boolean,
      default: false
    },
    params: {
      type: Object,
      default: () => ({})
    },
    type: {
      type: String,
      default: "1"
    }
  },
  data() {
    return {
      show: true
    };
  },
  watch: {
    value: {
      handler: function watchValue(val) {
        this.show = val;
      },
      immediate: true
    }
  },
  methods: {
    handleGotoApp() {
      this.$emit("confirmClick");
    },
    closeDialog() {
      this.$emit("input", false);
    }
  }
};
</script>

<style lang="less" scoped>
/deep/ .van-dialog .van-button {
  width: 145px;
  height: 40px;
  background-color: #f42678;
  border-top: none;
  margin-bottom: 13px;
  box-shadow: -1px -1px 10px -2px #f42678;
  border-radius: 0px;
}

/deep/ .van-button--default {
  background: unset;
}

/deep/ .van-button__text {
  color: #fff;
}

/deep/ .van-hairline--top::after {
  border-top-width: 0px;
}

/deep/ .van-dialog__header {
  padding: 15px 10px 0 10px;
  font-size: 18px;
  font-size: 13px;
  color: #313131;
}
/deep/ .van-dialog__footer {
  padding-top: 10px;
  text-align: center;
  font-size: 15px;
  color: #fff;
  display: block;
}

.van-dialog {
  border-radius: 2px;
  width: 280px;
  background: url("../../assets/tanchuangbeijing.png")
    100% 100%;
  background-size: 100% 100%;
}

.close-btn {
  position: absolute;
  width: 30px;
  height: 30px;
  right: 10px;
  top: 10px;
  background: url("https://img.bluewhale365.com/h5/icon/dialog-close.png") center / 10px 10px
    no-repeat;
}

.dialog-message {
  text-align: center;
  font-size: 13px;
  font-weight: 400;
  color: @text-color-light;
  line-height: 21px;
  margin: 20px auto;
  padding: 0 25px;
  text-align: center;
  word-wrap: break-word;
}
</style>
