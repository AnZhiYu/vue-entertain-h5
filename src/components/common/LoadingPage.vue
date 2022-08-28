<template>
  <div class="page-empty">
    <template v-if="type === 'empty'">
      <van-image class="page-empty__img" :src="`${imgBaseUrl}order/order-null.png`" />
      <div class="page-empty__des">没有相关信息</div>
      <div class="page-empty__btn" @click="toHomePage">去逛逛</div>
    </template>
    <div class="page-empty-loading" v-if="type === 'loading'">
      <!-- <van-image
        class="page-loading__img"
        :src="`${imgBaseUrl}goods/goodsDetail3.png`"
      /> -->
      <van-loading color="#00f1f4" size="36px" vertical>加载中...</van-loading>
      <!-- <van-image
        class="page-loading__img"
        src="../../assets/page-loading.gif"
      /> -->
      <!-- <div>加载中...</div> -->
    </div>
  </div>
</template>

<script>
import { Image, Button, Loading } from "vant";
import { imgBaseUrl } from "@/config";

export default {
  name: "LoadingPage",
  components: {
    [Image.name]: Image,
    [Button.name]: Button,
    [Loading.name]: Loading
  },
  props: {
    type: {
      type: String,
      default: "empty"
    }
  },
  data() {
    return {
      imgBaseUrl
    };
  },
  methods: {
    toHomePage() {
      this.$router.push({
        name: "home"
      });
    }
  }
};
</script>

<style lang="less" scoped>
.page {
  &-loading__img {
    width: 75px;
    height: 75px;
  }
  &-empty {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 98;
    background-color: #FAFAFA;
    text-align: center;
    font-size: 14px;

    &-loading {
      margin-top: 150px;
    }

    &__img {
      margin-top: 40px;
      width: 280px;
      height: 200px;
    }
    &__des {
      margin: 20px 0;
      line-height: 20px;
      color: @text-color-light;
    }
    &__btn {
      display: inline-block;
      width: 142px;
      text-align: center;
      height: 32px;
      border: 1px solid @text-color-light;
      border-radius: 2px;
      line-height: 32px;
      color: @text-color-darker;
      margin-top: 20px;
    }
  }
}
</style>
