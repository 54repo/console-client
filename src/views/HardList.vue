<template>
  <div class="home hardlist-home">
    <HardwareLayout layoutType="HARDLIST" :layoutTitile="$t('layoutTitile')">
      <BasiceLayout :title="$t('hardListLayoutTitile')">
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
          <el-table v-if="hardList !== 'NO_CONTENT'" :data="hardList" align="left" empty-text="Loading..."
            style="width: 100%">
            <!-- mac address -->
            <el-table-column prop="mac_address" :label="$t('macAddress')" align='center'>
            </el-table-column>
            <!-- 备注 -->
            <el-table-column :label="$t('noteText')" align='center'>
              <template slot-scope="scope">
                <div v-if="scope.row.note">{{scope.row.note}}</div>
                <div v-if="!scope.row.note" :deviceId="scope.row.deviceId"
                  @click="showNotes(scope.row.id, scope.row.mac_address)" class="add-note-button button bonus-cursor">
                  {{$t('addNote')}}</div>
                <i v-if="scope.row.noteStatus" class="el-icon-edit"
                  @click="showNotes(scope.row.id, scope.row.mac_address)"></i>
              </template>
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
            <!-- cpu -->
            <el-table-column prop="" :label="$t('CPU')" align='center'>
              <template slot-scope="scope">
                <div v-if="scope.row.cpu_count">{{scope.row.cpu_count}}</div>
                <div v-else>-</div>
              </template>
            </el-table-column>
            <!-- 内存 -->
            <el-table-column prop="" :label="$t('mem_size')" align='center'>
              <template slot-scope="scope">
                <div v-if="scope.row.mem_size">{{scope.row.mem_size}}</div>
                <div v-else>-</div>
              </template>
            </el-table-column>
            <!-- 硬盘 -->
            <el-table-column prop="" :label="$t('storage_size')" align='center'>
              <template slot-scope="scope">
                <div v-if="scope.row.storage_size">{{scope.row.storage_size}}</div>
                <div v-else>-</div>
              </template>
            </el-table-column>
            <!-- 版本 -->
            <el-table-column prop="" :label="$t('info')" align='center'>
              <template slot-scope="scope">
                <div v-if="!scope.row.info">-</div>
                <div v-if="scope.row.info">{{scope.row.info}}</div>
              </template>
            </el-table-column>
            <!-- 节点网络质量 -->
            <el-table-column prop="" :label="$t('tx_bw')" align='center'>
              <template slot-scope="scope">
                <div v-if="!scope.row.tx_bw">-</div>
                <!-- 5、5-10、10-20、20 -->
                <el-tag v-if="scope.row.tx_bw < 5 && scope.row.tx_bw > 0" type="danger">&lt; 5 M</el-tag>
                <el-tag v-if="scope.row.tx_bw > 30" type="success">&gt; 30 M</el-tag>
                <el-tag v-if="scope.row.tx_bw <= 10 && scope.row.tx_bw >= 5">5-10 M</el-tag>
                <el-tag v-if="scope.row.tx_bw <= 20 && scope.row.tx_bw >= 10">10-20 M</el-tag>
                <el-tag v-if="scope.row.tx_bw <= 30 && scope.row.tx_bw >= 20">20-30 M</el-tag>
              </template>
            </el-table-column>
            <!-- 地区 -->
            <!-- <el-table-column prop="location" :label="$t('location')" align='center'></el-table-column> -->
            <!-- 在线状态 -->
            <el-table-column prop="" :label="$t('netStatus')" align='center'>
              <template slot-scope="scope">
                <div v-if="!scope.row.status">-</div>
                <el-tag v-if="scope.row.status === 'online'" type="success">online</el-tag>
                <el-tag v-if="scope.row.status === 'offline'" type="danger">offline</el-tag>
              </template>
            </el-table-column>
            <!-- 监测 -->
            <el-table-column prop="" :label="$t('watch')" align='center'>
              <template slot-scope="scope">
                <img class="watch-icon" @click="showWatchDetail('id', scope.row.id)" src="../assets/hardList/watch.png">
              </template>
            </el-table-column>
            <!-- 解绑 -->
            <el-table-column label="" align='center'>
              <template slot-scope="scope">
                <div type="danger" :deviceId="scope.row.id" @click="checkUnBind(scope.row.id)"
                  class="unbind-button bonus-cursor">{{$t('unbindButton')}}</div>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination" v-if="deviceSize > 1">
            <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage"
              :page-size="deviceSize" layout="total, prev, pager, next" :total="hardLength">
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
        <span class="key verify-key">{{$t('dialog.imageVerify')}}</span>
        <div class="hard-captcha">
          <!-- 谷歌验证 -->
          <vue-recaptcha class="captcha-wrap" ref="recaptcha" @verify="onVerify" @expired="onExpired" data-size="normal"
            :sitekey="sitekey" />
        </div>
      </div>
      <div class="unbind-dialog-wrap">
        <span class="key mail-key">{{$t('dialog.mailText')}}</span>
        <SendEmailCode type="text" imageStyle="unbind-style" :response="response" class="unbind-input password-email"
          v-model="inputEmailCode" needImageCode=true :email="email" @emailCodeTip="emailCodeTip"></SendEmailCode>
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
        <input type="text" class="basic-input input addnote-input" v-model="addNoteInput">
      </div>
      <span slot="footer" class="dialog-footer">
        <div class="sure-unbind button" @click="showAddnoteDialog = false">{{ $t('cancel') }}</div>
        <div class="sure-unbind button" type="primary" @click="addNote">{{ $t('confirm') }}</div>
      </span>
    </el-dialog>
    <!-- 监控 -->
    <el-dialog :title="$t('watchDetail.title')" :visible.sync="showWatchDialog" width="80%" center>
      <div class="watch-dialog-wrap">
        <span class="key"></span>
        <div class="watch-select">
          <span class="search-text">{{$t('watchDetail.watchDate')}}:</span>
          <el-select v-model="searchWatchDate" filterable placeholder="" @change="showWatchDetail">
            <el-option v-for="item in queryDate" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </div>
        <div v-if="showCharts">
          <ve-line class="watch-chart" :data="stableCharts"></ve-line>
          <ve-line  class="watch-chart" :data="availabilityChart"></ve-line>
          <ve-line  class="watch-chart" :data="hardOnlineChart"></ve-line>
          <ve-line  class="watch-chart" :data="txBwCharts"></ve-line>
        </div>
      </div>
      <div v-if="!showCharts" class="no-watch-data">{{$t('watchDetail.noData')}}</div>
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
    "CPU": "CPU",
    "mem_size": "Memory",
    "storage_size": "Storage",
    "info": "Version",
    "tx_bw": "Node Stability",
    "date": "The Binding Date(UTC)",
    "code": "Binding BonusCode",
    "totalTime": "Total Online Time",
    "netStatus": "Status",
    "noHardwareTip": "No Device",
    "unbindButton": "Unbind",
    "dialog": {
      "cancel": "Cancel",
      "sure": "Sure",
      "title": "Confirm Unbinding",
      "mailText": "Email Verfication Code",
      "imageVerify": "Image Verfication"
    },
    "mac_address": "Search Mac Address",
    "addNote": "Note",
    "noteText": "Note",
    "allSearch": "All"
  },
  "zn": {
    "layoutTitile": "硬件列表",
    "hardListLayoutTitile": "硬件列表",
    "macAddress": "硬件MAC地址",
    "location": "所在地区",
    "CPU": "CPU",
    "mem_size": "内存",
    "info": "版本",
    "tx_bw": "节点网络质量",
    "storage_size": "硬盘",
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
  import { LANG, SITEKEY } from '../config/contant.js'
  import VueRecaptcha from "vue-recaptcha";

  export default {
    name: 'home',
    components: {
      BasiceLayout,
      AccountSetLayout,
      SendEmailCode,
      HardwareLayout,
      VueRecaptcha
    },
    data() {
      return {
        unbindId: '', //解绑Id
        showUnbindDialog: false, // 绑定弹框展示
        showAddnoteDialog: false, //添加备注
        showWatchDialog: false, //监控弹框
        addNoteInput: '',
        addNoteId: '', //添加备注Id
        addNoteAddress: '', //添加备注Id
        watchId: "",
        inputEmailCode: '', //输入的邮件码
        // ticket: '', // 验证码ticket
        // csnonce: '', //整数
        response: '',
        sitekey: SITEKEY['LOW'], //ga verify key
        searchMacAddress: '',
        searchWatchDate: moment()
          .utc()
          .startOf("day")
          .subtract(1, "days")
          .format("YYYY-MM-DD"),
        stableCharts: {},
        availabilityChart: {},
        hardOnlineChart: {},
        txBwCharts: {},
        hardOnlineColumns: false,
        chartSettings: {
          metrics: ['日期'],
          dimension: ['网络资源可用性'] 
        },
        showCharts: 'waiting'
      }
    },
    computed: mapState({
      hardList: state => state.hardWare.list,
      hardLength: state => state.hardWare.hardLength,
      deviceSize: state => state.hardWare.deviceSize,
      currentPage: state => state.hardWare.currentPage,
      email: state => state.account.email,
      allDevices: state => state.hardWare.allDevices,
      queryDate: () => {
        let queryDate = [];
        let endDay = moment()
          .utc()
          .startOf("day");

        endDay -= 24 * 60 * 60 * 1000;
        let i = 0;
        while (i < 7) {
          i++;
          queryDate.push(moment(endDay).format("YYYY-MM-DD"));
          endDay -= 24 * 60 * 60 * 1000;
        }

        return queryDate;
      }
    }),
    methods: {
      ...mapActions([
        'getHardList',
        'unbindHard',
        'getDeviceDetail',
        'addDeviceNotes',
        'getDeviceWatchDetail'
      ]),
      onVerify: function (response) {
        console.log("Verify: " + response);
        this.response = response;
      },
      onExpired: function () {
        console.log("Expired");
        Message({
          message: this.$t("captcha.expired"),
          type: "error"
        });
        this.$refs.recaptcha.reset();
      },
      resetRecaptcha() {
        this.$refs.recaptcha.reset();
      },
      change() {
        this.changePw({
          oldPassword: this.oldPw,
          newPassword: this.newPw,
          reNewPassword: this.newSecPw
        })
      },
      checkUnBind(id) {
        this.showUnbindDialog = true;
        this.unbindId = id;
      },
      // 添加备注
      addNote() {
        let that = this
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
      // 解绑
      unbind() {
        this.unbindHard({
          deviceId: this.unbindId,
          emailVerifyCode: this.inputEmailCode
        }).then(res => {
          this.resetRecaptcha();
          if (res.code === 200) {
            // 刷新硬件列表
            this.getHardList({ pageNum: this.currentPage });
            this.showUnbindDialog = false;
            Message({
              type: 'success',
              message: res.message
            });
            // window.location.reload()
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
      },
      // 显示监控
      showWatchDetail(type, id) {
        let that = this;
        this.showWatchDialog = true;
        this.watchId = (type === 'id' ) ? id : this.watchId;
        let queryDate = this.searchWatchDate;

        let watchStable = this.$t("watchDetail.watchStable");
        let watchAvaliable = this.$t("watchDetail.watchAvaliable");
        let watchStorge = this.$t("watchDetail.watchStorge");
        let watchBandwith = this.$t("watchDetail.watchBandwith");

        let watchDate = this.$t("watchDetail.watchDate");

        this.getDeviceWatchDetail({
          id: this.watchId,
          queryDate
        }).then(res => {
          if (res && res.length) {
            // 此处为了中英文对照，所以动态处理
            let stableCharts = {
              columns: [],
              rows: []
            }, availabilityChart = {
              columns: [],
              rows: []
            }, hardOnlineChart = {
              columns: [],
              rows: []
            }, txBwCharts =  {
              columns: [],
              rows: []
            };

            let stableColumns = [], availabilityColumns = [], hardOnlineColumns = [], txBwColumns = [];
            stableColumns.push(watchDate);
            stableColumns.push(watchStable);
            stableCharts.columns = stableColumns;

            availabilityColumns.push(watchDate);
            availabilityColumns.push(watchAvaliable);
            availabilityChart.columns = availabilityColumns;

            hardOnlineColumns.push(watchDate);
            hardOnlineColumns.push(watchStorge);
            hardOnlineChart.columns = hardOnlineColumns;
           
            txBwColumns.push(watchDate);
            txBwColumns.push(watchBandwith);
            txBwCharts.columns = txBwColumns;

            res.map(item => {
              let { time, stable, ext_storage_size, tx_bandwidth } = item;
              let date_at = moment(time).format('YYYY-MM-DD hh:mm:ss a');

              let stableRows = [], availabilityRows = [], hardOnlineRows = [], txBwRows = [];
              // 日期处理
              stableRows[watchDate] = date_at, 
                availabilityRows[watchDate] = date_at,
                hardOnlineRows[watchDate] = date_at, 
                txBwRows[watchDate] = date_at;

              stableRows[watchStable] = stable;
              availabilityRows[watchAvaliable] = (stable < 2500) ? 100 : 0;
              hardOnlineRows[watchStorge] = ext_storage_size;
              txBwRows[watchBandwith] = tx_bandwidth;

              stableCharts.rows.push(stableRows);
              availabilityChart.rows.push(availabilityRows);
              hardOnlineChart.rows.push(hardOnlineRows);
              txBwCharts.rows.push(txBwRows);
            });

            console.log('stableCharts', stableCharts);
            that.showCharts = true;
            that.stableCharts =  stableCharts;
            that.availabilityChart =  availabilityChart;
            that.hardOnlineChart =  hardOnlineChart;
            that.txBwCharts =  txBwCharts;
          } else {
            that.showCharts = false;
          }
        });
      }
    },
    created() {
      this.getHardList({ pageNum: 1 })
    }
  }
</script>

<style lang="stylus">
  .hardlist-home.home {
    height: auto !important;
  }

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
    max-width: 120px;
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
    height: 78px;
    margin-bottom: 20px;
  }

  .unbind-dialog-wrap .verify-key {
    line-height: 78px;
  }

  .unbind-dialog-wrap .mail-key.key {
    width: 180px;
    line-height: 40px;
    height: 40px;
    padding-top: 15px;
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

  .hardlist-home .captcha-wrap {
    transform: scale(0.79);
    -webkit-transform: scale(0.79);
    transform-origin: 0 0;
    -webkit-transform-origin: 0 0;
  }

  .watch-icon {
    width: 20px;
    height: 20px;
    margin-top: 8px;
    display: inline-block
  }

  .watch-chart {
    margin: 40px;
  }

  .watch-select{
    margin: 30px auto;
    display: -webkit-box;
    display: -webkit-box;
    -webkit-box-orient: horizontal;
    -webkit-box-pack: center;
  }
  .no-watch-data
    text-align: center;
</style>
