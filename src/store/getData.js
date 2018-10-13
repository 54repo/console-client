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
/**
 * 发送邮箱验证码
 */
export const ajaxEmailCode = (data) => {
	return fetch(baseUrl + '/api/web/email/verification/', data, 'POST');
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
	return fetch(baseUrl + '/api/bcode/get_status/');
};
/**
 * 领取邀请码	
 */
export const ajaxGetInviteCode = (data) => {
	return fetch(baseUrl + '/api/bcode/get/', {}, 'POST');
};
/**
 * 当前用户可用邀请码
 */
export const ajaxGetAbleList= (data) => {
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
 * 硬件列表
 */
export const ajaxUnbindHard = (data) => {
	return fetch(baseUrl + '/api/web/devices/unbind/', data, 'POST');
};
/**
 * 解绑
 */
export const ajaxHardList = (data) => {
	return fetch(baseUrl + '/api/web/devices/list/');
};
/**
 * 用户收益详情	
 */
export const  ajaxRevenueList = (data) => {
	return fetch(baseUrl + '/api/web/revenue/list/	', data);
};
/**
 * 用户总收益
 */
export const ajaxAllRevenue = (data) => {
	return fetch(baseUrl + '/api/web/revenue/', data);
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