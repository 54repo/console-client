/** 登录框组件 **/
<template>
  <div class="BasicInput EmailBaseInput">
    <vue-recaptcha
      class="captcha-wrap"
      ref="recaptcha"
      @verify="onVerify"
      @expired="onExpired"
      data-size="normal"
      :sitekey="siteKey"
    >
    </vue-recaptcha>
    <div class="email_wrap">
      <div
        v-if="iconType"
        class="icon-wrap"
      >
        <div
          v-bind:class="iconType"
          class="icon"
        ></div>
      </div>
      <input
        class="basic-input"
        v-bind:placeholder="placeValue"
        v-bind:type="type"
        v-model="inputValue"
        v-on:input="$emit('change', $event.target.value)"
      />
      <div
        v-if="sendStatus"
        class="send-code bonus-cursor"
        v-bind:class="imageStyle"
        v-on:click="sendCode"
      >{{ $t('register.sendVCOde') }}</div>
      <div
        v-if="!sendStatus"
        class="send-code"
        v-bind:class="imageStyle"
      >{{ count }}</div>
    </div>

  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { Message } from "element-ui";
import { LANG } from "../../config/contant.js";
import VueRecaptcha from "vue-recaptcha";

export default {
  name: "EmailCode",
  props: {
    iconType: "", // icon图地址
    defaultValue: "",
    placeValue: "", // input placehoder
    type: "", // input类型,
    value: "",
    imageCodeSrc: "", //图片验证码地址,
    email: "", //邮箱地址
    imageCode: "", // 图片验证码
    imageStyle: "", //绑定页面特定样式
    siteKey: ''
  },
  model: {
    prop: "value",
    event: "change"
  },
  components: {
    VueRecaptcha
  },
  data() {
    return {
      inputValue: this.value,
      sendStatus: true, // 验证码点击状态
      TIME_COUNT: 60, //倒计时时间
      count: "", // 计数
      timer: null, // 记录循环
      time: 60, // 发送验证码倒计时
      sendMsgDisabled: false,
      response: "" //ga verify response
    };
  },
  methods: {
    ...mapActions(["sendEmailCode_v3"]),
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
    sendCode() {
      let that = this;
      let {email, response} = this;
      // -----后续建议提出来统一维护
      const emailRule = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,6}){1,2})$/;
      if (!email || !emailRule.test(email)) {
        that.$emit("emailCodeTip", {
          type: "email",
          message: "the email is error "
        });
        return;
      }
      // 进行图片验证
      if (!response) {
        that.$emit("emailCodeTip", {
          type: "captcha",
          message: "Please verify."
        });
      } else {
        // 倒计时
        this.startCountBack();

        this.sendEmailCode_v3({
          email,
          response
        }).then(res => {
          if (!res.ret) {
            clearInterval(that.timer);
            that.sendStatus = true;
            Message(res.message || "network error");
          } else {
            let { step, status } = res.ret;
            if (status === "failed") {
              clearInterval(that.timer);
              that.sendStatus = true;
              if (step === "captcha") {
                that.$emit("emailCodeTip", {
                  type: "captcha",
                  message: res.message
                });
              } else if (step === "email") {
                that.$emit("emailCodeTip", {
                  type: "email",
                  message: res.message
                });
              }
            } else {
              that.$emit("emailCodeTip", {
                type: "email",
                message: ""
              });
              that.$emit("emailCodeTip", {
                type: "captcha",
                message: ""
              });
            }
          }
        });
      }
    },
    startCountBack() {
      let that = this;
      that.sendStatus = false; //倒计时
      const TIME_COUNT = that.TIME_COUNT;
      that.count = TIME_COUNT;
      that.timer = setInterval(() => {
        if (that.count > 0 && that.count <= TIME_COUNT) {
          that.count--;
        } else {
          that.show = true;
          clearInterval(that.timer);
          that.timer = null;
          that.sendStatus = true;
        }
      }, 1000);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.EmailBaseInput .captcha-wrap {
  margin: 0px;
  transform: scale(0.96);
  -webkit-transform: scale(0.96);
  transform-origin: 0 0;
  -webkit-transform-origin: 0 0;
}

.BasicInput.EmailBaseInput.account-input.password-email {
  height: 120px;
}

.email_wrap {
  display: flex;
  margin: 10px 0 0px;
}

@media screen and (max-width: 1200px) {
  .EmailBaseInput .captcha-wrap {
    transform: scale(0.79);
    -webkit-transform: scale(0.79);
    transform-origin: 0 0;
    -webkit-transform-origin: 0 0;
  }

  .BasicInput.EmailBaseInput.account-input.password-email {
    height: 110px;
  }

  .email_wrap {
    display: flex;
    margin: 0px;
  }
}

.account-email {
  min-height: 100px;
}

.captcha_wrap {
  height: 30px;
  width: 270px;
}

.EmailBaseInput.BasicInput {
  display: block;
  min-height: 90px;
}

.BasicInput {
  height: 30px;
  display: flex;
  position: relative;
}

.icon-wrap {
  box-sizing: border-box;
  height: 30px;
  width: 30px;
  background: #F1F2F2;
  border: 1px solid #D2D5D6;
  border-right: 0px;
  background-size: 30px 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon {
  width: 10px;
  height: 10px;
  background-size: contain;
}

input.basic-input {
  height: 30px;
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #000;
  display: inline-block;
  font-size: inherit;
  height: 30px;
  line-height: 30px;
  outline: none;
  padding: 0 10px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
  font-size: 10px;
}

.emailCode {
  background-image: url('../../assets/account/emailCode.png');
}

.send-code {
  font-family: PingFangSC-Regular;
  font-size: 10px;
  color: #13B8BC;
  text-align: right;
  position: absolute;
  right: 5px;
  line-height: 30px;
}

.unbind-style.send-code {
  line-height: 42px;
}

#TCaptcha {
  position: absolute;
  top: 0;
  left: 0;
}

.displayCaptcha {
  display: none;
}
</style>

