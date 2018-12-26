<template>
  <div class="home">
    <AccountSetLayout layoutType="AccountSet" :layoutTitile="$t('bindWalletTitle')">
      <BasiceLayout :title="$t('bindWalletTitle')">
        <div class="wallet-content">
          <!-- 绑定钱包内容展示 -->
          <div v-if="address && (address !== 'NO_ADDRESS')">
            <div class="wallet-bind-title">{{$t('walletText')}}：</div>
            <div class="wallet-verify-wrap">
              <el-tag id="walletDetail">{{address}}</el-tag>
              <el-tag v-if="eth_verify_status" class="verifyStatus" type="success">{{$t('verifySuccess')}}</el-tag>
              <el-tag v-if="!eth_verify_status" class="verifyStatus" type="danger">{{$t('verifyError')}}</el-tag>
              <!-- <el-tag v-if="eth_verify_status === ''" classs="verifyStatus" type="danger">-</el-tag> -->
            </div>
            <div class="unbind-wrap">
              <div class="button bursor unbindWallet" @click="unbindWallet">{{$t('unbindText')}}</div>
            </div>
          </div>
          <div v-if="address === 'NO_ADDRESS'">
            <div class="wallet-wrap">
              <span class="key">{{$t('newWalletText')}}:</span>
              <input type="text" class="input wallet-input" v-model="new_eth_address">
            </div>
            <div class="wallet-wrap captcha-bind-wrap">
              <span class="key">{{$t('imageVerCode')}}:</span>
              <div class="hard-captcha">
                 <!-- 谷歌验证 -->
                <vue-recaptcha
                  class="captcha-wrap"
                  ref="recaptcha"
                  @verify="onVerify"
                  @expired="onExpired"
                  data-size="normal"
                  :sitekey="sitekey"
                />
                <!-- <div id="TCaptcha" style="width:270px;height:30px;"></div> -->
              </div>
              <!-- <ImageCode imageStyle="" type="text" v-model="inputImageCode" class="wallet-image-code"></ImageCode> -->
            </div>
            <div class="wallet-wrap email-bind-wrap">
              <span class="key">{{$t('emailCode')}}:</span>
              <div class="wallet-email">
                <SendEmailCode type="text" imageStyle="unbind-style" v-model="inputEmailCode" needImageCode=true :response='response'  :email="email" @emailCodeTip="emailCodeTip"></SendEmailCode>
              </div>
            </div>
            <div class="button wallet-bind" @click="bindWallet( $t('sureTips') )">确定</div>
          </div>
        </div>
        <div class="loading" v-if=" address ==='' ">
          Loading...
        </div>
      </BasiceLayout>
      <BasiceLayout class="wallet-tips" :title="$t('walletTip')">
        <div class="wallet-tips-wrap">
          <div class="tips">{{ $t('walletTips.tips_one') }}</div>
          <div class="tips">{{ $t('walletTips.tips_two') }}</div>
          <div class="tips">{{ $t('walletTips.tips_three') }}</div>
          <div class="tips">{{ $t('walletTips.tips_four') }}</div>
          <div class="tips">
            {{ $t('walletTips.tips_five') }}
            <a class="bonus-color" target="_blank" :href="$t('walletTips.tips_five_link')">{{ $t('walletTips.tips_five_link') }} </a>
          </div>
          <div class="tips">{{ $t('walletTips.tips_six') }}</div>
        </div>
      </BasiceLayout>
    </AccountSetLayout>
  </div>
</template>

<i18n>
{
  "en": {
    "bindWalletTitle": "Wallet Binding",
    "walletText": "Bundled Wallet Address",
		"newWalletText": "Bind Wallet Address",
		"inputPasswordText": "Enter Password",
		"walletTip": "Attention",
		"walletTips": {
			"tips_one": "1.Please use the ETH hot wallet that supports erc20 token as the wallet for cash withdrawal.",
			"tips_two": "2.The wallet address format is a 42-bit string starting with 0x.",
			"tips_three": "3.Don't use the exchange's address, which may result in a withdrawal failure and loss of revenue.",
      "tips_four": "4.Please check whether the bound wallet address is correct. If the cashier's address is incorrect, the cash will be lost, and BonusCloud will not bear any responsibility.",
			"tips_five": "5.Wallet Binding and Verification Tutorial：",
			"tips_five_link": "https://bonuscloud.club/viewtopic.php?f=18&t=28",
			"tips_six": "6.After the wallet verification operation is completed, it will be verified at 4 o’clock UTC time on the next day. After the verification is passed, the label will be changed to  Verified status."
		},
		"sureTips": "The wallet unbinding function will not be opened yet. Please check whether the bound wallet address is correct. If the cashier's address is incorrect, the cash will be lost, and BonusCloud will not bear any responsibility.",
		"walletConfirm": "confirm",
		"walletCancel": "cancel",
		"imageVerCode": "Please verify the image",
		"emailCode": "Please enter the email verification code",
		"errorTipsAboutBind": "Please vertify the email code or wallet address",
		"verifySuccess": "Certified",
		"verifyError": "Unverified",
		"unbindText": "unbind",
    "unbindTips": "Are you sure to Unbunding? If authenticated, unbinding will fail",
    "unbindSuccess": "unbind success",
    "unbindError": "unbind error"
  },
  "zn": {
    "bindWalletTitle": "钱包绑定",
    "walletText": "当前绑定的钱包地址",
		"newWalletText": "绑定钱包地址",
		"inputPasswordText": "输入账号密码",
		"walletTip": "注意事项",
		"walletTips": {
			"tips_one": "1.请使用支持erc20 token的ETH热钱包作为用于提现的钱包。",
			"tips_two": "2.钱包地址格式为0x开头的42位字符串。",
			"tips_three": "3.请勿使用交易所充值地址，可能会导致提现失败，收益丢失。",
			"tips_four": "4.请认真核对绑定的钱包地址是否正确，若由于钱包地址错误导致提现失败，收益丢失，BonusCloud不承担任何责任。",
      "tips_five": "5.钱包绑定及验证方法:",
      "tips_five_link": "https://bonuscloud.gitbook.io/help/eth-qian-bao-yan-zheng-fang-fa",
			"tips_six": "6.完成钱包验证操作后，将于次日北京时间12点进行校验，校验通过后，标签将变更为已验证状态。"       
		},
		"sureTips": "请认真核对绑定的钱包地址是否正确，若由于钱包地址错误导致提现失败，收益丢失，BonusCloud不承担任何责任。",
		"walletConfirm": "确定",
		"walletCancel": "取消",
		"imageVerCode": "请进行验证",
		"emailCode": "请输入邮箱验证码",
		"errorTipsAboutBind": "请动态验证或者输入邮箱验证码",
		"verifySuccess": "已认证",
		"verifyError": "未认证",
		"unbindText": "解绑",
    "unbindTips": "是否确认解绑？钱包地址若已验证，解绑后验证失效",
    "unbindSuccess": "解绑成功",
    "unbindError": "解绑失败"
  }
}
</i18n>


<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import { mapState, mapActions, mapMutations } from 'vuex'
import AccountSetLayout from '@/components/AccountSet/AccountSetLayout.vue'
import BasiceLayout from '@/components/Common/BasicLayout.vue'
import { Message } from 'element-ui'
import ImageCode from '@/components/ImageCode.vue'
import SendEmailCode from '@/components/SendEmailCode.vue'
import { LANG } from '../config/contant.js'
import VueRecaptcha from "vue-recaptcha";
import { SITEKEY } from '../config/contant.js'

export default {
  name: 'home',
  components: {
    Header,
    BasiceLayout,
    AccountSetLayout,
    ImageCode,
    SendEmailCode,
    VueRecaptcha
  },
  computed: mapState({
    address: state => state.wallet.address,
    email: state => state.account.email,
    eth_verify_status: state => state.wallet.eth_verify_status
  }),
  data() {
    return {
      new_eth_address: '',
      inputEmailCode: '',
      // ticket: '', // 验证码ticket
      // csnonce: '', //整数
      response: '',
      sitekey: SITEKEY['LOW'], //ga verify key
    }
  },
  created() {
    this.getWalletAddress();
  },
  methods: {
    ...mapActions([
      'getWalletAddress',
      'bindWalletAddress',
      'commitUnbindAddress'
    ]),
    onVerify: function(response) {
      this.response = response;
    },
    onExpired: function() {
      Message({
        message: this.$t("captcha.expired"),
        type: "error"
      });
      this.$refs.recaptcha.reset();
    },
    resetRecaptcha() {
      this.$refs.recaptcha.reset();
    },
    bindWallet(text) {
      let { ticket, inputEmailCode, new_eth_address } = this

      if (!inputEmailCode || !new_eth_address) {
        Message(this.$t('errorTipsAboutBind'))
        return
      }

      if (new_eth_address.length !== 42) {
        Message('new wallet address is error')
        return
      }
      //  绑定提示
      this.$confirm(text, {
        confirmButtonText: this.$t('walletConfirm'),
        cancelButtonText: this.$t('walletCancel')
      })
        .then(() => {
          this.bindWalletAddress({
            new_eth_address,
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
        .catch((error) => {
          console.log(error);
        })
    },
    // 邮箱验证错误
    emailCodeTip(error) {
      if (error.message) {
        Message({
          type: 'error',
          message: error.message
        })
      }
    },
    // 解绑
    unbindWallet() {
      this.$confirm(this.$t('unbindTips'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel')
      }).then(() => {
        this.commitUnbindAddress().then(res => {
          if (res.code === 200) {
            // // messageTips('', this.$i18n.locale);
            Message({
              type: 'success',
              message: this.$t('unbindSuccess')
            })
            this.getWalletAddress()
            this.getCaptcha()
          } else {
            Message({
              type: 'error',
              message: res.message || this.$t('unbindError')
            })
            this.getWalletAddress()
          }
        })
      })
    },
  }
}
</script>

<style scoped lang="stylus">
.email-bind-wrap span{
  height: 40px;
  line-height: 40px; 
}


.hard-captcha {
  height: 40px;
}

.captcha-bind-wrap {
  position: relative;
}

.captcha-bind-wrap .key {
  position: absolute;
  top: 0;
  left: 0;
  height: 70px;
  line-height: 70px; 
}

.hard-captcha {
  display: inline-block;
  padding-left: 200px;
}

.wallet-bind-title {
  color: #96999b;
  font-size: 20px;
}

.wallet-content {
  width: 800px;
  margin: 30px auto;
  text-align: left;
}

.wallet-wrap {
  width: 100%;
  position: relative;
  margin: 20px 0 30px;
}

.wallet-wrap .key {
  display: inline-block;
  width: 200px;
  color: #96999b;
}

.email-bind-wrap .wallet-email {
  position: absolute;
  top: 0;
  left: 200px;
}

.wallet-content #walletDetail {
  font-size: 18px;
  padding: 5px 10px;
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  width: 100%;
  margin-right: 50px;
  text-align: center;
}

.wallet-input {
  width: 460px;
  height: 40px;
}

body {
  height: 100%;
}

.wallet-bind {
  margin: 40px 0 0 200px;
}

.wallet-tips {
  margin-top: 20px;
}

.wallet-tips-wrap {
  text-align: left;
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
  -webkit-transition: opacity 0.2s;
  transition: opacity 0.2s;
  background-color: #f4f4f5;
  color: #909399;
  line-height: 30px;
}

.home {
  height: auto;
}

.wallet-wrap .wallet-image-code {
  display: inline-block;
  min-width: 250px;
}

.wallet-wrap .send-code {
  line-height: 40px;
}

.wallet-wrap .imageCodeSrc {
  width: 90px;
  height: 20px;
  top: 10px;
}

.wallet-wrap .wallet-email {
  display: inline-block;
  min-width: 250px;
}

.wallet-verify-wrap {
  display: flex;
  margin: 40px 0 70px 0px;
}

.verifyStatus {
  margin: 5px 0;
}

.unbind-wrap {
  display: flex;
  justify-content: center;
}
</style>

