<template>
  <div class="page transfer">
    <common-title title="YUAN充值申请" isBack />
    <div>
      <van-form ref="form" @submit="onSubmit" class="transfer-form">
        <van-field
          v-model="u_name"
          name="u_name"
          label="JDL注册手机"
          placeholder="JDL注册手机"
          :rules="[{ pattern: phonePattern, message: '请填写正确的手机号' }]"
        />
        <van-field
          v-model="real_name"
          name="real_name"
          label="姓名"
          placeholder="姓名"
          :rules="[{ pattern: namePattern, message: '请填写正确的姓名' }]"
        />
        <van-field
          v-model="id_card"
          name="id_card"
          label="身份证号"
          placeholder="身份证号"
          maxlength="18"
          :rules="[{ pattern: cardIdPattern, message: '请填写身份证号' }]"
        />
        <van-field
          v-model="amount"
          name="amount"
          label="JDL数量"
          :formatter="formatter"
          format-trigger="onBlur"
          type="number"
          placeholder="JDL数量"
          :rules="[{ required: true, message: '请填写JDL数量' }]"
        />
      </van-form>
    </div>
    <p class="transfer_tips">
      <span class="transfer_tips-icon"
        ><van-icon class="warning-icon" name="warning" color="#FC3E3E" size="14"
      /></span>
      <span class="transfer_tips-text"
        >注意：若输入JDL超过余额数，则转移全部余额。</span
      >
    </p>
    <div class="transfer-btn" @click="openShow">确定</div>
  </div>
</template>

<script>
import {
  Icon, Form, Field, Toast
} from "vant";
import CommonTitle from "@/components/common/CommonTitle.vue";
import { queryCoinExchange } from "@/api/user";
// import storage from "@/utils/storage";

export default {
  name: "transfer",
  components: {
    CommonTitle,
    [Icon.name]: Icon,
    [Field.name]: Field,
    [Form.name]: Form
  },
  data() {
    return {
      phonePattern: /^1[3-9]\d{9}$/,
      namePattern: /^[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*$/,
      cardIdPattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/,
      amount: null,
      id_card: null,
      real_name: null,
      u_name: null
    };
  },
  computed: {},

  methods: {
    openShow() {
      this.$refs.form.submit();
    },
    onSubmit(value) {
      Toast.loading({
        message: "提交中...",
        forbidClick: true,
        duration: 0
      });
      queryCoinExchange({
        ...value
      })
        .then(() => {
          Toast.clear();
          Toast.success("转移成功");
        })
        .catch((err) => {
          Toast.clear();
          Toast.fail({
            message: err.message,
            forbidClick: true
          });
        });
    },
    formatter(value) {
      if (value === "") {
        return value;
      }
      const val = Math.abs(value);
      if (val <= 0) {
        return 1;
      }
      return val.toFixed(3);
    }
  }
};
</script>
<style lang="less" scoped>
.transfer {
  font-size: 15px;
  padding: 0 23px;

  &-form {
    margin-top: 20px;
  }
  &-btn {
    width: 330px;
    height: 40px;
    margin: 0 auto;
    background: #242424;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.21);
    text-align: center;
    color: #00f2f4;
    line-height: 40px;
  }

  &_tips {
    padding: 5px 10px;
    width: 330px;
    text-align: left;
    display: inline-block;
    color: #9a9a9a;
    font-size: 12px;
    line-height: 15px;
    margin: 25px auto;
    background: #f5f5f5;
    border-radius: 12px;
    &-icon {
      position: relative;
      width: 13px;
      height: 13px;
      display: inline-block;
      margin: 0 3px;
      vertical-align: top;
      .warning-icon {
        position: absolute;
        top: 0px;
        left: 0px;
      }
    }

    &-text {
      display: inline-block;
      width: 280px;
      text-align: left;
      word-break: break-all;
    }
  }
}
</style>
