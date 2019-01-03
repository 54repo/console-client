/** 提现 */
<template>
  <div class="commit-withdrawal-wrap">
    <BasiceLayout :title="$t('withdrawal.pageTitle') " class="bonus-code-layout revenue-all-layout commit-layout">
      <el-row v-if="balance !== 'NONE'">
        <el-col :span="10">
          <div class="left-wrap">
            <div class="withdrawal-key balance-distance">{{$t('withdrawal.commitWith.balanceText')}}</div>
          </div>
        </el-col>
        <el-col :span="14" class="commit-right-wrap">
          <div class="withdrawal-value withdrawal-balance balance-distance withdrawal-value">{{(balance || balance === 0) ? balance : '-'}} BXC</div>
        </el-col>
        <el-col :span="10">
          <div class="left-wrap">
            <div class="withdrawal-key">{{$t('withdrawal.commitWith.balanceAmount')}}</div>
          </div>
        </el-col>
        <el-col :span="14" class="commit-right-wrap">
          <input type="text" class="input withdrawal-ammount withdrawal-value" v-model="amount">
        </el-col>
      </el-row>
      <el-row v-if="balance !== 'NONE'">
        <el-col :span="10">
          <div class="verify-key withdrawal-key">{{$t('withdrawal.commitWith.verify')}}</div>
        </el-col>
        <el-col :span="14" class="commit-right-wrap">
          <vue-recaptcha
            class="captcha-wrap"
            ref="recaptcha"
            @verify="onVerify"
            @expired="onExpired"
            data-size="normal"
            :sitekey="sitekey"
          />
        </el-col>
      </el-row>
      <el-row v-if="balance !== 'NONE'">
        <el-col :span="10">
          <div class="withdrawal-key email-key">{{$t('withdrawal.commitWith.emailCode')}}</div>
        </el-col>
        <el-col :span="14" class="commit-right-wrap">
          <SendEmailCode class="send-wrap withdrawal-value" v-model="inputEmailCode" :response="response" :email="email" @emailCodeTip="emailCodeTip"></SendEmailCode>
        </el-col>
      </el-row>
      <el-row v-if="balance !== 'NONE'" class="pw-wrap">
        <el-col :span="10">
          <div class="withdrawal-key pw-key">{{$t('withdrawal.commitWith.pwText')}}</div>
        </el-col>
        <el-col :span="14" class="commit-right-wrap">
          <input type="password" class="input with-pw withdrawal-value" v-model="password">
        </el-col>
      </el-row>
      <div v-if="balance !== 'NONE'" class="buttonWrap">
        <div class="button " v-bind:class="{ buttonDisabled: (this.balance < 5000 || this.commitStatus === 'created' ||  this.commitStatus === 'closed') }" @click="sureWithdrawal">{{$t('confirm')}}</div>      </div>
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
import { SITEKEY } from '../../config/contant.js'
import VueRecaptcha from "vue-recaptcha";
export default {
  name: 'AccountLayout',
  props: {},
  components: {
    BasiceLayout,
    TencentVerify,
    SendEmailCode,
    VueRecaptcha
  },
  computed: mapState({
    //  箭头函数可使代码更简练
    email: state => state.account.email,
    balance: state => state.withdrawal.balance,
    commitStatus: state => state.withdrawal.commitStatus,
    // buttonDisabled: () => {
    //   return ();
    // }
  }),
  data() {
    return {
      ticket: '',
      csnonce: '',
      amount: '',
      inputEmailCode: '',
      password: '',
      response: '',
      sitekey: SITEKEY['LOW'], //ga verify key
    }
  },
  created() {
    // 查询余额
    this.getWithdrawalBalance()
  },
  methods: {
    ...mapActions([
      'commitWithdrawal',
      'getWithdrawalList',
      'getWithdrawalBalance'
    ]),
    onVerify: function(response) {
      this.response = response;
    },
    onExpired: function() {
      console.log("Expired");
      Message({
        message: this.$t("captcha.expired"),
        type: "error"
      });
      this.$refs.recaptcha.reset();
    },
    resetRecaptcha() {
      this.$refs.recaptcha.reset();
    },
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
      let { inputEmailCode, password, amount, balance } = this
      if (this.balance < 5000 || this.commitStatus === 'created') {
        return;
      }
      
      if (!inputEmailCode) {
        // Message({
        //   type: 'error',
        //   message: 'limit email code'
        // })
        messageTips('limit_email_code', this.$i18n.locale)
      } else if (!password) {
        messageTips('password_error', this.$i18n.locale)
      } else if (!amount || isNaN(amount) || Number(amount) > Number(balance)) {
        messageTips('amount_error', this.$i18n.locale)
      } else if (amount < 5000 || amount > 1000000) {
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
              this.getWithdrawalList()
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
.verify-key {
  margin: 18px 0;
  height: 82px;
  line-height: 82px;
}
.withdrawal-key {
  width: 100%;
  color: #96999b;
  text-align: right;
  height: 50px;
  font-size: 14px;
  line-height: 50px;
  // margin: 10px 0;
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
.withdrawal-ammount {
  margin-top: 5px;
}
.withdrawal-ammount, .send-wrap {
  width: 230px;
  height: 40px;
}
.pw-key {
  padding: 5px 0;
}
.pw-wrap {
  margin: 10px 0;
}
.with-pw {
  margin: 10px 0;
  width: 230px;
}
.withdrawal-upgrade {
  color: #909399;
  line-height: 30px;
  font-size: 28px;
  margin: 40px auto;
  text-align: center;
}
.verify-wrap {
  margin: 20px 0;
}
.commit-layout .captcha-wrap {
  margin: 20px 20px 20px 0;
}
.commit-withdrawal-wrap .email-key{
  height: 40px;
  line-height: 40px;
}
</style>