<template>
  <!-- <div class=" annouce-content"> -->
  <div class="BonusCode">
    <BasiceLayout title="BonusCode" class="bonus-code-layout">
      <el-row>
        <!-- 领码 -->
        <el-col :span="12" class="bonusCode-first-row">
          <div class="grid-content bg-purple">
            <el-alert :closable="false" :title="$t('HOME.BonusCode.bonusTips')" type="error" center>
            </el-alert>
            <div class="active-wrap">
              <div>{{ $t('HOME.BonusCode.bonusGet') }}</div>
              <!-- 领码选择 -->
              <el-select v-model="regionDefault" :placeholder="$t('HOME.BonusCode.regionHolder')"
                         class="bonuscode-select-region" @change="getStatus">
                <el-option default v-for="item in regionOptions" :key="item.value" :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
              <vue-recaptcha
                class="captcha-wrap"
                ref="recaptcha"
                @verify="onVerify"
                @expired="onExpired"
                data-size="normal"
                :sitekey="sitekey"
              >
              </vue-recaptcha>
              <!-- 领码 -->
              <div v-bind:class="{ noActive: (!inviteStatus && !this.$route.query.debug) }" v-on:click="clickInviteCode"
                   class="get-invite bonus-cursor">{{ $t('HOME.BonusCode.getText')}}
              </div>
            </div>
            <div class="count-time">
              <span class="key">{{ $t('HOME.BonusCode.nextTimeText') }}</span>
              <span class="minute">{{showA}}</span>
              <span class="fh">:</span>
              <span class="seconds">{{showB}}</span>
            </div>
          </div>
          <!-- bcode规则 -->
          <div class="get-rule">
            <div>
              <h4>{{ $t('HOME.BonusCode.ruleTip.title') }}</h4>
            </div>
            <div>{{ $t('HOME.BonusCode.ruleTip.rule1') }}</div>
            <div>{{ $t('HOME.BonusCode.ruleTip.rule2') }}</div>
            <div>{{ $t('HOME.BonusCode.ruleTip.rule3') }}</div>
            <div>{{ $t('HOME.BonusCode.ruleTip.rule4') }}</div>
            <div>{{ $t('HOME.BonusCode.ruleTip.rule5') }}</div>
            <div>{{ $t('HOME.BonusCode.ruleTip.rule6') }}</div>
            <div>{{ $t('HOME.BonusCode.ruleTip.rule7') }}</div>
            <div class="tele">{{ $t('HOME.BonusCode.ruleTip.tele') }} <a target="_blank" class="join-tele bonus-cursor" :href="$t('HOME.BonusCode.ruleTip.teleUrl')">{{ $t('HOME.BonusCode.ruleTip.teleButton') }}</a></div>
          </div>
        </el-col>
        <!-- code列表 -->
        <el-col :span="12">
          <CodeList :non_mainland_list="non_mainland_list" :mainland_list="mainland_list" :calculate_list="calculate_list"></CodeList>
        </el-col>
      </el-row>
    </BasiceLayout>
  </div>
  <!-- </div> -->
</template>

<script>
import BasiceLayout from '@/components/Common/BasicLayout.vue'
import CodeList from '@/components/Home/CodeList.vue'
import { mapState, mapActions } from 'vuex'
import { Message } from 'element-ui'
import { LANG, SITEKEY } from '../../config/contant.js'
import VueRecaptcha from 'vue-recaptcha'

export default {
  name: 'BonusCode',
  props: {
    // status: ''
  },
  components: {
    BasiceLayout,
    CodeList,
    VueRecaptcha
  },
  data () {
    return {
      timeMinutes: '', // 倒计时分钟数
      timeSeconds: '', // 倒计时秒数
      showA: '',
      showB: '',
      regionOptions: this.$t('HOME.BonusCode.regionOptions'),
      regionDefault: this.$t('HOME.BonusCode.regionOptions')[0].value,
      region: 'mainland',
      response: '', //ga verify response
      sitekey: SITEKEY['HIGH'], //ga verify key
    }
  },

  watch: {
    timeMinutes: function (val) {
      this.showA =
        this.timeMinutes.toString().length > 1
          ? this.timeMinutes
          : '0' + this.timeMinutes.toString()
    },
    timeSeconds: function (val) {
      this.showB =
        this.timeSeconds.toString().length > 1
          ? this.timeSeconds
          : '0' + this.timeSeconds.toString()
    }
  },
  computed: mapState({
    // 验证码地址
    inviteStatus (state) {
      // 10个激活码不可领取
      return state.inviteCode.status
    },
    mainland_list: state => state.inviteCode.mainland_list,
    non_mainland_list: state => state.inviteCode.non_mainland_list,
    calculate_list: state => state.inviteCode.calculate_list,
  }),
  mounted () {
    this.countTime()
    this.getAbleList()
  },
  methods: {
    ...mapActions([
      'getInviteCode',
      'getAbleList',
      'getVertifUrl',
      'sendEmailCode_v2',
      'getInviteCodeStatus'
    ]),
    onVerify: function (response) {
      this.response = response
    },
    onExpired: function () {
      Message({
        message: this.$t('captcha.expired'),
        type: 'error'
      })
      this.$refs.recaptcha.reset()
    },
    resetRecaptcha () {
      this.$refs.recaptcha.reset()
    },
    getStatus (region) {
      this.region = region
      this.getInviteCodeStatus(region)
      this.resetRecaptcha()
    },
    // 倒计时计算：按照当前时间计算该小时剩余分钟
    countTime () {
      let EACH_HOUR_SECONDS = 60 * 60
      let thisTime = new Date()
      let minutes = thisTime.getUTCMinutes()
      let seconds = thisTime.getUTCSeconds()
      let leftSeconds = EACH_HOUR_SECONDS - (minutes * 60 + seconds)

      setInterval(() => {
        if (leftSeconds > 0) {
          this.timeMinutes = Math.floor(leftSeconds / 60)
          this.timeSeconds = leftSeconds - this.timeMinutes * 60
          --leftSeconds
        } else {
          leftSeconds = 3600
          --leftSeconds
        }
      }, 1000)
    },
    // 领取 邀请码
    clickInviteCode () {
      if (this.inviteStatus || this.$route.query.debug) {
        // 校验验证码&&地区
        if (!this.response) {
          Message(this.$t('HOME.BonusCode.limitVerify'))
          return false
        }
        // 领取邀请码
        this.getInviteCode({
          region: this.region,
          response: this.response,
          // ticket: this.ticket,
          // csnonce: this.csnonce
        }).then(res => {
          try {
            if (res.message === 'getSuccess') {
              Message({
                type: 'success',
                message: 'receive successfully'
              })
              // 刷新BCode
              this.getAbleList()
            } else {
              Message(res.message || 'reveive error')
            }
          } catch (error) {
            Message('reveive error')
          }
        })
      }
    }
  },

  // 加载验证码
  created () {
    // 初始化大陆地区code
    this.getInviteCodeStatus('mainland')
    // this.getVerify({ action: 1, region: "mainland" })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
.is-mobile {
  .bonusCode-first-row {
    width auto
    max-width 100%
    .active-wrap {
      margin-left 0
      .bonuscode-select-region {
        margin-left 0
      }
      .captcha-wrap {
        margin-left 0
        margin-right 0
        max-width 100%
        overflow auto
      }
      .get-invite {
        margin-left 0
      }
    }
    .count-time {
      margin-left 0
    }
    .minute, .second {
      margin-left 0
    }
    .get-rule {
      margin 0
      width auto
    }
  }
  .bonusCode-second-row {
    width auto
    .bonus-list {
      margin-top 20px
      margin-left 0
      padding-left 0
      border-left none
    }
  }
}

.captcha_wrap {
  width: 290px;
  height: 40px;
  margin: 20px 0 20px 20px;
}

.home-image-code {
  margin: 20px 20px 20px;
  max-width: 300px;
}

.bonus-code-layout {
  margin-top: 20px;
  font-size: 14px;
}

.fh {
  display: inline-block;
  padding: 0 10px;
}

.active-wrap {
  color: #343739;
  line-height: 14px;
  text-align: left;
  margin-top: 40px;
  font-size: 14px;
  margin-left: 20px;

  .bonuscode-select-region {
    margin: 20px 0 0 20px;
  }
}

.get-invite {
  line-height: 40px;
  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(2%, #15bcad), to(#10b2cb));
  background-image: linear-gradient(-180deg, #15bcad 2%, #10b2cb 100%);
  font-size: 14px;
  color: #fff;
  text-align: center;
  line-height: 18px;
  border-radius: 0;
  border: 0;
  display: inline-block;
  width: 90px;
  height: 30px;
  line-height: 30px;
  margin-left: 20px;
}

.count-time .key {
  font-size: 14px;
  color: #96999B;
  line-height: 36px;
}

.count-time {
  text-align: left;
  margin-top: 40px;
  margin-left: 20px;
}

.minute {
  margin-left: 10px;
}

.minute, .seconds {
  display: inline-block;
  background: #FFFFFF;
  border: 1px solid #E7EAEC;
  border-radius: 2px;
  font-size: 16px;
  color: #65686A;
  text-align: center;
  line-height: 18px;
  padding: 5px;
}

.noActive {
  background: #D0D0D0;
}

.get-rule {
  font-size: 14px;
  color: #909399;
  width: 80%;
  padding: 8px 16px;
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
  line-height: 22px;
}

.get-rule .tele {
  margin-top: 10px;
}

.get-rule h4 {
  display: inline-block;
  margin-bottom: 10px;
}

.join-tele {
  color: #0db4c5;
}

.bonus-code-layout .captcha-wrap
  margin: 20px;
</style>
