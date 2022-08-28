<template>
  <div class="page user">
      首页
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
      showFrozen: false,
      myInterval: null
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
  font-size: 15px;
  padding: 0 20px;
  padding-bottom: 59px;
  padding-top: 44px;
}
</style>
