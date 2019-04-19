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
  // return {"code":200,"ret":{"detailList":[{"note":"12","revenue":49.755226,"noteStatus":true,"id":"02868269-597b-4a40-aa3f-0850a695bf21","mac_address":"fc:7c:02:4c:7a:52"},{"revenue":49.755226,"id":"048baee2-fd77-49f1-9e0d-e4d2a1bf5b46","mac_address":"fc:7c:02:8d:28:d4"},{"note":"03","revenue":49.683934,"noteStatus":true,"id":"0e2a9742-1709-4f16-9b3e-8138189eb6cf","mac_address":"fc:7c:02:88:7c:3a"},{"note":"17","revenue":49.719679,"noteStatus":true,"id":"10580f6f-529c-417c-845a-3e64599a6956","mac_address":"fc:7c:02:87:ef:49"},{"revenue":49.719679,"id":"13333c87-be0e-46b1-bafe-e9e53b8e016e","mac_address":"fc:7c:02:8d:51:84"},{"note":"09","revenue":49.687203,"noteStatus":true,"id":"1a535eae-b3da-42cf-8095-378fededd6c1","mac_address":"fc:7c:02:87:ec:37"},{"note":"02","revenue":49.719679,"noteStatus":true,"id":"1adf9156-8a40-4412-97b2-af850bcb499d","mac_address":"fc:7c:02:4c:c7:5c"},{"note":"20","revenue":0,"noteStatus":true,"id":"1c56457b-bea5-410e-bc90-09bc8f475e5c","mac_address":"fc:7c:02:4c:3d:71"},{"revenue":49.619821,"id":"25a0fd49-c34e-4778-afd4-c9927d267582","mac_address":"fc:7c:02:4c:da:ee"},{"revenue":49.678672,"id":"293ab816-f95b-456e-8f20-ca0717849612","mac_address":"fc:7c:02:8b:fb:63"},{"revenue":48.776571,"id":"2c44ed25-232c-4a1a-88c0-5b6514d37d82","mac_address":"fc:7c:02:8d:b2:41"},{"revenue":49.821361,"id":"2d4d1ed8-ca52-4d1f-8bf6-58b67578a64f","mac_address":"fc:7c:02:88:a6:85"},{"note":"01","revenue":47.411194,"noteStatus":true,"id":"2ff32228-3046-4ce8-9899-72a7c7d07d89","mac_address":"fc:7c:02:27:ee:2c"},{"revenue":49.783366,"id":"3826c1bc-06b2-46a1-bd3f-560aec39caf3","mac_address":"fc:7c:02:8d:51:b4"},{"revenue":44.823147,"id":"38f18976-e95c-47fd-8422-630f47bef732","mac_address":"fc:7c:02:8d:25:0e"},{"note":"07","revenue":49.788624,"noteStatus":true,"id":"39677e82-52f9-4136-8d80-da5331ced1ef","mac_address":"fc:7c:02:87:ef:58"},{"note":"04","revenue":49.821361,"noteStatus":true,"id":"3ebd94b1-b6f8-4814-a4cc-a98a4ea0c9b5","mac_address":"fc:7c:02:8b:34:16"},{"revenue":49.821361,"id":"4000384b-be79-4975-a768-b0d2b03e73ef","mac_address":"fc:7c:02:4e:0f:43"},{"note":"05","revenue":31.070839,"noteStatus":true,"id":"43ca7aea-0681-4ba6-a4ab-001b72a675b6","mac_address":"fc:7c:02:88:86:18"},{"revenue":49.712022,"id":"440172c0-4536-4ca3-83d1-9ca9a1f87061","mac_address":"fc:7c:02:8d:33:8a"}],"deviceLength":76,"pageSize":20,"currentPage":"1","allDevices":[{"label":"全部","value":"all"},{"label":"fc:7c:02:4c:7a:52","value":"02868269-597b-4a40-aa3f-0850a695bf21"},{"label":"fc:7c:02:8d:28:d4","value":"048baee2-fd77-49f1-9e0d-e4d2a1bf5b46"},{"label":"fc:7c:02:88:7c:3a","value":"0e2a9742-1709-4f16-9b3e-8138189eb6cf"},{"label":"fc:7c:02:87:ef:49","value":"10580f6f-529c-417c-845a-3e64599a6956"},{"label":"fc:7c:02:8d:51:84","value":"13333c87-be0e-46b1-bafe-e9e53b8e016e"},{"label":"fc:7c:02:87:ec:37","value":"1a535eae-b3da-42cf-8095-378fededd6c1"},{"label":"fc:7c:02:4c:c7:5c","value":"1adf9156-8a40-4412-97b2-af850bcb499d"},{"label":"fc:7c:02:4c:3d:71","value":"1c56457b-bea5-410e-bc90-09bc8f475e5c"},{"label":"fc:7c:02:4c:da:ee","value":"25a0fd49-c34e-4778-afd4-c9927d267582"},{"label":"fc:7c:02:8b:fb:63","value":"293ab816-f95b-456e-8f20-ca0717849612"},{"label":"fc:7c:02:8d:b2:41","value":"2c44ed25-232c-4a1a-88c0-5b6514d37d82"},{"label":"fc:7c:02:88:a6:85","value":"2d4d1ed8-ca52-4d1f-8bf6-58b67578a64f"},{"label":"fc:7c:02:27:ee:2c","value":"2ff32228-3046-4ce8-9899-72a7c7d07d89"},{"label":"fc:7c:02:8d:51:b4","value":"3826c1bc-06b2-46a1-bd3f-560aec39caf3"},{"label":"fc:7c:02:8d:25:0e","value":"38f18976-e95c-47fd-8422-630f47bef732"},{"label":"fc:7c:02:87:ef:58","value":"39677e82-52f9-4136-8d80-da5331ced1ef"},{"label":"fc:7c:02:8b:34:16","value":"3ebd94b1-b6f8-4814-a4cc-a98a4ea0c9b5"},{"label":"fc:7c:02:4e:0f:43","value":"4000384b-be79-4975-a768-b0d2b03e73ef"},{"label":"fc:7c:02:88:86:18","value":"43ca7aea-0681-4ba6-a4ab-001b72a675b6"},{"label":"fc:7c:02:8d:33:8a","value":"440172c0-4536-4ca3-83d1-9ca9a1f87061"},{"label":"fc:7c:02:8a:9a:bf","value":"46a2573e-7abd-46bc-a51b-a7f08f511a6d"},{"label":"fc:7c:02:89:c2:b6","value":"46f9f7f6-703b-4fde-9fc2-080038b8bf5c"},{"label":"fc:7c:02:8b:fb:84","value":"4876b1b1-be54-4184-b647-2c38c843f7d8"},{"label":"fc:7c:02:87:76:f2","value":"4c7215a0-c4f7-450d-82e5-0ce43fda087a"},{"label":"fc:7c:02:8a:ce:61","value":"4fe02af6-d4ea-4e12-971b-619bd80fabc6"},{"label":"fc:7c:02:88:f8:8d","value":"54b0c55d-d93a-4e3e-b891-0d8ab8838f53"},{"label":"fc:7c:02:d0:a7:b7","value":"5516db79-2128-4db4-8478-a7af72a4e267"},{"label":"fc:7c:02:27:8e:bc","value":"5be5c37e-f670-4dbb-8402-ee373c2f3ab7"},{"label":"fc:7c:02:88:a1:51","value":"5dd7bbbe-c3c7-4402-acb8-f729d211355b"},{"label":"fc:7c:02:87:a6:dd","value":"5f35a1cf-87e0-4bdf-8a1c-c6c9d5b1850c"},{"label":"fc:7c:02:88:85:f7","value":"5ffb5666-e3a4-4f84-969b-68c8b48e415e"},{"label":"fc:7c:02:4c:79:6b","value":"6496c8b1-d1a7-4987-a83b-b6e3efcf6f97"},{"label":"fc:7c:02:8a:d8:c3","value":"652b3d1e-3e97-44a0-99af-17f16e99b5e7"},{"label":"fc:7c:02:87:f0:ed","value":"65a71e04-6da9-4895-b84c-efe73ed533df"},{"label":"fc:7c:02:87:cc:69","value":"6816bae9-0601-4dd6-8f35-47fd7508ae07"},{"label":"fc:7c:02:4d:fa:c1","value":"6f5d5b0c-650b-423f-a5aa-4988734daf10"},{"label":"fc:7c:02:8d:52:41","value":"71d94f84-e471-4fa6-a074-7f7a113ce1af"},{"label":"fc:7c:02:88:a2:f5","value":"76390549-af72-4a4e-8755-85d18d174861"},{"label":"fc:7c:02:10:b9:71","value":"76f58227-ac0e-48f8-bfe7-ca7d40ffff5f"},{"label":"fc:7c:02:8b:fb:bd","value":"7afb333c-f8a8-4800-b78f-133e40a42a52"},{"label":"fc:7c:02:8d:b2:05","value":"7fae5bc7-c75a-45b1-95c5-d41f7d726fec"},{"label":"fc:7c:02:8d:1e:54","value":"7fb78383-6f6c-4657-a169-1d9d18f4d472"},{"label":"fc:7c:02:8a:5e:0b","value":"866649a6-5ffd-46fe-b3f2-6edc870e48d3"},{"label":"fc:7c:02:8b:fb:54","value":"86d4f48a-3ca1-479c-b089-8b2823323c05"},{"label":"fc:7c:02:8d:23:34","value":"87b20262-208b-4167-b775-692aac8b1d50"},{"label":"fc:7c:02:8d:51:c3","value":"88e61382-a961-49f5-8aba-78c68bf6547d"},{"label":"fc:7c:02:4e:70:12","value":"8b093497-c9ca-42b6-b6cc-fe0b12b3e644"},{"label":"fc:7c:02:8a:d8:db","value":"8c837ce7-4a41-4914-8396-17fde51155b5"},{"label":"fc:7c:02:88:91:4c","value":"93dc16b9-b172-4f53-afee-f6d1ef210778"},{"label":"fc:7c:02:8a:5d:42","value":"96697703-db72-43c1-aa03-8bfeea412fe4"},{"label":"fc:7c:02:8b:2f:9f","value":"971057ea-70ce-4d05-8746-a7b98afe7170"},{"label":"fc:7c:02:8a:9d:4d","value":"981f5535-b28e-405a-a6ee-61eccb7dcc49"},{"label":"fc:7c:02:4c:79:da","value":"990407e5-20d1-432f-9e8f-eced91401b54"},{"label":"fc:7c:02:87:df:2f","value":"99d9c072-2753-4721-9029-ed03aaa754a5"},{"label":"fc:7c:02:8d:25:f5","value":"9b745f4c-9046-4829-8e19-11e241e6375f"},{"label":"fc:7c:02:87:f2:0a","value":"9e4ef499-e4d6-4bd8-a2a9-28bad6ddedf3"},{"label":"fc:7c:02:88:a4:a2","value":"a0d74fda-efa1-4d91-baac-dc90600f7f32"},{"label":"fc:7c:02:87:a2:a2","value":"ae6bed5e-31a1-45fd-8e52-2a86589c693c"},{"label":"fc:7c:02:b2:45:1f","value":"b6b5e1f8-5bff-4886-a32d-05bab109e545"},{"label":"fc:7c:02:4f:7b:a0","value":"bd8f01aa-3a64-4ef9-bd93-64c07e781d95"},{"label":"fc:7c:02:8d:23:7f","value":"c6ddbf00-add5-41ba-9b50-978f8b072922"},{"label":"fc:7c:02:8d:21:90","value":"cbfc7f3d-607a-4a2d-8859-bb1035d9c9ad"},{"label":"fc:7c:02:88:ed:23","value":"d0c96106-c8b8-4dbb-a98b-933fe03752e5"},{"label":"fc:7c:02:87:64:1d","value":"d273e172-8b7b-4e23-a34c-73eef458984f"},{"label":"fc:7c:02:8a:80:85","value":"d837ea3d-816e-4241-9e38-1246de33984a"},{"label":"fc:7c:02:8d:21:69","value":"d91c70a0-8edd-426b-8b8d-017d66e7b1c0"},{"label":"fc:7c:02:2c:36:05","value":"e5e33b32-f052-43af-9af1-f87cda50a19a"},{"label":"fc:7c:02:8d:5e:68","value":"e9a4c5dd-bc69-4caa-91e3-5a9122880b67"},{"label":"fc:7c:02:8b:30:98","value":"efdfcf55-2537-422c-b0aa-72762ca88b2c"},{"label":"fc:7c:02:87:ee:44","value":"f01b9191-3c36-4ee5-8ef9-708082cc97c7"},{"label":"fc:7c:02:8b:38:06","value":"f05d5955-788b-4aec-9d0e-fb7bf89b1ccb"},{"label":"fc:7c:02:8d:51:a5","value":"f1ac90e1-433d-480a-b8d3-917512008c7f"},{"label":"fc:7c:02:8a:3f:21","value":"f450726d-de48-4dfe-8291-13bf2f58fce1"},{"label":"fc:7c:02:d0:d2:47","value":"f85e1446-830d-4874-b001-aead62370bd9"},{"label":"fc:7c:02:27:8c:1f","value":"f951693d-6a2f-4bbf-8c63-659610272d4b"},{"label":"fc:7c:02:87:cf:a5","value":"ff03e4e5-c430-4a58-b009-a2d79ae41f34"}],"totalBxc":{"bxc":3480.030752,"task_bxc":3480.030752,"online_bxc":0}}};
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
/**
 * 查询设备监控信息
 */
export const ajaxDeviceWatchDetail = (data) => {
  return fetch(baseUrl + '/api/device/ajaxDeviceWatchDetail/', data);
};
