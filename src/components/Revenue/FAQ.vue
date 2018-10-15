  <template>
	<div class="FAQ">
		<BasiceLayout title="FAQ" class="bonus-code-layout"  :more="$t('faq_link')"> 
      <div class="qa-item">
        <div class="question">
          <span class="faq-icon">Q</span>
          <div class="faq-tip-background">
            <div class="tipIcon"></div>
            <div class="tipContent">{{ $t('revenue_1') }}</div>
          </div>
        </div>
        <div class="anwser">
          <span class="faq-icon anwser-icon">A</span>
          <div class="faq-tip-background">
            <div class="tipContent anwserContent">{{ $t('revenue_2') }}</div>
          </div>
        </div>
      </div>

			<div class="qa-item">
        <div class="question">
          <span class="faq-icon">Q</span>
          <div class="faq-tip-background">
            <div class="tipIcon"></div>
            <div class="tipContent">{{ $t('revenue_3') }}</div>
          </div>
        </div>
        <div class="anwser">
          <span class="faq-icon anwser-icon">A</span>
          <div class="faq-tip-background">
            <div class="tipContent anwserContent">
							<div><li>{{ $t('revenue_4') }}</li></div>
							<div><li>{{ $t('revenue_5') }}</li></div>
							<div><li>{{ $t('revenue_6') }}</li></div>
							</div>
          </div>
        </div>
      </div>
			
			<div class="qa-item">
        <div class="question">
          <span class="faq-icon">Q</span>
          <div class="faq-tip-background">
            <div class="tipIcon"></div>
            <div class="tipContent">{{ $t('revenue_7') }}</div>
          </div>
        </div>
        <div class="anwser">
          <span class="faq-icon anwser-icon">A</span>
          <div class="faq-tip-background">
            <div class="tipContent anwserContent">
							<div><li>{{ $t('revenue_8') }}</li></div>
							<div><li>{{ $t('revenue_9') }}</li></div>
							<div><li>{{ $t('revenue_10') }}</li></div>
							<div class="about-center">{{ $t('revenue_11') }}</div>
							<div><li>{{ $t('revenue_12') }}</li></div>
							<div><li>{{ $t('revenue_13') }}</li></div>
							<div><li>{{ $t('revenue_14') }}</li></div>
							<div><li>{{ $t('revenue_15') }}</li></div>
						</div>
          </div>
        </div>
      </div>
    </BasiceLayout>
  </div>
  <!-- </div> -->
</template>

<script>
import BasiceLayout from "@/components/Common/BasicLayout.vue";

export default {
  name: "FAQ",
  components: {
    BasiceLayout
  },
  props: {
    FAQ: ""
  },
  data() {
    return {
      //	输入错误信息时提示
    };
  }
};
</script>

<i18n>
{
  "en": {
		"revenue_1": "How much reward can you get?",
		"revenue_2": "Blocks by UTC time will produce 79,908 BxCs per hour, which are distributed to all network nodes according to the online conditions of the nodes. The reward of a single node depends on the stability of the network and the amount of nodes in the current network.",
		"revenue_3": "Total reward ",
		"revenue_4": "Total rewards: 7,000,000,000 * 40% = 2,800,000,000 BxC",
		"revenue_5": "Reward settlement period: UTC time 60 minutes",
		"revenue_6": "UTC Time The total hourly reward is: Total(RT) = 79,908 BxC",
		"revenue_7": "Network task reward algorithm",
		"revenue_8": "Contribution of a certain network device P = (online stability contribution Po + task contribution Pw) * α",
		"revenue_9": "Let the user be x, have n devices, and there are m users in the whole network, then the account contribution of user x is Px = P1+P2+P3+...+Pn, and the total contribution of users of the whole network is PT = Px1 +Px2+Px3+...+Pxm",
		"revenue_10": "So UTC time user x reward per hour Rx = (Px / PT) RT (100% - 1%) (1% of platform technology service fee per transaction)",
		"revenue_11": "Among them",
		"revenue_12": "Po=Online number of minutes for a single device*Ko, Ko is the online stability weight system (currently Ko = 1)",
		"revenue_13": "Pw=single device task minutes*Kw, Kw is the task weight coefficient (Kw = 9 under network task, the calculation task will increase the weight of CPU, storage, etc.)",
		"revenue_14": "α is a mining factor calculated by hash, distributed between 0.95 and 1.05, expected to be 1",
		"revenue_15": "RT = 79,908"
  },
  "zn": {
		"revenue_1": "我能获得多少收益？",
		"revenue_2": "UTC时间每小时区块会产出 79,908 个BxC，按照节点的在线情况全部分发给所有在网节点，单个节点的收益取决于在网稳定情况及当前全网的节点总量。",
		"revenue_3": "奖励总额是多少？",
		"revenue_4": "奖励总额：7,000,000,000 * 40% = 2,800,000,000 BxC",
		"revenue_5": "奖励结算周期：UTC时间 60分钟",
		"revenue_6": "UTC时间 每小时奖励总额为：Total（RT） = 79,908 BxC",
		"revenue_7": "网络任务收益计算方式是？",
		"revenue_8": "某台在网设备的贡献度 P =（在线稳定贡献度Po+任务贡献度Pw）* α。",
		"revenue_9": "设用户为 x ，拥有 n 台设备，全网共有 m 个用户，则用户 x 的账户贡献度 Px = P1+P2+P3+......+Pn，全网用户的总贡献度PT = Px1+Px2+Px3+......+Pxm",
		"revenue_10": "所以 UTC 时间每小时内用户 x 的收益 Rx = （Px / PT）* RT *（100%-1%）（每笔交易收取1%的平台技术服务费用）",
		"revenue_11": "其中:",
		"revenue_12": "Po=单台设备在线分钟数*Ko，Ko为在线稳定性权重系（当前 Ko = 1）",
		"revenue_13": "Pw=单台设备任务分钟数*Kw，Kw为任务权重系数(网络任务下 Kw = 9，计算任务会增加CPU、存储等权重）",
		"revenue_14": "α 是由哈希计算得出，分布于 0.95-1.05 之间的挖矿因子，期望为1",
		"revenue_15": "RT = 79,908"
  }
}
</i18n>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scopes lang="stylus">
.about-center {
	margin: 10px 0;
}

.faq-icon {
	display: inline-block;
	width: 20px;
	height: 20px;
	border-radius: 10px;
	// background-image: linear-gradient(-180deg, #15BCAD 2%, #10B2CB 100%)
	background: #0DB4C5;
	font-family: PingFangSC-Medium;
	font-size: 12px;
	color: #FFFFFF;
	text-align: center;
	line-height: 20px;
	margin: 10px 20px 0 0;
	vertical-align: bottom;
	position: absolute;
	left: 0;
}

.faq-tip-background {
	height: 30px;
	margin-left: 40px;
}

.tipIcon {
	display: inline-block;
	width: 0;
	height: 0;
	border: 3px solid transparent;
	border-bottom-color: #0DB4C5;
	border-right-color: #0DB4C5;
	vertical-align: bottom;
}

.tipContent {
	background: #0DB4C5;
	display: inline-block;
	font-size: 12px;
	color: #FFFFFF;
	line-height: 30px;
	padding: 0 20px;
	min-width: 250px;
	border-radius: 4px 4px 4px 0;
}

.faq-tip-background {
	display: inline-block;
}

.qa-item {
	margin-bottom: 22px;
}

.anwser, .question {
	position: relative;
}

.anwser-icon {
	font-size: 12px;
	color: #999B98;
	text-align: center;
	line-height: 18px;
	background: #F5F5F6;
}

.anwserContent {
	color: #65686A;
	background: #F5F5F6;
}

.anwser {
	margin: 18px 0 28px;
}

.anwserIcon {
	border-bottom-color: #F5F5F6;
	border-right-color: #F5F5F6;
}

.bold {
	font-weight;
}

</style>

