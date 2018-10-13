/** 收益页 **/
<template>
  <div class="home">
    <Layout type="REVENUE" isRevenue="true">
      <RevenueData :allRenvue="allRenvue" :person_invite_revenue="inviteRevenue" :person_account_revenue="accountRevenue">
      </RevenueData>
      <FAQ />
    </Layout>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Layout from "@/components/DatePanel/Layout.vue";
import RevenueData from "@/components/DatePanel/RevenueData.vue";
import FAQ from "@/components/Revenue/FAQ.vue";
import RevenueContent from "@/components/DatePanel/RevenueContent.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "home",
  data() {
    return {
      person_invite_revenue: "",
      person_account_revenue: "",
    };
  },
  components: {
    Header,
    Layout,
    RevenueData,
    FAQ,
    RevenueContent
  },
  computed: mapState({
    //  箭头函数可使代码更简练
    inviteRevenue: state => state.revenue.inviteRevenue,
    accountRevenue: state => state.revenue.accountRevenue,
    allRenvue: state => state.revenue.allRenvue,
  }),
  methods: {
    ...mapActions(["getAllRevenue", "getRevenueList"])
  },
  created() {
    let end = new Date().getTime();
    let start = end - 24 * 60 * 60 * 1000;

    this.getAllRevenue({ type: "all" });
    this.getAllRevenue({ type: "refer", start, end });
    this.getAllRevenue({ type: "account", start, end });
  }
};
</script>

<style  lang="stylus">

.data-panel-wrap, .data-panel-layout, .home
  height: 100%
.revenue-all-layout {
  height: 100%
}
</style>
