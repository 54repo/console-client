<template>
  <div class="home">
    <HardwareLayout layoutType="HARDLIST" :layoutTitile="$t('layoutTitile')">
      <BasiceLayout :title="$t('hardListLayoutTitile')">
        <div class="hardware-content">
          <el-table v-if="hardList !== 'NO_CONTENT'" :data="hardList" align="left" empty-text="Loading..." style="width: 100%">
            <!-- mac address -->
            <el-table-column prop="mac_address" :label="$t('macAddress')">
            </el-table-column>
            <!-- 绑定时间 -->
            <el-table-column prop="bind_at" empty-text="-" :label="$t('date')" align='center'>
            </el-table-column>
            <!-- IP -->
            <el-table-column prop="" label="IP" align='center'>
              <template slot-scope="scope">
                <div v-if="!scope.row.ip">-</div>
                <div v-if="scope.row.ip">{{scope.row.ip}}</div>
              </template>
            </el-table-column>
            <!-- 在线状态 -->
            <el-table-column prop="" :label="$t('netStatus')" align='center'>
              <template slot-scope="scope">
                <div v-if="!scope.row.status">-</div>
                <el-tag v-if="scope.row.status === 'online'" type="success">online</el-tag>
                <el-tag v-if="scope.row.status === 'offline'" type="danger">offline</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="" align='right'>
              <template slot-scope="scope">
                <div type="danger" :deviceId="scope.row.id" @click="checkUnBind(scope.row.id)" class="unbind-button bonus-cursor">解绑</div>
              </template>
            </el-table-column>
          </el-table>
          <el-table v-if="hardList === 'NO_CONTENT'" :empty-text="$t('noHardwareTip')" style="width: 100%">
          </el-table>
        </div>
      </BasiceLayout>
    </HardwareLayout>
    <el-dialog :title="$t('dialog.title')" :visible.sync="showUnbindDialog" width="480px" center>
      <div class="unbind-dialog-wrap">
        <span class="key">{{$t('dialog.imageVerify')}}</span>
        <div class="hard-captcha">
          <div id="TCaptcha" style="width:100%;height:30px;"></div>
        </div>
      </div>
      <div class="unbind-dialog-wrap">
        <span class="key">{{$t('dialog.mailText')}}</span>
        <SendEmailCode type="text" imageStyle="unbind-style" :csnonce="csnonce" :ticket="ticket" class="unbind-input password-email" v-model="inputEmailCode" needImageCode=true :email="email" @emailCodeTip="emailCodeTip"></SendEmailCode>
      </div>
      <span slot="footer" class="dialog-footer">
        <div class="sure-unbind button" @click="showUnbindDialog = false">{{ $t('dialog.cancel') }}</div>
        <div class="sure-unbind button" type="primary" @click="unbind">{{ $t('dialog.sure') }}</div>
      </span>
    </el-dialog>
  </div>
</template>

<i18n>
{
  "en": {
		"layoutTitile": "Hardware List",
		"hardListLayoutTitile": "Hardware List",
		"macAddress": "MAC Address",
		"date": "The Binding Date(UTC)",
		"code": "Binding BonusCode",
		"totalTime": "Total Online Time",
    "netStatus": "Status",
    "noHardwareTip": "No Device",
    "dialog": {
      "cancel": "Cancel",
      "sure": "Sure",
      "title": "Confirm Unbinding",
      "mailText": "Email Verfication Code",
      "imageVerify": "Image Verfication"
    }
  },
  "zn": {
		"layoutTitile": "硬件列表",
		"hardListLayoutTitile": "硬件列表",
		"macAddress": "硬件MAC地址",                                                                    
		"date": "绑定时间(UTC)",
		"code": "已绑定激活码 ",
		"totalTime": "累计在线时长",
    "netStatus": "在线状态",
    "noHardwareTip": "硬件列表为空",
    "dialog": {
      "cancel": "取 消",
      "sure": "确 定",
      "title": "确认解绑",
      "mailText": "邮箱验证码",
      "imageVerify": "图片验证"
    }
  }
}
</i18n>


<script>
// @ is an alias to /src
import { mapState, mapActions, mapMutations } from 'vuex'
import BasiceLayout from '@/components/Common/BasicLayout.vue'
import AccountSetLayout from '@/components/AccountSet/AccountSetLayout.vue'
import HardwareLayout from '@/components/Hardware/HardwareLayout.vue'
import SendEmailCode from '@/components/SendEmailCode.vue'
import moment from 'moment'
import { Message } from 'element-ui'
import { LANG } from '../config/contant.js'

export default {
  name: 'home',
  components: {
    BasiceLayout,
    AccountSetLayout,
    // ImageCode,
    SendEmailCode,
    HardwareLayout
    // EmailCodeWithTx,
  },
  data() {
    return {
      unbindId: '', //解绑Id
      showUnbindDialog: false, // 绑定弹框展示
      inputEmailCode: '', //输入的邮件码
      // inputImageCode: "" // 图片验证码
      ticket: '', // 验证码ticket
      csnonce: '' //整数
    }
  },
  computed: mapState({
    hardList(state) {
      if (state.hardList.length > 0 && state.hardList !== 'NO_CONTENT') {
        let hardList = state.hardList
        hardList.map(val => {
          if (val.bind_at) {
            val.bind_at = moment(new Date(val.bind_at)).format(
              'YYYY.MM.DD hh:mm:ss'
            )
          } else {
            val.bind_at = '-'
          }
        })
        return hardList
      } else if (state.hardList === 'NO_CONTENT') {
        return state.hardList
      } else {
        return []
      }
    },
    // 验证码地址
    // imageCodeSrc: state => state.signUp.imageCodeSrc,
    email: state => state.account.email
  }),
  methods: {
    ...mapActions(['getHardList', 'unbindHard', 'getVertifUrl']),
    change() {
      console.log(this.oldPw)
      this.changePw({
        oldPassword: this.oldPw,
        newPassword: this.newPw,
        reNewPassword: this.newSecPw
      })
    },
    checkUnBind(id) {
      this.showUnbindDialog = true
      this.unbindId = id
      let that = this
      console.log(id)
      setTimeout(() => {
        var capOption = {
          callback: cbfn,
          themeColor: '15bcad',
          lang: LANG[this.$i18n.locale]
        }
        capInit(document.getElementById('TCaptcha'), capOption)
        //回调函数：验证码页面关闭时回调
        function cbfn(retJson) {
          if (retJson.ret == 0) {
            that.ticket = retJson.ticket
            // that.sendCode();
            // 用户验证成功
          } else {
            //用户关闭验证码页面，没有验证
          }
        }
      }, 1000)
    },
    emailCodeTip(tip) {
      console.log(tip)
    },
    // 解绑
    unbind() {
      this.unbindHard({
        deviceId: this.unbindId,
        emailVerifyCode: this.inputEmailCode
      }).then(res => {
        if (res.message === 'unregister success') {
          // 刷新硬件列表
          this.getHardList()
          this.showUnbindDialog = false
          Message({
            type: 'success',
            message: res.message
          })
        } else {
          Message({
            type: 'error',
            message: res.message || 'unbind error'
          })
        }
        console.log(res)
      })
    },
    // email错误提示
    emailCodeTip(error) {
      if (error.message) {
        Message({
          type: 'error',
          message: error.message
        })
        console.log(error)
      }
    }
  },

  created() {
    this.getHardList()
    this.getVertifUrl().then(res => {
      this.csnonce = res.data.csnonce
      var newScript = document.createElement('script')
      newScript.type = 'text/javascript'
      newScript.src = res.data.url
      document.body.appendChild(newScript)
      let that = this
    })
  }
}
</script>

<style lang="stylus">
.hard-captcha {
  width: 100%;
}

.hardList-content {
  margin-top: 40px;
}

.unbind-button {
  background: #f56c6c;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #fff;
  text-align: center;
  line-height: 30px;
  width: 90px;
  height: 35px;
  display: inline-block;
}

.unbind-dialog-wrap .key {
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #343739;
  text-align: left;
  line-height: 42px;
  display: inline-block;
  width: 250px;
}

.unbind-dialog-wrap {
  display: flex;
  height: 42px;
  margin-bottom: 20px;
}

.unbind-input {
  width: 100%;
}

.unbind-dialog-wrap input.basic-input {
  height: 42px;
}

.button {
  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(2%, #15bcad), to(#10b2cb));
  background-image: linear-gradient(-180deg, #15bcad 2%, #10b2cb 100%);
  font-size: 14px;
  color: #fff;
  text-align: center;
  line-height: 18px;
  border-radius: 0;
  border: 0;
  display: inline-block;
  width: 90px;
  height: 35px;
  line-height: 35px;
  margin-left: 20px;
}
</style>

