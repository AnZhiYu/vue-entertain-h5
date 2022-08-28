<template>
  <div class="page password">
    <common-title title="重置密码" isBack />
    <van-form @submit="onSubmit">
      <div class="password-problem">
        <van-field
          :rules="[{ pattern: passPattern, message: '密码为8-16位包含字母和数字' }]"
          v-model="password"
          placeholder="请设置新密码"
          clearable
          name="password"
        />
      </div>
      <div class="password-problem">
        <van-field
          :rules="[{ validator, required: true, message: '密码不一致' }]"
          v-model="rePassword"
          name="rePassword"
          placeholder="请再次输入新密码"
          clearable
        />
      </div>
      <van-button class="password-btn">
        重置并登陆
      </van-button>
    </van-form>
  </div>
</template>

<script>
import CommonTitle from "@/components/common/CommonTitle.vue";
import { Field, Toast, Form, Button } from "vant";
import { updatePassword } from "@/api/user";

export default {
  name: "ResetPassword",
  components: {
    CommonTitle,
    [Field.name]: Field,
    [Button.name]: Button,
    [Form.name]: Form
  },
  data() {
    return {
      show: true,
      btnDiseable: true,
      password: "",
      rePassword: "",
      passPattern: /^(?=.*\d)((?=.*[A-Z])|(?=.*[a-z]))[^]{8,16}$/
    };
  },
  computed: {
    showMack() {
      const a = !!this.problems.find(item => item.showText === true);
      return a;
    }
  },
  created() {},
  methods: {
    onSubmit(values) {
      Toast.loading({
        message: "正在修改...",
        forbidClick: true,
        duration: 0
      });
      const { uid, password_token, time } = this.$route.query;
      updatePassword({ ...values, uid, password_token, time }).then(() => {
        Toast({
          message: "修改成功",
        });
        this.$router.replace({
          path: '/auth/login',
        });
      }).catch((err) => {
        Toast.clear();
        Toast({ message: err.message });
      });

      // queryUserRegister({
      //   referrer: values.referrer,
      //   name: values.name,
      //   password: values.password
      // })
      //   .then((res) => {
      //     Toast.clear();
      //     Toast({
      //       message: "注册成功"
      //     });
      //     this.$router.replace({
      //       path: this.$route.query.redirectUrl || "/",
      //       query: this.$route.query || {}
      //     });
      //     storage.setItem(TOKEN, res.token);
      //     storage.setItem("WKB_account", JSON.stringify(values));
      //     storage.setItem("invite_code", res.invite_code);
      //     storage.setItem("user_name", res.user_name);
      //     // 传token给app
      //     this.$bridge.callhandler("userlogin", res.token);
      //   })
      //   .catch((err) => {
      //     Toast.clear();
      //     Toast({ duration: 5000, message: err.message });
      //   });
    },
    validator(val) {
      return this.password === val;
    },
    hanleChangeAnswer() {
      console.log("blur");
      const btnStatus = !!this.problems.find(item => item.answer.trim() === "");
      this.btnDiseable = btnStatus;
    },
    handleClikeCelect(answerId, index, item) {
      if (item.disabled) {
        return;
      }
      this.problems[answerId].text = item.text;
      this.problems[answerId].showText = false;
      this.problems[answerId].problemId = item.key;
      // this.selects[index].disabled = true;
    },
    handleClikeAnswer(id) {
      this.problems[id].showText = true;
      this.handleAllDisable();
      this.problems.forEach((item, index) => {
        console.log("item----->", item);
        if (item.problemId !== "" && index !== id) {
          this.selects[item.problemId].disabled = true;
        }
      });
    },
    handleAllDisable() {
      this.selects = this.selects.map(item => ({
        ...item,
        disabled: false
      }));
    },
    handleShowMack() {
      this.problems = this.problems.map(item => ({
        ...item,
        showText: false
      }));
    }
  },
  mounted() {}
  // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less" scoped>
.password {
  font-size: 15px;
  padding: 0 34px;
  .mask {
    // background-color: #000;
    // opacity: 0.3;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  &-problem {
    display: flex;
    align-items: center;
    margin-top: 20px;
  }

  /deep/ .van-cell {
    line-height: 44px;
    // height: 44px;
    padding: 0 10px;
    margin: 0 10px;
  }

  /deep/ .van-field__control {
    // height: 44px;
  }

  &-btn {
    margin-top: 38px;
    width: 310px;
    height: 40px;
    background: #242424;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.21);
    text-align: center;
    border-radius: 20px;
    color: #00f2f4;
    line-height: 40px;
  }
  &-diseable {
    margin-top: 38px;
    width: 310px;
    height: 40px;
    background: #dfdfdf;
    text-align: center;
    border-radius: 20px;
    color: #ffffff;
    line-height: 40px;
  }
}
</style>
