<!-- eslint-disable max-len -->
<template>
  <div class="page user">
    <div class="music_icon" :class="!music_off ? 'music' : 'music_off'" @click="play" />
    <Transition mode="out-in">
      <div v-show="shopPageIndex1" class="pageloading wrap">
        <img class="pageloading-pemo" src="../../assets/pemo.png" />
        <div class="pageloading-loading">
          <div class="pageloading-loading_active" :style="{ width: percent + '%' }"></div>
          <div class="pageloading-loading_bg"></div>
          <div class="pageloading-loading_border"></div>
        </div>
        <div class="pageloading-count">{{ percent }}%</div>
        <!-- <div v-show="false">
        </div> -->
        <div class="mp3" v-show="false">
          <audio
            ref="audio"
            autoplay="autoplay"
            @pause="onPause"
            @play="onPlay"
            loop="loop"
            src="https://h6.qiaomukeji.com/202205/Wuliangye/v7.2/resource/assets/bgm.mp3"
            controls="controls"
          ></audio>
        </div>
        <!-- <img class="pageloading-loading" src="../../assets/pemo.png" /> -->
      </div>
    </Transition>
    <Transition name="page2">
      <div v-show="shopPageIndex2" class="page2 wrap">
        <div class="page2-t"></div>
        <div class="page2-m"></div>
        <div class="page2-w"></div>

        <div class="page2-b" @click="goAnswer"></div>
      </div>
    </Transition>
    <Transition mode="out-in">
      <answer-wrap v-show="shopPageIndex3" ref="answer"></answer-wrap>
    </Transition>

    <Transition name="page2">
      <div v-show="resoultPage" class="end wrap">
      </div>
    </Transition>
  </div>
</template>

<script>
import answerWrap from "../Entertain2/Index.vue";

export default {
  name: "user",
  components: { answerWrap },
  data() {
    return {
      resoultPage: false,
      shopPageIndex1: true,
      shopPageIndex2: false,
      shopPageIndex3: false,
      process: 51,
      timer: null,
      show: false,
      music_off: true,
      count: 0,
      percent: "",
      imgs: [
        "/img/book-l.png",
        "/img/load1-bg.png",
        "/img/mr-short.png",
        "/img/page1_btn.png",
        "/img/precess.png",
        "/img/book-r.png",
        "/img/load2-bg.png",
        "/img/mr4-short.png",
        "/img/page1_letter.png",
        "/img/select-copy.png",
        "/img/load3-bg.png",
        "/img/mranniu.png",
        "/img/page1_want.png",
        "/img/tijiao.png",
        "/img/cloud.png",
        "/img/load4-bg.png",
        "/img/music.png",
        "/img/paint-brush.png",
        "/img/xz-short.png",
        "/img/flagon.png",
        "/img/load5-bg.png",
        "/img/music_off.png",
        "/img/pemo.png",
        "/img/xz4-short.png",
        "/img/load6-bg.png",
        "/img/page1.png",
        "/img/pemo2.png",
        "/img/book1.png",
        "/img/book2.png",
        "/img/book3.png",
        "/img/book4.png",
        "/img/book5.png",
        "/img/book6.png",
        "/img/page8_down.png",
        "/img/page8_up.png",
        "/img/page8-bg.png",
        "/img/page8-result1.png",
        "/img/page8-result2.png",
        "/img/page8-result3.png",
        "/img/page8-result4.png",
        "/img/page8-result5.png",
        "/img/page8-result6.png",
        "/img/xz6-short.png",
      ]
    };
  },

  methods: {
    controlMa3() {
      console.log(this.refs.audio, "audio");
      if (this.$refs.audio) this.$refs.audio.audioHuds = false;
    },
    changeIndex() {
      if (this.shopPageIndex1) {
        this.percent = 100;
        this.shopPageIndex2 = true;
        this.shopPageIndex1 = false;
      }
    },
    goAnswer() {
      this.shopPageIndex3 = true;
      this.shopPageIndex2 = false;
      this.play()
      // ?????????????????? ??????book
      this.$refs.answer.loadingProcess();
    },
    play() {
      if (this.music_off) {
        // ????????????
        this.$refs.audio.play();
        this.music_off = false;
      } else {
        // ????????????
        console.log("??????");
        this.music_off = true;
        this.$refs.audio.pause();
      }
    },
    // ???????????????
    onPlay() {
      this.audio.playing = true;
    },
    // ???????????????
    onPause() {
      this.audio.playing = false;
    },
    preload() {
      // eslint-disable-next-line no-restricted-syntax
      for (const img of this.imgs) {
        const image = new Image();
        image.src = img;
        image.onload = () => {
          this.count += 1;
          // ??????????????????????????????????????????percent??????
          const percentNum = Math.floor((this.count / this.imgs.length) * 100);
          this.percent = percentNum;
        };

        image.onerror = (err) => {
          console.log('error', img, err)
        }
      }
    }
  },
  created() {
    // this.loadingProcess();
    // this.init();
  },
  mounted() {
    this.show = true;
    // ?????????
    this.preload();

    // ???????????????????????????
    this.timer = setInterval(this.changeIndex, 7000);
  },
  computed: {
    handleProcess() {
      if (this.process === 100) {
        clearInterval(this.timer);
      }
      return this.process;
    }
  },
  watch: {
    count(val) {
      if (val === this.imgs.length) {
        // ?????????????????????????????????
        console.log('??????')
        clearInterval(this.timer);
        this.changeIndex();
      }
    },
    shopPageIndex2(val) {
      if (val) {
        clearInterval(this.timer);
      }
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

.page2-enter {
  opacity: 0;
}

.page2-enter-active {
  transition: opacity 1s ease;
}
.page2-leave-active {
  transition: opacity 0s ease;
}

/* ?????????.v-move??????v-leave-active????????????   ?????????????????????????????????   ??????????????????????????? */
/* ???????????????????????????  ?????????????????????????????????  ???????????????li???????????????????????????
        ?????????????????????????????????????????????????????????????????????
         */
.v-move {
  transition: all 0.6s ease;
}

.user {

  .mp3 {
    width: 30px;
    height: 30px;
    border-radius: 30px;
    position: absolute;
    z-index: 9;
  }

  .wrap {
    background: #ccc;
    height: 100vh;
    position: relative;
  }

  .pageloading {
    position: absolute;
    background: url("../../assets/page1.png") no-repeat center/ cover;
    width: 100%;
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
      background: url("../../assets/cloud.png") no-repeat center/ cover;
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
    background: url("../../assets/page1.png") no-repeat;
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
      -webkit-animation: upAndDownPemo 3s linear 0s;
      animation: upAndDownPemo 3s linear 0s;
      z-index: 2;
      /* Safari ??? Chrome */
    }

    &-w {
      width: 246px;
      height: 66px;
      position: absolute;
      left: 0;
      right: 0;
      margin: 0 auto;
      bottom: 15%;
      background-image: url("../../assets/page1_want.png");
      background-position: top left;
      background-size: 100% auto;
      background-repeat: no-repeat;
    }

    &-m {
      width: 205px;
      height: 300px;
      position: absolute;
      top: 150px;
      left: 0;
      right: 0;
      margin: 0 auto;
      background-image: url("../../assets/page1_letter.png");
      background-position: top left;
      background-size: 100% auto;
      background-repeat: no-repeat;
      -webkit-animation: upAndDown 6s linear 0s;
      /* Safari ??? Chrome */
    }

    &-b {
      width: 163px;
      height: 38px;
      position: absolute;
      // top: 583px;
      left: 0;
      right: 0;
      margin: 0 auto;
      bottom: 8%;
      // animation: myfirst 5s;
      -webkit-animation: myfirst2 0.8s linear 0s infinite alternate;
      /* Safari ??? Chrome */
      object-fit: scale-down;
      background-image: url("../../assets/page1_btn.png");
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

      50% {
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
        height: 30px;
      }

      100% {
        height: 38px;
      }
    }
  }

  .end{
    position: absolute;
    background: url("../../assets/load7-bg.png") no-repeat center/ cover;
    width: 100%;
    z-index: 1;
  }
}

.music_icon {
  width: 24px;
  height: 24px;
  position: fixed;
  right: 6px;
  top: 8px;
  z-index: 6;
}

.music {
  background-image: url("../../assets/music.png");
  background-size: 100% 100%;
}

.music_off {
  background-image: url("../../assets/music_off.png");
  background-size: 100% 100%;
}
</style>
