

<template>
  <div class="Footer">
    <!-- <div class="user-protocol">
      <router-link class="agree-link" target="_blank" to="/protocol">BonusCloud User Agreement</router-link>
    </div> -->
    <a href="/protocol" class="agree-link" target="_blank">BonusCloud User Agreement</a>
    <div>2018 BonusCloud Foundation © All rights reserved</div>
  </div>
  <!-- </div> -->
</template>

<script>
import BasiceLayout from "@/components/Common/BasicLayout.vue";

export default {
  name: "FAQ",
  components: {
    BasiceLayout
  },
  props: {
    FAQ: ""
  },
  data() {
    return {
      //	输入错误信息时提示
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scopes lang="stylus">
  .Footer
    margin-top: 50px;
    padding: 10px;
    margin: 0 auto;
    text-align: center;
    color: #666;
  .agree-link
    line-height: 14px;
    display:inline-block;
    padding: 20px 0 10px;
</style>