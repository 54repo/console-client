<template>
  <div class="bonus-list">
    <span class="title">{{ $t('title') }}</span>
    <el-tabs v-model="active_tab" class="list-tab">
      <el-tab-pane :label="$t('HOME.BonusCode.regionOptions[0].label')" name="mainland">         
        <el-table v-if="mainland_list !== 'NO_CONTENT'" empty-text="Loading" :data="mainland_list || []" height="410px" style="width: 100%">
          <el-table-column class="bcode-list" prop="bcode" :label="totalText">
          </el-table-column>
        </el-table>
        <el-table v-if=" mainland_list === 'NO_CONTENT'" :empty-text="$t('noCodeTip')" height="410px" style="width: 100%"></el-table>
      </el-tab-pane>
      <el-tab-pane :label="$t('HOME.BonusCode.regionOptions[1].label')" name="non-mainland">
        <el-table v-if="non_mainland_list !== 'NO_CONTENT'" empty-text="Loading" :data="non_mainland_list || []" height="410px" style="width: 100%">
          <el-table-column class="bcode-list" prop="bcode" :label="totalText">
          </el-table-column>
        </el-table>
        <el-table v-if=" non_mainland_list === 'NO_CONTENT'" :empty-text="$t('noCodeTip')" height="410px" style="width: 100%"></el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'CodeList',
  data() {
    return {
      totalText: 'Total BCode:',
      showList: [],
      active_tab: 'mainland'
    }
  },
  props: {
    mainland_list: '',
    non_mainland_list: ''
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.list-tab 
  margin: 20px;
.bonus-list .bcode-list {
  font-size: 14px;
}

.bonus-list .title {
  font-size: 16px;
  color: #96999B;
  line-height: 16px;
  display: inline-block;
  padding-left: 10px;
  padding-top: 10px;
}

.bonus-list {
  border-left: 1px solid #E7EAEC;
  margin-left: 20px;
  padding-left: 20px;
  text-align: left;
}

.down-list {
  border-top: 1px solid #eaeefb;
  height: 44px;
  box-sizing: border-box;
  background-color: #fff;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  text-align: center;
  margin-top: -1px;
  color: #d3dce6;
  cursor: pointer;
  position: relative;
}

.down-list i {
  line-height: 43px;
}
</style>

<i18n>
{
  "en": {
    "title": "The valid BonusCode for the current account binding (Invalid after use):",
    "noCodeTip": "No BonusCode"
  },
  "zn": {
    "title": "当前账号绑定的有效BonusCode（使用后失效）:",
    "noCodeTip": "暂无BonusCode"
  }
}
</i18n>
