import fetch from '../utils/fetch';
// import fetch from '../utils/fetch'
import { baseUrl } from '../utils/env';

/**
 * 获取首页默认地址
 */
export const loginIn = (data) => {
  return fetch(baseUrl + '/api/user/login/', data, 'POST');
};
/**
 * 获取图片验证码
 */
export const ajaxImageCode = () => {
  return fetch(baseUrl + '/api/web/captcha/get/');
};
export const ajaxEmailCode_v3 = (data) => {
  return fetch(baseUrl + '/api/web/email/verification_v3/', data, 'POST');
};
/**
 * 注册
 */
export const signUp = (data) => {
  return fetch(baseUrl + '/api/user/register/', data, 'POST');
};
/**
 * 注册
 */
export const forgetPassword = (data) => {
  return fetch(baseUrl + '/api/user/update/password_reset/', data, 'POST');
};
/**
 * 注册
 */
export const ajaxLogout = (data) => {
  return fetch(baseUrl + '/api/user/logout/', {}, 'POST');
};
/**
 * 是否可领取邀请码
 */
export const ajaxInviteCodeStatus = (data) => {
  return fetch(baseUrl + '/api/bcode/get_status/', data);
};
/**
 * 领取邀请码	
 */
export const ajaxGetInviteCode = (data) => {
  return fetch(baseUrl + '/api/bcode/get/', data, 'POST');
};
/**
 * 当前用户可用邀请码
 */
export const ajaxGetAbleList = (data) => {
  return fetch(baseUrl + '/api/bcode/avaliable_list/');
};
/**
 * 【绑定服务用】获取邀请码领取人
 */
export const ajaxGetOwner = (data) => {
  return fetch(baseUrl + '/api/bcode/get_owner/', data);
};
/**
 * 【绑定服务用】使用邀请码
 */
export const ajaxUseCode = (data) => {
  return fetch(baseUrl + '/api/bcode/used/', data);
};
/**
 * 获取用户信息
 */
export const ajaxGetUserInfo = (data) => {
  return fetch(baseUrl + '/api/user/get_user_info/', data);
};
/**
 * 修改密码
 */
export const ajaxChangePw = (data) => {
  return fetch(baseUrl + '/api/user/update/password/', data, 'POST');
};
/**
 * 解绑
 */
export const ajaxUnbindHard = (data) => {
  return fetch(baseUrl + '/api/web/devices/unbind/', data, 'POST');
};
/**
 * 某个硬件列表
 */
export const ajaxDeviceDetail = (data) => {
  return fetch(baseUrl + '/api/web/devices/getDetails', data);
};
/**
 * 硬件列表
 */
export const ajaxHardList = (data) => {
  return fetch(baseUrl + '/api/web/devices/list_v2/', data);
};
/**
 * 添加备注
 */
export const ajaxDeviceNotes = (data) => {
  return fetch(baseUrl + '/api/web/devices/saveNote/', data);
};
/**
 * 用户收益详情	
 */
export const ajaxRevenueList = (data) => {
  return fetch(baseUrl + '/api/web/revenue/list/	', data);
};
/**
 * 用户设备收益
 */
export const ajaxRevenueDetail = (data) => {
  return fetch(baseUrl + '/api/web/revenueDetail/', data);
};
/**
 * 用户邀请收益
 */
export const ajaxInviteDetail = (data) => {
  return fetch(baseUrl + '/api/web/inviteDetail/', data);
};
/**
 * 用户总收益
 */
export const ajaxAllRevenue = (data) => {
  return fetch(baseUrl + '/api/web/revenue_v3/', data);
};
/**
 * 用户推荐链接
 */
export const ajaxRecommendInfo = (data) => {
  return fetch(baseUrl + '/api/user/get_recommend_info/');
};
/**
 * 获取用户推荐数
 */
export const ajaxRecommendCount = (data) => {
  return fetch(baseUrl + '/api/user/get_recommend_count/');
};
/**
 * 获取钱包绑定地址
 */
export const ajaxWalletAddress = () => {
  return fetch(baseUrl + '/api/eth/getAddress/');
};
/**
 * 绑定钱包地址
 */
export const ajaxBindAddress = (data) => {
  return fetch(baseUrl + '/api/eth/bindAddress/', data, 'POST');
};
/**
 * 解绑钱包地址
 */
export const ajaxUnbindAddress = () => {
  return fetch(baseUrl + '/api/eth/unbindAddress/', {}, 'POST');
};
/**
 * 获取验证码js地址
 */
export const ajaxVertifUrl = (data) => {
  return fetch(baseUrl + '/api/web/captcha/get_v2/', data, 'POST');
};
/**
 * 提现
 */
export const ajaxCommitWithdrawal = (data) => {
  return fetch(baseUrl + '/api/withdrawal/commitWithdrawal/', data, 'POST');
};
/**
 * 查余额
 */
export const ajaxWithdrawalBalance = () => {
  return fetch(baseUrl + '/api/withdrawal/getBalance/');
};
/**
 * 查提现记录
 */
export const ajaxWithdrawalList = (data) => {
  return fetch(baseUrl + '/api/withdrawal/getDetails/');
};
