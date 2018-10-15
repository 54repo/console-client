<template>
  <div class="home">
          
    <Layout type="HOME" :pageTitle="$t('pageTitle')" >
      <Annouce></Annouce>
      <BonusCode :status="inviteCodeStatus"/>
      <Invite />
      <FAQ :FAQ="HOME_FAQ"  />
    </Layout>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Annouce from "@/components/Home/Annouce.vue";
import BonusCode from "@/components/Home/BonusCode.vue";
import FAQ from "@/components/Common/FAQ.vue";
import Invite from "@/components/Home/Invite.vue";
import { mapState, mapActions, mapMutations } from "vuex";
import Layout from "@/components/DatePanel/Layout.vue";

export default {
  name: "home",
  components: {
    Header,
    Annouce,
    BonusCode,
    FAQ,
    Invite,
    Layout
  },
  computed: mapState({
    inviteCodeStatus: state => state.inviteCode.status,
    // 计算属性的 getter
    HOME_FAQ: function() {
      // `this` 指向 vm 实例
      let HOME_FAQ = Object.values(this.$t("HOME_FAQ"));
      return HOME_FAQ;
    }
  }),
  created() {
    // 获取邀请码状态
    this.getInviteCodeStatus();
    // 获取用户信息
    this.getUserInfo();
    console.log(this.$router.path)
  },
  methods: {
    ...mapActions(["getInviteCodeStatus", "getUserInfo"])
  }
};
</script>

<style scoped lang="stylus">
</style>

<i18n>
{
  "en": {
    "pageTitle": "Home Page",
    "HOME_FAQ": [{
			"question": "What is BonusCode?",
			"anwser": "BonusCode is the certificate for nodes already joined BonusCloud testing network, contributed resources and obtained rewards, designed to guarantee rights and interests of every user of the nodes. Each BonusCode can activate a device to join the network, and only allowed once. Once the BonusCode picked, it will link directly to the account, not allowed to unbundle nor transfer."
		}, {
			"question": "How to get BonusCode?",
			"anwser": "Users who want to join in can go to our official website to get BonusCode, and each account can get ten opportunity to get BonusCloud everyday. BonusCode is released in different periods, and each period with a certain amount. Once get BonusCode, it will be shown in the list of what you’ve got where is in the first page after logging in. Once the device activated, user can go to setting-hardware for the condition of the linkage between the BonusCode and the device."
		}]
  },
  "zn": {
    "pageTitle": "数据面板首页",
		"HOME_FAQ": [{
			"question": "什么是 BonusCode ？",
			"anwser": "BonusCode 是节点加入 BonusCloud 测试网络贡献资源、获得奖励的凭证，为保证每一位节点用户的权益而设计，每个 BonusCode 可以激活一台设备加入网络，不可重复使用，且每个 BonusCode在领取后与账户直接绑定，不可解绑，不可转让。"
		},{
			"question": "如何获得 BonusCode ？",
			"anwser": "可以通过BonusCloud官网后台首页领取 BonusCode ，每个账号每天有十次领取 BonusCode 的机会。BonusCode 分时段发放，每个时段发放一定量。领取成功后，BonusCode 会展示在后台首页已领取的有效列表中，激活设备后可以在账号设置-硬件列表中查看 BonusCode 和设备的绑定情况。"
		}]
   
  }
}
</i18n>
