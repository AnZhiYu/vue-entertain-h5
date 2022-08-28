<template>
  <div class="page statistic">
    <common-title title="数据统计" isBack />
    <loading-page v-if="pageLoading" type="loading" />
    <div class="statistic-title">总推荐人数：{{ inviteTotal | formatNumber }}人</div>
    <div class="statistic-box" v-for="item in achievementlist" :key="item.level">
      <div class="statistic-box_item">
        <div class="statistic-box_item-list rmb">
          <div class="t">{{ item.rmb }}</div>
          <div class="b">RMB</div>
        </div>
        <div class="statistic-box_item-list count">
          <div class="t">{{ item.total_active }}</div>
          <div class="b">总人次</div>
        </div>
        <div class="statistic-box_item-list month">
          <div class="t">{{ item.month_active }}</div>
          <div class="b">最近一个月活跃人次</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommonTitle from "@/components/common/CommonTitle.vue";
import { queryUserAchievement } from "@/api/user";
import LoadingPage from "@/components/common/LoadingPage.vue";

export default {
  name: "Statistic",
  components: {
    CommonTitle,
    LoadingPage
  },
  data() {
    return {
      inviteTotal: 0,
      achievementlist: [],
      pageLoading: true
    };
  },
  created() {
    queryUserAchievement().then((res) => {
      console.log(res);
      this.pageLoading = false;
      this.inviteTotal = res.inviteTotal;
      this.achievementlist = res.Achievement;
    });
  },

  // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less" scoped>
.statistic {
  font-size: 15px;
  padding: 0 15px;

  &-title {
    text-align: center;
    margin: 0 auto;
    width: 290px;
    height: 29px;
    line-height: 29px;
    // border: 1px solid #00f1f4;
    border: 2px solid;
    border-image: linear-gradient(35deg, #00f1f4 45%, #00f1f4 50%, #f42678 55%, #f42678 100%) 10;
    box-shadow: inset 0px 3px 2px 0px rgba(244, 38, 120, 0.1),
      0px 3px 2px 0px rgba(244, 38, 120, 0.1);
    border-radius: 1px;
    margin: 23px auto 7px;
    margin-bottom: 20px;
  }

  &-box {
    &_item {
      display: flex;
      height: 60px;
      justify-content: space-between;
      background: #ffffff;
      box-shadow: 0px 5px 10px 0px rgba(215, 241, 255, 0.2);
      text-align: center;
      margin-bottom: 15px;
      .rmb {
        width: 100px;
        background: #e2ffff;
        text-align: center;
        box-shadow: 0px 0px 5px 0px rgba(86, 255, 255, 0.14);
        .t {
        }
        .b {
          color: #c2dfdf;
        }
      }

      .count {
        width: 100px;
        .b {
          font-size: 12px;
        }
      }

      .month {
        width: 145px;
        font-size: 12px;
        .t {
          color: #f42678;
        }
      }
      &-list {
        line-height: 25px;
        padding: 5px 0;
        .t {
          font-size: 15px;
        }
        .b {
          color: #b8b8b8;
        }
      }
    }
  }
}
</style>
