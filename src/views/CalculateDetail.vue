/** 收益页 **/
<template>
  <div class="home">
    <Layout type="REVENUE" isRevenue="true" :pageTitle="$t('pageTitle')">
      <BasiceLayout :title=" $t('basicTitle') " class="revenue-layout">
        <div class="revenue-detail-select">
          <!-- <div class="dietail-total-revenue">{{$t('tolal_revenue')}}: &nbsp; &nbsp; {{detailOnlineBxc}}</div> -->
          <span class="revenue-date-wrap">{{$t('revenueDate')}}:</span>
          <el-select v-model="selectDate" filterable @change="search">
            <el-option v-for="item in queryDate" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
          <span class="search-text">{{$t('search_mac_address')}}</span>
          <el-select v-model="searchMacAddress" filterable placeholder="" @change="searchMac">
            <el-option v-for="item in allDevices" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <el-table v-if="detailList !== 'NO_CONTENT'" :data="detailList" align="left" empty-text="-" style="width: 100%">
          <!-- mac address -->
          <el-table-column prop="mac_address" align='center' :label="$t('mac_address')">
          </el-table-column>
          <!-- 备注 -->
          <el-table-column :label="$t('noteText')" align='center'>
            <template slot-scope="scope">
              <div v-if="scope.row.note">{{scope.row.note}}</div>
              <div v-if="!scope.row.note" :deviceId="scope.row.deviceId"
                @click="showNotes(scope.row.id, scope.row.mac_address)" class="add-note-button button bonus-cursor">
                {{$t('addNote')}}</div>
              <i v-if="scope.row.noteStatus" class="el-icon-edit"  @click="showNotes(scope.row.id, scope.row.mac_address)"></i>
            </template>
          </el-table-column>
          <el-table-column prop="" :label="$t('bandwidth')" align='center'>
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
          <!-- 设备存储 -->
          <el-table-column prop="ext_storage_size" align='center' :label="$t('storage')"></el-table-column>
          <!-- 设备在线时长 -->
          <el-table-column prop="storage_time" align='center' :label="$t('storage_online')"></el-table-column>
          <!-- nat -->
          <el-table-column prop="" :label="$t('nat')" align='center'>
            <template slot-scope="scope">
              <div v-if="!scope.row.nat">-</div>
              <!-- 红色 -->
              <el-tag  v-if="scope.row.nat === 1" type="danger">{{$t('nat_1')}}</el-tag>
              <el-tag  v-if="scope.row.nat === 8" type="danger">{{$t('nat_8')}}</el-tag>
              <!-- 绿色 -->
              <el-tag type="success" v-if="scope.row.nat === 2">{{$t('nat_2')}}</el-tag>
              <el-tag type="success" v-if="scope.row.nat === 3">{{$t('nat_3')}}</el-tag>
              <el-tag type="success" v-if="scope.row.nat === 5">{{$t('nat_5')}}</el-tag>
              <el-tag type="success" v-if="scope.row.nat === 6">{{$t('nat_6')}}</el-tag>   
              <!-- 黄色 -->
              <el-tag v-if="scope.row.nat === 7" type="warning">{{$t('nat_7')}}</el-tag>
              <el-tag v-if="scope.row.nat === 4" type="warning">{{$t('nat_4')}}</el-tag>
            </template>
          </el-table-column>
          <!-- 监测 -->
          <el-table-column prop="" :label="$t('watch')" align='center'>
            <template slot-scope="scope">
              <img class="watch-icon" @click="showWatchDetail('id', scope.row.id)" src="../assets/hardList/watch.png">
            </template>
          </el-table-column>
          <!-- 设备收益 -->
          <el-table-column prop="revenue" align='center' :label="$t('device_revenue')"></el-table-column>
        </el-table>
        <el-table v-if="detailList === 'NO_CONTENT'" :data="detailList" align="left" empty-text="system upgrade.."
          style="width: 100%">
        </el-table>
        <div class="pagination" v-if="deviceNumSize > 1">
          <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage"
            :page-size="deviceNumSize" layout="total, prev, pager, next" :total="deviceLength">
          </el-pagination>
        </div>
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
        <el-dialog :title="$t('watchDetail.title')" :visible.sync="showWatchDialog" width="60%" center>
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
      </BasiceLayout>
    </Layout>
  </div>
</template>

<script>
  // @ is an alias to /src
  import Header from "@/components/Header.vue";
  import Layout from "@/components/DatePanel/Layout.vue";
  import RevenueContent from "@/components/RevenueDetail/RevenueContent.vue";
  import BasiceLayout from "@/components/Common/BasicLayout.vue";
  import moment from "moment";
  import { mapActions, mapState } from "vuex";
  import { Message } from "element-ui";
  const type = "calculate";

  export default {
    name: "home",
    data() {
      return {
        selectDate: moment()
          .utc()
          .startOf("day")
          .subtract(1, "days")
          .format("YYYY-MM-DD"),
        searchWatchDate: moment()
          .utc()
          .startOf("day")
          .subtract(1, "days")
          .format("YYYY-MM-DD"),
        pageNum: 1,
        addNoteInput: "",
        addNoteAddress: "", //添加备注Id
        showAddnoteDialog: false,
        searchMacAddress: "",
        showWatchDialog: false, //监控弹框
        stableCharts: {},
        availabilityChart: {},
        hardOnlineChart: {},
        txBwCharts: {},
        showCharts: 'waiting'
      };
    },
    components: {
      Header,
      Layout,
      BasiceLayout
    },
    computed: mapState({
      //  箭头函数可使代码更简练
      deviceLength: state => state.revenueDetail.deviceLength,
      currentPage: state => state.revenueDetail.currentPage,
      deviceNumSize: state => state.revenueDetail.deviceNumSize,
      detailList: state => state.revenueDetail.detailList,
      allDevices: state => state.revenueDetail.allDevices,
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
    created() {
      let queryDate = moment()
        .utc()
        .startOf("day")
        .subtract(1, "days")
        .format("YYYY-MM-DD");
      this.queryDate = queryDate;
      let pageNum = this.pageNum;

      this.getRevenueDetail({ queryDate, pageNum, type });
    },
    methods: {
      ...mapActions(["getRevenueDetail", "addDeviceNotes", "getDeviceWatchDetail"]),
      // 日期搜索
      search(queryDate) {
        this.queryDate = queryDate;
        let pageNum = this.pageNum;
        this.getRevenueDetail({ queryDate, pageNum, type });
      },
      // mac搜索
      searchMac(deviceId) {
        if (deviceId !== "all") {
          let mac_address = this.allDevices.find(item => {
            return item.value === deviceId;
          }).label;
          let { selectDate, pageNum = 1 } = this;
          this.getRevenueDetail({
            pageNum,
            mac_address,
            deviceId,
            queryDate: selectDate,
            type
          });
        } else {
          this.getRevenueDetail({
            queryDate: this.selectDate,
            pageNum: this.pageNum,
            type
          });
        }
      },
      handleCurrentChange(value) {
        let defaultDate = moment()
          .utc()
          .startOf("day")
          .format("YYYY-MM-DD");
        let queryDate = this.selectDate || defaultDate;
        this.pageNum = value;
        this.getRevenueDetail({
          queryDate,
          pageNum: value,
          type
        });
      },
      // 添加备注
      addNote() {
        let that = this;
        this.addDeviceNotes({
          deviceId: this.addNoteId,
          note: this.addNoteInput
        }).then(res => {
          if (res.code === 200) {
            Message({
              type: "success",
              message: res.message
            });
            that.showAddnoteDialog = false;
            if (that.searchMacAddress === "all" || that.searchMacAddress === "") {
              this.getRevenueDetail({
                type,
                queryDate: that.selectDate,
                pageNum: that.pageNum
              });
            } else {
              this.getDeviceDetail({ id: that.searchMacAddress });
            }
          } else {
            Message({
              type: "error",
              message: res.message || "add note error"
            });
          }
        });
      },
      // 备注框
      showNotes(id, address) {
        this.showAddnoteDialog = true;
        this.addNoteId = id;
        this.addNoteAddress = address;
      },
      // 显示观察
      showWatchDetail(type, id) {
        let that = this;
        this.showWatchDialog = true;
        let queryDate = this.searchWatchDate;
        this.watchId = (type === 'id' ) ? id : this.watchId;


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
              hardOnlineRows[watchStorge] = (Number(ext_storage_size) / 1024 / 1024 / 1024).toFixed(2);
              txBwRows[watchBandwith] = (Number(tx_bandwidth) / 1024 / 1024).toFixed(2);

              stableCharts.rows.push(stableRows);
              availabilityChart.rows.push(availabilityRows);
              hardOnlineChart.rows.push(hardOnlineRows);
              txBwCharts.rows.push(txBwRows);
            });

            that.stableCharts =  stableCharts;
            that.availabilityChart =  availabilityChart;
            that.hardOnlineChart =  hardOnlineChart;
            that.txBwCharts =  txBwCharts;
            that.showCharts = true;
          } else {
            that.showCharts = false;
          }
        });
      }
    }
  };
</script>

<style lang="stylus">
  .data-panel-wrap,
  .data-panel-layout,
  .home {
    height: 100%;
  }

  .revenue-all-layout {
    height: 100%;
  }

  .revenue-date-wrap {
    margin: 0 20px;
  }

  .revenue-detail-select {
    text-align: left;
    padding-bottom: 30px;
    margin-bottom: 30px;
    border-bottom: 1px solid #ddd;
  }

  .revenue-tips {
    display: inline-block;
    margin: 0 20px;
    color: #96999b;
  }

  .add-note-button {
    max-width: 80px;
  }

</style>

<i18n>
  {
  "zn": {
  "pageTitle": "计算任务",
  "basicTitle": "收益详情",
  "revenueDate": "查询日期（UTC）",
  "revenueMac": "查询MAC地址",
  "mac_address": "设备",
  "device_revenue": "设备收益",
  "noteText": "备注",
  "search_mac_address": "搜索Mac地址",
  "addNote": "备注",
  "noteText": "备注",
  "allSearch": "全部",
  "tolal_revenue": "当日设备总收益",
  "bandwidth": "带宽贡献",
  "storage": "存储",
  "storage_online": "存储在线时长",
  "nat": "NAT 类型"
  },
  "en": {
  "pageTitle": "Computing Task",
  "basicTitle": "Revenue Details",
  "layoutTitle": "Device Revenue Detatils",
  "revenueDate": "Date（UTC）",
  "revenueMac": "Mac Address",
  "mac_address": "Mac Address",
  "device_revenue": "Device revenue",
  "search_mac_address": "Mac Address",
  "addNote": "Note",
  "noteText": "Note",
  "allSearch": "All",
  "tolal_revenue": "Total Revenue",
  "bandwidth": "Bandwidth",
  "storage": "Storage",
  "storage_online": "Storage Online",
  "nat": "NAT Type"
  }
  }
</i18n>
