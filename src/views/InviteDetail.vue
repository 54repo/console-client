/** 邀请收益 **/
<template>
  <div class="home">
    <Layout
      type="REVENUE"
      isRevenue="true"
      :pageTitle="$t('pageTitle')"
    >
      <BasiceLayout
        :title="$t('pageTitle') "
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
        </div>
        <el-table
          v-if="detailList !== 'NONE'"
          :data="detailList"
          align="left"
          empty-text="-"
          style="width: 100%"
        >
          <!-- invited account -->
          <el-table-column
            prop="email"
            align='center'
            :label="$t('invite_account')"
          >
          </el-table-column>

          <!-- register time -->
          <el-table-column
            prop="sign_up_time"
            align='center'
            :label="$t('register_time')"
          >
          </el-table-column>

          <!-- invite bxc -->
          <el-table-column
            prop="bxc"
            align='center'
            :label="$t('invite_bxc')"
          >
          </el-table-column>
        </el-table>
        <div
          class="pagination"
          v-if="numSize > 1"
        >
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="numSize"
            layout="total, prev, pager, next"
            :total="deviceLength"
          >
          </el-pagination>
        </div>
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

export default {
  name: "home",
  data() {
    return {
      pageNum: 1,
      selectDate: moment()
        .utc()
        .startOf("day")
        .subtract(1, "days")
        .format("YYYY-MM-DD")
    };
  },
  components: {
    Header,
    Layout,
    BasiceLayout
  },
  computed: mapState({
    detailList: state => state.inviteDetail.detailList,
    numSize: state => state.inviteDetail.numSize,
    currentPage: state => state.inviteDetail.currentPage,
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
    // this.queryDate = queryDate
    let pageNum = this.pageNum;

    this.getInviteDetail({ queryDate, pageNum });
  },
  methods: {
    ...mapActions(["getInviteDetail"]),
    search(queryDate) {
      this.queryDate = queryDate;
      let pageNum = this.pageNum;
      this.getInviteDetail({ queryDate, pageNum });
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
</style>

<i18n>
{
  "zn": {
    "pageTitle": "邀请奖励详情",
    "revenueDate": "查询日期（UTC）",
    "allSearch": "全部",
    "invite_account" : "被邀请者账号",
    "register_time": "注册日期（UTC）",
    "invite_bxc": "奖励收益"
  },
  "en": {
    "pageTitle": "Details",
    "revenueDate": "Date（UTC）",
    "allSearch": "All",
    "invite_account" : "Invited Account",
    "register_time": "Registration Date(UTC)",
    "invite_bxc": "Bonus"
  }
}
</i18n>

