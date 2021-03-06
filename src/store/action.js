// action
import {
  loginIn,
  ajaxEmailCode_v3,
  signUp,
  ajaxInviteCodeStatus,
  ajaxGetAbleList,
  ajaxGetInviteCode,
  ajaxGetUserInfo,
  ajaxHardList,
  ajaxDeviceDetail,
  ajaxRevenueList,
  ajaxAllRevenue,
  ajaxLogout,
  forgetPassword,
  ajaxChangePw,
  ajaxRecommendInfo,
  ajaxRecommendCount,
  ajaxUnbindHard,
  ajaxWalletAddress,
  ajaxBindAddress,
  ajaxVertifUrl,
  ajaxCommitWithdrawal,
  ajaxWithdrawalBalance,
  ajaxUnbindAddress,
  ajaxWithdrawalList,
  ajaxDeviceNotes,
  ajaxRevenueDetail,
  ajaxInviteDetail,
  ajaxDeviceWatchDetail
} from './getData';

const NO_CONTENT = "NO_CONTENT";
import moment from 'moment'

import {
  LOGIN_IN,
  GET_IMAGE_CODE,
  INVITECODE_STATUS_CODE,
  GET_ABLE_LIST,
  GET_USER_INFO,
  GET_HARDLIST,
  GET_ALL_RENVUE,
  // GET_LASTDAY_INVITE,
  // ACCOUNT_LASTDAY_REVENUE,
  GET_RECOMMEND_INFO,
  GET_RECOMMEND_COUNT,
  GET_WALLET_ADDRESS,
  GET_WALLET_STATUS,
  GET_MAINLAND_LIST,
  GET_NON_MAINLAND_LIST,
  GET_CALCULATE_LIST,
  GET_WITHDRAWAL_LIST,
  GET_BALANCE,
  GET_WITHDRAWAL_STAUTS,
  GET_SEARCH_LIST,
  GET_RENVUE_DETAIL,
  GET_INVITE_DETAIL,
} from './mutation-types';
import router from '../router';

export default {
  async login({ commit }, params) {
    const res = await loginIn(params);
    if (res.code === 200) {
      commit(LOGIN_IN, true);
    } else {
      commit(LOGIN_IN, false);
    }
    return res;
  },
  async logout({ commit }) {
    const res = await ajaxLogout();
    commit(LOGIN_IN, false);
    router.push({ name: 'login' });
    return res;
  },
  async sendEmailCode_v3({ commit }, params) {
    const res = await ajaxEmailCode_v3(params);
    return res;
  },
  // 发送邮箱码
  async ajaxSignUp({ commit }, params) {
    const res = await signUp(params);
    return res;
  },
  // 找回密码
  async ajaxForget({ commit }, params) {
    const res = await forgetPassword(params);
    return res;
  },

  // -------首页-------
  // 发送邮箱码
  async getInviteCodeStatus({ commit }, region) {
    const res = await ajaxInviteCodeStatus({ region });
    try {
      commit(INVITECODE_STATUS_CODE, res.ret.status);
    } catch (error) {
      commit(INVITECODE_STATUS_CODE, false);
    }
  },
  // 当前用户可用邀请码
  async getAbleList({ commit }, params) {
    const res = await ajaxGetAbleList(params);
    try {
      if (res.ret.mainland && res.ret.mainland.length) {
        commit(GET_MAINLAND_LIST, res.ret.mainland);
      } else {
        commit(GET_MAINLAND_LIST, NO_CONTENT);
      }
    } catch (error) {
      commit(GET_MAINLAND_LIST, NO_CONTENT);
    }
    try {
      if (res.ret.non_mainland && res.ret.non_mainland.length) {
        commit(GET_NON_MAINLAND_LIST, res.ret.non_mainland);
      } else {
        commit(GET_NON_MAINLAND_LIST, NO_CONTENT);
      }
    } catch (error) {
      commit(GET_NON_MAINLAND_LIST, NO_CONTENT);
    }
    try {
      if (res.ret.calculate && res.ret.calculate.length) {
        commit(GET_CALCULATE_LIST, res.ret.calculate);
      } else {
        commit(GET_CALCULATE_LIST, NO_CONTENT);
      }
    } catch (error) {
      commit(GET_CALCULATE_LIST, NO_CONTENT);
    }
  },
  // 领取邀请码
  async getInviteCode({ commit }, params) {
    const res = await ajaxGetInviteCode(params);
    return res;
  },
  //  获取用户信息
  async getUserInfo({ commit }, params) {
    const res = await ajaxGetUserInfo(params);
    try {
      commit(GET_USER_INFO, res.ret.email);
    } catch (error) {
      commit(GET_USER_INFO, '');
    }
    return res;
  },
  //  修改密码
  async changePw({ commit }, params) {
    const res = await ajaxChangePw(params);
    return res;
  },
  //  获取硬件列表
  async getHardList({ commit }, params) {
    const res = await ajaxHardList(params);
    // const res = { 'code': 200, 'ret': { 'allDevices': [{ 'label': '全部', 'value': 'all' }], 'list': [{ 'tx_bw': '68.25', 'id': '02868269-597b-4a40-aa3f-0850a695bf21', 'mac_address': 'fc:7c:02:4c:7a:52', 'bcode': '1120-65440283-6046-4a45-a36d-cccfdc33469b', 'bind_at': '2018-12-01 12:03:10', 'cpu_count': 4, 'mem_size': '1.80G', 'storage_size': '6.34G', 'schedule': true, 'info': 'v0.4.2', 'calNeeds': '高', 'nat': 6, 'ext_ip': '115.201.66.188', 'status': 'online', 'location': '浙江', 'needs': '低', 'stable': '高', 'note': '12', 'noteStatus': true },], 'deviceLength': 76, 'pageSize': 20, 'currentPage': '1' }, 'message': 'get device list successfully' };
    try {
      if (res.ret.list && res.ret.list.length > 0) {
        commit(GET_HARDLIST, res.ret);
      } else {
        commit(GET_HARDLIST, NO_CONTENT);
      }
    } catch (error) {
      commit(GET_HARDLIST,
      );
    }
    return res;
  },
  //  搜索硬件
  async getDeviceDetail({ commit }, params) {
    const res = await ajaxDeviceDetail(params);
    commit(GET_SEARCH_LIST, res.ret);
  },
  //  搜索硬件
  async addDeviceNotes({ commit }, params) {
    const res = await ajaxDeviceNotes(params);
    return res;
  },
  //  获取硬件列表
  async unbindHard({ commit }, params) {
    const res = await ajaxUnbindHard(params);
    return res;
  },
  //  获取用户总收益
  async getAllRevenue({ commit }, params) {
    const res = await ajaxAllRevenue(params);
    try {
      // if (params.type === 'all') {
      commit(GET_ALL_RENVUE, res.ret);
      // } else if (params.type === 'refer') {
      //   commit(GET_LASTDAY_INVITE, res.ret.revenue);
      // } else if (params.type === 'account') {
      //   commit(ACCOUNT_LASTDAY_REVENUE, res.ret.revenue);
      // }
    } catch (error) {
      console.log(error);
    }
    return res;
  },
  //  获取用户单台设备收益
  async getRevenueDetail({ commit }, params) {
    const res = await ajaxRevenueDetail(params);
    try {
      commit(GET_RENVUE_DETAIL, res.ret);
    } catch (error) {
      commit(GET_RENVUE_DETAIL, 'NONE');
    }
    return res;
  },
  //  获取用户邀请收益
  async getInviteDetail({ commit }, params) {
    const res = await ajaxInviteDetail(params);
    try {
      commit(GET_INVITE_DETAIL, res.ret || {});
    } catch (error) {
      commit(GET_INVITE_DETAIL, 'NONE');
    }
    return res;
  },
  //  获取用户推荐信息
  async getRecommendInfo({ commit }) {
    const res = await ajaxRecommendInfo();
    try {
      let recommenInfo = `https://console.bonuscloud.io/signUp?${res.ret.user}`;
      commit(GET_RECOMMEND_INFO, recommenInfo);
    } catch (error) {
      commit(GET_RECOMMEND_INFO, '');
    }
  },
  //  获取用户推荐数
  async getRecommendCount({ commit }) {
    const res = await ajaxRecommendCount();
    try {
      commit(GET_RECOMMEND_COUNT, res.count);
    } catch (error) {
      commit(GET_RECOMMEND_COUNT, 0);
    }
  },
  //  获取用户钱包绑定地址
  async getWalletAddress({ commit }) {
    const res = await ajaxWalletAddress();
    try {
      commit(GET_WALLET_ADDRESS, res.ret.eth_address || 'NO_ADDRESS');
      commit(GET_WALLET_STATUS, res.ret.eth_verify_status);
    } catch (error) {
      commit(GET_WALLET_ADDRESS, 'NO_ADDRESS');
      commit(GET_WALLET_STATUS, false);
    }
  },
  //   绑定钱包地址
  async bindWalletAddress({ commit }, params) {
    const res = await ajaxBindAddress(params);
    return res;
  },
  //   解绑钱包地址
  async commitUnbindAddress({ commit }) {
    const res = await ajaxUnbindAddress();
    return res;
  },
  // 获取验证码js地址
  async getVertifUrl({ commit }, params) {
    const res = await ajaxVertifUrl(params);
    return res;
  },

  //  获取提现列表
  async getWithdrawalList({ commit }, params) {
    const res = await ajaxWithdrawalList(params);
    let commitStatus = 'done';
    try {
      res.data.data.map(val => {
        if (val.status === 'created') {
          commitStatus = 'created';
        }
        val.created_at = moment(val.created_at).utc().format('YYYY-MM-DD hh:mm:ss');
        val.eth_browser = `https://etherscan.io/tx/${val.transaction}`;
      })
      commit(GET_WITHDRAWAL_LIST, res.data.data);
      commit(GET_WITHDRAWAL_STAUTS, commitStatus);
    } catch (error) {
      commit(GET_WITHDRAWAL_LIST, 'NONE');
    }
  },
  //  获取提现余额
  async getWithdrawalBalance({ commit }, params) {
    const res = await ajaxWithdrawalBalance(params);
    try {
      if (res.data && res.data.balance) {
        commit(GET_BALANCE, res.data.balance.amount);

        if (res.withdrawalStatus === 'closed') {
          commit(GET_WITHDRAWAL_STAUTS, 'closed');
        }
      } else {
        commit(GET_BALANCE, '-');
      }
    } catch (error) {
      commit(GET_BALANCE, 'NONE');
    }
  },
  //  提现
  async commitWithdrawal({ commit }, params) {
    const res = await ajaxCommitWithdrawal(params);
    return res;
  },
  //  查询设备监控信息
  async getDeviceWatchDetail({ commit }, params) {
    const res = await ajaxDeviceWatchDetail(params);
    // const res = {"data":{"devs_info_log":[{"time":1555447200000,"ext_storage_size":125627793408,"tx_bandwidth":49146757,"schedule":true,"nat":6,"health":159,"stable":282},{"time":1555447500000,"ext_storage_size":125627793408,"tx_bandwidth":49146757,"schedule":true,"nat":6,"health":158,"stable":278},{"time":1555447800000,"ext_storage_size":125627793408,"tx_bandwidth":49146757,"schedule":true,"nat":6,"health":158,"stable":274},{"time":1555448100000,"ext_storage_size":125627793408,"tx_bandwidth":49146757,"schedule":true,"nat":6,"health":157,"stable":271},{"time":1555448400000,"ext_storage_size":125627793408,"tx_bandwidth":49146757,"schedule":true,"nat":6,"health":157,"stable":267},{"time":1555448700000,"ext_storage_size":125627793408,"tx_bandwidth":49146757,"schedule":true,"nat":6,"health":156,"stable":263},{"time":1555449000000,"ext_storage_size":125627793408,"tx_bandwidth":49146757,"schedule":true,"nat":6,"health":156,"stable":260},{"time":1555449300000,"ext_storage_size":125627793408,"tx_bandwidth":49146757,"schedule":true,"nat":6,"health":155,"stable":256},{"time":1555449600000,"ext_storage_size":125627793408,"tx_bandwidth":49146757,"schedule":true,"nat":6,"health":155,"stable":253}]}};
    // const res = {"data":{"devs_info_log":[]}};
    return res.data.devs_info_log || [];
  },
};

