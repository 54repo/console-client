/** 验证码 **/
<template>
  <div class="tencent-code">
    <div id="TCaptcha" style="width:100%;height:20px;"></div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { Message } from 'element-ui'
import { LANG } from '../../config/contant.js'

export default {
  name: 'TencentVerify',
  props: {
    ticket: '',
    csnonce: '',
    width: ''
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  methods: {
    ...mapActions(['getVertifUrl'])
  },
  created() {
    this.getVertifUrl().then(res => {
      this.$emit('changeTicket', { csnonce: res.data.csnonce })
      let capScript = document.createElement('script')
      capScript.type = 'text/javascript'
      capScript.src = res.data.url
      document.body.appendChild(capScript)
      let that = this;

      setTimeout(() => {
        let capOption = {
          callback: cbfn,
          themeColor: '15bcad',
          lang: LANG[this.$i18n.locale] || 'en'
        }
        capInit(document.getElementById('TCaptcha'), capOption)
        //回调函数：验证码页面关闭时回调
        function cbfn(retJson) {
          if (retJson.ret == 0) {
            that.$emit('changeTicket', { ticket: retJson.ticket })
            // 用户验证成功
          } else {
            //用户关闭验证码页面，没有验证
          }
        }
      }, 1000)
    })
  }
}
</script>


