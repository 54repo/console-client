import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { loginIn } from './getData';
import { LOGIN_IN } from './mutation-types'

Vue.use(Vuex);

import mutations from './mutation'
import actions from './action'

export default new Vuex.Store({
  state: {
    sitekey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
    account: {
      email: '',  //  用户登录邮箱
      loginSuccess: '', //登录
      loginStatus: false, // 记录登录状态
    },
    signUp: {
      isSignUpDisable: false, //  记录注册状态
    },
    inviteCode: {
      status: false, //邀请码是否可领取状态
      codeList: '', //邀请list
      mainland_list: '', //邀请list
      non_mainland_list: '', //邀请list
    },
    hardWare: {
      hardLength: '',
      deviceSize: '',
      currentPage: 1,
      hardList: '',
      allDevices: [] //所有设备列表，帮助搜索
    },
    revenue: {
      // inviteRevenue: '', // 邀请收益
      // accountRevenue: '', // 个人收益
      // allRenvue: '', //用户总收益

      balance: 0,
      totalInvite : 0, 
      totalNetRevenue: 0, 
      totalOnlineRevenue: 0, 
      totalRevenue: 0
    },
    revenueDetail: {
      currentPage: '',
      deviceLength: '',
      deviceNumSize: 1,
      revenueDetail: [],
      allDevices: []
    },
    inviteDetail: {
      detailList: [],
      pageSize: 1,
      currentPage: '',
      length: ''
    },
    recommend: {
      recommendRefer: '', //  用户推荐refer
      count: '' //  用户推荐数
    },
    wallet: {
      address: '',
      eth_verify_status: ''
    },
    withdrawal: {
      list: [],
      balance: '',
      commitStatus: "done" //默认全部提现操作完成
    }
  },
  mutations,
  actions,
});
