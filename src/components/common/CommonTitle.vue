<template>
  <div v-if="isShowTitle" class="titleContent">
    <div class="title" :style="{ background: bgcolor, color: textColor }">
      <i v-show="isBack" class="iconfont iconfanhui" @click="goBack" :src="homeBack"></i>
      <div class="text">{{ title }}</div>
    </div>
  </div>
</template>

<script>
import { isMini } from "@/utils/util";
import { versions } from "@/utils/browser";
import storage from "@/utils/storage";

export default {
  props: {
    title: {
      type: String,
      default() {
        return this.$route.meta.title;
      }
    },
    bgcolor: {
      type: String,
      default() {
        return "#FAFAFA";
      }
    },
    textColor: {
      type: String,
      default() {
        return "#252525";
      }
    },
    goBackNum: {
      type: Number,
      default() {
        return -1;
      }
    },
    onBack: {
      type: Function
    },
    isShowTitle: {
      type: Boolean,
      default() {
        return true;
      }
    },
    isBack: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  created() {
    console.log(versions.iosApp || versions.androidApp || isMini());
  },
  data() {
    return {
      homeBack: "https://img1.huopin360.com/miniprogram/nav-left.png",
      // hideTitle: versions.iosApp || versißs.androidApp || isMini()
    };
  },
  computed: {
    isTitle() {
      if (this.isShowTitle) {
        return true;
      }
      if (storage.getItem("utm_type")) {
        return false;
      }
      return !this.hideTitle;
    }
  },
  methods: {
    goBack() {
      if (this.$listeners.onBack) {
        this.$emit("onBack");
        return;
      }
      if (window.history.length <= 1) {
        const { redirectUrl = "" } = this.$route.query;
        if (redirectUrl.indexOf("maker") > 0 || window.location.href.indexOf("/#/maker/") !== -1) {
          this.$router.push({ path: "/maker/index" });
        } else {
          this.$router.push({ path: "/" });
        }
      } else {
        this.$router.go(this.goBackNum);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.titleContent {
  height: 44px;
}
.title {
  position: fixed;
  height: 44px;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 99;
  text-align: center;
}
.goBack-content {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  text-align: center;
  line-height: 32px;
  position: absolute;
  background: rgba(255, 255, 255, 0.4);
  position: absolute;
  top: 8px;
  left: 12px;
}
.iconfanhui {
  width: 10px;
  height: 16px;
  position: absolute;
  left: 0;
  height: 40px;
  line-height: 44px;
  width: 90px;
  text-align: left;
  padding-left: 20px;
  // top: 50%;
  // background-color: #ddd;
  // transform: translateY(-50%);
}
.text {
  height: 44px;
  width: 208px;
  line-height: 44px;
  // color: @text-color-darker;
  font-size: 15px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
}
</style>
