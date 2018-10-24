<template>
	<div class="home">
		<AccountSetLayout layoutType="AccountSet" :layoutTitile="$t('bindWalletTitle')">
			<BasiceLayout :title="$t('bindWalletTitle')">
				<div class="wallet-content">
					<!-- 绑定钱包内容展示 -->
					<div v-if="address && (address !== 'NO_ADDRESS')">
						<div class="wallet-bind-title">{{$t('walletText')}}：</div>
						<el-tag id="walletDetail">{{address === '' }}</el-tag>
						<el-tag id="walletDetail">{{address === '' }}</el-tag>
					</div>
					<div v-if="address === 'NO_ADDRESS'">
						<div class="wallet-wrap">
							<span class="key">{{$t('newWalletText')}}:</span>
							<input type="text" class="input wallet-input" v-model="new_eth_address">
						</div>
						<div class="wallet-wrap">
							<span class="key">{{$t('imageVerCode')}}:</span>
							<ImageCode imageStyle="" type="text" v-model="inputImageCode" class="wallet-image-code"></ImageCode>
						</div>
						<div class="wallet-wrap">
							<span class="key">{{$t('emailCode')}}:</span>
							<div class="wallet-email">
								<SendEmailCode type="text" v-model="inputEmailCode" needImageCode=true :imageCode="inputImageCode" :email="email" @emailCodeTip="emailCodeTip"></SendEmailCode>
							</div>
						</div>
						<!-- <div class="wallet-wrap">
							<span class="key">{{$t('inputPasswordText')}}:</span>
							<input type="password" class="input wallet-input" v-model="password">
						</div> -->
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
			"tips_one": "1. Please use the ETH hot wallet that supports erc20 token as the wallet for cash withdrawal.",
			"tips_two": "2. The wallet address format is a 42-bit string starting with 0x.",
			"tips_three": "3. Don't use the exchange's address, which may result in a withdrawal failure and loss of revenue.",
			"tips_four": "4. The wallet unbinding function will not be opened yet. Please check whether the bound wallet address is correct. If the cashier's address is incorrect, the cash will be lost, and BonusCloud will not bear any responsibility."
		},
		"sureTips": "The wallet unbinding function will not be opened yet. Please check whether the bound wallet address is correct. If the cashier's address is incorrect, the cash will be lost, and BonusCloud will not bear any responsibility.",
		"walletConfirm": "confirm",
		"walletCancel": "cancel",
		"imageVerCode": "Please enter the image verification code",
		"emailCode": "Please enter the email verification code",

		"errorTipsAboutBind": "Please enter the email code or wallet address"
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
			"tips_four": "4.暂未开放钱包解绑功能，请认真核对绑定的钱包地址是否正确，若由于钱包地址错误导致提现失败，收益丢失，BonusCloud不承担任何责任。"
		},
		"sureTips": "暂未开放钱包解绑功能，请认真核对绑定的钱包地址是否正确，若由于钱包地址错误导致提现失败，收益丢失，BonusCloud不承担任何责任。",
		"walletConfirm": "确定",
		"walletCancel": "取消",
		"imageVerCode": "请输入图形验证码",
		"emailCode": "请输入邮箱验证码",
		"errorTipsAboutBind": "请输入地址或者邮箱验证码"
  }
}
</i18n>


<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import { mapState, mapActions, mapMutations } from "vuex";
import AccountSetLayout from "@/components/AccountSet/AccountSetLayout.vue";
import BasiceLayout from "@/components/Common/BasicLayout.vue";
import { Message } from "element-ui";
import ImageCode from "@/components/ImageCode.vue";
import SendEmailCode from "@/components/SendEmailCode.vue";

export default {
  name: "home",
  components: {
    Header,
    BasiceLayout,
    AccountSetLayout,
    ImageCode,
    SendEmailCode
  },
  computed: mapState({
    address: state => state.wallet.address,
    email: state => state.account.email
  }),
  data() {
    return {
      // password: "",
      new_eth_address: "",
      inputImageCode: "",
      inputEmailCode: ""
    };
  },
  created() {
    this.getWalletAddress();
  },
  methods: {
    ...mapActions(["getWalletAddress", "bindWalletAddress"]),
    bindWallet(text) {
      console.log(this.$i18n.messages);

      // let { password, new_eth_address } = this;
      let { inputImageCode, inputEmailCode, new_eth_address } = this;

      if (!inputImageCode || !inputEmailCode || !new_eth_address) {
        Message(this.$t("errorTipsAboutBind"));
        return;
      }

      if (new_eth_address.length !== 42) {
        Message("new wallet address is error");
        return;
			}
			//  绑定提示
      this.$confirm(text, {
        confirmButtonText: this.$t("walletConfirm"),
        cancelButtonText: this.$t("walletCancel")
      })
        .then(() => {
          this.bindWalletAddress({
						inputImageCode,
						new_eth_address,
						emailVerifyCode: inputEmailCode,
          }).then(res => {
            if (res.code === 200) {
              Message({
                type: "success",
                message: "bind success"
              });
              this.getWalletAddress();
            } else {
              Message({
                type: "error",
                message: res.message || "bind error"
              });
            }
          });
        })
        .catch(() => {
          console.log("cancel");
        });
    },
    // 邮箱验证错误
    emailCodeTip(error) {
      console.log(error);
      if (error.message) {
        Message({
          type: "error",
          message: error.message
        });
      }
    }
  }
};
</script>

<style lang="stylus">

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
	margin: 20px 0 30px;
}

.wallet-wrap .key {
	display: inline-block;
	width: 200px;
	color: #96999b;
}

.wallet-content #walletDetail {
	font-size: 18px;
	padding: 5px 10px;
	-webkit-box-sizing: content-box;
	box-sizing: content-box;
	margin: 40px 0 70px 0px;
	width: 100%;
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

.wallet-wrap input.basic-input {
	height: 40px;
}

.wallet-wrap .wallet-email {
	display: inline-block;
	min-width: 250px;
}
</style>

