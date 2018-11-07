/** 提现 */
<template>
	<div class="withdrawal-list-wrap">
		<BasiceLayout :title="$t('withdrawal.recordsList.title') " class="withdrawal-layout" empty-text="loading">
			<el-table v-if="withdrawalList!=='NONE'" :data="withdrawalList" style="width: 100%;min-height: 200px">
				<el-table-column prop="date" :label="$t('withdrawal.recordsList.time')">
				</el-table-column>
				<el-table-column prop="name" :label="$t('withdrawal.recordsList.eth_address')">
				</el-table-column>
				<el-table-column prop="address" :label="$t('withdrawal.recordsList.amount')">
				</el-table-column>
				<el-table-column prop="balance" :label="$t('withdrawal.recordsList.balance')">
				</el-table-column>
				<el-table-column prop="status" :label="$t('withdrawal.recordsList.status')">
				</el-table-column>
			</el-table>
			<el-table v-if="withdrawalList === 'NONE'" :empty-text="$t('withdrawal.recordsList.noWithdrawalList')"></el-table>
		</BasiceLayout>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import BasiceLayout from '@/components/Common/BasicLayout.vue'

export default {
  name: 'AccountLayout',
  components: {
    BasiceLayout
  },
  props: {},
  computed: mapState({
    //  箭头函数可使代码更简练
    withdrawalList: state => state.withdrawal.list
  }),
  methods: {
    ...mapActions(['getWithdrawalList'])
  },
  created() {
    this.getWithdrawalList()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.withdrawal-list-wrap {
	margin-top: 20px;
}
</style>

