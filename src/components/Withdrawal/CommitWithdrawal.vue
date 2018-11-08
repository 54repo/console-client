/** 提现 */
<template>
  <div class="commit-withdrawal-wrap">
    <BasiceLayout :title="$t('withdrawal.pageTitle') " class="bonus-code-layout revenue-all-layout">
      <el-row v-if="balance !== 'NONE'">
        <el-col :span="10">
          <div class="left-wrap">
            <div class="withdrawal-key balance-distance">{{$t('withdrawal.commitWith.balanceText')}}</div>
            <div class="withdrawal-key">{{$t('withdrawal.commitWith.balanceAmount')}}</div>
            <div class="withdrawal-key verify-wrap">{{$t('withdrawal.commitWith.verify')}}</div>
            <div class="withdrawal-key">{{$t('withdrawal.commitWith.emailCode')}}</div>
            <div class="withdrawal-key">{{$t('withdrawal.commitWith.pwText')}}</div>
          </div>
        </el-col>
        <el-col :span="14" class="commit-right-wrap">
          <div class="withdrawal-value withdrawal-balance balance-distance withdrawal-value">{{(balance || balance === 0) ? balance : '-'}} BXC</div>
          <input type="text" class="input withdrawal-ammount withdrawal-value" v-model="amount">
          <TencentVerify :ticket="ticket" :csnonce="csnonce" class="TencentVerify withdrawal-value verify-wrap" width="120px" @changeTicket="changeTicket"> </TencentVerify>
          <SendEmailCode class="send-wrap withdrawal-value" v-model="inputEmailCode" :ticket='ticket' :csnonce="csnonce" :email="email" @emailCodeTip="emailCodeTip"></SendEmailCode>
          <input type="password" class="input with-pw withdrawal-value" v-model="password">
        </el-col>
      </el-row>
      <div v-if="balance !== 'NONE'" class="buttonWrap">
        <div class="button" @click="sureWithdrawal">{{$t('confirm')}}</div>
      </div>

       <div v-if="balance === 'NONE'" class="withdrawal-upgrade">{{$t('withdrawal.withUpgrade')}}</div>
    </BasiceLayout>
  </div>
</template>

<script>
import BasiceLayout from '@/components/Common/BasicLayout.vue'
import TencentVerify from '@/components/Common/TencentVerify.vue'
import SendEmailCode from '@/components/SendEmailCode.vue'
import { mapActions, mapState } from 'vuex'
import { Message } from 'element-ui'
import { messageTips } from '../../utils/tips.js'

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
    email: state => state.account.email,
    balance: state => state.withdrawal.balance
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
  created() {
    // 查询余额
    this.getWithdrawalBalance();
  },
  methods: {
    ...mapActions(['commitWithdrawal', 'getWithdrawalList', 'getWithdrawalBalance']),
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
    sureWithdrawal() {
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
      } else if (!amount || isNaN(amount)) {
        Message({
          type: 'error',
          message: 'ammount error'
        })
      } else if (amount < 5000 || amount > 10000) {
        messageTips('over_withdrawal_amount', this.$i18n.locale)
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
              // messageTips('', this.$i18n.locale);
              Message({
                type: 'success',
                message: this.$t('withdrawal.recordsList.withSuccess')
              })
              this.getWithdrawalList();
            } else {
              Message({
                type: 'error',
                message: res.message || 'network error'
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
  font-size: 14px;
  line-height: 50px;
  margin: 10px 0;
}

. withdrawal-value {
  height: 50x;
  margin: 10px 0;
}

.withdrawal-balance {
  height: 50px;
  line-height: 50px;
  font-size: 24px;
}

.commit-right-wrap {
  padding-left: 50px;
}

.balance-distance {
  margin: 10px 0;
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
  width: 230px;
  height: 40px;
}

.with-pw {
  margin: 10px 0;
  width: 230px;

}

.withdrawal-upgrade
  color: #909399;
  line-height: 30px
  font-size: 28px;
  margin: 40px auto;
  text-align: center;

.verify-wrap
  margin: 20px 0;
</style>
