<template>
	<div class="home">
		<AccountSetLayout layoutType="AccountSet" :layoutTitile="$t('bindWalletTitle')">
			<BasiceLayout :title="$t('bindWalletTitle')">
				<div class="wallet-content">
					<div v-if="address" class="wallet-bind-title">{{$t('walletText')}}：</div>
					<el-tag v-if="address" id="walletDetail">{{address || 'no address'}}</el-tag>
					<div class="wallet-wrap">
						<span class="key">{{$t('newWalletText')}}:</span>
						<input type="text" class="input wallet-input" v-model="new_eth_address">
					</div>
					<div class="wallet-wrap">
						<span class="key">{{$t('inputPasswordText')}}:</span>
						<input type="password" class="input wallet-input" v-model="password">
					</div>
					<div class="button wallet-bind" @click="bindWallet( $t('sureTips') )">确定</div>
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
		"newWalletText": "Bind New Wallet Address",
		"inputPasswordText": "Enter Password",
		"walletTip": "Attention",
		"walletTips": {
			"tips_one": "1. Please use the ETH hot wallet that supports erc20 token as the wallet for cash withdrawal.",
			"tips_two": "2. The wallet address format is a 42-bit string starting with 0x.",
			"tips_three": "3. Don't use the exchange's address, which may result in a withdrawal failure and loss of revenue.",
			"tips_four": "4. Please check whether the bound wallet address is correct. If the cashier's address is incorrect, the cash will be lost, and BonusCloud will not bear any responsibility."
		},
		"sureTips": "Please check whether the bound wallet address is correct. If the cashier's address is incorrect, the cash will be lost, and BonusCloud will not bear any responsibility."
  },
  "zn": {
    "bindWalletTitle": "钱包绑定",
    "walletText": "当前绑定的钱包地址",
		"newWalletText": "绑定新的钱包地址",
		"inputPasswordText": "输入新的账号密码",
		"walletTips": "注意事项",
		"walletTips": {
			"tips_one": "1.请使用支持erc20 token的ETH热钱包作为用于提现的钱包。",
			"tips_two": "2.钱包地址格式为0x开头的42位字符串。",
			"tips_three": "3.请勿使用交易所充值地址，可能会导致提现失败，收益丢失。",
			"tips_four": "4.请认真核对绑定的钱包地址是否正确，若由于钱包地址错误导致提现失败，收益丢失，BonusCloud不承担任何责任。"
		},
		"sureTips": "请认真核对绑定的钱包地址是否正确，若由于钱包地址错误导致提现失败，收益丢失，BonusCloud不承担任何责任。"
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

export default {
  name: "home",
  components: {
    Header,
    BasiceLayout,
    AccountSetLayout
  },
  computed: mapState({
    address: state => state.wallet.address
  }),
  data() {
    return {
      password: "",
      new_eth_address: ""
    };
  },
  created() {
    this.getWalletAddress();
  },
  methods: {
    ...mapActions(["getWalletAddress", "bindWalletAddress"]),
    // 确认绑定钱包
    // sureBind(text) {
    //   this.$confirm(text, "提示", {
    //     confirmButtonText: "sure",
    //     cancelButtonText: "cancel"
    //   })
    //     .then(() => {
    //       this.bindWallet();
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "已取消删除"
    //       });
    //     });
    // },
    bindWallet(text) {
      let { password, new_eth_address } = this;
      if (!password || !new_eth_address) {
        Message("no password or no new_eth_address");
        return;
      }
      if (password.length < 6) {
        Message("password length should bigger than 6");
        return;
      }
      if (new_eth_address.length !== 42) {
        Message("new wallet address is error");
        return;
      }

      this.$confirm(text, "提示", {
        confirmButtonText: "sure",
        cancelButtonText: "cancel"
      })
        .then(() => {
          this.bindWalletAddress({
            password,
            new_eth_address
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
					console.log('cancel')
        });
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
	margin: 80px auto;
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
</style>

