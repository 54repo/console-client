<template>
  <div class="home">
    <AccountSetLayout  layoutType="AccountSet" :layoutTitile="$t('changeTitle')">
      <BasiceLayout :title="$t('changeTitle')">
        <div class="change-content">
          <div class='change-item'>
            <el-row>
              <el-col :span="10" class="change-item-key">
                <span class="key">{{$t('oldText')}}</span>
              </el-col>
              <el-col :span="14" class="change-item-value">
                <input type="password" class="valu" v-model="oldPw" >
              </el-col>
            </el-row>
          </div>  
            <div class='change-item'>
            <el-row>
              <el-col :span="10" class="change-item-key">
                <span class="key">{{$t('newText')}}</span>
              </el-col>
              <el-col :span="14" class="change-item-value">
                <input type="password" class="valu"v-model="newPw">
              </el-col>
            </el-row>
          </div>
          <div class='change-item'>
            <el-row>
              <el-col :span="10" class="change-item-key">
                <span class="key">{{$t('secNewText')}}</span>
              </el-col>
              <el-col :span="14" class="change-item-value last-wrap">
                <input type="password" class="valu" v-model="newSecPw">
                <div class="change-wrap last-button-wrap">
                  <div class="change bonus-cursor" @click="change">{{$t('changeButton')}}</div>
                  <router-link to="/forget">
                    <div class="forget">
                      {{$t('forgetText')}}
                    </div>
                  </router-link>
                </div>
              </el-col>
            </el-row>
          </div> 
        </div>
      </BasiceLayout>
    </AccountSetLayout>
  </div>
</template>

<i18n>
{
  "en": {
    "changeTitle": "Change Password",
    "oldText": "Old Password",
    "newText": "New Password",
    "secNewText": "Retype New Password",
    "changeButton": "change",
    "forgetText": "Forget the old password"
  },
  "zn": {
    "changeTitle": "修改密码",
    "oldText": "旧密码",
    "newText": "新密码",
    "secNewText": "重复新密码",
    "changeButton": "确定",
    "forgetText": "忘记旧密码"
  }
}
</i18n>


<script>
// @ is an alias to /src
import Header from '@/components/Header.vue';
import { mapState, mapActions, mapMutations } from 'vuex';
import AccountSetLayout from "@/components/AccountSet/AccountSetLayout.vue";
import BasiceLayout from "@/components/Common/BasicLayout.vue";
import { Message } from "element-ui";

export default {
  name: 'home',
  components: {
    Header,
    BasiceLayout,
    AccountSetLayout,
  },
  data() {
    return {
      oldPw: '',
      newPw: '',
      newSecPw: '',
    };
  },
  created() {
  },
  methods: {
    ...mapActions(["changePw",]),
    change () {
      console.log(this.oldPw);
      this.changePw({
        oldPassword: this.oldPw,
        newPassword: this.newPw,
        reNewPassword: this.newSecPw,
      }).then(res => {
        if (res.code === 200) {
          Message({
            type: 'success',
            message: res.message
          })
        } else {
           Message({
            type: 'error',
            message: res.message || 'password update error',
          })
        }
        console.log(res);
      });
    },
  }
};
</script>

<style  lang="stylus">
.change-content input
  width: 200px
  height: 28px
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border: 1px solid #dcdfe6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #c7cacc;
  display: inline-block;
  font-size: inherit;
  height: 30px;
  line-height: 30px;
  outline: none;
  padding: 0 10px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  font-size: 10px;
.change-content .key
  font-size: 12px;
  color: #343739;
  text-align: right;
  line-height: 42px;
.change-item-value
  text-align: left
.change-item-key
  text-align: right
  padding-right:20px
.change-content
  margin-top: 80px
  min-height: 500px
.last-wrap
  postion: relative 
.last-button-wrap
  margin-top: 40px
  display: flex;
.change-content .forget
  font-size: 14px;
  color: #13B8BC;
  text-align: right;
  line-height: 35px;
  margin-left: 30px
.change-content .change
  background-image: linear-gradient(-180deg, #15BCAD 2%, #10B2CB 100%);
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #FFFFFF;
  text-align: center;
  line-height: 30px;
  width: 90px;
  height: 35px;

body
  height: 100%
</style>

