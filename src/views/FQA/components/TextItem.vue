<template>
  <div class="fqa-content">
    <div class="fqa-content_order">{{order}}</div>
    <div class="fqa-content_box">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "textItem",

  props: {
    order: {
      type: String,
    },
  },
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
.fqa-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  box-shadow: 0px 0px 10px 0px rgba(226, 237, 255, 0.3);
  padding: 18px 0;
  margin-bottom: 15px;
  &_order {
    width: 25px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    background: #c9fefe;
  }
  &_box {
    width: 300px;
    padding:0 12px 0 10px;
    font-size: 13px;
    line-height: 25px;
  }
}
</style>
