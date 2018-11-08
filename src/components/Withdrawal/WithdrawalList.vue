/** 提现 */
<template>
	<div class="withdrawal-list-wrap">
		<BasiceLayout :title="$t('withdrawal.recordsList.title') " class="withdrawal-layout" empty-text="loading">
			<el-table v-if="withdrawalList!=='NONE'" :data="withdrawalList" style="width: 100%;min-height: 200px">
				<el-table-column prop="created_at" :label="$t('withdrawal.recordsList.time')" align='center'>
				</el-table-column>
				<el-table-column prop="eth_dst_addr" :label="$t('withdrawal.recordsList.eth_address')" align='center'>
				</el-table-column>
				<el-table-column prop="subtotal.amount" :label="$t('withdrawal.recordsList.amount')" align='center'>
				</el-table-column>
				<el-table-column prop="" :label="$t('withdrawal.recordsList.status')" align='center'>
					<template slot-scope="scope">
						<!-- <div type="danger" @click="checkUnBind(scope.row.id)" :deviceId="scope.row.id" class="unbind-button">解绑</div> -->
						<div v-if="scope.row.status ==='completed'">
							<el-tag>{{$t('withdrawal.recordsList.successStatus')}}</el-tag>
						</div>
						<div v-if="scope.row.status ==='canceled'">
							<el-tag type="danger">{{$t('withdrawal.recordsList.errorStatus')}}</el-tag>
						</div>
						<el-tag type="info" v-if="scope.row.status ==='created'">{{$t('withdrawal.recordsList.waitPackage')}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="" align='center'>
					<template slot-scope="scope">
						<div>
							<!-- <el-tag type="info" class="record_retry"> -->
							<a v-if="scope.row.status ==='completed'" class="bonus-cursor link" target="_blank" :href="scope.row.eth_browser">{{$t('withdrawal.recordsList.showEth')}}</a>
							<!-- </el-tag> -->
						</div>
						<!-- <div'"> -->
						<span v-if="scope.row.status ==='canceled'" class="record_retry">{{$t('withdrawal.recordsList.errorRetry')}}</span>
						<!-- </div> -->
					</template>
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

.eth_link, .record_retry {
	margin-left: 20px;
}
</style>

