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
    account: {
      email: '',  //  用户登陆邮箱
      loginSuccess: '', //登陆
      loginStatus: false, // 记录登陆状态
    },
    signUp: {
      isSignUpDisable: false, //  记录注册状态
    },
    inviteCode: {
      status: false, //邀请码是否可领取状态
      codeList: '', //邀请list
    },
    hardList: [],  //硬件列表
    revenue: {
      inviteRevenue: '', // 邀请收益
      accountRevenue: '', // 个人收益
      allRenvue: '' //用户总收益
    },
    recommend: {
      recommendRefer: '', //  用户推荐refer
      count: '' //  用户推荐数
    }
  },
  mutations,
  actions,
});
