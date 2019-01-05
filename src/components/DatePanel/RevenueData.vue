<template>
  <!-- <div class=" annouce-content"> -->
  <div class="BonusCode">
    <BasiceLayout :title=" $t('revenue_data_text') " class="bonus-code-layout revenue-all-layout">
      <RevenueContent />
    </BasiceLayout>
  </div>
</template>

<script>
import BasiceLayout from '@/components/Common/BasicLayout.vue'
import RevenueContent from '@/components/DatePanel/RevenueContent.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'BonusCode',
  components: {
    BasiceLayout,
    RevenueContent
  },
}
</script>

<i18n>
{
  "en": {
		"revenue_data_text": "Revenue Overview"
  },
  "zn": {
		"revenue_data_text": "收益总览"
  }
}
</i18n>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
.revenue-all-layout {
  margin-top: 0px;
}

.revenue-all-layout .layout-content {
  margin: 0;
}
</style>
