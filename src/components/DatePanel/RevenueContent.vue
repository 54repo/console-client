/** 图片验证码 **/
<template>
  <div class="BasicInput">
    <div class="revenueWrap top_total_revenue">
      <div class="one_day_revenue each_item_wrap ">
        <div class="revenue_item">
          <img
            class="revenue-icon home-icon"
            src="../../assets/revenue/online_revunue.png"
          >
          <div class="revenue_title">{{ $t('revenue_1') }} </div>
        </div>
        <div class="revunue_value">{{(totalRevenue === '') ? '-' : totalRevenue}} BxC</div>
      </div>
      <div class="one_day_invite_revenue each_item_wrap">
        <div class="revenue_item">
          <img
            class="revenue-icon home-icon"
            src="../../assets/revenue/online_invite.png"
          >
          <div class="revenue_title">{{ $t('revenue_2') }} </div>
        </div>
        <div class="revunue_value">{{(balance === '') ? '-' : balance}} BxC</div>
      </div>
      <div class="total_revenue each_item_wrap">
        <div class="revenue_item">
          <img
            class="revenue-icon home-icon"
            src="../../assets/revenue/person_total_revenue.png"
          >
          <div class="revenue_title">{{ $t('revenue_3')}}</div>
        </div>
        <div class="revunue_value">{{(totalInvite === '') ? '-' : totalInvite}} BxC</div>
      </div>
    </div>
    <div class="revenueWrap">
      <div class="one_day_revenue each_item_wrap">
        <div class="revenue_item">
          <img
            class="revenue-icon home-icon"
            src="../../assets/revenue/online_revunue.png"
          >
          <div class="revenue_title">{{ $t('revenue_4') }} </div>
        </div>
        <div class="revunue_value">{{(totalOnlineRevenue === '') ? '-' : totalOnlineRevenue}} BxC</div>
      </div>
      <div class="one_day_invite_revenue each_item_wrap">
        <div class="revenue_item">
          <img
            class="revenue-icon home-icon"
            src="../../assets/revenue/online_invite.png"
          >
          <div class="revenue_title">{{ $t('revenue_5') }} </div>
        </div>
        <div class="revunue_value">{{(totalNetRevenue === '') ? '-' : totalNetRevenue}} BxC</div>
      </div>
      <div class="total_revenue each_item_wrap">
        <div class="revenue_item">
          <img
            class="revenue-icon home-icon"
            src="../../assets/revenue/person_total_revenue.png"
          >
          <div class="revenue_title">{{ $t('revenue_6')}}</div>
        </div>
        <div class="revunue_value">暂无</div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: "RevenueContent",
  computed: mapState({
    balance: state => state.revenue.balance,
    totalInvite: state => state.revenue.totalInvite,
    totalNetRevenue: state => state.revenue.totalNetRevenue,
    totalOnlineRevenue: state => state.revenue.totalOnlineRevenue,
    totalRevenue: state => state.revenue.totalRevenue
  }),

  methods: {
    ...mapActions(["getAllRevenue", "getRevenueList"])
  },
  created() {
    this.getAllRevenue();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.revenueWrap {
  display: flex;
  justify-content: space-between;
}

.revenue_item {
  display: flex;
}

justify-content center, .revenue-icon {
  margin: 0px 8px 0 0;
  width: 14px;
  height: 14px;
  padding-top: 4px;
}

.revenue_title {
  height: 20px;
  line-height: 20px;
  font-size: 14px;
  color: #343739;
}

.revunue_value {
  text-align: left;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #65686A;
  margin: 19px 0 10px 20px;
}

.top_total_revenue .each_item_wrap {
  border-bottom: 1px solid #e3e3e7;
}

.each_item_wrap {
  width: 33%;
  padding: 20px;
  border-right: 1px solid #e3e3e7;
}
</style>

<i18n>
{
  "en": {
		"revenue_1": "Account Total Revenue",
		"revenue_2": "Account Balance",
		"revenue_3": "Cumulative Invitation Bonus",
		"revenue_4": "Cumulative Online Revenue",
		"revenue_5": "Cumulative Network Task Revenue",
		"revenue_6": "Cumulative Computing Task Revenue"
  },
  "zn": {
		"revenue_1": "账号累计收益",
		"revenue_2": "账号余额",
		"revenue_3": "账号累计邀请奖励",
		"revenue_4": "账号累计在线收益",
		"revenue_5": "账号累计网络任务收益",
		"revenue_6": "账号累计计算任务收益"
  }
}
</i18n>


