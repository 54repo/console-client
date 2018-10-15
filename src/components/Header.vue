<template>
  <div class="header"  v-bind:class="type">
    <el-row class="header-panel">
      <el-col :span="4"><div class="grid-content bg-purple">
        <router-link to="/">
          <img  class="header-logo " alt="header-logo" src="../assets/bonus-logo.png" >
        </router-link>
        <div class="line"></div>
      </div></el-col>
      <el-col :span="20" class="header-login-panel" >
        <div class="header-panel-wrap" v-if="type !== 'login-header'">
          <router-link to="/">
            <div  class="header-date-panel header-each-tab" v-bind:class="{opacityPercent: !(thisPath === '/' || thisPath === '/revenue') }">
              <img  class="menu-icon home-icon" src="../assets/home/data-panel-login.png" >            
              {{ $t('header.dataPanel') }}
            </div>
          </router-link>
          <router-link to="/hardList">
           <div class="account-settings header-each-tab" v-bind:class="{opacityPercent:  !(thisPath === '/hardList')  }">
              <img  class="menu-icon home-icon" src="../assets/accountSet/hard-list.png" >            
              {{ $t('header.hardware') }}
            </div>
          </router-link>
          <router-link to="/accountSet">
            <div class="account-settings header-each-tab" v-bind:class="{opacityPercent:  !(thisPath === '/accountSet')  }">
              <img  class="menu-icon home-icon" src="../assets/home/account-setting.png" >            
              {{ $t('header.accountSetting') }}
            </div>
          </router-link>
          <div class="header-email header-each-tab">{{email}}</div>
          <div class="header-logout header-each-tab  bonus-cursor" @click="clickLogout">{{ $t('header.logout') }}</div>
        </div>
        <div v-if="!whichLanguage" class="header-language header-each-tab  bonus-cursor" @click="changeLanguage('zn')">中文</div>
        <div v-if="whichLanguage" class="header-language header-each-tab  bonus-cursor" @click="changeLanguage('en')">English</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Header",
  props: {
    type: ""
  },
  data() {
    return {
      whichLanguage: false
    };
  },
  computed: mapState({
    email: state => state.account.email,
    loginStatus: state => state.account.loginStatus,
    thisPath() {
      return  this.$route.path;
    },
  }),
  methods: {
    ...mapActions(["logout", "getUserInfo"]),
    // 注销
    clickLogout() {
      this.logout();
    },
    // 语言切换
    changeLanguage(locale) {
      this.whichLanguage = (locale === "zn");
      this.$i18n.locale = locale;
      this.$cookie.set("BASIC_LANUAGE", locale);
    }
  },
  created() {
    //   用户账号信息获取
    if (!this.email && this.type !== "login-header") {
      // 获取用户信息
      this.getUserInfo();
    }
    // 缓存语言设置
    let language = this.$cookie.get("BASIC_LANUAGE");
    this.$i18n.locale = language;
    this.whichLanguage = (language === "zn");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.header-panel-wrap
  display: flex
.header {
  font-size: 18px;
  background: #171E22;
  width: 100%;
  height: 62px;
  position: relative;
  display: flex;
}

.header-logo {
  width: 130px;
  height: 23.5px;
  margin: 19px 25px;
}

.login-header {
  background: #000519;
}

.home-header {
  background: #000519;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
}

.line {
  border-bottom: 1px solid #979797;
  opacity: 0.3;
  width: 100%;
  top: 62px;
  position: absolute;
}

.header-each-tab {
  height: 62px;
  line-height: 62px;
  font-size: 16px;
  color: #FFFFFF;
  line-height: 62px;
  margin-left: 30px;
}

.header-panel {
  width: 100%;
  text-align: left;
}

.header-login-panel {
  display: flex;
  position: relative;
}

.account-settings {
  margin-left: 50px;
}

.header-logout {
  position: absolute;
  right: 30px;
}

.header-email {
  position: absolute;
  right: 170px;
  padding-left: 1px solid #E7EAEC;
}

.opacityPercent {
  opacity: 0.4;
}

.header-language {
  position: absolute;
  right: 100px;
  text-align: center;
  width: 40px
}
</style>
