<template>
  <div class="page chat">
    <common-title title="客服" isBack />
    <loading-page v-if="loading" type="loading" />
    <ChatViewsCustomer ref="gotoBottom" @getMsg="getMessageList"></ChatViewsCustomer>
    <send-img-bottom
      @onfocusbtn="handleClickGotobottom"
      @seedMsg="seedMessageInfo"
      @uploadImg="uploadImg"
    ></send-img-bottom>
  </div>
</template>

<script>
import CommonTitle from "@/components/common/CommonTitle.vue";
import { queryCustomerChatSend, queryCustomerMessageList } from "@/api/transaction";
import { uploadFile } from "@/api/upload";
import { Toast } from "vant";
import LoadingPage from "@/components/common/LoadingPage.vue";
import SendImgBottom from "../components/SendImgBottom/Index.vue";
import ChatViewsCustomer from "../components/ChatViewsCustomer/Index.vue";

export default {
  name: "Customer",
  components: {
    ChatViewsCustomer,
    CommonTitle,
    LoadingPage,
    SendImgBottom
  },
  data() {
    return {
      loading: true
    };
  },

  methods: {
    initList() {
      const myInterval = setInterval(() => {
        this.getMessageList(true);
      }, 10000);
      this.$once("hook:beforeDestroy", () => {
        window.clearInterval(myInterval);
      });
    },
    seedMessageInfo(text, type = 1) {
      Toast.loading({
        message: "正在发送",
        // forbidClick: true,
        duration: 0
      });
      queryCustomerChatSend({
        content: text,
        msg_type: type
      })
        .then(() => {
          this.getMessageList(true);
        })
        .catch(err => {
          Toast.clear();
          Toast.fail({
            message: err.message,
            forbidClick: true
          });
        });
    },
    handleClickGotobottom() {
      console.log("this.$children", this.$refs.gotoBottom);
      this.$refs.gotoBottom.showCurrent();
    },
    getMessageList(type) {
      queryCustomerMessageList({
        page: 1,
        size: 100000
      })
        .then(res => {
          this.$store.commit("changeCustomerMessageList", res.list);
          if (!type) {
            this.handleClickGotobottom();
          }
        })
        .finally(() => {
          this.loading = false;
          Toast.clear();
        });
    },
    uploadImg(file) {
      Toast.loading({
        message: "正在上传",
        // forbidClick: true,
        duration: 0
      });
      console.log("less", file);
      uploadFile(file)
        .then(res => {
          console.log("res------->", res);
          this.seedMessageInfo(res, 2);
        })
        .catch(err => {
          Toast.clear();
          Toast.fail({
            message: err.message,
            forbidClick: true
          });
        });
    }
  },
  created() {
    this.$store.commit("changeCustomerMessageList", []);
    // const { target_uid, order_id, order_type, record } = this.$route.query;
    // 判断是不是从我的订单详情页过来
    this.initList();
    this.getMessageList();
  }
};
</script>
<style lang="less" scoped>
.chat {
  font-size: 15px;
  padding-bottom: 59px;
}

/deep/ .van-field__control {
  border: 1px solid #ddd;
  height: 40px;
  padding: 10px;
}
</style>
