/** 收益页 **/
<template>
  <div class="home">
    <Layout
      type="REVENUE"
      isRevenue="true"
      :pageTitle="$t('pageTitle')"
    >
      <BasiceLayout
        :title=" $t('pageTitle') "
        class="revenue-layout"
      >
        <div class="revenue-detail-select">
          <span class="revenue-date-wrap">{{$t('revenueDate')}}:</span>
          <el-select
            v-model="selectDate"
            filterable
            @change="search"
          >
            <el-option
              v-for="item in queryDate"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
          <span class="search-text">{{$t('search_mac_address')}}</span>
          <el-select
            v-model="searchMacAddress"
            filterable
            placeholder=""
            @change="searchMac"
          >
            <el-option
              v-for="item in allDevices"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <el-table
          v-if="detailList !== 'NO_CONTENT'"
          :data="detailList"
          align="left"
          empty-text="-"
          style="width: 100%"
        >
          <!-- mac address -->
          <el-table-column
            prop="mac_address"
            align='center'
            :label="$t('mac_address')"
          >
          </el-table-column>
          <!-- 备注 -->
          <el-table-column
            :label="$t('noteText')"
            align='center'
          >
            <template slot-scope="scope">
              <div v-if="scope.row.note">{{scope.row.note}}</div>
              <div
                v-if="!scope.row.note"
                :deviceId="scope.row.deviceId"
                @click="showNotes(scope.row.id, scope.row.mac_address)"
                class="add-note-button button bonus-cursor"
              >{{$t('addNote')}}</div>
            </template>
          </el-table-column>
          <!-- 设备收益 -->
          <el-table-column
            prop="revenue"
            align='center'
            :label="$t('device_revenue')"
          ></el-table-column>
        </el-table>
        <el-table
          v-if="detailList === 'NO_CONTENT'"
          :data="detailList"
          align="left"
          empty-text="system upgrade.."
          style="width: 100%"
        >
        </el-table>
        <div
          class="pagination"
          v-if="deviceNumSize > 1"
        >
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="deviceNumSize"
            layout="total, prev, pager, next"
            :total="deviceLength"
          >
          </el-pagination>
        </div>
        <!-- 增加备注 -->
        <el-dialog
          :title="$t('addNotes.title')"
          :visible.sync="showAddnoteDialog"
          width="480px"
          center
        >
          <div class="addnote-dialog-wrap">
            <span class="key">{{$t('addNotes.tipText')}}({{addNoteAddress}})</span>
            <input
              type="text"
              class="basic-input input addnote-input"
              v-model="addNoteInput"
            >
          </div>
          <span
            slot="footer"
            class="dialog-footer"
          >
            <div
              class="sure-unbind button"
              @click="showAddnoteDialog = false"
            >{{ $t('cancel') }}</div>
            <div
              class="sure-unbind button"
              type="primary"
              @click="addNote"
            >{{ $t('confirm') }}</div>
          </span>
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
const type = "online";

export default {
  name: "home",
  data() {
    return {
      selectDate: moment()
        .utc()
        .startOf("day")
        .subtract(1, "days")
        .format("YYYY-MM-DD"),
      pageNum: 1,
      addNoteInput: "",
      addNoteAddress: "", //添加备注Id
      showAddnoteDialog: false,
      searchMacAddress: ""
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
    ...mapActions(["getRevenueDetail", "addDeviceNotes"]),
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
    }
  }
};
</script>

<style  lang="stylus">
.data-panel-wrap, .data-panel-layout, .home {
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
    "pageTitle": "在线收益详情",
    "revenueDate": "查询日期（UTC）",
    "revenueMac": "查询MAC地址",
    "mac_address": "设备",
    "device_revenue": "设备收益",
    "noteText": "备注",
    "search_mac_address": "搜索Mac地址",
    "addNote": "备注",
    "noteText": "备注",
    "allSearch": "全部"
  },
  "en": {
    "pageTitle": "Online Revenue Details",
    "revenueDate": "Date（UTC）",
    "revenueMac": "Mac Address",
    "mac_address": "Mac Address",
    "device_revenue": "device revenue",
    "search_mac_address": "Mac Address",
    "addNote": "note",
    "noteText": "note",
    "allSearch": "All"
  }
}
</i18n>

