<template>
  <div class="page fqa">
    <!-- <common-title title="FQA" /> -->
    <div class="fqa-title">
      微客宝核心规则
    </div>
    <text-item order="1">
      10个单元，分别是：<br />
      200，400，800，1600，3200，6400，12800，25600，51200，102400，<br />
      每一级是上一级的2倍，<span class="theme-blue"> 价值单位为RMB </span>。
    </text-item>

    <text-item order="2">
      开通每个单元，需要先购买<span class="theme-blue"> YUAN积分 </span>（与位置价值相同）方可参与。
    </text-item>

    <text-item order="3">
      交易大厅采用去中心化撮合交易系统，<span class="theme-blue"
        >【YUAN 挂卖方】获得100%价值的RMB</span
      >,【YUAN挂买方】获得交易价值90%的YUAN,
      <span class="theme-red"> 10%的YUAN作为平台手续费 </span>。
    </text-item>

    <div class="fqa-title">
      X3矩阵规则
    </div>
    <text-item order="1">
      所有分享关系，根据邀请码绑定，不可更改。
    </text-item>
    <text-item order="2">
      直接分享，获得100%的收益。
    </text-item>

    <text-item order="3">
      直接分享,
      <span class="theme-blue">逢“3”的倍数</span
      >，也即分享的第3，6，9，12…次滑落至上家；也即，分享的第1，2单归自己，第3单归上家，第4，5单归自己，第6单归上家，以此类推。
    </text-item>

    <text-item order="4">
      若下家上滑的奖励，正好也是上家的第 3N 单（即3的倍数）<span class="theme-blue"
        >继续滑落至上家的上家</span
      >，以此类推，直至没有上家的顶层位置。
      <img class="img-box" src="../../assets/tubiao.png" />
    </text-item>

    <div class="fqa-title" style="width: 270px">
      矩阵位置说明与实时提醒机制
    </div>

    <text-item order="1">
      如果你的下家位置单元比你高
      （如400位置比200高，25600位置比12800，6400，3200，800，400，200的位置高），那么下家逢“3”倍数的奖励，将无法归属自己直至滑落到<span
        class="theme-blue"
        >同位置的上家或更高位置的上家</span
      >
      ，以此类推。
    </text-item>

    <text-item order="2">
      每次位置升级，采用“向下关联”式升级，如开通800的位置，则400，200位置需一并开通；
      如开通3200的位置，则3200，1600，800，400，200的位置需一并开通，以此类推。
    </text-item>

    <text-item order="3">
      微客宝系统会实时提醒你的下家的动态，按照“逢高提醒”机制，如你的位置是800，下家开通了1600，6400的位置，则系统会提醒下家的ID，已开通了6400的位置。
    </text-item>

    <div class="fqa-title" style="width: 170px">
      微客宝令牌WKB
    </div>

    <text-item order="1">
      总计发行500万个令牌，每个令牌对应微客宝特殊权益，特殊权益另行说明：
      <p class="list-dot">第一年，激活100万个令牌</p>
      <p class="list-dot">第二年，激活150万个令牌</p>
      <p class="list-dot">第三年，激活250万个令牌</p>
    </text-item>

    <text-item order="2">
      每次开通一单，涵盖多少个位置就激活相应数量令牌。<br />
      <span class="text-type">200 = 0.125个 WKB </span>
      <span class="text-type">400 = 0.25 个 WKB</span>
      <span class="text-type">800 = 0.5个 WKB </span>
      <span class="text-type">1600 = 1个 WKB</span>
      <span class="text-type">3200 = 2个 WKB </span>
      <span class="text-type">6400 = 4个 WKB</span>
      <span class="text-type">12,800 = 8个 WKB </span>
      <span class="text-type">25,600 = 16个 WKB</span>
      <span class="text-type">51,200 = 32个 WKB </span>
      <span class="text-type">102,400 = 64个 WKB </span>
    </text-item>

    <div class="fqa-title" style="width: 170px">
      YUAN分红规则
    </div>
    <text-item order="1">
      个人分红——<span class="theme-blue">每日YUAN交易量的5%</span
      ><br />个人分红=（个人持有WKB令牌数 / 已激活WKB令牌总数）*
      <span class="theme-red">昨日</span> YUAN总交易量 * 5%
      <p class="list-dot">
        <b>分红时间：</b><br />
        <span class="theme-blue">次日凌晨5:00</span>
      </p>
      <p class="list-dot">
        <b>分红标的：</b><br />昨日交易量的YUAN，分红存入<span class="theme-blue">YUAN钱包</span>
      </p>
      <p class="list-dot">
        <b>昨日YUAN总交易量计算：</b><br />
        昨日<span class="theme-blue">00:00~23:59</span>YUAN交易量的总和
      </p>
    </text-item>
    <text-item order="2">
      团队分红——<span class="theme-blue">每日YUAN交易量的5%</span><br />
      <p class="list-dot">
        <b> 团队分红触发的条件： </b><br />个人直接分享所有用户<span class="theme-blue"
          >（不含自己交易量）</span
        ><br /><span class="theme-red">自始累计YUAN交易总量</span>达到100,000
      </p>
      <p class="list-dot">
        <b>团队分红的范围： </b><br />触发分红条件的用户（自己） +
        直接分享此用户的直属5个上级（都是直接分享关系）
      </p>
      <p class="list-dot">
        <b>团队分红池： </b><br />团队分红池<span class="theme-blue">M</span
        >=自始累计YUAN交易总量（超过100,000为前提）*5% <br />
        <span class="theme-red">备注：</span>分配后团队<span class="theme-red">分红池即清零</span
        >，直至累计到下一个触发团队分红的条件
      </p>
      <p class="list-dot">
        <b>团队分配权重如下： </b><br />达到业绩的用户（自己）：M*50%<br />
        直接分享上级第1级：M*25%<br />
        直接分享上级第2级：M*13%<br />
        直接分享上级第3级：M*7%<br />
        直接分享上级第4级：M*3%<br />
        直接分享上级第5级：M*2%
      </p>
      <p class="list-dot">
        <b>分红时间：</b><br />
        <span class="theme-blue">次日凌晨5:00</span>
      </p>
    </text-item>

    <div class="fqa-title" style="width: 290px">
      X4矩阵规则（2020年12月份推出）
    </div>
    <bottom-tab-bar :defaultActive="2" />
  </div>
</template>

<script>
import BottomTabBar from "@/components/common/BottomTabBar.vue";
import storage from "@/utils/storage";
import { TOKEN } from "@/store/mutation-types";
import TextItem from "./components/TextItem.vue";

export default {
  name: "FQA",
  components: {
    BottomTabBar,
    TextItem
  },
  data() {
    return {};
  },
  methods: {
    clearStorage() {
      console.log(process.env.NODE_ENV);
      if (process.env.NODE_ENV === "development") {
        console.log("清除缓存");
        storage.setItem(TOKEN, null);
        localStorage.clear();
      }
    }
  }
};
</script>
<style lang="less" scoped>
.fqa {
  font-size: 15px;
  padding: 0 25px 25px;
  padding-bottom: 59px;
  color: #343434;

  .theme-blue {
    color: #00f1f4;
  }
  .text-type {
    width: 50%;
    display: inline-block;
    white-space: nowrap;
  }
  .theme-red {
    color: #f42678;
  }

  .img-box {
    width: 245px;
    height: 270px;
  }

  .list-dot {
    margin: 0;
    position: relative;
    padding-left: 20px;
    margin-top: 5px;
    &::before {
      content: "";
      display: block;
      position: absolute;
      top: 10px;
      left: 5px;
      width: 5px;
      height: 5px;
      background: #00f1f4;
      border-radius: 50%;
    }
  }
  &-title {
    text-align: center;
    margin: 0 auto;
    width: 180px;
    height: 29px;
    line-height: 29px;
    color: #343434;
    border: 2px solid;
    border-image: linear-gradient(35deg, #00f1f4 45%, #00f1f4 50%, #f42678 55%, #f42678 100%) 10;
    box-shadow: inset 0px 3px 2px 0px rgba(244, 38, 120, 0.1),
      0px 3px 2px 0px rgba(244, 38, 120, 0.1);
    border-radius: 1px;
    margin: 25px auto 25px;
  }
}
</style>
