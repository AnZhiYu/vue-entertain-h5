<template>
  <van-overlay class="overlay" :show="show" z-index="999" @click="closeDialog">
    <div class="wrapper">
      <div class="block" @click.stop>
        <p class="overlay-title">{{ title }}</p>
        <div class="overlay-content">
          <slot></slot>
        </div>
        <div class="overlay-btn cancel" v-show="!isOneBtn" @click="closeDialog">取消</div>
        <div class="overlay-btn confirm" @click="handleConfirm">{{ confirmText }}</div>
      </div>
    </div>
  </van-overlay>
</template>

<script>
import { Overlay } from "vant";

export default {
  name: "wkbOverlay",
  components: {
    [Overlay.name]: Overlay
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    isOneBtn: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "提示"
    },
    confirmText: {
      type: String,
      default: "确定"
    }
  },
  data() {
    return {
      show: false
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
    closeDialog() {
      this.$emit("input", false);
    },
    handleConfirm() {
      this.$emit("confirm");
    }
  },
};
</script>
<style lang="less" scoped>
.overlay {
  text-align: center;
  &-title {
    font-size: 17px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333333;
    margin: 0px 0 20px;
  }
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .block {
    width: 275px;
    // height: 180px;
    background-color: #fff;
    opacity: 0.95;
    padding: 20px;
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
  &-content {
    text-align: center;
  }

  &-btn {
    width: 100px;
    height: 35px;
    line-height: 35px;
    display: inline-block;
    margin-top: 20px;
  }
  .cancel {
    border: 1px solid #000000;
    box-shadow: inset 2px 1px 2px 0px rgba(0, 0, 0, 0.18), 2px 1px 2px 0px rgba(0, 0, 0, 0.18);
    border-radius: 17px;
    margin-right: 10px;
  }
  .confirm {
    background: #000000;
    box-shadow: inset 2px 1px 5px 0px rgba(0, 0, 0, 0.18), 2px 1px 5px 0px rgba(0, 0, 0, 0.18);
    border-radius: 17px;
    margin-left: 10px;
    color: #00f1f4;
  }
}
</style>
