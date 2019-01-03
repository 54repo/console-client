import {
  // 登录页
  LOGIN_IN,
  // DISABLE_LOGIN,
  // ABLE_LOGIN,
  // 注册页
  DISABLE_SIGNUP,
  ABLE_SIGNUP,
  GET_IMAGE_CODE,
  // 首页
  INVITECODE_STATUS_CODE,
  GET_MAINLAND_LIST,
  GET_NON_MAINLAND_LIST,
  GET_USER_INFO,
  GET_ALL_RENVUE,
  // GET_LASTDAY_INVITE,
  // ACCOUNT_REVENUE_LIST,
  GET_RENVUE_DETAIL,
  // 推荐
  GET_RECOMMEND_INFO,
  GET_RECOMMEND_COUNT,
  // 硬件列表
  GET_HARDLIST,
  GET_SEARCH_LIST,
  // ACCOUNT_LASTDAY_REVENUE,
  // eth地址绑定
  GET_WALLET_ADDRESS,
  GET_WALLET_STATUS,
  // 提现
  GET_WITHDRAWAL_LIST,
  GET_BALANCE,
  GET_WITHDRAWAL_STAUTS,
  GET_INVITE_DETAIL,
} from './mutation-types.js'

// import {setStore, getStore} from '../config/mUtils'
// import {localapi, proapi} from 'src/config/env'

export default {
  // login 
  [LOGIN_IN](state, status) {
    state.account.loginStatus = status;
    state.account = Object.assign({}, state.account);
  },
  //  signup不可点击
  [DISABLE_SIGNUP](state) {
    console.log(123);
    state.signUp.isSignUpDisable = true;
    state.signUp = Object.assign({}, state.signUp);
  },
  //  signup可点击
  [ABLE_SIGNUP](state) {
    console.log(123);
    state.signUp.isSignUpDisable = false;
    state.signUp = Object.assign({}, state.signUp);
  },
  // 图片验证码地址
  [GET_IMAGE_CODE](state, imageUrl) {
    console.log(123456);
    console.log(imageUrl);
    // const signUp = (Object.assign({}, this.state.signUp, { imageCodeSrc: imageUrl, });
    state.signUp.imageCodeSrc = imageUrl;
    state.signUp = Object.assign({}, state.signUp);
  },
  // 图片邀请码状态
  [INVITECODE_STATUS_CODE](state, status) {
    // const signUp = (Object.assign({}, this.state.signUp, { imageCodeSrc: imageUrl, });
    state.inviteCode.status = status;
    state.inviteCode = Object.assign({}, state.inviteCode);
  },
  // 图片邀请码状态
  [GET_MAINLAND_LIST](state, list) {
    state.inviteCode.mainland_list = list;
    state.inviteCode = Object.assign({}, state.inviteCode);
  },
  // 图片邀请码状态
  [GET_NON_MAINLAND_LIST](state, list) {
    state.inviteCode.non_mainland_list = list;
    state.inviteCode = Object.assign({}, state.inviteCode);
  },
  // 获取用户信息
  [GET_USER_INFO](state, emaill) {
    state.account.email = emaill;
    state.account = Object.assign({}, state.account);
  },
  // 用户收益
  [GET_ALL_RENVUE](state, ret) {
    // let {balance= 0, totalInvite = 0, totalNetRevenue= 0, totalOnlineRevenue= 0, totalRevenue= 0} = ret;
    state.revenue = ret;
    state.revenue = Object.assign({}, state.revenue);
  },
  //  用户邀请收益
  // [GET_LASTDAY_INVITE](state, revenueList) {
  //   state.revenue.inviteRevenue = revenueList;
  //   state.revenue = Object.assign({}, state.revenue);
  // },
  // //  用户个人收益详情
  // [ACCOUNT_LASTDAY_REVENUE](state, revenueList) {
  //   state.revenue.accountRevenue = revenueList;
  //   state.revenue = Object.assign({}, state.revenue);
  // },
  //  用户推荐链接
  [GET_RECOMMEND_INFO](state, recommend) {
    state.recommend.recommendRefer = recommend;
    state.recommend = Object.assign({}, state.recommend);
  },
  //  用户推荐总人数
  [GET_RECOMMEND_COUNT](state, count) {
    state.recommend.count = count;
    state.recommend = Object.assign({}, state.recommend);
  },
  //  收益详情
  [GET_RENVUE_DETAIL](state, deviceDetail) {
    state.revenueDetail.currentPage = Number(deviceDetail.currentPage);
    state.revenueDetail.deviceLength = deviceDetail.deviceLength;
    state.revenueDetail.deviceNumSize = deviceDetail.pageSize;
    state.revenueDetail.detailList = deviceDetail.detailList || 'NO_CONTENT';
    state.revenueDetail.allDevices = deviceDetail.allDevices;
    state.revenueDetail = Object.assign({}, state.revenueDetail);
  },
  //  用户邀请收益详情
  [GET_INVITE_DETAIL](state, inviteDetail) {
    state.inviteDetail.currentPage = Number(inviteDetail.currentPage);
    state.inviteDetail.length = inviteDetail.length;
    state.inviteDetail.numSize = inviteDetail.numSize;
    state.inviteDetail.detailList = inviteDetail.detailList || 'NONE';
    state.inviteDetail = Object.assign({}, state.inviteDetail);
  },
  //  获取硬件列表
  [GET_HARDLIST](state, hardList) {
    state.hardWare.list = hardList.list || 'NO_CONTENT';
    state.hardWare.hardLength = hardList.deviceLength || 0;
    state.hardWare.deviceSize = Number(hardList.pageSize) || 0;
    state.hardWare.currentPage = Number(hardList.currentPage) || 0;
    // // 方便搜索
    state.hardWare.allDevices = hardList.allDevices || [];
    state.hardWare = Object.assign({}, state.hardWare);
  },
  //  获取硬件列表
  [GET_SEARCH_LIST](state, hardList) {
    state.hardWare.list = hardList || 'NO_CONTENT';
    state.hardWare.hardLength = 1;
    state.hardWare.deviceSize = 1;
    state.hardWare.currentPage = 1;
    state.hardWare = Object.assign({}, state.hardWare);
  },
  //  ETH地址绑定
  [GET_WALLET_ADDRESS](state, address) {
    state.wallet.address = address;
    state.wallet = Object.assign({}, state.wallet);
  },
  //  ETH状态获取
  [GET_WALLET_STATUS](state, eth_verify_status) {
    state.wallet.eth_verify_status = eth_verify_status;
    state.wallet = Object.assign({}, state.wallet);
  },
  //  提现
  [GET_WITHDRAWAL_LIST](state, list) {
    state.withdrawal.list = list;
    state.withdrawal = Object.assign({}, state.withdrawal);
  },
  [GET_BALANCE](state, balance) {
    state.withdrawal.balance = balance;
    state.withdrawal = Object.assign({}, state.withdrawal);
  },
  [GET_WITHDRAWAL_STAUTS](state, withStatus) {
    state.withdrawal.commitStatus = withStatus;
    state.withdrawal = Object.assign({}, state.withdrawal);
  },
}
