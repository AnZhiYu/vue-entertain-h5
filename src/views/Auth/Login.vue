<template>
  <div class="page register">
    <div class="register-box">
      <div class="register-box-title">微客宝</div>
      <van-form @submit="onSubmit">
        <van-field
          left-icon="iconfont"
          icon-prefix="iconfont iconzhanghu"
          v-model="name"
          label-align="right"
          type="tel"
          maxlength="7"
          name="name"
          placeholder="请输入账号"
          clearable
          :rules="[{ pattern: namePattern, message: '请输入正确的账号' }]"
        />
        <van-field
          clearable
          label-align="right"
          v-model="password"
          type="password"
          name="password"
          left-icon="iconfont"
          icon-prefix="iconfont iconshurumima"
          placeholder="请输入密码"
          :rules="[{ pattern: passPattern, message: '密码为8-16位包含字母和数字' }]"
        />
        <van-checkbox class="checkbox" v-model="checked" icon-size="24px" shape="square"
          >记住用户名和密码
          <span class="forget" @click="handleGoForget">忘记密码</span>
        </van-checkbox>
        <van-button
          class="login-btn"
          size="normal"
          native-type="submit"
          type="primary"
          :style="{ color: '#fff', opacity: '0.9' }"
        >
          登 陆
        </van-button>
        <van-button
          color="#000"
          class="reg-btn"
          size="normal"
          round
          type="primary"
          native-type="button"
          :style="{ color: '#fff', opacity: '0.9' }"
          @click="handleGoPage"
        >
          注 册
        </van-button>
      </van-form>
    </div>
  </div>
</template>

<script>
import { Button, Field, Cell, CellGroup, Form, Toast, Dialog, Checkbox } from "vant";
import storage from "@/utils/storage";
import { queryUserLogin } from "@/api/auth";
import { TOKEN } from "@/store/mutation-types";

export default {
  name: "login",
  components: {
    [Button.name]: Button,
    [Field.name]: Field,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Dialog.name]: Dialog,
    [Form.name]: Form,
    [Checkbox.name]: Checkbox
  },
  data() {
    return {
      namePattern: /\d{7}/,
      passPattern: /^(?=.*\d)((?=.*[A-Z])|(?=.*[a-z]))[^]{8,16}$/,
      code: "",
      name: "",
      sms: "",
      password: "",
      rePassword: "",
      submitState: true,
      checked: true
    };
  },
  created() {
    const account = storage.getItem("WKB_account");
    if (account) {
      this.name = JSON.parse(account).name;
      this.password = JSON.parse(account).password;
    }
  },
  methods: {
    validator(val) {
      return this.password === val;
    },
    onSubmit(values) {
      Toast.loading({
        message: "登录中...",
        forbidClick: true,
        duration: 0
      });
      queryUserLogin({
        ...values
      })
        .then(res => {
          storage.setItem(TOKEN, res.token);
          storage.setItem("invite_code", res.invite_code);
          storage.setItem("user_name", res.user_name);
          // 传token给app
          Toast.clear();
          Toast({
            message: "登录成功"
          });
          const data = this.$route.query;
          const redirectUrl = this.$route.query.redirectUrl || "/";
          delete data.redirectUrl;
          // console.log("登录成功----", redirectUrl, redirectUrl.split('?')[0], data);
          // this.$router.replace({
          //   path: redirectUrl.split('?')[0],
          //   query: data
          // });
          this.$router.replace({
            path: redirectUrl,
            query: data
          });
          // 账号信息存储在store；
          // 设置或者清除记录的密码
          if (this.checked) {
            storage.setItem("WKB_account", JSON.stringify(values));
          } else {
            storage.removeItem("WKB_account");
          }
          this.$bridge.callhandler("userlogin", JSON.stringify({ ...values, token: res.token }));
        })
        .catch(err => {
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
    handleGoForget() {
      this.$router.push({
        name: "checkPassword"
      });
    },
    handleGoPage() {
      const { redirectUrl = "" } = this.$route.query;
      this.$router.push({
        name: "register",
        query: {
          redirectUrl
        }
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

  .checkbox {
    padding: 0 20px;
    position: relative;
    /deep/ .van-icon {
      background-color: transparent;
      border: 1px solid #fff;
      font-size: 12px;
    }
    .forget {
      position: absolute;
      top: 1px;
      right: 40px;
      color: #fff;
    }
    /deep/ .van-checkbox__label {
      color: #fff;
      font-size: 12px;
      margin-bottom: 5px;
      margin-left: 20px;
    }
  }

  /deep/ .van-form {
    border-radius: 15px;
    padding: 8px 0px 8px;
  }

  /deep/ .van-cell {
    background: rgba(255, 255, 255, 0);
    margin: 15px 0;
    // display: block;
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

  .login-btn {
    margin: 30px 12px 16px;
    display: block;
    width: 90%;
    height: 45px;
    line-height: 45px;
    border: 1px transparent transparent;
    background: url("../../assets/zhuce1.png") no-repeat 100% 100% / contain;
  }

  .reg-btn {
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
