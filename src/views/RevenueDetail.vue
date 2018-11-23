/** 收益页 **/
<template>
  <div class="home">
    <Layout type="REVENUE" isRevenue="true" :pageTitle="$t('pageTitle')">
      <BasiceLayout :title=" $t('pageTitle') " class="revenue-layout">
        <div class="revenue-detail-select">
          <span class="revenue-date-wrap">{{$t('revenueDate')}}:</span>
          <el-select v-model="selectDate" filterable placeholder="请选择" @change="search">
            <el-option v-for="item in queryDate" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
          <span class="revenue-tips">{{$t('revenueTips')}}</span>
        </div>

        <el-table v-if="deviceDetail !== 'NO_CONTENT'" :data="detailList" align="left" empty-text="Loading..." style="width: 100%">
          <!-- mac address -->
          <el-table-column prop="mac_address" align='center' :label="$t('mac_address')">
          </el-table-column>
          <!-- 设备收益 -->
          <el-table-column prop="revenue" align='center' :label="$t('device_revenue')"></el-table-column>
        </el-table>

        <div class="pagination" v-if="deviceNumSize > 1">
          <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="deviceNumSize" layout="total, prev, pager, next" :total="deviceLength">
          </el-pagination>
        </div>
        <el-table v-if="deviceDetail === 'NONE'" :empty-text="$t('noHardwareTip')" style="width: 100%">
        </el-table>
      </BasiceLayout>
    </Layout>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Layout from '@/components/DatePanel/Layout.vue'
import RevenueContent from '@/components/RevenueDetail/RevenueContent.vue'
import BasiceLayout from '@/components/Common/BasicLayout.vue'
import moment from 'moment'

// import FAQ from '@/components/Revenue/FAQ.vue'
// import RevenueContent from '@/components/DatePanel/RevenueContent.vue'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'home',
  data() {
    return {
      selectDate: '',
      pageNum: 1
    }
  },
  components: {
    Header,
    Layout,
    BasiceLayout
    // RevenueData,
    // FAQ,
    // RevenueContent
  },
  computed: mapState({
    //  箭头函数可使代码更简练
    deviceLength: state => state.revenueDetail.deviceLength,
    currentPage: state => state.revenueDetail.currentPage,
    deviceNumSize: state => state.revenueDetail.deviceNumSize,
    detailList: state => state.revenueDetail.detailList,
    queryDate: () => {
      let queryDate = []
      let endDay = moment()
        .utc()
        .startOf('day')

      endDay -= 24 * 60 * 60 * 1000;
      let i = 0
      while (i < 7) {
        i++
        queryDate.push(moment(endDay).format('YYYY-MM-DD'))
        endDay -= 24 * 60 * 60 * 1000
      }

      return queryDate
    }
  }),
  created() {
    let queryDate = moment()
      .utc()
      .startOf('day')
      .format('YYYY-MM-DD')
    this.queryDate = queryDate
    let pageNum = this.pageNum

    this.getRevenueDetail({ queryDate, pageNum })
  },
  methods: {
    ...mapActions(['getRevenueDetail']),
    search(queryDate) {
      this.queryDate = queryDate
      let pageNum = this.pageNum;
      this.getRevenueDetail({ queryDate, pageNum })
    },
    handleCurrentChange(value) {
      console.log(value)
      let defaultDate =  moment().utc().startOf('day').format('YYYY-MM-DD');
      let queryDate = this.selectDate || defaultDate;
      this.pageNum = value
      this.getRevenueDetail({
        queryDate,
        pageNum: value
      })
    }
  }
}
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

.revenue-tips{
  display:inline-block;
  margin: 0 20px;
  color: #96999b;
}
</style>

<i18n>
{
  "zn": {
    "pageTitle": "详情",
    "revenueDate": "查询日期（UTC）",
    "mac_address": "Mac地址",
    "device_revenue": "设备收益",
    "revenueTips":"默认显示当日收益"
  },
  "en": {
    "pageTitle": "Details",
    "revenueDate": "Date（UTC）",
    "mac_address": "Mac Address",
    "device_revenue": "device revenue",
    "revenueTips":"Show daily revenue by default"
  }
}
</i18n>

