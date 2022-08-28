<template>
  <div :class="`tab-bottom ${isPx ? 'isPX' : ''}`">
    <div :class="`item ${defaultActive === 0 ? 'item-select' : ''}`" @click="goPage('0')">
      <!-- <img class="tab-img" :src="defaultActive === 0 ? index_selected : index" /> -->
      <img class="tab-img" v-if="defaultActive === 0" src="../../assets/home.png" />
      <img v-else class="tab-img" src="../../assets/home1.png" />
      <p>首页</p>
    </div>
    <div :class="`item ${defaultActive === 1 ? 'item-select' : ''}`" @click="goPage('1')">
      <!-- <img class="tab-img" :src="defaultActive === 1 ? show_selected : show" /> -->
      <img class="tab-img" v-if="defaultActive === 1" src="../../assets/jiaoyi.png" />
      <img v-else class="tab-img" src="../../assets/jiaoyi1.png" />
      <p>交易</p>
    </div>
    <div :class="`item ${defaultActive === 2 ? 'item-select' : ''}`" @click="goPage('2')">
      <!-- <img class="tab-img" :src="defaultActive === 2 ? group_selected : group" /> -->
      <img class="tab-img" v-if="defaultActive === 2" src="../../assets/faq.png" />
      <img v-else class="tab-img" src="../../assets/faq1.png" />
      <p>FQA</p>
    </div>
    <div :class="`item ${defaultActive === 3 ? 'item-select' : ''}`" @click="goPage('3')">
      <img class="tab-img" v-if="defaultActive === 3" src="../../assets/my.png" />
      <img v-else class="tab-img" src="../../assets/my1.png" />
      <p>我的</p>
    </div>
  </div>
</template>

<script>
import { versions } from "@/utils/browser";

export default {
  name: "BottomTabBar",
  props: {
    defaultActive: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      active: 0,
      isPx: versions.iphoneX,
      my: "../../assets/home.png",
      my_selected: "../../assets/home.png",
      index: "https://img1.huopin360.com/h5/icon/index1.png",
      index_selected: "https://img1.huopin360.com/h5/icon/index_selected1.png",
      group: "https://img1.huopin360.com/h5/icon/group1.png",
      group_selected: "https://img1.huopin360.com/h5/icon/group_selected1.png",
      show: "https://img1.huopin360.com/h5/icon/show.png",
      show_selected: "https://img1.huopin360.com/h5/icon/show_selected.png"
    };
  },
  mounted() {
    this.active = this.defaultActive;
  },
  methods: {
    goPage(active) {
      if (Number(active) === this.defaultActive) {
        return;
      }
      const urls = {
        0: "/",
        1: "/transaction",
        2: "/FQA",
        3: "/user"
      };
      this.$router.push({
        path: urls[active]
      });
    }
  }
};
</script>

<style lang="less" scoped>
.tab-img {
  width: 26px;
  height: 26px;
  margin-left: 4px;
}

.tab-bottom {
  width: 100%;
  height: 59px;
  box-sizing: content-box;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  box-shadow: 0px 0px 15px 0px rgba(233, 245, 253, 0.49);
  border-radius: 20px 20px 0px 0px;
  // 遮罩成是2002 不要大于遮罩z-index
  z-index: 99;
  .item {
    text-align: center;
    width: 25%;
    color: #b2c1c6;
    p {
      font-size: 12px;
      user-select: none;
    }
  }
  .item-select {
    color: @text-color-darker;
  }
}
.isPX {
  padding-bottom: 30px;
}
</style>
