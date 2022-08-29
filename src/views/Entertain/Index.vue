<template>
  <div class="page user">
    <Transition mode="out-in" name="fade">
      <div v-show="shopPageIndex1" class="pageloading wrap">
        <img class="pageloading-pemo" src="../../assets/pemo.png" />
        <div class="pageloading-loading">
          <div class="pageloading-loading_active" :style="{ width: process + '%' }"></div>
          <div class="pageloading-loading_bg"></div>
          <div class="pageloading-loading_border"></div>
        </div>
        <div class="pageloading-count">{{ this.handleProcess }}%</div>
        <!-- <img class="pageloading-loading" src="../../assets/pemo.png" /> -->
      </div>
    </Transition>
    <Transition appear mode="out-in">
      <div v-show="shopPageIndex2" class="page2 wrap">
        <!-- <transition appear>
          <p v-if="show">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit .
            Mauris facilisis enim libero, at
            lacinia diam fermentum id. Pellentesque habitant morbi tristique senectus et netus.
          </p>
        </transition> -->
        <div class="page2-t"></div>
        <div class="page2-m"></div>
        <div class="page2-w"></div>

        <div class="page2-b" @click="goAnswer"></div>
      </div>
    </Transition>
    <Transition appear mode="out-in">
      <answer-wrap v-show="shopPageIndex3"></answer-wrap>
    </Transition>
    <!-- <button @click="show = !show">Toggle</button> -->
    <!-- <div class="answer1 wrap">
      答题
    </div>
    <div class="loader3 wrap">4</div>
    <div class="loader4 wrap">4</div>
    <div class="loader5 wrap">4</div> -->
  </div>
</template>

<script>
// queryCoinExchange,
// queryCoinExchangeList,
import answerWrap from "../Entertain2/Index.vue";

export default {
  name: "user",
  // eslint-disable-next-line vue/no-unused-components
  components: { answerWrap },
  data() {
    return {
      shopPageIndex1: true,
      shopPageIndex2: false,
      shopPageIndex3: false,
      process: 51,
      timer: null,
      show: false
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
      this.shopPageIndex2 = true;
    },
    goAnswer() {
      this.shopPageIndex3 = true;
      this.shopPageIndex1 = false;
      this.shopPageIndex2 = false;
    }
  },
  created() {
    this.loadingProcess();
    // this.init();
  },
  mounted() {
    this.show = true;
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
.v-enter,
.v-leave-to {
  opacity: 0;
  // transform: translateY(80px);
}

.v-enter-to,
.v-leave {
  opacity: 1;
}

.v-enter-active,
.v-leave-active {
  transition: all 1s ease;
}

/* 下面的.v-move和。v-leave-active配合使用   能够实现列表后续的元素   渐渐的票上来的效果 */
/* 当你设置移除的时候  它会默认占据最小的高度  你设置一下li的最小高度就可以了
        如果没有这两行，元素删除后，它会很生硬的挤上去
         */
.v-move {
  transition: all 0.6s ease;
}

.v-leave-active {
  position: absolute;
}

.user {
  // font-size: 15px;
  // padding: 0 20px;
  // padding-bottom: 59px;
  // padding-top: 44px;
  // background: #d18106;

  .wrap {
    background: #ccc;
    height: 100vh;
    position: relative;
  }

  .pageloading {
    position: absolute;
    background: url("../../assets/page2.png") no-repeat;
    width: 100%;
    background-size: 100% auto;
    background-position: center center;
    z-index: 1;

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

  .page2 {
    width: 100%;
    background: url("../../assets/page2.png") no-repeat;
    background-size: cover;
    background-position: center center;
    z-index: 2;

    &-t {
      width: 82px;
      height: 205px;
      position: absolute;
      top: 29px;
      right: 18px;
      background-image: url("../../assets/pemo2.png");
      background-position: top left;
      background-size: 100% auto;
      background-repeat: no-repeat;
      -webkit-animation: upAndDownPemo 3s linear 0s; /* Safari 与 Chrome */
    }

    &-w {
      width: 246px;
      height: 66px;
      position: absolute;
      left: 0;
      right: 0;
      margin: 0 auto;
      bottom: 99px;
      background-image: url("../../assets/want.png");
      background-position: top left;
      background-size: 100% auto;
      background-repeat: no-repeat;
    }
    &-m {
      width: 245px;
      height: 356px;
      position: absolute;
      top: 139px;
      left: 0;
      right: 0;
      margin: 0 auto;
      background-image: url("../../assets/leter.png");
      background-position: top left;
      background-size: 100% auto;
      background-repeat: no-repeat;
      -webkit-animation: upAndDown 4s linear 0s; /* Safari 与 Chrome */
    }
    &-b {
      width: 163px;
      height: 38px;
      position: absolute;
      // top: 583px;
      left: 0;
      right: 0;
      margin: 0 auto;
      top: 90%;
      // animation: myfirst 5s;
      -webkit-animation: myfirst2 0.8s linear 0s infinite alternate; /* Safari 与 Chrome */
      object-fit: scale-down;
      background-image: url("../../assets/button2.png");
      background-position: center center;
      background-size: contain;
      background-repeat: no-repeat;
    }

    @keyframes myfirst {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
    @keyframes upAndDown {
      0% {
        height: 0px;
      }
      100% {
        height: 356px;
      }
    }

    @keyframes upAndDownPemo {
      0% {
        height: 0px;
      }
      100% {
        height: 356px;
      }
    }

    @keyframes myfirst2 {
      0% {
        height: 25px;
      }
      100% {
        height: 38px;
      }
    }
  }
  .answer1 {
    background: url("../../assets/answerbg1.png") no-repeat center/ cover;
    width: 100%;
    z-index: 3;
    position: absolute;
  }
}
</style>
