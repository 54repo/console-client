/** 提现 */
<template>
	<div class="commit-withdrawal-wrap">
		<BasiceLayout :title="$t('withdrawal.pageTitle') " class="bonus-code-layout revenue-all-layout">
			<el-row>
				<el-col :span="10">
					<div class="left-wrap">
						<div class="withdrawal-key balance-distance">当前账户收益余额</div>
						<div class="withdrawal-key">输入提现数量</div>
						<div class="withdrawal-key">图形验证</div>
						<div class="withdrawal-key">输入邮箱验证码</div>
						<div class="withdrawal-key">输入账号密码</div>
					</div>
				</el-col>
				<el-col :span="14" class="commit-right-wrap">
					<div class="withdrawal-value withdrawal-balance balance-distance withdrawal-value">11003.00 BXC</div>
					<input type="text" class="input withdrawal-ammount withdrawal-value" v-model="amount">
					<TencentVerify :ticket="ticket" :csnonce="csnonce" class="TencentVerify withdrawal-value" width="120px" @changeTicket="changeTicket"> </TencentVerify>
					<SendEmailCode class="send-wrap withdrawal-value" v-model="inputEmailCode" :ticket='ticket' :csnonce="csnonce" :email="email" @emailCodeTip="emailCodeTip"></SendEmailCode>
					<input type="password" class="input with-pw withdrawal-value" v-model="password">
				</el-col>
			</el-row>
			<div class="buttonWrap">
				<div class="button" @click="commitWithdrawal">确定</div>
			</div>
		</BasiceLayout>
	</div>
</template>

<script>
import BasiceLayout from '@/components/Common/BasicLayout.vue'
import TencentVerify from '@/components/Common/TencentVerify.vue'
import SendEmailCode from '@/components/SendEmailCode.vue'
import { mapActions, mapState } from 'vuex'
import { Message } from 'element-ui'

export default {
  name: 'AccountLayout',
  props: {},
  components: {
    BasiceLayout,
    TencentVerify,
    SendEmailCode
  },
  computed: mapState({
    //  箭头函数可使代码更简练
    email: state => state.account.email
  }),
  data() {
    return {
      ticket: '',
      csnonce: '',
      amount: '',
      inputEmailCode: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['commitWithdrawal']),

    emailCodeTip(error) {
      if (error.message) {
        Message({
          type: 'error',
          message: error.message
        })
      }
    },
    // update 验证ticket
    changeTicket(verify) {
      verify.ticket && (this.ticket = verify.ticket)
      verify.csnonce && (this.csnonce = verify.csnonce)
    },
    commitWithdrawal() {
      let { inputEmailCode, password, amount } = this
      if (!inputEmailCode) {
        Message({
          type: 'error',
          message: 'limit email code'
        })
      } else if (!password) {
        Message({
          type: 'error',
          message: 'limit password'
        })
      } else if (!amount) {
        Message({
          type: 'error',
          message: 'limit ammount'
        })
      } else {
        this.$confirm(this.$t('withdrawal.tips.confirmTips'), {
          confirmButtonText: this.$t('confirm'),
          cancelButtonText: this.$t('cancel')
        }).then(() => {
          this.commitWithdrawal({
            amount,
            password,
            emailVerifyCode: inputEmailCode
          }).then(res => {
            if (res.code === 200) {
              Message({
                type: 'success',
                message: 'bind success'
              })
              this.getWalletAddress()
            } else {
              Message({
                type: 'error',
                message: res.message || 'bind error'
              })
            }
          })
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.withdrawal-key {
	width: 100%;
	color: #96999b;
	text-align: right;
	height: 50px;
	font-size: 16px;
	line-height: 50px;
	margin: 10px 0;
}
. withdrawal-value{
	height: 50x;
	margin: 10px 0
}

.withdrawal-balance {
	height: 50px;
	line-height: 50px;
	font-size: 28px;
}

.commit-right-wrap {
	padding-left: 50px;
}

.balance-distance {
	margin: 20px 0;
}

.TencentVerify {
	height: 40px;
	width: 150px;
	margin: 10px 0;
}

.buttonWrap {
	width: 100%;
	display: flex;
	justify-content: center;
	margin: 30px;
}

.withdrawal-ammount, .send-wrap {
	margin: 10px 0;
	width: 200px;
	height: 40px;
}

.with-pw {
	margin: 10px 0;
}
</style>
