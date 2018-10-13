<template>
  <!-- <div class=" annouce-content"> -->
	<div class="BonusCode">
		<BasiceLayout :title=" $t('revenue_data_text') " class="bonus-code-layout"> 
      <RevenueContent 
        :allRenvue="allRenvue" 
        :person_invite_revenue="person_invite_revenue" 
        :person_account_revenue="person_account_revenue">
      </RevenueContent>
    </BasiceLayout>
  </div>
</template>

<script>
import BasiceLayout from "@/components/Common/BasicLayout.vue";
import RevenueContent from '@/components/DatePanel/RevenueContent.vue';
import { mapState, mapActions } from "vuex";

export default {
  name: "BonusCode",
  props: {
    allRenvue: '',
    person_invite_revenue: '',
    person_account_revenue: '',
  },
  components: {
    BasiceLayout,
    RevenueContent,
  },
  data() {
    return {

    };
  },
  computed: mapState({
    // 验证码地址
    // inviteStatus: state => state.inviteCode.status,
  }),
  mounted() {

  },
  methods: {
    // 倒计时计算：按照当前时间计算该小时剩余分钟
    
  }
};
</script>

<i18n>
{
  "en": {
		"revenue_data_text": "Revenue Data"
  },
  "zn": {
		"revenue_data_text": "收益数据"
  }
}
</i18n>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="stylus">
</style>
