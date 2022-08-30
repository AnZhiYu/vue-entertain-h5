<!-- eslint-disable no-console -->
<!-- eslint-disable vue/valid-v-for -->
<!-- eslint-disable max-len -->
<template>
  <div class="page user">
    <Transition mode="out-in">
      <div v-if="shopPageIndex === 1" class="loader wrap">
        <div class="book">
          <div class="book-box" :style="{ width: handleProcess + '%' }">
            <div class="book-box_l"></div>
            <div class="book-box_c book1"></div>
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
          <Transition name="answer">
            <div v-if="current_yaer.id" class="tijao" @click="answer">
              {{ current_yaer.id === 3 ? "恭喜，快来开席吧~" : "答错了，再来一次吧~" }}
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
    <Transition mode="out-in">
      <div v-if="shopPageIndex === 2" class="loader1 wrap">
        <!-- <div class="load2-jz"></div> -->
        <div class="book">
          <div class="book-box" :style="{ width: handleProcess + '%' }">
            <div class="book-box_l"></div>
            <div class="book-box_c book2"></div>
            <div class="book-box_r"></div>
          </div>
        </div>
        <div class="main main-load2">
          <div
            class="select select2"
            v-for="(item, index) in tabSelectFood"
            :key="index"
            :class="`${item.isChecked ? 'xz-short' : 'mr-short'}`"
            @click="toSelect(item, index, '2')"
          >
            <img src="../../assets/paint-brush.png" v-if="item.isChecked" class="paint" />
            {{ item.name }}
          </div>
          <div class="btn">
            <div v-if="!foodList.length" class="tijao">
              请选择喜欢的美食
            </div>
            <div v-else class="tijao" @click="selectFood">
              下一题
            </div>
          </div>
        </div>
      </div>
    </Transition>
    <Transition mode="out-in">
      <div v-if="shopPageIndex === 3" class="loader2 wrap">
        <!-- <div class="load3-jz"></div> -->
        <div class="book">
          <div class="book-box" :style="{ width: handleProcess + '%' }">
            <div class="book-box_l"></div>
            <div class="book-box_c book3"></div>
            <div class="book-box_r"></div>
          </div>
        </div>
        <div class="main main-load2">
          <div
            class="select select2"
            v-for="(item, index) in appliancesList"
            :key="index"
            :class="`${selectIndex === item.id ? 'xz-short' : 'mr-short'}`"
            @click="toSelect(item, index)"
          >
            <img src="../../assets/paint-brush.png" v-if="item.id === selectIndex" class="paint" />
            {{ item.name }}
          </div>
          <div class="btn">
            <div class="btn">
              <div v-if="!selectIndex" class="tijao">
                请选择喜欢的饮具
              </div>
              <div v-else class="tijao" @click="selectAppliances">
                下一题
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
    <Transition mode="out-in">
      <div v-if="shopPageIndex === 4" class="loader3 wrap">
        <!-- <div class="load4-jz"></div> -->
        <div class="book">
          <div class="book-box" :style="{ width: handleProcess + '%' }">
            <div class="book-box_l"></div>
            <div class="book-box_c book4"></div>
            <div class="book-box_r"></div>
          </div>
        </div>
        <div class="main main-load3">
          <div
            class="select select3 padding"
            v-for="(item, index) in wineList"
            :key="index"
            :class="`${selectIndex === item.id ? 'xz4-short' : 'mr4-short'}`"
            @click="toSelect(item, index)"
          >
            <img src="../../assets/paint-brush.png" v-if="item.id === selectIndex" class="paint" />
            {{ item.name }}
          </div>
          <div class="btn">
            <div v-if="!selectIndex" class="tijao">
              请选择喜欢的美酒
              </div>
              <div v-else class="tijao" @click="selectWine">
                下一题
              </div>
          </div>
        </div>
      </div>
    </Transition>
    <Transition mode="out-in">
      <div v-if="shopPageIndex === 5" class="loader4 wrap">
        <!-- <div class="load5-jz"></div> -->
        <div class="book">
          <div class="book-box" :style="{ width: handleProcess + '%' }">
            <div class="book-box_l"></div>
            <div class="book-box_c book5"></div>
            <div class="book-box_r"></div>
          </div>
        </div>
        <div class="main main-load4">
          <div
            class="select4"
            v-for="(item, index) in alcoholList"
            :key="index"
            :class="`${selectIndex === item.id ? 'xz' : 'mr'}`"
            @click="toSelect(item, index)"
          >
            <img
              src="../../assets/flagon.png"
              v-if="item.id === selectIndex"
              class="flagon flagon5"
            />
            {{ item.name }}
          </div>

          <div v-if="current_yaer.id" class="tijao" @click="selectAlcohol">
            {{ current_yaer.id === 3 ? "下一题" : "答错了，再来一次吧~" }}
            </div>
        </div>
      </div>
    </Transition>
    <Transition mode="out-in">
      <div v-if="shopPageIndex === 6" class="loader5 wrap">
        <!-- <div class="load6-jz"></div> -->
        <div class="book">
          <div class="book-box" :style="{ width: handleProcess + '%' }">
            <div class="book-box_l"></div>
            <div class="book-box_c book6"></div>
            <div class="book-box_r"></div>
          </div>
        </div>
        <div class="main main-load5 load5">
          <div
            class="select4"
            v-for="(item, index) in freelyList"
            :key="index"
            :class="`${selectIndex === item.id ? 'xz' : 'mr'}`"
            @click="toSelect(item, index)"
          >
            <img
              src="../../assets/flagon.png"
              v-if="item.id === selectIndex"
              class="flagon flagon6"
            />
            {{ item.name }}
          </div>
          <div class="tijao" @click="drinkFreely">请选择喜欢的祝酒词</div>
        </div>
      </div>
    </Transition>
    <Transition mode="out-in">
      <div v-if="shopPageIndex === 7" class="loader7 wrap">
        <!-- <van-field
          left-icon="iconfont"
          v-model="name"
          label-align="right"
          type="text"
          maxlength="7"
          name="name"
          placeholder=""
          :rules="[{ pattern: namePattern, message: '请输入正确的账号' }]"
        /> -->
        <input type="text" class="loader7-input" v-model="name">
        <div class="loader7-btn"></div>
      </div>
    </Transition>
  </div>
</template>

<script>
// queryCoinExchange,
// queryCoinExchangeList

export default {
  name: "answer-warp",
  components: {
  },
  data() {
    return {
      name: '',
      shopPageIndex: 1,
      selectIndex: 0,
      current_yaer: {},
      foodList: [],
      tabSelectYear: [
        { id: 1, name: "A. 秦朝" },
        { id: 2, name: "B. 唐朝" },
        { id: 3, name: "C. 辛亥革命时期" }
      ],
      tabSelectFood: [
        { id: 1, name: "1. 米饭", isChecked: false },
        { id: 2, name: "2. 熟肉", isChecked: false },
        { id: 3, name: "3. 小碟酱料", isChecked: false },
        { id: 4, name: "4. 青菜", isChecked: false },
        { id: 5, name: "5. 点心", isChecked: false },
        { id: 6, name: "6. 鱼", isChecked: false },
        { id: 7, name: "7. 汤", isChecked: false },
        { id: 8, name: "8. 蜜饯", isChecked: false },
        { id: 9, name: "9. 宜宾燃面", isChecked: false }
      ],
      appliancesList: [
        { id: 1, name: "1. 觥" },
        { id: 2, name: "2. 觚" },
        { id: 3, name: "3. 尊" },
        { id: 4, name: "4. 爵" }
      ],
      wineList: [
        { id: 1, name: "1. 五粮液元旦纪念酒" },
        { id: 2, name: "2. 第八代五粮液" },
        { id: 3, name: "3. 九龙坛·蓝坛" },
        { id: 4, name: "4. 经典五粮液" },
        { id: 5, name: "5. 39℃五粮液" }
      ],
      alcoholList: [
        { id: 1, name: "A. 大米、小麦、糯米、玉米、高粱" },
        { id: 2, name: "B. 大豆、小麦、糯米、玉米、高粱" },
        { id: 3, name: "C. 大米、红豆、糯米、玉米、高粱" }
      ],
      freelyList: [
        { id: 1, name: "1. 人生得意须尽欢，莫使金樽空对月。" },
        { id: 2, name: "2. 对酒当歌，人生几何？" },
        { id: 3, name: "3. 酒逢知己千杯少" },
        { id: 4, name: "4. 一生大笑能几回，斗酒相逢须醉。" },
        { id: 5, name: "5. 烹羊宰牛且为乐，会须一饮三百杯。" },
        { id: 6, name: "6. 今日听君歌一曲，暂凭杯酒长精神。" }
      ],
      expand: 6,
      timer: null
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
            this.tabSelectFood.forEach(itemed => {
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
      this.resetBook();
    },
    selectWine() {
      this.shopPageIndex = 5;
      this.selectIndex = 0;
      this.resetBook();
    },
    selectAlcohol() {
      this.shopPageIndex = 6;
      this.selectIndex = 0;
      this.resetBook();
    },
    drinkFreely() {
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
        this.expand += 0.3;
      }, 6);
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

  .answer-enter,
  .answer-leave-to {
    opacity: 0;
    // transform: translateY(80px);
  }

  .answer-enter-to,
  .answer-leave {
    opacity: 1;
  }

  .answer-enter-active,
  .answer-leave-active {
    transition: all 1s ease;
  }

  .v-enter,
  .v-leave-to {
    opacity: 0.3;
    // transform: translateY(80px);
  }

  .v-enter-to,
  .v-leave {
    opacity: 1;
  }

  .v-enter-active {
    transition: all 0.5s ease;
  }
  .v-leave-active {
    transition: all 0.2s ease;
  }

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
    background: url("../../assets/load2-bg.png") no-repeat center/ cover;
    // background-size: 100% 100%;
  }

  .loader2 {
    background: url("../../assets/load3-bg.png") no-repeat center/ cover;
    // background-size: 100% 100%;
  }
  .loader3 {
    background: url("../../assets/load4-bg.png") no-repeat center/ cover;
    // background-size: 100% 100%;
  }
  .loader4 {
    background: url("../../assets/load5-bg.png") no-repeat center/ cover;
    // background-size: 100% 100%;
  }
  .loader5 {
    background: url("../../assets/load6-bg.png") no-repeat center/ cover;
    // background-size: 100% 100%;
  }

  .loader7{
    background: url("../../assets/load7-bg.png") no-repeat center/ cover;

    &-input{
      background: #FEE3C5;
      border: 1px solid #C0B2A4;
      width: 174px;
      height: 26px;
      position: absolute;
      top: 47%;
      right: 0;
      left: 0;
      margin: 0 auto;
      padding: 3px 10px;
      font-size: 16px;
    }

    &-btn{
      position: absolute;
      bottom: 35%;
      right: 0;
      left: 0;
      margin: 0 auto;
      width: 115px;
      height: 30px;
      background: url("../../assets/page7_btn.png") no-repeat center/ cover;
    }
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
        margin-top: 5px;
      }
      .book1 {
        background: url("../../assets/book1.png") no-repeat 6px 6px / contain;
      }
      .book2 {
        background: url("../../assets/book2.png") no-repeat 6px 6px / contain;
      }
      .book3 {
        background: url("../../assets/book3.png") no-repeat 6px 6px / contain;
      }
      .book4 {
        background: url("../../assets/book4.png") no-repeat 6px 6px / contain;
      }
      .book5 {
        background: url("../../assets/book5.png") no-repeat 6px 6px / contain;
      }
      .book6 {
        background: url("../../assets/book6.png") no-repeat 6px 6px / contain;
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
    .xz-short {
      background: url("../../assets/xz-short.png");
      background-size: 100% 100%;
    }
    .mr-short {
      background: url("../../assets/mr-short.png");
      background-size: 100% 100%;
    }
    .xz4-short {
      background: url("../../assets/xz4-short.png");
      background-size: 100% 100%;
    }
    .mr4-short {
      background: url("../../assets/mr4-short.png");
      background-size: 100% 100%;
    }
    .flagon {
      width: 54px;
      height: 38px;
      position: absolute;
      right: 16%;
      margin-bottom: 26px;
    }
    .flagon5 {
      width: 44px;
      height: 34px;
      right: 15%;
    }
    .flagon6 {
      right: 10%;
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
    height: 220px;
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
  .main-load3 {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    // padding: 0 9px 0 14px;
    box-sizing: border-box;
    .select3 {
      position: relative;
      width: 160px;
      height: 36px;
      padding-left: 16px;
      box-sizing: border-box;
    }
    .padding {
      padding-left: 25px;
      box-sizing: border-box;
    }
  }
  .main-load4,
  .main-load5 {
    width: 100%;
    display: flex;
    flex-direction: column;
    .select4 {
      height: 39px;
      padding-left: 22px;
      box-sizing: border-box;
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
    }
  }
  .main-load4 {
    padding: 0 35px;
    box-sizing: border-box;
    .select4 {
      width: 270px;
    }
  }
  .load5 {
    padding: 0 15px;
    // width: 312px;
    padding-left: 15px;
    box-sizing: border-box;
    .select4 {
      width: 100%;
    }
  }
}
</style>
