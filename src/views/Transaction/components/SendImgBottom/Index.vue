<template>
  <div :class="`tab-bottom ${isPx ? 'isPX' : ''}`">
    <van-field @focus="handleFocus" v-model="msg" center label="" placeholder="">
      <template #button>
        <van-uploader :after-read="afterRead">
          <van-icon name="photo-o" size="25" class="icon-img" />
        </van-uploader>

        <van-button class="send-btn" @click="sendMsg" size="small" color="#00F1F4" type="primary"
          >发送</van-button
        >
      </template>
    </van-field>
  </div>
</template>

<script>
import { versions } from "@/utils/browser";
import { Field, Button, Icon, Uploader } from "vant";

export default {
  name: "BottomTabBar",
  props: {
    defaultActive: {
      type: Number,
      default: 0
    }
  },
  components: {
    [Field.name]: Field,
    [Icon.name]: Icon,
    [Uploader.name]: Uploader,
    [Button.name]: Button
  },
  data() {
    return {
      active: 0,
      isPx: versions.iphoneX,
      msg: ""
    };
  },
  mounted() {
    this.active = this.defaultActive;
  },
  methods: {
    sendMsg() {
      if (!this.msg.trim().length) {
        return;
      }
      this.$emit("seedMsg", this.msg);
      this.msg = "";
      console.log("发送消息");
    },
    handleFocus() {
      this.$emit("onfocusbtn");
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      // console.log("file----", file);
      const data = new FormData();
      data.append("file", file.file);
      // data.append("imageType", 1);
      this.$emit("uploadImg", data);
    }
  }
};
</script>

<style lang="less" scoped>
.tab-img {
  width: 26px;
  height: 26px;
}
.tab-bottom {
  width: 100%;
  height: 50px;
  box-sizing: content-box;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  // 遮罩成是2002 不要大于遮罩z-index
  z-index: 99;

  .icon-img {
    vertical-align: middle;
    margin-right: 5px;
  }

  .send-btn {
    width: 70px;
    height: 35px;

    /deep/ .van-button__text {
      color: #333;
      font-size: 15px;
    }
  }

  /deep/ .van-field__control {
    background: #fafafa;
    border-radius: 3px;
    border: none;
  }
}
.isPX {
  padding-bottom: 30px;
}
</style>
