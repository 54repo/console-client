// action
import {
  loginIn,
  ajaxImageCode,
  ajaxEmailCode,
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
} from './getData';

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
  async getImageCode({ commit }, params) {
    const res = await ajaxImageCode();
    const imgCodeUrl = res.ret.captcha;
    commit(GET_IMAGE_CODE, imgCodeUrl);
  },
  // 发送邮箱码
  async sendEmailCode({ commit }, params) {
    const res = await ajaxEmailCode(params);
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
  async getInviteCodeStatus({ commit }, params) {
    const res = await ajaxInviteCodeStatus(params);
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
      commit(GET_ABLE_LIST, res.ret.list);
    } catch (error) {
      commit(GET_ABLE_LIST, []);
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
      commit(GET_HARDLIST, res.ret.list);
    } catch (error) {
      commit(GET_HARDLIST, []);
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
};
