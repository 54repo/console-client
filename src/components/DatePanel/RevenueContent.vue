/** 图片验证码 **/
<template>
  <div class="BasicInput">
    <div class="revenueWrap">
      <!-- <div class="one_day_total_revenue each_item_wrap">
				<div class="revenue_item">
					<img  class="revenue-icon home-icon" src="../../assets/revenue/total_venue.png" >
					<div class="revenue_title">{{ $t('revenue_1') }} </div>
				</div>
				<div class="revunue_value">1917808 BxC</div>
			</div> -->
			<div class="one_day_revenue each_item_wrap">
				<div class="revenue_item">
					<img  class="revenue-icon home-icon" src="../../assets/revenue/online_revunue.png" >
					<div class="revenue_title">{{ $t('revenue_2') }} </div>
				</div>
				<!-- <div class="revunue_value">{{person_account_revenue || 0}} BxC</div> -->
				<div class="revunue_value">0 BxC</div>
			</div>
			<div class="one_day_invite_revenue each_item_wrap">
				<div class="revenue_item">
					<img  class="revenue-icon home-icon" src="../../assets/revenue/online_invite.png" >
					<div class="revenue_title">{{ $t('revenue_3') }} </div>
				</div>
				<!-- <div class="revunue_value">{{person_invite_revenue || 0}} BxC</div> -->
				<div class="revunue_value">0 BxC</div>
			</div>
			<div class="total_revenue each_item_wrap">
				<div class="revenue_item">
					<img  class="revenue-icon home-icon" src="../../assets/revenue/person_total_revenue.png" >
					<div class="revenue_title">{{ $t('revenue_4') }}</div>
				</div>
				<!-- <div class="revunue_value">{{allRenvue || 0}} BxC</div> -->
				<div class="revunue_value">0 BxC</div>
			</div>
  	</div>
  </div>
</template>

<script>
export default {
  name: 'RevenueContent',
  props: {
    allRenvue: '',
    person_invite_revenue: '',
    person_account_revenue: '',
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.revenueWrap
  display flex
  justify-content space-between
.revenue_item
  display: flex;
	justify-content center
.revenue-icon
	margin: 0px 8px 0 0;
	width: 14px;
	height: 14px;
	padding-top: 4px;
.revenue_title
	height: 20px;
	line-height: 20px;
	font-size: 14px;
	color: #343739;
.revunue_value
	text-align: left;
	font-family: PingFangSC-Regular;
	font-size: 28px;
	color: #65686A;
	margin: 19px 0 10px 20px
.each_item_wrap
	width: 25%
</style>

<i18n>
{
  "en": {
		"revenue_1": "Total Mining Rewards In The Past 24 Hours All Network",
		"revenue_2": "Mining Revenue In The Past 24 Hours",
		"revenue_3": "Invited Rewards In The Past 24 Hours",
		"revenue_4": "Cumulative Revenue"
  },
  "zn": {
		"revenue_1": "过去24小时全网挖矿奖励总量",
		"revenue_2": "过去24小时账号挖矿收益",
		"revenue_3": "过去24小时账号邀请奖励",
		"revenue_4": "账号累计收益"
  }
}
</i18n>


