<template>
  <div class="page news">
    <common-title title="消息" isBack />
    <van-pull-refresh v-model="refreshLoading" @refresh="onRefresh">
      <loading-page v-if="pageLoading" type="loading" />
      <div class="news-box">
        <div
          class="news-box_item"
          v-for="item in messageList"
          :key="item.id"
          @click="debounceEvent(item)"
        >
          <div class="news-box_item-list rmb">
            <div class="t">{{ item.push_time | momentTime(true) }}</div>
          </div>
          <div class="news-box_item-list count">
            <div class="t">{{ item.content }}</div>
          </div>
          <div class="news-box_item-list month">
            <i class="iconfont icongengduo"></i>
          </div>
        </div>
      </div>
      <div class="news-empty" v-show="messageList.length < 1">
        <van-empty
          class="custom-image"
          image="https://img.yzcdn.cn/vant/custom-empty-image.png"
          description="暂无信息"
        />
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import { PullRefresh, Empty } from "vant";
import CommonTitle from "@/components/common/CommonTitle.vue";
import { queryPushList } from "@/api/user";
import LoadingPage from "@/components/common/LoadingPage.vue";
import { debounce } from "@/utils/util";
import storage from "@/utils/storage";
import { versions } from "@/utils/browser";

export default {
  name: "news",
  components: {
    CommonTitle,
    LoadingPage,
    [PullRefresh.name]: PullRefresh,
    [Empty.name]: Empty
  },
  data() {
    return {
      messageList: [],
      pageLoading: true,
      refreshLoading: false
    };
  },

  methods: {
    debounceEvent: debounce(item => {
      // queryPushSetRead({
      //   push_ids: [item.id]
      // });
      if (item.extra) {
        window.location.href = `${window.location.href.split("#")[0]}#${item.extra.url}`;
      }
    }, 500),
    onRefresh() {
      this.refreshLoading = true;
      this.init();
    },
    init() {
      if (versions.androidApp) {
        const messageList = storage.getItem("wkb_message") || [];
        console.log("messageList", messageList);
        this.messageList = messageList;
        this.pageLoading = false;
        this.refreshLoading = false;
      } else {
        queryPushList()
          .then(res => {
            if (!res) return;
            this.messageList = res;
            this.pageLoading = false;
            this.refreshLoading = false;
          })
          .finally(() => {
            this.pageLoading = false;
            this.refreshLoading = false;
          });
      }
    }
  },
  created() {
    this.init();
    console.log(new Date().valueOf());
    storage.setItem("news_time", new Date().valueOf());
  }

  // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less" scoped>
.news {
  font-size: 15px;
  padding: 0 15px 30px;

  &-empty {
    text-align: center;
  }

  .custom-image /deep/.van-empty__image {
    width: 60px;
    height: 60px;
  }

  &-box {
    &_item {
      display: flex;
      height: 60px;
      justify-content: space-between;
      background: #ffffff;
      box-shadow: 0px 5px 10px 0px rgba(215, 241, 255, 0.2);
      text-align: center;
      margin-top: 20px;
      align-items: center;
      .rmb {
        width: 100px;
        background: #e2ffff;
        color: #343434;
        font-size: 12px;
        text-align: center;
        box-shadow: 0px 0px 5px 0px rgba(86, 255, 255, 0.14);
        .b {
          color: #c2dfdf;
        }
      }

      .count {
        width: 210px;
        text-align: left;
        padding-left: 8px;
        .t {
          color: #343434;
          font-size: 15px;
          max-height: 60px;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2;
          display: -webkit-box;
          word-wrap: break-word;
          -webkit-box-orient: vertical;
          // white-space: nowrap;
        }
      }

      .month {
        width: 45px;
        line-height: 45px;
        color: #00f1f4;
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
