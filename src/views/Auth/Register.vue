<template>
  <div class="page register">
    <div class="register-box">
      <div class="register-box-title">客宴</div>
      <van-form @submit="onSubmit">
        <van-field
          class="id-code"
          left-icon="iconfont"
          icon-prefix="iconfont iconyaoqingma"
          v-model="name"
          label-align="right"
          type="numbr"
          maxlength="7"
          readonly
          :rules="[{ pattern: namePattern, message: '用户账号由系统生成' }]"
          name="name"
          placeholder="用户账号由系统生成"
        />
        <van-field
          label-align="right"
          left-icon="iconfont"
          icon-prefix="iconfont iconzhanghu"
          clearable
          v-model="referrer"
          name="referrer"
          class="code"
          maxlength="8"
          placeholder="请输入邀请码"
          :rules="[{ required: true, message: '邀请码不能为空' }]"
        />
        <van-field
          clearable
          label-align="right"
          v-model="password"
          type="password"
          name="password"
          left-icon="iconfont"
          icon-prefix="iconfont iconshurumima"
          placeholder="请设置登陆密码"
          :rules="[{ pattern: passPattern, message: '密码为8-16位包含字母和数字' }]"
        />
        <van-field
          clearable
          label-align="right"
          v-model="rePassword"
          name="rePassword"
          type="password"
          left-icon="iconfont"
          icon-prefix="iconfont iconquerenmima"
          :rules="[{ validator, message: '密码不一致' }]"
          placeholder="请再次输入登陆密码"
        />
        <van-button
          class="reg-btn"
          size="normal"
          native-type="submit"
          round
          type="primary"
          :style="{ color: '#fff', opacity: '0.9' }"
        >
          注 册
        </van-button>

        <van-button
          color="#000"
          class="login-btn"
          size="normal"
          native-type="button"
          @click="handleGoPage"
          round
          type="primary"
          :style="{ color: '#fff', opacity: '0.9' }"
        >
          登 陆
        </van-button>
      </van-form>
    </div>
  </div>
</template>
<script>
import { Button, Field, Form, Toast, Dialog } from "vant";
import storage from "@/utils/storage";
import { queryUserRegister, queryRandomName } from "@/api/auth";
import { TOKEN } from "@/store/mutation-types";

export default {
  name: "Register",
  components: {
    [Button.name]: Button,
    [Field.name]: Field,
    [Dialog.name]: Dialog,
    [Form.name]: Form
  },
  data() {
    return {
      namePattern: /\d{7}/,
      referrerPattern: /^[BCEFGHJKMPQRTVWXY2346789]{8}$/,
      passPattern: /^(?=.*\d)((?=.*[A-Z])|(?=.*[a-z]))[^]{8,16}$/,
      referrer: "",
      name: "",
      sms: "",
      password: "",
      rePassword: "",
      submitState: true
    };
  },
  created() {
    queryRandomName().then((res) => {
      console.log(res);
      this.name = res;
    });
  },
  methods: {
    validator(val) {
      return this.password === val;
    },
    onSubmit(values) {
      // const timestamp = new Date().valueOf();
      if (!this.name) {
        Toast("系统异常，没有获取到用户id");
        return;
      }
      Toast.loading({
        message: "注册中...",
        forbidClick: true,
        duration: 0
      });
      queryUserRegister({
        referrer: values.referrer,
        name: values.name,
        password: values.password
      })
        .then((res) => {
          Toast.clear();
          Toast({
            message: "注册成功"
          });
          // 跳回登录页面
          // this.$router.replace({
          //   path: this.$route.query.redirectUrl || "/",
          //   query: this.$route.query || {}
          // });

          // 去设置密保
          this.$router.replace({
            path: '/user/set_password',
          });

          storage.setItem(TOKEN, res.token);
          storage.setItem("WKB_account", JSON.stringify(values));
          storage.setItem("invite_code", res.invite_code);
          storage.setItem("user_name", res.user_name);
          // 传token给app
          this.$bridge.callhandler(
            "userlogin",
            JSON.stringify({
              name: values.name,
              password: values.password,
              token: res.token
            })
          );
        })
        .catch((err) => {
          Toast.clear();
          Toast({ duration: 5000, message: err.message });
        });
    },
    getNonce() {
      let nonce = Math.random()
        .toString(16)
        .substring(2)
        .substring(0, 11);
      if (nonce.length < 11) {
        nonce += nonce;
        nonce = nonce.substring(0, 11);
      }
      return nonce;
    },
    confirmDialog() {
      Dialog.confirm({
        title: "注册成功",
        message: "注册成功，确认进行下载APP"
      })
        .then(() => {})
        .catch(() => {});
    },
    handleGoPage() {
      this.$router.push({
        name: "login"
      });
    }
  }
};
</script>

<style lang="less" scoped>
.register {
  width: 100%;
  min-height: 100%;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  background: url("../../assets/regist-bg.png") no-repeat center/ cover;
  color: #ffffff;
  font-size: 20px;
  padding: 20px 0 0;
  text-align: center;
  &-box {
    width: 85%;
    margin: auto;

    &-title {
      margin: 115px 0 13px;
      color: #fff;
      font-size: 30px;
      &-logo {
        width: 35px;
        height: 35px;
        margin-right: 10px;
      }
    }
  }

  .id-code {
    margin: 0 !important;
    position: absolute;
    visibility: hidden;
    height: 0px;
  }

  /deep/ .van-form {
    border-radius: 15px;
    padding: 8px 0px 0px;
  }

  /deep/ .van-cell {
    background: rgba(255, 255, 255, 0);
    margin: 15px 0;
    font-size: 15px;
  }

  /deep/ .van-cell:after {
    border-bottom: 1px solid #fff;
  }

  /deep/ .van-field__label {
    margin-right: 0;
    color: #fff;
    text-align: left;
  }

  /deep/.van-field__control {
    color: rgba(255, 255, 255, 1);
  }

  /deep/.van-field__error-message {
    color: #00f1f4;
  }

  .reg-btn {
    margin: 30px 12px 16px;
    display: block;
    width: 93%;
    height: 45px;
    border: 1px transparent transparent;
    background: url("../../assets/zhuce.png") no-repeat center/ cover;
  }

  .login-btn {
    margin: 20px 16px;
    display: block;
    width: 90%;
    height: 45px;
  }

  /deep/.van-field__control::placeholder {
    color: rgba(255, 255, 255, 0.8);
  }

  /deep/.van-field--error .van-field__control::placeholder {
    color: #00f1f4;
  }

  /deep/.van-button__text {
    line-height: 35px;
  }
  /deep/ .van-field__left-icon {
    margin-right: 20px;
  }

  .btn-style {
    height: 35px;
  }

  /deep/ .iconfont {
    color: #fff !important;
    font-size: 20px;
  }
}
</style>
