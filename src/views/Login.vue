<template>
  <div class="home">
    <Header type='login-header' />
    <AccountLayout>
      <!-- 登陆框 -->
      <div class="account-dialog">
        <div class="title">{{ $t('login.loginTitle') }}</div>
        <!-- 邮箱 -->
        <BasicInput
          type="text"
          icon-type="email"
          class="account-input account-email"
          :placeValue="$t('login.loginPlaceHolder')"
          v-model="inputEmail"
          ></BasicInput>
        <div v-if="EmailErrorMsg" class="account-error">
          <i class="el-alert__icon el-icon-error"></i>
          <span class="EmailErrorMsg">{{ EmailErrorMsg }}</span>
        </div>
        <BasicInput
          type="password"
          icon-type="password"
          class="account-input password-email"
          v-model="inputPassword"
          needKeyEnter=true
          @keyEnter="startLogin"
          :placeValue="$t('login.PWPlaceHolder')"></BasicInput>
        <div v-if="passwordErrorMsg" class="account-error">
            <i class="el-alert__icon el-icon-error"></i>
            <span class="passwordErrorMsg">{{ passwordErrorMsg }}</span>
          </div>
        <!-- 登陆 -->
        <div class="login bonus-cursor" v-on:click="startLogin">{{ $t('login.loginButton') }}</div>
        <div class="login-sign-wrap">
          <div class="login-sign-up bonus-cursor" v-on:click="signUp">{{ $t('login.redirectSign') }}</div>
          <div class="login-forget bonus-cursor" v-on:click="forget">{{ $t('login.redirectForget') }}?</div>
        </div>
      </div>
    </AccountLayout>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import AccountLayout from "@/components/AccountLayout.vue";
import BasicInput from "@/components/BasicInput.vue";
import { mapState, mapActions, mapMutations } from "vuex";
import { Message } from "element-ui";

export default {
  name: "Login",
  components: {
    Header,
    AccountLayout,
    BasicInput
  },

  data() {
    return {
      EmailErrorMsg: "",
      passwordErrorMsg: "",
      inputEmail: "",
      inputPassword: "",
      isLoginDisable: false //login可点击状态
    };
  },
  computed: mapState({
    //  箭头函数可使代码更简练
    newEmail: state => state.account.email
    // isLoginDisable: state => state.account.isLoginDisable
  }),
  methods: {
    ...mapActions(["login"]),
    // ...mapMutations(["DISABLE_LOGIN"]),
    // 登陆
    startLogin() {
      const { inputEmail, inputPassword, isLoginDisable } = this;
      if (isLoginDisable) {
        return true;
      }
      // 邮箱正则表达式
      const emailRule = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
      if (emailRule.test(inputEmail)) {
        this.EmailErrorMsg = "";
      } else {
        this.EmailErrorMsg = "The email error";
        return true;
      }
      // 密码校验
      if (inputPassword.length >= 6 && inputPassword.length < 30) {
        this.passwordErrorMsg = "";
      } else {
        this.passwordErrorMsg = "The password is too small or too long";
        return true;
      }

      this.isLoginDisable = true;
      this.login({ email: inputEmail, password: inputPassword }).then(res => {
        if (res.code === 200) {
          Message({
            message: "login success",
            type: "success"
          });
          setTimeout(() => {
            this.$router.push({ name: "home" });
          }, 2000);
        } else {
          this.isLoginDisable = false;
          Message({
            message: res.message || "login error",
            type: "error"
          });
        }
      });
    },
    // 注册
    signUp() {
      this.$router.push({ name: "signUp" });
    },
    // 忘记密码
    forget() {
      this.$router.push({ name: "forget" });
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.account-error {
  box-sizing: border-box;
  padding: 5px 30px 0;
  color: #EE4035;
  font-size: 10px;
}

.el-alert__icon {
  font-size: 10px;
}

.account-dialog {
  width: 52%;
  max-height: 390px;
  max-width: 420px;
  background: #fff;
  border: 1px solid #e3e3e7;
  margin: 18% 0 0 10%;
}

.account-dialog .title {
  font-family: PingFangSC-Semibold;
  color: #65686A;
  font-size: 12px;
  line-height: 12px;
  padding: 30px 0 30px 40px;
  text-align: left;
}

.account-dialog .title {
  font-size: 14px;
  line-height: 14px;
  padding: 35px 0 35px 30px;
  text-align: left;
}

.input-wrap {
  margin: 10px 40px 20px 40px;
}

.login {
  box-sizing: border-box;
  margin: 35px 30px 5px 30px;
  background-image: linear-gradient(-180deg, #15BCAD 2%, #10B2CB 100%);
  line-height: 30px;
  height: 30px;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #FFFFFF;
  text-align: center;
  line-height: 30px;
}

@media screen and (min-width: 1200px) {
  .account-dialog {
    width: 350px;
    // height: 320px;
  }
}

@media screen and (max-width: 1200px) {
  .account-dialog {
    width: 300px;
    // height: 280px;
    max-height: 390px;
    max-width: 420px;
    background: #fff;
    border: 1px solid #e3e3e7;
    margin: 120px 0 0 98px;
  }
}

.account-input {
  margin: 0 30px;
}

.BasicInput.account-input.password-email {
  margin-top: 12px;
}

.login-sign-wrap {
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #13B8BC;
  text-align: justify;
  line-height: 36px;
  margin: 0 30px 35px;
  display: flex;
  justify-content: space-between;
}
</style>

