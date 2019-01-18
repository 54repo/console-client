/** 查询macAddress **/
<template>
  <div class="tencent-code">
    <el-select
      v-model="searchMacAddress"
      filterable
      placeholder=""
      @change="search"
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
</template>

<script>
import { mapActions } from 'vuex'
import { Message } from 'element-ui'
import { LANG } from '../../config/contant.js'

export default {
  name: 'Search Mac Address',
  props: {

  },
  model: {
    prop: 'value',
    event: 'change'
  },
  data() {
    return {
      selectDate
    }
  },
  methods: {
    // ...mapActions([''])
  },
  created() {
   
  }
}
</script>

<i18n>
{
  "zn": {
  },
  "en": {
    
  }
}
</i18n>



