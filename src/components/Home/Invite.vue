<template>
	<div class="BonusCode">
		<BasiceLayout :title="$t( 'invite_title' )" class="bonus-code-layout"> 
      <el-row>
        <el-col :span="12">
          <el-alert
            :closable="false"
            class="invite-alert"
            :title="$t( 'inviteTip' )"
            type="error"
            center>
          </el-alert>
          <span class="invite-tips">{{ $t( 'inviteText' ) }}</span>  
          <div class="invite-wrap">
            <div class="invite-url">{{recommendRefer}}</div>
            <div class="invite-copy bonus-cursor" @click="copy">{{ $t( 'cotyText' ) }}</div>
          </div>    
        </el-col>
        <el-col :span="12">
          <div class="invite-count-wrap">
            <span>{{ $t( 'inviteCountText' ) }}</span>  
            <div class="invite-count">{{count || 0}}</div>
          </div>
        </el-col>
      </el-row>
    </BasiceLayout>
  </div>
</template>

<script>
import BasiceLayout from "@/components/Common/BasicLayout.vue";
import { mapState, mapActions } from "vuex";
import { Message } from "element-ui";

export default {
  name: "Invite",
  components: {
    BasiceLayout
  },
  computed: mapState({
    count: state => state.recommend.count,
    recommendRefer: state => state.recommend.recommendRefer,
  }),
  data() {
    return {
      //	输入错误信息时提示
    };
  },
  created() {
    // 获取邀请用户数
    this.getRecommendCount();
    // 获取邀请链接
    this.getRecommendInfo();
  },
  methods: {
    ...mapActions(["getRecommendInfo", 'getRecommendCount']),
    copy() {
      console.log(23);
      this.$copyText(this.recommendRefer).then(
        function(e) {
          Message({
            message: "复制成功",
            type: "success"
          });
          console.log(e);
        },
        function(e) {
          alert("Can not copy");
          Message({
            message: "复制失败",
            type: "error"
          });
          console.log(e);
        }
      );
    },
    onCopy: function(e) {
      alert("You just copied: " + e.text);
    },
    onError: function(e) {
      alert("Failed to copy texts");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scopes lang="stylus">
.bonus-code-layout .invite-alert {
  margin-bottom: 40px;
}

.invite-count-wrap {
  margin-left: 20px;
  padding-left: 20px;
  text-align: left;
}

.invite-count {
  text-align: left;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #65686a;
  margin: 19px 0 10px 20px;
}

.bonus-code-layout {
  margin-top: 20px;
  text-align: left;
  font-size: 14px;
}

.invite-url {
  background: #fff;
  border: 1px solid #e7eaec;
  border-radius: 2px;
  font-size: 12px;
  color: #65686a;
  line-height: 30px;
  padding: 0 20px 0px 10px;
  margin: 0 20px;
  min-height: 30px
  display: inline-block;
  margin-top: 20px;
}

.invite-copy {
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
  margin-top: 20px
  display: inline-block;
}

.invite-wrap {
  // display: flex;
  // margin-top: 20px;
  margin-bottom: 20px;
}

.invite-tips {
  font-size: 14px;
  color: #96999b;
  line-height: 20px;
  display: inline-block;
  padding-left: 20px;
  color: #343739;
}
</style>


<i18n>
{
  "en": {
    "invite_title": "Invitation Reward",
    "inviteTip": "you will receive an additional bonus equal to 1% of the invited node's mining revenue, sended by the BonusCloud Foundation",
    "inviteText": "Your invitation link:",
    "cotyText": "Copy",
    "inviteCountText": "The total number of invited users:"
  },
  "zn": {
    "invite_title": "邀请奖励",
    "inviteTip": "您将额外获得相当于被邀请节点1%挖矿收益的奖励，由BonusCloud基金会发放",
    "inviteText": "您的邀请链接:",
    "cotyText": "复制",
    "inviteCountText": "您累计邀请用户数："
  }
}
</i18n>
