<template>
  <div class="home">
    <HardwareLayout layoutType="HARDLIST" :layoutTitile="$t('layoutTitile')">
      <BasiceLayout :title="$t('hardListLayoutTitile')">
        <div class="hardware-content">
          <!-- mac地址搜索 -->
          <div class="hardware-search-wrap" v-if="allDevices">
            <span class="search-text">{{$t('mac_address')}}</span>
            <el-select v-model="value8" filterable placeholder="请选择" @change="search">
              <el-option v-for="item in allDevices" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <!-- 硬件列表 -->
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
                <div v-if="!scope.row.ext_ip">-</div>
                <div v-if="scope.row.ext_ip">{{scope.row.ext_ip}}</div>
              </template>
            </el-table-column>
            <el-table-column align='center' prop="location" :label="$t('location')"></el-table-column>
            <!-- 需求杜 -->
            <el-table-column prop="" :label="$t('needs')" align='center'>
              <template slot-scope="scope">
                <div v-if="!scope.row.needs">-</div>
                <el-tag v-if="scope.row.needs === '高'" type="success">高</el-tag>
                <el-tag v-if="scope.row.needs === '中'" type="info">中</el-tag>
                <el-tag v-if="scope.row.needs === '低'" type="danger">低</el-tag>
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
            <!-- 解绑 -->
            <el-table-column label="" align='right'>
              <template slot-scope="scope">
                <div type="danger" :deviceId="scope.row.id" @click="checkUnBind(scope.row.id)" class="unbind-button bonus-cursor">{{$t('unbindButton')}}</div>
              </template>
            </el-table-column>
            <!-- 备注 -->
            <el-table-column label="" align='right'>
              <template slot-scope="scope">
                <div v-if="scope.row.note">{{scope.row.note}}</div>
                <div v-if="!scope.row.note" :deviceId="scope.row.deviceId" @click="showNotes(scope.row.id, scope.row.mac_address)" class="add-note-button button bonus-cursor">{{$t('addNote')}}</div>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination" v-if="deviceSize > 1">
            <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="deviceSize" layout="total, prev, pager, next" :total="hardLength">
            </el-pagination>
          </div>
          <el-table v-if="hardList === 'NO_CONTENT'" :empty-text="$t('noHardwareTip')" style="width: 100%">
          </el-table>
        </div>
      </BasiceLayout>
    </HardwareLayout>
    <!-- 解绑 -->
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
    <!-- 增加备注 -->
    <el-dialog :title="$t('addNotes.title')" :visible.sync="showAddnoteDialog" width="480px" center>
      <div class="addnote-dialog-wrap">
        <span class="key">{{$t('addNotes.tipText')}}({{addNoteAddress}})</span>
        <input type="text" class="basic-input input addnote-input"  v-model="addNoteInput">
      </div>
      <span slot="footer" class="dialog-footer">
        <div class="sure-unbind button" @click="showAddnoteDialog = false">{{ $t('dialog.cancel') }}</div>
        <div class="sure-unbind button" type="primary" @click="addNote">{{ $t('dialog.sure') }}</div>
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
    "location": "Area",   
    "needs": "Area Node Requirement",                                                                    
		"date": "The Binding Date(UTC)",
		"code": "Binding BonusCode",
		"totalTime": "Total Online Time",
    "netStatus": "Status",
    "noHardwareTip": "No Device",
    "unbindButton": "unbind",
    "dialog": {
      "cancel": "Cancel",
      "sure": "Sure",
      "title": "Confirm Unbinding",
      "mailText": "Email Verfication Code",
      "imageVerify": "Image Verfication"
    },
    "needsHigh": "High",
    "needsMiddle": "Medium",
    "needsLow": "Low",
    "mac_address": "mac_address",
    "addNote": "add mac notes",
    "addNotes": {
      "title": "Add device note",
      "tipText": "Enter the name of the note you want to record for the device (change it only once) :"
    }
  },
  "zn": {
		"layoutTitile": "硬件列表",
		"hardListLayoutTitile": "硬件列表",
    "macAddress": "硬件MAC地址",
    "location": "所在地区",                                                                    
    "needs": "当前地区节点需求度",                                                                    
		"date": "绑定时间(UTC)",
		"code": "已绑定激活码 ",
		"totalTime": "累计在线时长",
    "netStatus": "在线状态",
    "noHardwareTip": "硬件列表为空",
    "unbindButton": "解绑",
    "dialog": {
      "cancel": "取 消",
      "sure": "确 定",
      "title": "确认解绑",
      "mailText": "邮箱验证码",
      "imageVerify": "图片验证"
    },
    "needsHigh": "高",
    "needsMiddle": "中",
    "needsLow": "低" ,
    "mac_address": "mac地址",
    "addNote": "增加mac备注",
    "addNotes": {
      "title": "添加设备备注",
      "tipText": "输入该设备记录的备注名（仅可修改一次）："
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
    SendEmailCode,
    HardwareLayout
  },
  data() {
    return {
      unbindId: '', //解绑Id
      showUnbindDialog: false, // 绑定弹框展示
      showAddnoteDialog: false, //添加备注
      addNoteInput: '',
      addNoteId: '', //添加备注Id
      addNoteAddress: '', //添加备注Id
      inputEmailCode: '', //输入的邮件码
      ticket: '', // 验证码ticket
      csnonce: '', //整数
      value8: ''
    }
  },
  computed: mapState({
    hardList: state => state.hardWare.list,
    hardLength: state => state.hardWare.hardLength,
    deviceSize: state => state.hardWare.deviceSize,
    currentPage: state => state.hardWare.currentPage,
    email: state => state.account.email,
    allDevices: state => state.hardWare.allDevices
  }),
  methods: {
    ...mapActions([
      'getHardList',
      'unbindHard',
      'getVertifUrl',
      'getDeviceDetail',
      'addDeviceNotes'
    ]),
    change() {
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
      setTimeout(() => {
        var capOption = {
          callback: cbfn,
          themeColor: '15bcad',
          lang: LANG[this.$i18n.locale || 'en']
        }
        capInit(document.getElementById('TCaptcha'), capOption)
        //回调函数：验证码页面关闭时回调
        function cbfn(retJson) {
          if (retJson.ret == 0) {
            that.ticket = retJson.ticket
            // 用户验证成功
          } else {
            //用户关闭验证码页面，没有验证
          }
        }
      }, 1000)
    },
    // 添加备注
    addNote() {
      this.addDeviceNotes({
        deviceId: this.addNoteId,
        note: this.addNoteInput
      }).then(res => {
        console.log(res)
        if (res.status === 200) {
        //   // 刷新硬件列表
        //   this.getHardList()
        //   this.showUnbindDialog = false
          Message({
            type: 'success',
            message: res.message
          });
          window.location.reload()
        } else {
          Message({
            type: 'error',
            message: res.message || 'add note error'
          })
        }
        // console.log(res)
      })
    },
    showNotes(id, address) {
      this.showAddnoteDialog = true
      this.addNoteId = id
      this.addNoteAddress = address
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
          // this.getHardList()
          this.showUnbindDialog = false;
          Message({
            type: 'success',
            message: res.message
          })
          window.location.reload();
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
      }
    },
    // 搜索
    search() {
      console.log(this.value8)
      if (this.value8 === 'all') {
        this.getHardList({ pageNum: 1 })
      } else {
        this.getDeviceDetail({ id: this.value8 })
      }
    },
    // 分页
    handleCurrentChange(val) {
      this.getHardList({ pageNum: val })
    }
  },

  created() {
    this.getHardList({ pageNum: 1 })
    this.getVertifUrl().then(res => {
      this.csnonce = res.data.csnonce
      let newScript = document.createElement('script')
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

.bonus-content {
  min-height: 1000px;
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

.pagination {
  margin: 20px;
}

.hardware-search-wrap {
  text-align: left;
  margin-bottom: 20px;
  padding-bottom: 30px;
  border-bottom: 1px solid #ddd;
}

.search-text {
  margin: 0 20px;
}

.addnote-input {
  width: 100%;
  margin-top: 20px;
}

.add-note-button {
  background: #909399;
  color: #fff;
  width: 110px;
  height: 35px;
  line-height: 35px;
}
</style>

