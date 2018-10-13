import {
  // 登陆页
  LOGIN_IN,
  // DISABLE_LOGIN,
  // ABLE_LOGIN,
  // 注册页
  DISABLE_SIGNUP,
  ABLE_SIGNUP,
  GET_IMAGE_CODE,
  // 首页
  INVITECODE_STATUS_CODE,
  GET_ABLE_LIST,
  GET_USER_INFO,
  GET_ALL_RENVUE,
  GET_LASTDAY_INVITE,
  ACCOUNT_REVENUE_LIST,
  // 推荐
  GET_RECOMMEND_INFO,
  GET_RECOMMEND_COUNT,
  // 硬件列表
  GET_HARDLIST,
  ACCOUNT_LASTDAY_REVENUE,
} from './mutation-types.js'

// import {setStore, getStore} from '../config/mUtils'
// import {localapi, proapi} from 'src/config/env'

export default {
  // login 
  [LOGIN_IN](state, status) {
    state.account.loginStatus = status;
    state.account =  Object.assign({}, state.account);
  },
  // //  login不可点击
  // [DISABLE_LOGIN](state) {
  //   console.log(123);
  //   state.account.isLoginDisable = true;
  //   state.account =  Object.assign({}, state.account);
  // },
  //  login可点击
  // [ABLE_LOGIN](state) {
  //   console.log(123);
  //   // state.account.isLoginDisable = false;
  //   state.account =  Object.assign({}, state.account);

  // },
  //  signup不可点击
  [DISABLE_SIGNUP](state) {
    console.log(123);
    state.signUp.isSignUpDisable = true;
    state.signUp =  Object.assign({}, state.signUp);
  },
  //  signup可点击
  [ABLE_SIGNUP](state) {
    console.log(123);
    state.signUp.isSignUpDisable = false;
    state.signUp =  Object.assign({}, state.signUp);
  },
  // 图片验证码地址
  [GET_IMAGE_CODE](state, imageUrl) {
    console.log(123456);
    console.log(imageUrl);
    // const signUp = (Object.assign({}, this.state.signUp, { imageCodeSrc: imageUrl, });
    state.signUp.imageCodeSrc = imageUrl;
    state.signUp =  Object.assign({}, state.signUp);
  },
  // 图片邀请码状态
  [INVITECODE_STATUS_CODE](state, status) {
    // const signUp = (Object.assign({}, this.state.signUp, { imageCodeSrc: imageUrl, });
    state.inviteCode.status = status;
    state.inviteCode =  Object.assign({}, state.inviteCode);
  },
  // 图片邀请码状态
  [GET_ABLE_LIST](state, list) {
    state.inviteCode.codeList = list;
    state.inviteCode =  Object.assign({}, state.inviteCode);
  },
  // 获取用户信息
  [GET_USER_INFO](state, emaill) {
    state.account.email= emaill;
    state.account =  Object.assign({}, state.account);
  },
  // 用户收益
  [GET_ALL_RENVUE](state, revenue) {
    state.revenue.allRenvue= revenue;
    state.revenue =  Object.assign({}, state.revenue);
  },
  //  用户邀请收益
  [GET_LASTDAY_INVITE](state, revenueList) {
    state.revenue.inviteRevenue = revenueList;
    state.revenue =  Object.assign({}, state.revenue);
  },
  //  用户个人收益详情
  [ACCOUNT_LASTDAY_REVENUE](state, revenueList) {
    state.revenue.accountRevenue = revenueList;
    state.revenue =  Object.assign({}, state.revenue);
  },
  //  用户推荐链接
  [GET_RECOMMEND_INFO](state, recommend) {
    state.recommend.recommendRefer = recommend;
    state.recommend =  Object.assign({}, state.recommend);
  },
  //  用户推荐总人数
  [GET_RECOMMEND_COUNT](state, count) {
    state.recommend.count = count;
    state.recommend =  Object.assign({}, state.recommend);
  },
  //  获取硬件列表
  [GET_HARDLIST](state, hardList) {
    state.hardList = hardList;
    // state.hardList =  Object.assign({}, state.hardList);
  },
}
