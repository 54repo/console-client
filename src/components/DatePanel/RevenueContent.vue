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
          <div class="revenue_title">{{ $t('revenue_1') }}  
            <el-tooltip class="item" effect="dark" :content=" $t('total_tips')" placement="top">
              <i class="revenue-icon el-icon-question"></i>
            </el-tooltip>
          </div>
        </div>
        <div class="revunue_value">{{(totalRevenue === '') ? '-' : totalRevenue}} BxC</div>
      </div>
      <div class="one_day_invite_revenue each_item_wrap">
        <div class="revenue_item">
          <img
            class="revenue-icon home-icon"
            src="../../assets/revenue/online_invite.png"
          >
          <div class="revenue_title">{{ $t('revenue_2') }} 
            <el-tooltip class="item" effect="dark" :content=" $t('balance_tips')" placement="top">
              <i class="revenue-icon el-icon-question"></i>
            </el-tooltip>
          </div>
        </div>
        <div class="revunue_value">{{(balance === '') ? '-' : balance}} BxC</div>
      </div>
      <div class="total_revenue each_item_wrap">
        <div class="revenue_item">
          <img
            class="revenue-icon home-icon"
            src="../../assets/revenue/person_total_revenue.png"
          >
          <div class="revenue_title">{{ $t('revenue_3')}} 
            <el-tooltip class="item" effect="dark" :content=" $t('invite_tips')" placement="top">
              <i class="revenue-icon el-icon-question"></i>
            </el-tooltip>
          </div>
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
          <div class="revenue_title">{{ $t('revenue_4') }} 
            <el-tooltip class="item" effect="dark" :content=" $t('online_tips')" placement="top">
              <i class="revenue-icon el-icon-question"></i>
            </el-tooltip>
          </div>
        </div>
        <div class="revunue_value">{{(totalOnlineRevenue === '') ? '-' : totalOnlineRevenue}} BxC</div>
      </div>
      <div class="one_day_invite_revenue each_item_wrap">
        <div class="revenue_item">
          <img
            class="revenue-icon home-icon"
            src="../../assets/revenue/online_invite.png"
          >
          <div class="revenue_title">{{ $t('revenue_5') }} 
            <el-tooltip class="item" effect="dark" :content=" $t('network_tips')" placement="top">
              <i class="revenue-icon el-icon-question"></i>
            </el-tooltip>
          </div>
        </div>
        <div class="revunue_value">{{(totalNetRevenue === '') ? '-' : totalNetRevenue}} BxC</div>
      </div>
      <div class="total_revenue each_item_wrap">
        <div class="revenue_item">
          <img
            class="revenue-icon home-icon"
            src="../../assets/revenue/person_total_revenue.png"
          >
          <div class="revenue_title">{{ $t('revenue_6')}} 
            <el-tooltip class="item" effect="dark" :content=" $t('calculate_tops')" placement="top">
              <i class="revenue-icon el-icon-question"></i>
            </el-tooltip>
          </div>
        </div>
        <div class="revunue_value">{{(totalCalculate === '') ? '-' : totalCalculate}} BxC</div>
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
    totalRevenue: state => state.revenue.totalRevenue,
    totalCalculate: state => state.revenue.totalCalculate
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
.revenue-icon{
  color: #999;
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
    "revenue_6": "Cumulative Computing Task Revenue",
    "total_tips": "Total Revenue is sum of invitation rewards, online revenue, online task revenue and computing task revenue.",
    "balance_tips": "Account Balance: the withdrawable BxC amount of this account ( Please be noted that there is a little difference with the total revenue due to the latency for the data updated into the blockchain)",
    "invite_tips": " Cumulative Invitation Bonus: the cumulative bonus from the revenue of the accounts, which registered via the invitation link of this account.",
    "online_tips": "Cumulative Online Revenue: the total revenue for keeping online of all the devices bound to this account. (Separated to show from Jan. 5, 2019, and shown in the online task revenue before)",
    "network_tips": "Cumulative Online Task Revenue: the total revenue for completing online tasks of all the devices bound to this account.",
    "calculate_tops": "Cumulative Computing Task Revenue: the total revenue for completing computing tasks of all the devices bound to this account."
  },
  "zn": {
		"revenue_1": "账号累计收益",
		"revenue_2": "账号余额",
		"revenue_3": "账号累计邀请奖励",
		"revenue_4": "账号累计在线收益",
		"revenue_5": "账号累计网络任务收益",
    "revenue_6": "账号累计计算任务收益",
    "total_tips": "账号累计总收益：账号累计收益为邀请奖励、在线收益、网络任务收益、计算任务收益相加的总和。",
    "balance_tips": "账号余额：账号余额表示账号当前可提现BxC的数量（由于数据上链存在延迟，此处显示的数据会与总收益有些许差异）.",
    "invite_tips": "账号累计邀请奖励：通过当前账号邀请链接注册的账号收益所带来的累计奖励。",
    "online_tips": "账号累计在线收益：当前账号绑定的所有硬件保持在线所获得的总收益。（从2019年1月5日开始计算，此前合并于网络任务收益。）",
    "network_tips": "账号累计网络任务收益：当前账号绑定的所有硬件完成网络任务所获得的总收益。",
    "calculate_tops": "账号累计计算任务收益：当前账号绑定的所有硬件完成计算任务所获得的总收益。"
  }
}
</i18n>


