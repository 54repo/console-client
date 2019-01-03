/** 收益总览页 **/
<template>
  <div class="home">
    <Layout type="REVENUE" isRevenue="true" :pageTitle="$t('pageTitle')">
      <RevenueData></RevenueData>
      <FAQ />
    </Layout>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Layout from '@/components/DatePanel/Layout.vue'
import RevenueData from '@/components/DatePanel/RevenueData.vue'
import FAQ from '@/components/Revenue/FAQ.vue'
import RevenueContent from '@/components/DatePanel/RevenueContent.vue'
// import { mapActions, mapState } from 'vuex'

export default {
  name: 'home',
  components: {
    Header,
    Layout,
    RevenueData,
    FAQ,
    RevenueContent
  },
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
    "pageTitle": "情况"
  },
  "en": {
    "pageTitle": "Revenue"
  }
}
</i18n>

