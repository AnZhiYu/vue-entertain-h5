<template>
  <div class="page user">
    <div v-if="shopPageIndex === 1" class="pageloading wrap">
      <img class="pageloading-pemo" src="../../assets/pemo.png" />
      <div class="pageloading-loading">
        <div class="pageloading-loading_active" :style="{ width: process + '%' }"></div>
        <div class="pageloading-loading_bg"></div>
        <div class="pageloading-loading_border"></div>
      </div>
      {{ this.handleProcess }}
      <!-- <img class="pageloading-loading" src="../../assets/pemo.png" /> -->
    </div>
    <div class="loader1 wrap">2</div>
    <div class="loader2 wrap">3</div>
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
      }, 100);
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
    background: url("../../assets/pg1.png") no-repeat center/ cover;
    width: 100%;
    &-pemo {
      width: 41px;
      height: 108px;
      position: absolute;
      top: 93px;
      left: 171px;
    }

    &-loading {
      width: 266px;
      height: 24px;
      position: absolute;
      top: 250px;
      left: 0;
      right: 0;
      margin: 0 auto;
      // background: url("../../assets/precess.png") no-repeat center/ cover;
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
}
</style>
