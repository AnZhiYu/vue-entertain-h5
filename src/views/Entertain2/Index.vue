<!-- eslint-disable vue/valid-v-for -->
<!-- eslint-disable max-len -->
<template>
  <div class="page user">
    <div v-if="shopPageIndex === 1" class="loader wrap">
      <div class="jz"></div>
      <div class="main main-load">
        <div class="select" v-for="(item, index)  in tabSelectYear" :key= "index" :class="`${selectIndex === item.id ? 'xz' : 'mr'}`" @click="toSelect(item)">
        <img src="../../assets/flagon.png" v-if="item.id === selectIndex" class="flagon">
         {{item.name}}
        </div>
        <div class="tijao" @click="answer">{{current_yaer.id === 3?'恭喜，快来开席吧~':'答错了，再来一次吧~'}}</div>
      </div>
    </div>
    <div v-if="shopPageIndex === 2" class="loader1 wrap">
      <div class="load2-jz"></div>
      <div class="main main-load2">
        <div class="select select2" v-for="(item, index)  in tabSelectFood" :key= "index" :class="`${selectIndex === item.id ? 'xz' : 'mr'}`" @click="toSelect(item)">
        <img src="../../assets/paint-brush.png" v-if="item.id === selectIndex" class="paint">
         {{item.name}}
        </div>
        <!-- <div class="tijao" @click="answer">{{current_yaer.id === 3?'恭喜，快来开席吧~':'答错了，再来一次吧~'}}</div> -->
      </div>
    </div>
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
  name: "answer-warp",
  components: {},
  data() {
    return {
      shopPageIndex: 1,
      selectIndex: 0,
      current_yaer: {},
      tabSelectYear: [
        { id: 1, name: 'A.秦朝' }, { id: 2, name: 'B.唐朝' }, { id: 3, name: 'C.辛亥革命时期' }
      ],
      tabSelectFood: [
        { id: 1, name: '1.米饭' }, { id: 2, name: '2.熟肉' }, { id: 3, name: '3.小碟酱料' }, { id: 4, name: '4.青菜' }, { id: 5, name: '5.点心' },
        { id: 6, name: '6.鱼' }, { id: 7, name: '7.汤' }, { id: 8, name: '8.蜜饯' }, { id: 9, name: '9.宜宾燃面' }
      ]
    };
  },
  computed: {

  },
  methods: {
    toSelect(item) {
      this.current_yaer = item;
      this.selectIndex = item.id;
    },
    answer() {
      if (this.current_yaer.id !== 3) return;
      this.shopPageIndex = 2;
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
     position: relative;
    background: #ccc;
     width: 100%;
    height: 100vh;
    padding: 31px 15px 40px 15px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .loader {
    background: url("../../assets/load1-bg.png");
    background-size: 100% 100%;
  }
  .loader1{
    background: url("../../assets/load2-bg.png");
    background-size: 100% 100%;
  }
  .jz {
    width: 100%;
    height: 117px;
    background:url('../../assets/juanzhou-copy.png');
    background-size:100% 100%;
  }
  .load2-jz{
    width: 100%;
    height: 117px;
    background:url('../../assets/juanzhou-copy2.png');
    background-size:100% 100%;
  }

  .main {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position:relative;
    .select {
      width: 100%;
      height: 39px;
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 18px;
      padding-left: 55px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
    }

    .mr {
      background: url("../../assets/mranniu.png");
      background-size: 100% 100%;
    }

    .xz {
      background: url("../../assets/select-copy.png");
      background-size: 100% 100%;
    }
    .flagon{
      width:54px;
      height:38px;
      position:absolute;
      right:16%;
      margin-bottom:26px;
    }
    .paint{
      width:44px;
      height:38px;
      position:absolute;
      right:-14px;
      margin-bottom:18px
    }

    .tijao {
      width: 196px;
      height: 39px;
      background: url("../../assets/tijiao.png");
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
  .main-load{
    padding:0 35px 0 38px;
    box-sizing:border-box;
  }
  .main-load2{
     display:flex;
     flex-direction:row;
     flex-wrap:wrap;
     justify-content:space-between;
     padding:0 9px 0 14px;
     box-sizing:border-box;
     .select2{
        width:141px;
        height:39px;
        padding-left: 28px;
        position:relative
     }
  }
}
</style>
