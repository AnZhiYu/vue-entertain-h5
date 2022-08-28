<template>
  <div class="page password">
    <common-title title="设置密保问题" isBack />
    <div class="mask" v-if="showMack" @click="handleShowMack"></div>
    <div v-for="(i, index) in problems" :key="i.order">
      <div class="password-problem">
        <div class="password-problem_title">{{ i.order }}</div>
        <div class="password-problem_box">
          <div class="password-problem_box-text" @click="handleClikeAnswer(index)">
            {{ i.text }}
          </div>
          <span class="password-problem_box-icon" @click="handleClikeAnswer(index)">
            <i class="iconfont iconxiangxia"></i>
          </span>
          <div class="select" v-show="i.showText">
            <div
              :class="`${item.disabled ? 'disabled' : ''} select-item`"
              v-for="(item, index2) in selects"
              :key="item.key"
              @click="handleClikeCelect(index, index2, item)"
            >
              {{ item.text }}
            </div>
          </div>
        </div>
      </div>
      <div class="password-problem">
        <div class="password-problem_title">答案</div>
        <div class="password-problem_box">
          <van-field @blur="hanleChangeAnswer" v-model="problems[index].answer" />
        </div>
      </div>
    </div>
    <div :class="btnDiseable ? 'password-diseable' : 'password-btn'" @click="handleSubimt">
      提交
    </div>
  </div>
</template>

<script>
import CommonTitle from "@/components/common/CommonTitle.vue";
import { setPasswordProtected } from "@/api/user";
import { Field } from "vant";

export default {
  name: "SetPassword",
  components: {
    CommonTitle,
    [Field.name]: Field
  },
  data() {
    return {
      show: true,
      btnDiseable: true,
      problems: [
        {
          problemId: "",
          order: "问题一",
          text: "请选择密保问题？",
          showText: false,
          answer: ""
        },
        {
          problemId: "",
          order: "问题二",
          text: "请选择密保问题？",
          showText: false,
          answer: ""
        },
        {
          problemId: "",
          order: "问题三",
          text: "请选择密保问题？",
          showText: false,
          answer: ""
        }
      ],
      selects: [
        {
          key: 1,
          disabled: false,
          text: "您的出生地是?"
        },
        {
          key: 2,
          disabled: false,
          text: "您的工作地方是？"
        },
        {
          key: 3,
          disabled: false,
          text: "您的配偶名字是?"
        },
        {
          key: 4,
          disabled: false,
          text: "您的出生省份是?"
        },
        {
          key: 5,
          disabled: false,
          text: "您的配偶生日是?"
        }
      ]
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
    handleSubimt() {
      if (this.btnDiseable) {
        return;
      }

      console.log("this.problems----", this.problems);
      const params = {
        question_1: this.problems[0].problemId,
        answer_1: this.problems[0].answer,
        question_2: this.problems[1].problemId,
        answer_2: this.problems[1].answer,
        question_3: this.problems[2].problemId,
        answer_3: this.problems[2].answer
      };

      setPasswordProtected(params).then(res => {
        console.log('resmibao', res);
        this.$router.replace({
          path: "/",
        });
      });

      console.log("提交", params);
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
          this.selects[item.problemId - 1].disabled = true;
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
    &_title {
      width: 50px;
      text-align: right;
      margin-right: 15px;
    }
    &_box {
      width: 250px;
      background: #fff;
      padding: 0 15px 0 20px;
      height: 44px;
      line-height: 44px;
      display: flex;
      justify-content: space-between;
      position: relative;

      /deep/ .van-cell {
        width: 100%;
      }

      &-text {
        width: 90%;
      }
      &-icon {
        width: 10%;
      }

      .select {
        width: 244px;
        // height: 200px;
        background: #fff;
        padding: 10px;
        line-height: 25px;
        position: absolute;
        top: 44px;
        left: 0px;
        z-index: 10;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
        &-item {
          line-height: 30px;
          border-bottom: 1px solid #fafafa;
        }

        .disabled {
          // background: #ddd;
          color: #ddd;
        }
      }
    }
  }

  /deep/ .van-cell {
    line-height: 44px;
    // height: 44px;
    padding: 0;
  }

  &-btn {
    width: 310px;
    margin-top: 38px;
    height: 40px;
    background: #242424;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.21);
    text-align: center;
    border-radius: 20px;
    color: #00f2f4;
    line-height: 40px;
  }
  &-diseable {
    width: 310px;
    margin-top: 38px;
    height: 40px;
    background: #dfdfdf;
    text-align: center;
    border-radius: 20px;
    color: #ffffff;
    line-height: 40px;
  }
}
</style>
