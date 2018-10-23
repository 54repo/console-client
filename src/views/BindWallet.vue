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
					<div class="button wallet-bind" @click="bindWallet">确定</div>
				</div>
			</BasiceLayout>
		</AccountSetLayout>
	</div>
</template>

<i18n>
{
  "en": {
    "bindWalletTitle": "Wallet Binding",
    "walletText": "当前绑定的钱包地址",
		"newWalletText": "绑定新的钱包地址",
		"inputPasswordText": "输入新的账号密码"

  },
  "zn": {
    "bindWalletTitle": "钱包绑定",
    "walletText": "当前绑定的钱包地址",
		"newWalletText": "绑定新的钱包地址",
		"inputPasswordText": "输入新的账号密码"
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
    bindWallet() {
			let { password, new_eth_address } = this;
			if (!password || !new_eth_address) {
				Message('no password or no new_eth_address');
				return;
			}
			if (password.length < 6) {
				Message('password length should bigger than 6');
				return;
			}
			if (new_eth_address.length !== 42) {
				Message('new wallet address is error');
				return;
			}
			
      this.bindWalletAddress({
        password,
        new_eth_address
      }).then(res => {
        if (res.code === 200) {
          Message("bind sucdess");
          this.getWalletAddress();
        } else {
          Message({
            type: "error",
            message: res.message || "bind error"
          });
        }
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
	min-height: 500px;
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
</style>

