/** 提现 */
<template>
  <div class="home">
    <Layout
      type="WITHDRAWAl"
      isRevenue="true"
      :class="withdrawal-panel-layout"
      :pageTitle="$t('withdrawal.pageTitle')"
    >
      <CommitWithdrawal></CommitWithdrawal>
      <Tips
        :title="$t('withdrawal.tips.title')"
        :tips="$t('withdrawal.tips.detail')"
        class="withdrawal-tips"
      />
      <WithdrawalList></WithdrawalList>
    </Layout>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Layout from '@/components/DatePanel/Layout.vue'
import BasiceLayout from '@/components/Common/BasicLayout.vue'
import CommitWithdrawal from '@/components/Withdrawal/CommitWithdrawal.vue'
import WithdrawalList from '@/components/Withdrawal/WithdrawalList.vue'
import Tips from '@/components/Common/Tips.vue'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'home',
  data() {
    return {}
  },
  components: {
    Header,
    Layout,
    BasiceLayout,
    CommitWithdrawal,
    WithdrawalList,
    Tips
  },
}
</script>

<style  lang="stylus">
.data-panel-wrap, .data-panel-layout, .home {
  height: 100%;
}

.withdrawal-panel-layout {
  height: 100%;
}

.revenue-all-layout {
  height: 100%;
}

.withdrawal-tips {
  margin-top: 20px;
}
</style>
