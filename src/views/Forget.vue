<template>
  <div class="home">
    <Header type='login-header'/>
    <AccountLayout>
			<!-- 登陆框 -->
			<div class="account-dialog">
				<div class="title">{{$t('forgetPW.forgetTitle')}}</div>
					<!-- 邮箱 -->
					<BasicInput
						type="text"
						icon-type="email"
						class="account-input account-email"
						:placeValue="$t('forgetPW.forgetEmail')"
            v-model="inputEmail"
						></BasicInput>
					<div v-if="EmailErrMsg" class="account-error">
              <i class="el-alert__icon el-icon-error"></i>
              <span class="EmailErrorMsg">{{ EmailErrMsg }}</span>
          </div>
					<!-- 验证码 -->    
					<ImageCode
						type="text"
						icon-type="imageCode"
            v-model="inputImageCode"
						class="account-input forget-code"
						v-bind:imageCodeSrc="imageCodeSrc"
						:placeValue="$t('forgetPW.forgetImg')"></ImageCode>
					<div v-if="ImageCodeErrMsg" class="account-error">
						<i class="el-alert__icon el-icon-error"></i>
						<span class="ImageCodeErrMsg">{{ ImageCodeErrMsg }}</span>
          </div>
					<!-- 邮件码 -->
					<SendEmailCode
						type="text"
						icon-type="emailCode"
						class="account-input password-email"
            v-model="inputEmailCode"
						needImageCode=true
            @emailCodeTip="emailCodeTip"
						:imageCode="inputImageCode"
						:email="inputEmail"
						:placeValue="$t('forgetPW.forgetVer')"></SendEmailCode>
					<div v-if="EmailCodeErrMsg" class="account-error">
						<i class="el-alert__icon el-icon-error"></i>
						<span class="EmailCodeErrMsg">{{ EmailCodeErrMsg }}</span>
          </div>
					<!-- 密码 -->
					<BasicInput
						type="password"
						icon-type="password"
						class="account-input password-email"
            v-model="inputPw"
						:placeValue="$t('forgetPW.forgetPW')"></BasicInput>
					<div v-if="PwErrMsg" class="account-error">
						<i class="el-alert__icon el-icon-error"></i>
						<span class="PwErrMsg">{{ PwErrMsg }}</span>
          </div>
					<!-- 第二密码 -->
					<BasicInput
						type="password"
						icon-type="password"
						class="account-input password-email"
            v-model="inputSePw"
						:placeValue="$t('forgetPW.forgetConfirmPW')"></BasicInput>
					<div v-if="secPsErrMsg" class="account-error">
						<i class="el-alert__icon el-icon-error"></i>
						<span class="secPsErrMsg">{{ secPsErrMsg }}</span>
          </div>
					<div class="sign-up-button bonus-cursor" v-on:click="signUp">{{ $t('forgetPW.resetButton') }}</div>
					<div class="login-sign-wrap bonus-cursor" v-on:click="login">{{ $t('forgetPW.loginRedirect') }}</div>
        </div>
    </AccountLayout>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import AccountLayout from "@/components/AccountLayout.vue";
import BasicInput from "@/components/BasicInput.vue";
import SendEmailCode from "@/components/SendEmailCode.vue";
import ImageCode from "@/components/ImageCode.vue";
import { mapMutations, mapActions, mapState } from "vuex";
import { Message } from "element-ui";

export default {
  name: "SignUp",
  data() {
    return {
      //	输入错误信息时提示
      EmailErrMsg: "",
      ImageCodeErrMsg: "",
      EmailCodeErrMsg: "",
      PwErrMsg: "",
      secPsErrMsg: "",

      //	输入的注册字段
      inputEmail: "",
      inputImageCode: "",
      inputEmailCode: "",
      inputPw: "",
      inputSePw: "",

      // 注册可点击状态
      isSignUpDisable: false
    };
  },
  components: {
    Header,
    AccountLayout,
    BasicInput,
    SendEmailCode,
    ImageCode
  },
  mounted() {
    // 获取注册初始化图片验证码
    // https://pic2.zhimg.com/v2-0bbdc9b295ad2df6e13e40113feb09cf_1200x500.jpg
    // this.getImageCode();
  },
  computed: mapState({
    // 验证码地址
    imageCodeSrc: state => state.signUp.imageCodeSrc
  }),
  methods: {
    ...mapActions(["getImageCode", "ajaxForget"]),
    // 登陆
    login() {
      this.$router.push({ name: "login" });
    },
    // ...mapMutations(["isSignUpDisable"]),
    // 注册
    signUp() {
      const {
        inputEmail,
        inputImageCode,
        inputEmailCode,
        inputPw,
        inputSePw,
        isSignUpDisable
      } = this;

      // 避免多次点击
      if (isSignUpDisable) {
        console.log("不可点击状态");
        return true;
      }

      // 邮箱验证
      const emailRule = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
      if (emailRule.test(inputEmail)) {
        this.EmailErrMsg = "";
      } else {
        this.isSignUpDisable = false;
        this.EmailErrMsg = "The email error";
        return true;
      }

      // 邮箱验证码验证
      if (inputEmailCode) {
        this.EmailCodeErrMsg = "";
      } else {
        this.isSignUpDisable = false;
        this.EmailCodeErrMsg = "The Cerification Code error";
        return true;
      }

      if (inputPw && inputPw.length >= 6) {
        this.PwErrMsg = "";
      } else {
        this.isSignUpDisable = false;
        this.PwErrMsg = "The password error";
        inputPw.length < 6 &&
          (this.PwErrMsg = "The password length is too small");
        return true;
      }

      if (inputSePw && inputSePw === inputPw) {
        this.secPsErrMsg = "";
      } else {
        this.isSignUpDisable = false;
        this.secPsErrMsg =
          inputSePw === inputPw
            ? "The confirm password error"
            : "The confirm password error";
        return true;
      }

      let that = this; 

      // this.DISABLE_LOGIN();
      this.ajaxForget({
        email: inputEmail,
        emailVerifyCode: inputEmailCode,
        password: inputPw,
        rePassword: inputSePw
      }).then(res => {
        that.isSignUpDisable = false;
        console.log("signUp:", res);
        if (res && res.message) {
					if (res.message === 'password reset success') {
						Message({
							message: 'reset password success',
							type: 'success'
						});
						setTimeout(() => {
							that.$router.push({name: 'login'})
						}, 3000);
					} else {
            Message(res.message);					
          }
        } else {
          Message("network error");					
				}	
      });
    },
    // 发送邮件码错误提示
    emailCodeTip(error) {
      console.log(error);
      if (error.type === "captcha") {
        this.ImageCodeErrMsg = error.message;
      } else if (error.type === "email") {
        this.EmailErrMsg = error.message;
      }
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.account-dialog {
	width: 52%;
	max-height: 390px;
	max-width: 420px;
	background: #fff;
	border: 1px solid #e3e3e7;
	margin: 18% 0 0 10%;
	padding-bottom: 35px;
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

.sign-up-button {
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

.password-email, .forget-code {
	margin-top: 15px;
}

.login-sign-wrap {
	font-family: PingFangSC-Regular;
	font-size: 12px;
	color: #13b8bc;
	text-align: right;
	line-height: 36px;
	margin: 0 30px 35px;
}

.account-error {
	box-sizing: border-box;
	padding: 5px 30px 0;
	color: #EE4035;
	font-size: 10px;
}

.el-alert__icon {
	font-size: 10px;
}
</style>

