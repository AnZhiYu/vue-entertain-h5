<template>
  <div class="page user">
    <div v-if="shopPageIndex === 1" class="pageloading wrap">
      <img class="pageloading-pemo" src="../../assets/pemo.png" />
      <div class="pageloading-loading">
        <div class="pageloading-loading_active" :style="{ width: process + '%' }"></div>
        <div class="pageloading-loading_bg"></div>
        <div class="pageloading-loading_border"></div>
      </div>
      <div class="pageloading-count">
        {{ this.handleProcess }}%
      </div>

      <!-- <img class="pageloading-loading" src="../../assets/pemo.png" /> -->
    </div>
    <div v-if="shopPageIndex === 2"  class="page2 wrap">
      <img class="page2-t" src="../../assets/paper.png" />
      <img class="page2-m" src="../../assets/text2.png" />
      <img class="page2-b" src="../../assets/button2.png"  @click="goAnswer"/>

    </div>
    <div class="answer1 wrap">
      答题
    </div>
    <div class="loader3 wrap">4</div>
    <div class="loader4 wrap">4</div>
    <div class="loader5 wrap">4</div>
  </div>
</template>

<script>
// queryCoinExchange,
// queryCoinExchangeList,

export default {
  name: "user",
  components: {},
  data() {
    return {
      shopPageIndex: 1,
      process: 60,
      timer: null
    };
  },

  methods: {
    loadingProcess() {
      this.process += 1;
      this.timer = setInterval(() => {
        this.process += 1;
      }, 10);
    },
    changeIndex() {
      this.shopPageIndex = 2;
    },
    goAnswer() {
      this.shopPageIndex = 3;
    }
  },
  created() {
    this.loadingProcess();
    // this.init();
  },
  computed: {
    handleProcess() {
      if (this.process === 100) {
        // console.log('this.process', this.process);
        clearInterval(this.timer);
        this.changeIndex();
      }
      return this.process;
    }
  }
};
</script>
<style lang="less" scoped>
.user {
  // font-size: 15px;
  // padding: 0 20px;
  // padding-bottom: 59px;
  // padding-top: 44px;

  .wrap {
    background: #ccc;
    height: 100vh;
    position: relative;
  }

  .pageloading {
    background: url("../../assets/pg1.png") no-repeat center/ auto;
    width: 100%;
    &-pemo {
      width: 41px;
      height: 108px;
      position: absolute;
      top: 93px;
      left: 171px;
    }

    &-count {
      position: absolute;
      top: 285px;
      left: 0;
      right: 0;
      margin: 0 auto;
      background: url("../../assets/cloud.png") no-repeat center/ auto;
      width: 120px;
      height: 17px;
      text-align: center;
      color: #d18106;
      font-size: 13px;
      line-height: 17px;
      font-family: AlibabaPuHuiTi;
    }

    &-loading {
      width: 266px;
      height: 24px;
      position: absolute;
      top: 250px;
      left: 0;
      right: 0;
      margin: 0 auto;
      overflow: hidden;
      padding: 6px 0px;
      box-sizing: border-box;

      &_border {
        top: 0;
        position: absolute;
        width: 100%;
        height: 24px;
        z-index: 3;
        background: url("../../assets/precess.png") no-repeat center/ cover;
        left: 0;
      }

      &_bg {
        background: #ffe9bb;
        position: absolute;
        z-index: 1;
        width: 100%;
        height: 90%;
        height: 13px;
        // left: 0;
        // top: 0;
      }
      &_active {
        width: 100%;
        background: #e14d42;
        z-index: 2;
        height: 90%;
        position: absolute;
        border: 6px solid transparent;
        height: 13px;
        // left: 0;
        // top: 0;
      }
    }
  }

  .page2{
    background: url("../../assets/pg1.png") no-repeat center/ auto;
    width: 100%;

    &-t{
      width: 245px;
      height: 353px;
      position: absolute;
      top: 139px;
      left: 0;
      right: 0;
      margin: 0 auto;
    }
    &-m{
      width: 245px;
      height: 66px;
      position: absolute;
      top: 511px;
      left: 0;
      right: 0;
      margin: 0 auto;
    }
    &-b{
      width: 163px;
      height: 38px;
      position: absolute;
      top: 583px;
      left: 0;
      right: 0;
      margin: 0 auto;
    }
  }
  .answer1{
    background: url("../../assets/answerbg1.png") no-repeat center/ cover;
    width: 100%;
  }
}
</style>
