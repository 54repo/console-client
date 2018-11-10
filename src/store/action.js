// action
import {
  loginIn,
  // ajaxImageCode,
  // ajaxEmailCode,
  ajaxEmailCode_v2,
  signUp,
  ajaxInviteCodeStatus,
  ajaxGetAbleList,
  ajaxGetInviteCode,
  ajaxGetUserInfo,
  ajaxHardList,
  ajaxRevenueList,
  ajaxAllRevenue,
  ajaxLogout,
  forgetPassword,
  ajaxChangePw,
  ajaxRecommendInfo,
  ajaxRecommendCount,
  ajaxUnbindHard,
  ajaxNetInfo,
  ajaxWalletAddress,
  ajaxBindAddress,
  ajaxVertifUrl,
  ajaxCommitWithdrawal,
  ajaxWithdrawalBalance,
  ajaxWithdrawalList,
} from './getData';

const NO_CONTENT = "NO_CONTENT";
import moment from 'moment'

import {
  LOGIN_IN,
  // ABLE_LOGIN,
  GET_IMAGE_CODE,
  INVITECODE_STATUS_CODE,
  GET_ABLE_LIST,
  GET_USER_INFO,
  GET_HARDLIST,
  GET_ALL_RENVUE,
  // INVITE_REVENUE_LIST,
  GET_LASTDAY_INVITE,
  // ACCOUNT_REVENUE_LIST,
  ACCOUNT_LASTDAY_REVENUE,
  GET_RECOMMEND_INFO,
  GET_RECOMMEND_COUNT,
  GET_WALLET_ADDRESS,
  GET_MAINLAND_LIST,
  GET_NON_MAINLAND_LIST,
  GET_WITHDRAWAL_LIST,
  GET_BALANCE,
  GET_WITHDRAWAL_STAUTS,
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
  async sendEmailCode_v2({ commit }, params) {
    const res = await ajaxEmailCode_v2(params);
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
    try {
      if (res.ret.list && res.ret.list.length > 0) {
        const results = await Promise.all(res.ret.list.map(async item => {
          try {
            let res_info = await ajaxNetInfo({
              mac_address: item.mac_address,
              bcode: item.bcode
            });
            item.status = res_info.ret.devnet.status || '';
            item.ip = res_info.ret.devnet.ext_ip || '';
          } catch (error) {
            item.status = '';
          }
          return item;
        }));
        let list = Object.values(results);
        commit(GET_HARDLIST, list);
      } else {
        commit(GET_HARDLIST, NO_CONTENT);
      }
    } catch (error) {
      commit(GET_HARDLIST, NO_CONTENT);
    }
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
      if (params.type === 'all') {
        commit(GET_ALL_RENVUE, res.ret.revenue);
      } else if (params.type === 'refer') {
        commit(GET_LASTDAY_INVITE, res.ret.revenue);
      } else if (params.type === 'account') {
        commit(ACCOUNT_LASTDAY_REVENUE, res.ret.revenue);
      }
    } catch (error) {
      console.log(error);
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
    } catch (error) {
      commit(GET_WALLET_ADDRESS, 'NO_ADDRESS');
    }
  },
  //   绑定钱包地址
  async bindWalletAddress({ commit }, params) {
    const res = await ajaxBindAddress(params);
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
        val.eth_browser = `https://etherscan.io/tx${val.transaction}`;
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
      } else {
        commit(GET_BALANCE, 0);
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
};
