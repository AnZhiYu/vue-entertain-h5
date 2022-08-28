<template>
  <div class="page user">
    <div v-if="shopPageIndex === 1" class="loader wrap">
      <div class="jz"></div>
      <div class="main">
        <div class="select"
        :class="`item ${selectIndex === 1 ? 'xz' : 'mr'}`"
          @click="toSelect(1)">
          A.秦朝{{selectIndex}}
        </div>
        <div class="select" :class="selectIndex === 2 ? 'xz' : 'mr'" @click="toSelect(2)">
          B.唐朝
        </div>
        <div class="select" :class="selectIndex === 3 ? 'xz' : 'mr'" @click="toSelect(3)">
          C.辛亥革命时期
        </div>
        <div class="tijao" @click="btn">答错了，再来一次吧~{{shopPageIndex}}</div>
      </div>
    </div>
    <div v-if="shopPageIndex === 2" class="loader1 wrap">2</div>
    <div v-if="shopPageIndex === 3" class="loader2 wrap">3</div>
    <div v-if="shopPageIndex === 4" class="loader3 wrap">4</div>
    <div v-if="shopPageIndex === 5" class="loader4 wrap">4</div>
    <div v-if="shopPageIndex === 6" class="loader5 wrap">4</div>
  </div>
</template>

<script>
// queryCoinExchange,
// queryCoinExchangeList

export default {
  name: "user",
  components: {},
  data() {
    return {
      shopPageIndex: 1,
      selectIndex: 0
    };
  },
  computed: {
    selectImg() {
      return this.selectIndex;
    }
  },
  methods: {
    toSelect(val) {
      this.selectIndex = val;
      console.log(this.selectIndex, "this.selectIndex", this.selectImg);
    },
    btn() {
      console.log(this.selectImg, "查看seletImg");
    }
  },
  created() {
    // this.getDot();
    // this.init();
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
    padding: 81px 30px 87px 30px;
    box-sizing: border-box;
  }
  .loader {
    width: 100%;
    height: 100vh;
    // background-image: url("../../assets/load1-bg.png");
    background-size: 100% 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .jz {
    width: 100%;
    height: 199px;
    background: #ccc;
  }
  .main {
    border: 1px solid red;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .select {
      width: 100%;
      height: 39px;
      font-size: 13px;
      font-weight: bold;
      margin-bottom: 15px;
      padding-left: 55px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
    }
    .mr {
      // background-image: url("../../assets/mranniu.png");
      background-size: 100% 100%;
    }
    .xz {
      // background-image: url("../../assets/xzanniu.png");
      background-size: 100% 100%;
    }
    .tijao {
      width: 196px;
      height: 39px;
      // background-image: url("../../assets/tijiao.png");
      background-size: 100% 100%;
      color: #a92a2a;
      font-size: 16px;
      font-weight: bold;
      margin-top: 7px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
