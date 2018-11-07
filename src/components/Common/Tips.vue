<template>
  <div class="tips-layout">
    <BasiceLayout class="tips-layout" :title="title">
      <div class="tips-wrap">
        <div v-for="item in tips" class="tips">{{item}}</div>
      </div>
    </BasiceLayout>
  </div>
</template>

<script>

import BasiceLayout from '@/components/Common/BasicLayout.vue'

export default {
  name: 'BasicLayout',
  props: {
    title: '',
    tips: ''
  },
  components: {
    BasiceLayout,
  },
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.tips-wrap {
  text-align: left;
  font-size: 14px;
  width: 80%;
  padding: 8px 14px;
  margin: 40px 20px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  opacity: 1;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-transition: opacity 0.2s;
  transition: opacity 0.2s;
  background-color: #f4f4f5;
  color: #909399;
  line-height: 30px;
}
</style>
