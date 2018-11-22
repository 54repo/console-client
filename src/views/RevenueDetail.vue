/** 收益页 **/
<template>
  <div class="home">
    <Layout type="REVENUE" isRevenue="true" :pageTitle="$t('pageTitle')">
      <BasiceLayout :title=" $t('pageTitle') " class="revenue-layout">
        <div class="revenue-detail-select">
          <!-- <el-select v-model="selectDate" filterable placeholder="请选择" @change="search">
            <el-option v-for="item in detail-date" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select> -->
        </div>
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

// import FAQ from '@/components/Revenue/FAQ.vue'
// import RevenueContent from '@/components/DatePanel/RevenueContent.vue'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'home',
  data() {
    return {
      selectDate: ''
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
    // detailDate: state => state.revenueDetail.detailDate,
  }),
  methods: {
    // ...mapActions(['getRevenueDetail']),
    search(date) {
      // this.getRevenueDetail({ date })
    }
  },
  created() {
    // let end = new Date().getTime()
    // let start = end - 24 * 60 * 60 * 1000
    // this.getAllRevenue({ type: 'all' })
    // this.getAllRevenue({ type: 'refer', start, end })
    // this.getAllRevenue({ type: 'account', start, end })
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
</style>

<i18n>
{
  "zn": {
    "pageTitle": "收益详情"
  },
  "en": {
    "pageTitle": "Details"
  }
}
</i18n>

