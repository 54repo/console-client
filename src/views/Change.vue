<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <AccountSetLayout layoutType="AccountSet" layoutTitile="Change Password">
      <BasiceLayout title="Change Password">
        <div class="title">Change Password</div>
        <BasiceLayout title="Change Password">
          <div class="change-content">
            <div class='change-item'>
              <el-row>
                <el-col :span="10" class="change-item-key">
                  <span class="key">Old Password</span>
                </el-col>
                <el-col :span="14" class="change-item-value">
                  <input type="password" class="valu" v-model="oldPw">
                </el-col>
              </el-row>
            </div>
            <div class='change-item'>
              <el-row>
                <el-col :span="10" class="change-item-key">
                  <span class="key">New Password</span>
                </el-col>
                <el-col :span="14" class="change-item-value">
                  <input type="password" class="valu" v-model="newPw">
                </el-col>
              </el-row>
            </div>
            <div class='change-item'>
              <el-row>
                <el-col :span="10" class="change-item-key">
                  <span class="key">Retype New Password</span>
                </el-col>
                <el-col :span="14" class="change-item-value last-wrap">
                  <input type="password" class="valu" v-model="newSecPw">
                  <div class="change-wrap last-button-wrap">
                    <div class="change" @click="change">change</div>
                    <router-link to="/forget">
                      <div class="forget">
                        Forget Password
                      </div>
                    </router-link>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </BasiceLayout>
      </BasiceLayout>
    </AccountSetLayout>

    <!-- <Header type='home-header' />
    <el-row class="tac">
      <el-col :span="4">
        <h5 class="panel-wrap">Account Settings</h5>
        <el-menu
          class="bonus-menu"
          background-color="#0A0E22"
          text-color="#989AA2"
          active-text-color="#fff">
          <el-menu-item index="0" class="home-page-wrap">
            <img  class="menu-icon home-icon" src="../assets/accountSet/account-set.png" >
            <span slot="title">Change Password</span>
          </el-menu-item>
           <el-menu-item index="4">
            <img  class="menu-icon home-icon" src="../assets/accountSet/hard-list.png">
            <span slot="title">Hardware List</span>
          </el-menu-item>
          <el-menu-item index="4">
            <img  class="menu-icon home-icon" src="../assets/accountSet/wallet-bind.png">
            <span slot="title">Wallet Binds</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20" class="bonus-content">
      
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import { mapState, mapActions, mapMutations } from 'vuex'
import { Message } from 'element-ui'

import BasiceLayout from '@/components/Common/BasicLayout.vue'

export default {
  name: 'hardlist',
  components: {
    Header,
    BasiceLayout
  },
  data() {
    return {
      oldPw: '',
      newPw: '',
      newSecPw: ''
    }
  },
  created() {},
  methods: {
    ...mapActions(['getInviteCodeStatus', 'getUserInfo']),
    change() {
      this.changePw({
        oldPassword: this.oldPw,
        newPassword: this.newPw,
        reNewPassword: this.newSecPw
      })
    }
  }
}
</script>