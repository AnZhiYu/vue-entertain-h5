<template>
  <div class="page user">
      <div  v-if="shopPageIndex === 1" class="loader wrap">1</div>
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
  components: {

  },
  data() {
    return {
      shopPageIndex: 1
    };
  },

  methods: {

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

  .wrap{
    background: #ccc;
    height: 100vh;
  }
}
</style>
