<template>
  <div class="home net-status-home">
    <Layout layoutType="HARDLIST"
      isRevenue="true"
      :pageTitle="$t('layoutTitile')">
      <BasiceLayout :title="$t('basicTitle')">
        <div class="hardware-content">
          <!-- mac地址搜索 -->
          <div class="hardware-search-wrap" v-if="allDevices" align='center'>
            <span class="search-text">{{$t('mac_address')}}</span>
            <el-select v-model="searchMacAddress" filterable placeholder="" @change="search">
              <el-option v-for="item in allDevices" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <!-- 硬件列表 -->
          <el-table v-if="hardList !== 'NO_CONTENT'" :data="hardList" align="left" empty-text="Loading..." style="width: 100%">
            <!-- mac address -->
            <el-table-column prop="mac_address" :label="$t('macAddress')" align='center'>
            </el-table-column>
            <!-- 备注 -->
            <el-table-column :label="$t('noteText')" align='center'>
              <template slot-scope="scope">
                <div v-if="scope.row.note">{{scope.row.note}}</div>
                <div v-if="!scope.row.note" :deviceId="scope.row.deviceId" @click="showNotes(scope.row.id, scope.row.mac_address)" class="add-note-button button bonus-cursor">{{$t('addNote')}}</div>
                <i v-if="scope.row.noteStatus" class="el-icon-edit"  @click="showNotes(scope.row.id, scope.row.mac_address)"></i>
              </template>
            </el-table-column>
            <!-- IP -->
            <el-table-column prop="" label="IP" align='center'>
              <template slot-scope="scope">
                <div v-if="!scope.row.ext_ip">-</div>
                <div v-if="scope.row.ext_ip">{{scope.row.ext_ip}}</div>
              </template>
            </el-table-column>
            <!-- 地区 -->
            <el-table-column prop="location" :label="$t('location')" align='center'></el-table-column>
            <!-- 需求度 -->
            <el-table-column prop="" :label="$t('needs')" align='center'>
              <template slot-scope="scope">
                <div v-if="!scope.row.needs">-</div>
                <el-tag type="success">{{$t('needsHigh')}}</el-tag>
                <!-- <el-tag v-if="scope.row.needs === '高'" type="success">{{$t('needsHigh')}}</el-tag> -->
                <!-- <el-tag v-if="scope.row.needs === '中'" type="warning">{{$t('needsMiddle')}}</el-tag> -->
                <!-- <el-tag v-if="scope.row.needs === '低'" type="danger">{{$t('needsLow')}}</el-tag> -->
              </template>
            </el-table-column>
            <!-- 网络资源可用性 -->
            <el-table-column prop="" :label="$t('stable')" align='center'>
              <template slot-scope="scope">
                <div v-if="!scope.row.stableValue">-</div>
                <el-tag v-if="scope.row.stableValue < 2500 && scope.row.stableValue > 0" type="success">{{$t('stableUseful')}}</el-tag>
                <el-tag v-if="scope.row.stableValue >= 2500" type="danger">{{$t('stableDisabled')}}</el-tag>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="stable" :label="$t('stable')" align='center'></el-table-column> -->
          </el-table>
          <div class="pagination" v-if="deviceSize > 1">
            <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="deviceSize" layout="total, prev, pager, next" :total="hardLength">
            </el-pagination>
          </div>
          <el-table v-if="hardList === 'NO_CONTENT'" :empty-text="$t('noHardwareTip')" style="width: 100%">
          </el-table>
        </div>
      </BasiceLayout>
    </Layout>
    <!-- 增加备注 -->
    <el-dialog :title="$t('addNotes.title')" :visible.sync="showAddnoteDialog" width="480px" center>
      <div class="addnote-dialog-wrap">
        <span class="key">{{$t('addNotes.tipText')}}({{addNoteAddress}})</span>
        <input type="text" class="basic-input input addnote-input" v-model="addNoteInput">
      </div>
      <span slot="footer" class="dialog-footer">
        <div class="sure-unbind button" @click="showAddnoteDialog = false">{{ $t('cancel') }}</div>
        <div class="sure-unbind button" type="primary" @click="addNote">{{ $t('confirm') }}</div>
      </span>
    </el-dialog>
  </div>
</template>

<i18n>
{
  "en": {
		"layoutTitile": "Network Task",
		"basicTitle": "Task Status",
    "macAddress": "MAC Address",
    "location": "Area",   
    "stable": "Network Resource Availability",   
    "needs": "Node Demand",                                                                    
		"code": "Binding BonusCode",
		"totalTime": "Total Online Time",
    "netStatus": "Status",
    "noHardwareTip": "No Device",
    "needsHigh": "High",
    "needsMiddle": "Medium",
    "needsLow": "Low",
    "stableUseful": "Usable",
    "stableDisabled": "disabled",
    "mac_address": "Search Mac Address",
    "addNote": "note",
    "noteText": "note",
    "allSearch": "All"
  },
  "zn": {
		"layoutTitile": "网络任务",
		"basicTitle": "任务执行状态",
    "macAddress": "硬件MAC地址",
    "location": "所在地区", 
    "stable": "网络资源可用性",   
    "needs": "当前地区节点需求度",                                                                    
		"code": "已绑定激活码 ",
		"totalTime": "累计在线时长",
    "netStatus": "在线状态",
    "noHardwareTip": "硬件列表为空",
    "needsHigh": "高",
    "needsMiddle": "中",
    "needsLow": "低" ,
    "stableUseful": "可用",
    "stableDisabled": "不可用",
    "mac_address": "Mac地址搜索",
    "addNote": "备注",
    "noteText": "备注",
    "allSearch": "全部"
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
import Layout from "@/components/DatePanel/Layout.vue";

export default {
  name: 'home',
  components: {
    BasiceLayout,
    AccountSetLayout,
    SendEmailCode,
    HardwareLayout,
    Layout
  },
  data() {
    return {
      showAddnoteDialog: false, //添加备注
      addNoteInput: '',
      addNoteId: '', //添加备注Id
      addNoteAddress: '', //添加备注Id
      ticket: '', // 验证码ticket
      searchMacAddress: ''
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
    // 添加备注
    addNote() {
      let that = this;
      if (!this.addNoteInput) {
        return;
      }
      this.addDeviceNotes({
        deviceId: this.addNoteId,
        note: this.addNoteInput
      }).then(res => {
        if (res.code === 200) {
          Message({
            type: 'success',
            message: res.message
          })
          that.showAddnoteDialog = false
          if (that.searchMacAddress === 'all' || that.searchMacAddress === '') {
            that.getHardList({
              pageNum: that.currentPage
            })
          } else {
            this.getDeviceDetail({ id: that.searchMacAddress })
          }
        } else {
          Message({
            type: 'error',
            message: res.message || 'add note error'
          })
        }
      })
    },
    showNotes(id, address) {
      this.showAddnoteDialog = true
      this.addNoteId = id
      this.addNoteAddress = address
    },
    // 搜索
    search() {
      if (this.searchMacAddress === 'all') {
        this.getHardList({ pageNum: 1 })
      } else {
        this.getDeviceDetail({ id: this.searchMacAddress })
      }
    },
    // 分页
    handleCurrentChange(val) {
      this.currentPage = val
      this.getHardList({ pageNum: val })
    }
  },

  created() {
    this.getHardList({ pageNum: 1 });
  }
}
</script>

<style lang="stylus">
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
  iwidth: 200px;
  display: inline-block;
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
  text-align: center;
  margin: 0;
  width: 100%;
}

.net-status-home.home{
  height: auto!important;
}
</style>



