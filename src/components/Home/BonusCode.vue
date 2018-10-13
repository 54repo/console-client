<template>
  <!-- <div class=" annouce-content"> -->
	<div class="BonusCode">
		<BasiceLayout title="BonusCode" class="bonus-code-layout"> 
      <el-row>
        <el-col :span="12"><div class="grid-content bg-purple">
          <el-alert
            :closable="false"
            :title="$t('bonusTips')"
            type="error"
            center>
          </el-alert>
          <div class="active-wrap">
            <span>{{ $t('bonusGet') }}</span>
            <div v-bind:class="{ noActive: !inviteStatus }"  v-on:click="clickInviteCode" class="get-invite bonus-cursor">{{ $t('getText')}}</div>
          </div>
          <div class="count-time">
            <span class="key">{{ $t('nextTimeText') }}</span>
            <span class="minute">{{showA}}</span>
            <span class="fh">:</span>
            <span class="seconds">{{showB}}</span>
          </div>
        </div>
        <!-- bcode规则 -->
        <div class="get-rule">
          <div><h4>{{ $t('ruleTip.title') }}</h4></div>
          <div>{{ $t('ruleTip.rule1') }}</div>
          <div>{{ $t('ruleTip.rule2') }}</div>
          <div>{{ $t('ruleTip.rule3') }}</div>
          <div class="tele">{{ $t('ruleTip.tele') }} <a target="_blank" class="join-tele bonus-cursor" :href="$t('ruleTip.teleUrl')">{{ $t('ruleTip.teleButton') }}</a></div>
        </div>
        <!-- 加入telegram -->
         <!-- <div class="tele-wrap">
          <span>{{ $t('ruleTip.joinTele') }}</span>
          
        </div> -->
        </el-col>
        <el-col :span="12">
          <CodeList :codeList="codeList"></CodeList>
        </el-col>
      </el-row>
    </BasiceLayout>
  </div>
  <!-- </div> -->
</template>

<script>
import BasiceLayout from "@/components/Common/BasicLayout.vue";
import CodeList from "@/components/Home/CodeList.vue";
import { mapState, mapActions } from "vuex";
import { Message } from "element-ui";

export default {
  name: "BonusCode",
  props: {
    status: ""
  },
  components: {
    BasiceLayout,
    CodeList
  },
  data() {
    return {
      timeMinutes: "", // 倒计时分钟数
      timeSeconds: "", // 倒计时秒数
      showA: "",
      showB: ""
    };
  },

  watch: {
    timeMinutes: function(val) {
     this.showA = this.timeMinutes.toString().length > 1 ? this.timeMinutes : '0' + this.timeMinutes.toString();
    },
    timeSeconds: function(val) {
      this.showB = this.timeSeconds.toString().length > 1 ? this.timeSeconds : '0' + this.timeSeconds.toString();
    }
  },
  computed: mapState({
    // 验证码地址
    inviteStatus(state) {
      // 10个激活码不可领取
      return state.inviteCode.status && state.inviteCode.codeList.length < 10;
    },
    codeList: state => state.inviteCode.codeList,
  }),
  mounted() {
    this.countTime();
    this.getAbleList();
  },
  methods: {
    ...mapActions(["getInviteCode", "getAbleList"]),
    // 倒计时计算：按照当前时间计算该小时剩余分钟
    countTime() {
      let EACH_HOUR_SECONDS = 60 * 60;
      let thisTime = new Date();
      let minutes = thisTime.getUTCMinutes();
      let seconds = thisTime.getUTCSeconds();
      let leftSeconds = EACH_HOUR_SECONDS - (minutes * 60 + seconds);

      setInterval(() => {
        if (leftSeconds > 0) {
          this.timeMinutes = Math.floor(leftSeconds / 60);
          this.timeSeconds = leftSeconds - this.timeMinutes * 60;
          --leftSeconds;
        } else {
          leftSeconds = 3600;
          --leftSeconds;
        }
      }, 1000);
    },
    // 领取 邀请码
    clickInviteCode() {
      if (this.inviteStatus) {
        console.log("领取邀请码");
        this.getInviteCode().then(res => {
          try {
            if (res.message === "getSuccess") {
              Message({
                type: "success",
                message: "receive success"
              });
              this.getAbleList();
            } else {
              Message(res.message || "reveive error");
            }
          } catch (error) {
            console.log(error);
            Message("reveive error");
          }
        });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style   lang="stylus">
.bonus-code-layout {
  margin-top: 20px;
  font-size: 14px;
}

.fh {
  display: inline-block;
  padding: 0 10px;
}

.active-wrap {
  color: #343739;
  line-height: 14px;
  text-align: left;
  margin-top: 40px;
  font-size: 14px;
  margin-left: 20px;
}

.get-invite {
  line-height: 40px;
  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(2%, #15bcad), to(#10b2cb));
  background-image: linear-gradient(-180deg, #15bcad 2%, #10b2cb 100%);
  font-size: 14px;
  color: #fff;
  text-align: center;
  line-height: 18px;
  border-radius: 0;
  border: 0;
  display: inline-block;
  width: 90px;
  height: 30px;
  line-height: 30px;
  margin-left: 20px;
}

.count-time .key {
  font-size: 14px;
  color: #96999B;
  line-height: 36px;
}

.count-time {
  text-align: left;
  margin-top: 40px;
  margin-left: 20px;
}

.minute
  margin-left: 10px

.minute, .seconds {
  display: inline-block;
  background: #FFFFFF;
  border: 1px solid #E7EAEC;
  border-radius: 2px;
  font-size: 16px;
  color: #65686A;
  text-align: center;
  line-height: 18px;
  padding: 5px;
}

.noActive {
  background: #D0D0D0;
}

.get-rule
  font-size; 14px
  color: #909399;
  width: 80%;
  padding: 8px 16px;
  margin: 40px 20px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  opacity: 1;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-transition: opacity .2s;
  transition: opacity .2s;
  background-color: #f4f4f5;
  color: #909399;
  line-height 22px
.get-rule .tele
  margin-top: 10px
.get-rule h4
  display: inline-block
  margin-bottom: 10px
.join-tele 
  color: #0db4c5;
</style>

<i18n>
{
  "en": {
    "bonusTips": "BonusCloud is in the TestNet phase and needs to activate the device using BonusCode. Each BonusCode can only activate node rewards for one device. BonusCode is bound to the account after being picked up and is not transferable.",
    "bonusGet": "Receive BCode",
    "nextTimeText": "The next time period BCode receives the countdown:",
    "getText": "Receive",
    "ruleTip": {
      "title": "BCode collection rules:",
      "rule1": "1.Each account can receive 1 BCode per hour.",
      "rule2": "2.Each account can receive up to 10 BCodes per day.",
      "rule3": "3.The total collection limit for each account is 10 BCodes.",
      "tele": "If you have any questions, please join the telegraph group to ask.",
      "joinTele": "Join Telegram",
      "teleUrl": "https://t.me/Bonuscloud",
      "teleButton" :"JOIN"
    }
  },
  "zn": {
    "bonusTips": "当前BonusCloud 处于测试网络阶段，需要使用BonusCode激活设备，每个BonusCode仅可以激活一台设备的节点奖励权限。BonusCode被领取后与账号绑定，不可转让。",
    "bonusGet":  "本时段BCode领取：",
    "nextTimeText": "下一时段BCode领取倒计时：",
    "getText": "领取",
    "ruleTip": {
      "title": "BCode领取规则:",
      "rule1": "1.每个账号每小时可以领取1个",
      "rule2": "2.每个账号每天最多领取10个",
      "rule3": "3.每个账号的总领取上限是10个",
      "tele": "如有疑问请至电报群咨询",
      "joinTele": "请加入电报群",
      "teleUrl": "https://t.me/bonuscloudcn",
      "teleButton": "加群"
    }
  }
}
</i18n>