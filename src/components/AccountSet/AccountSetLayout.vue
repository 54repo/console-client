<template>
  <div class="account-set-layout">
    <Header type='home-header' />
    <el-row class="tac">
      <el-col :span="4">
        <h5 class="panel-wrap">{{$t('account_set_menu')}}</h5>
        <el-menu class="bonus-menu" background-color="#0A0E22" text-color="#989AA2" active-text-color="#fff" router="router">
          <el-menu-item index="1" route="/accountSet" class="home-page-wrap" v-bind:class="{ isActive: (thisPath === '/accountSet') }">
            <img class="menu-icon home-icon" src="../../assets/accountSet/account-set.png">
            <span slot="title">{{$t('account_set_1')}}</span>
          </el-menu-item>
          <el-menu-item index="2" route="/bindWallet" v-bind:class="{ isActive: (thisPath === '/bindWallet') }">
            <img class="menu-icon home-icon" src="../../assets/accountSet/wallet-bind.png">
            <span slot="title">{{$t('account_set_2')}}</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20" class="bonus-content">
        <div class="title">{{layoutTitile}}</div>
        <div>
        </div>
        <slot></slot>
      </el-col>
    </el-row>
  </div>
</template>

<i18n>
{
  "en": {
    "account_set_menu": "Account Settings",
    "account_set_1": "Change Password",
    "account_set_2": "Wallet Binding"
  },
  "zn": {
    "account_set_menu": "账号设置",
    "account_set_1": "修改密码",
    "account_set_2": "钱包绑定"
  }
}
</i18n>

<script>
import Header from "@/components/Header.vue";

export default {
  name: "AccountSetLayout",
  components: {
    Header
  },
  props: {
    layoutType: "",
    layoutTitile: ""
  },
  computed: {
    thisPath() {
      return this.$route.path;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.isActive, .el-menu-item.is-active {
  background-color: #032031;
  border-left: 3px solid #11B6BD;
  color: #fff !important;
}

.account-set-layout, .tac {
  height: 100%;
}
</style>
