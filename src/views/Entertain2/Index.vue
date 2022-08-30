<!-- eslint-disable no-console -->
<!-- eslint-disable vue/valid-v-for -->
<!-- eslint-disable max-len -->
<template>
  <div class="page user">
    <div v-if="shopPageIndex === 1" class="loader wrap">
      <div class="book">
        <div class="book-box" :style="{ width: handleProcess + '%' }">
          <div class="book-box_l"></div>
          <div class="book-box_c"></div>
          <div class="book-box_r"></div>
        </div>
      </div>
      <!-- <div class="jz"></div> -->

      <div class="main main-load">
        <div
          class="select"
          v-for="(item, index) in tabSelectYear"
          :key="index"
          :class="`${selectIndex === item.id ? 'xz' : 'mr'}`"
          @click="toSelect(item, index)"
        >
          <img src="../../assets/flagon.png" v-if="item.id === selectIndex" class="flagon" />
          {{ item.name }}
        </div>
        <div class="tijao" @click="answer">
          {{ current_yaer.id === 3 ? "恭喜，快来开席吧~" : "答错了，再来一次吧~" }}
        </div>
      </div>
    </div>
    <div v-if="shopPageIndex === 2" class="loader1 wrap">
      <!-- <div class="load2-jz"></div> -->
      <div class="book">
        <div class="book-box" :style="{ width: handleProcess + '%' }">
          <div class="book-box_l"></div>
          <div class="book-box_c"></div>
          <div class="book-box_r"></div>
        </div>
      </div>
      <div class="main main-load2">
        <div class="select select2" v-for="(item, index)  in tabSelectFood" :key="index"
          :class="`${item.isChecked ? 'xz' : 'mr'}`" @click="toSelect(item, index, '2')">
          <img src="../../assets/paint-brush.png" v-if="item.isChecked" class="paint">
          {{ item.name }}
        </div>
        <div class="btn">
          <div class="tijao" @click="selectFood">{{!foodList.length? '请选择喜欢的美食':'下一题'}}</div>
        </div>
      </div>
    </div>
    <div v-if="shopPageIndex === 3" class="loader2 wrap">
      <!-- <div class="load3-jz"></div> -->
      <div class="book">
        <div class="book-box" :style="{ width: handleProcess + '%' }">
          <div class="book-box_l"></div>
          <div class="book-box_c"></div>
          <div class="book-box_r"></div>
        </div>
      </div>
      <div class="main main-load2">
        <div class="select select2" v-for="(item, index)  in appliancesList" :key="index"
          :class="`${selectIndex === item.id ? 'xz' : 'mr'}`" @click="toSelect(item, index)">
          <img src="../../assets/paint-brush.png" v-if="item.id === selectIndex" class="paint">
          {{ item.name }}
        </div>
        <div class="btn">
          <div class="tijao" @click="selectAppliances">{{!selectIndex ? '请选择喜欢的饮具':'下一题'}}</div>
        </div>
      </div>
    </div>
    <div v-if="shopPageIndex === 4" class="loader3 wrap">
      <div class="load4-jz"></div>
      <div class="main main-load3">
        <div class="select select3" v-for="(item, index)  in wineList" :key="index"
          :class="`${selectIndex === item.id ? 'xz' : 'mr'}`" @click="toSelect(item, index)">
          <img src="../../assets/paint-brush.png" v-if="item.id === selectIndex" class="paint">
          {{ item.name }}
        </div>
        <div class="btn">
          <div class="tijao" @click="selectWine">{{!selectIndex ? '请选择喜欢的美酒':'下一题'}}</div>
        </div>
      </div>
    </div>
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
      foodList: [],
      tabSelectYear: [
        { id: 1, name: "A.秦朝" },
        { id: 2, name: "B.唐朝" },
        { id: 3, name: "C.辛亥革命时期" }
      ],
      tabSelectFood: [
        { id: 1, name: "1.米饭", isChecked: false },
        { id: 2, name: "2.熟肉", isChecked: false },
        { id: 3, name: "3.小碟酱料", isChecked: false },
        { id: 4, name: "4.青菜", isChecked: false },
        { id: 5, name: "5.点心", isChecked: false },
        { id: 6, name: "6.鱼", isChecked: false },
        { id: 7, name: "7.汤", isChecked: false },
        { id: 8, name: "8.蜜饯", isChecked: false },
        { id: 9, name: "9.宜宾燃面", isChecked: false }
      ],
      appliancesList: [{ id: 1, name: '1. 觥' }, { id: 2, name: '2. 觚' }, { id: 3, name: '3. 尊' }, { id: 4, name: '4.爵' }],
      wineList: [{ id: 1, name: '1. 五粮液元旦纪念酒' }, { id: 2, name: '2. 第八代五粮液' }, { id: 3, name: '3. 九龙坛·蓝坛' }, { id: 4, name: '4. 经典五粮液' }, { id: 5, name: '5. 39℃五粮液' }],
    };
  },
  computed: {
    handleProcess() {
      if (this.expand > 99) {
        // console.log('this.expand', this.expand);
        clearInterval(this.timer);
        // this.changeIndex();
      }
      return this.expand;
    }
  },
  methods: {
    toSelect(item, index, val) {
      this.current_yaer = item;
      this.selectIndex = item.id;
      switch (val) {
        case "2":
          this.foodList.push(item);
          this.foodList = [...new Set(this.foodList)];
          if (!this.tabSelectFood[index].isChecked) {
            this.tabSelectFood.forEach((itemed) => {
              // eslint-disable-next-line no-param-reassign
              if (item.id === itemed.id) itemed.isChecked = true;
            });
          } else {
            this.tabSelectFood[index].isChecked = false;
            this.$set(this.tabSelectFood, this.tabSelectFood[index].isChecked, false);
            this.foodList.forEach((itemL, indexL) => {
              if (item.id === itemL.id) {
                this.foodList.splice(indexL, 1);
              }
            });
          }
          break;
        default:
          break;
      }
    },
    answer() {
      if (this.current_yaer.id !== 3) return;
      this.shopPageIndex = 2;
      this.selectIndex = 0;

      // 开始画卷
      this.resetBook();
    },
    selectFood() {
      this.shopPageIndex = 3;
      this.selectIndex = 0;
      // 开始画卷
      this.resetBook();
    },
    selectAppliances() {
      this.shopPageIndex = 4;
      this.selectIndex = 0;
    },
    selectWine() {
      return false;
    },
    resetBook() {
      clearInterval(this.timer);
      this.expand = 6;
      this.loadingProcess();
    },
    loadingProcess() {
      this.expand += 1;
      this.timer = setInterval(() => {
        this.expand += 0.1;
      }, 5);
    }
  },
  created() {
    // this.getDot();
    // this.init();
  },
  mounted() {}
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
    position: absolute;
    z-index: 4;
  }

  .loader1 {
    background: url("../../assets/load2-bg.png");
    background-size: 100% 100%;
  }

  .loader2 {
    background: url("../../assets/load3-bg.png");
    background-size: 100% 100%;
  }
  .loader3{
    background: url("../../assets/load4-bg.png");
    background-size: 100% 100%;
  }
  .jz {
    width: 100%;
    height: 117px;
    background: url("../../assets/juanzhou-copy.png");
    background-size: 100% 100%;
  }

  .book {
    width: 323px;
    height: 109px;
    margin: 0 auto;

    .book-box {
      width: 100%;
      height: 109px;
      position: relative;
      overflow: hidden;

      &_l {
        width: 10px;
        height: 109px;
        background: #a92a2a;
        position: absolute;
        left: 0;
        top: 0;
        background: url("../../assets/book-l.png") no-repeat center/ cover;
      }
      &_c {
        width: 319px;
        height: 93px;
        background: #fff;
        background: url("../../assets/book.png") no-repeat;
        margin-top: 5px;
      }
      &_r {
        width: 10px;
        height: 109px;
        background: blue;
        position: absolute;
        right: -1px;
        top: 0;
        background: url("../../assets/book-r.png") no-repeat center/ cover;
      }
    }
  }

  .load2-jz {
    width: 100%;
    height: 117px;
    background: url("../../assets/juanzhou-copy2.png");
    background-size: 100% 100%;
  }

  .load3-jz {
    width: 100%;
    height: 117px;
    background: url("../../assets/juanzhou-copy3.png");
    background-size: 100% 100%;
  }
  .load4-jz{
    width: 100%;
    height: 117px;
    background: url('../../assets/juanzhou-copy4.png');
    background-size: 100% 100%;
  }
  .main {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

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

    .flagon {
      width: 54px;
      height: 38px;
      position: absolute;
      right: 16%;
      margin-bottom: 26px;
    }

    .paint {
      width: 44px;
      height: 38px;
      position: absolute;
      right: -14px;
      margin-bottom: 18px;
    }

    .btn {
      width: 100%;
      display: flex;
      justify-content: center;
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

  .main-load {
    padding: 0 35px 0 38px;
    box-sizing: border-box;
  }

  .main-load2 {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 9px 0 14px;
    box-sizing: border-box;

    .select2 {
      width: 141px;
      height: 39px;
      padding-left: 28px;
      position: relative;
    }
  }
  .main-load3{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    // padding: 0 9px 0 14px;
    box-sizing: border-box;
    .select3{
      position: relative;
      width: 160px;
      height: 36px;
      padding-left: 16px;
      box-sizing: border-box;
    }
  }
}
</style>
