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
    // const res = await ajaxHardList(params);
    // const res = {"code":200,"ret":{"allDevices":[{"label":"全部","value":"all"},{"label":"fc:7c:02:8b:38:06","value":"f05d5955-788b-4aec-9d0e-fb7bf89b1ccb"},{"label":"fc:7c:02:27:8c:1f","value":"f951693d-6a2f-4bbf-8c63-659610272d4b"},{"label":"fc:7c:02:87:cf:a5","value":"ff03e4e5-c430-4a58-b009-a2d79ae41f34"}],"list":[{"tx_bw":"68.25","id":"02868269-597b-4a40-aa3f-0850a695bf21","mac_address":"fc:7c:02:4c:7a:52","bcode":"1120-65440283-6046-4a45-a36d-cccfdc33469b","bind_at":"2018-12-01 12:03:10","cpu_count":4,"mem_size":"1.80G","storage_size":"6.34G","schedule":true,"info":"v0.4.2","calNeeds":"高","nat":6,"ext_ip":"115.201.66.188","status":"online","location":"浙江","needs":"低","stable":"高","note":"12","noteStatus":true},{"tx_bw":"90.19","id":"048baee2-fd77-49f1-9e0d-e4d2a1bf5b46","mac_address":"fc:7c:02:8d:28:d4","bcode":"0216-be97fb40-c390-4442-9f28-655cf0f6b530","bind_at":"2019-02-18 10:28:43","cpu_count":4,"mem_size":"1.80G","storage_size":"6.34G","schedule":true,"info":"v0.4.2","calNeeds":"高","nat":6,"ext_ip":"115.201.67.201","status":"online","location":"浙江","needs":"低","stable":"高"},{"tx_bw":"0.00","id":"0e2a9742-1709-4f16-9b3e-8138189eb6cf","mac_address":"fc:7c:02:88:7c:3a","bcode":"1121-c6586c7f-5805-4f33-8b1a-088924aa0bc2","bind_at":"2018-12-01 02:23:25","cpu_count":0,"mem_size":"","storage_size":"","schedule":false,"info":"","calNeeds":"高","nat":0,"ext_ip":"60.188.190.108","status":"online","location":"浙江","needs":"低","stable":"低","note":"03","noteStatus":true},{"tx_bw":"88.80","id":"10580f6f-529c-417c-845a-3e64599a6956","mac_address":"fc:7c:02:87:ef:49","bcode":"1121-eacc993f-4051-48bd-bee9-902b78975f19","bind_at":"2018-12-01 12:31:58","cpu_count":4,"mem_size":"1.80G","storage_size":"6.34G","schedule":true,"info":"v0.4.2","calNeeds":"高","nat":6,"ext_ip":"60.188.187.180","status":"online","location":"浙江","needs":"低","stable":"高","note":"17","noteStatus":true},{"tx_bw":"85.87","id":"13333c87-be0e-46b1-bafe-e9e53b8e016e","mac_address":"fc:7c:02:8d:51:84","bcode":"0228-2eb2bf29-d7f8-41f9-a01b-c9f2b4adf754","bind_at":"2019-03-11 10:18:04","cpu_count":4,"mem_size":"1.80G","storage_size":"238.34G","schedule":true,"info":"v0.4.2","calNeeds":"高","nat":6,"ext_ip":"125.104.203.226","status":"online","location":"浙江","needs":"低","stable":"高"},{"tx_bw":"0.00","id":"1a535eae-b3da-42cf-8095-378fededd6c1","mac_address":"fc:7c:02:87:ec:37","bcode":"1121-5ed9e742-e553-425a-bb10-094563245948","bind_at":"2018-12-01 02:17:05","cpu_count":0,"mem_size":"","storage_size":"","schedule":false,"info":"","calNeeds":"高","nat":0,"ext_ip":"60.188.180.165","status":"online","location":"浙江","needs":"低","stable":"高","note":"09","noteStatus":true},{"tx_bw":"0.00","id":"1adf9156-8a40-4412-97b2-af850bcb499d","mac_address":"fc:7c:02:4c:c7:5c","bcode":"1118-746a0d0a-4184-4d0c-b0dd-c02892873038","bind_at":"2018-12-01 11:59:53","cpu_count":0,"mem_size":"","storage_size":"","schedule":false,"info":"","calNeeds":"高","nat":0,"ext_ip":"60.188.173.164","status":"online","location":"浙江","needs":"低","stable":"高","note":"02","noteStatus":true},{"tx_bw":"58.74","id":"1c56457b-bea5-410e-bc90-09bc8f475e5c","mac_address":"fc:7c:02:4c:3d:71","bcode":"1121-f94aec06-1ec9-4230-bf59-98d4bb262508","bind_at":"2018-12-01 12:34:57","cpu_count":4,"mem_size":"1.80G","storage_size":"6.34G","schedule":true,"info":"v0.4.2","calNeeds":"高","nat":6,"ext_ip":"60.188.161.220","status":"online","location":"浙江","needs":"低","stable":"高","note":"20","noteStatus":true},{"tx_bw":"24.09","id":"25a0fd49-c34e-4778-afd4-c9927d267582","mac_address":"fc:7c:02:4c:da:ee","bcode":"0102-bc12ee57-a827-48c8-b1a4-b0914dd37999","bind_at":"2019-01-22 09:36:35","cpu_count":4,"mem_size":"1.80G","storage_size":"238.34G","schedule":true,"info":"v0.4.2","calNeeds":"高","nat":6,"ext_ip":"115.202.25.102","status":"online","location":"浙江","needs":"低","stable":"高"},{"tx_bw":"25.35","id":"293ab816-f95b-456e-8f20-ca0717849612","mac_address":"fc:7c:02:8b:fb:63","bcode":"0208-4737e0e9-c4ca-4d5c-818d-4ecfec715b44","bind_at":"2019-02-18 12:22:27","cpu_count":4,"mem_size":"1.80G","storage_size":"6.34G","schedule":true,"info":"v0.4.2","calNeeds":"高","nat":6,"ext_ip":"115.202.18.228","status":"online","location":"浙江","needs":"低","stable":"高"},{"tx_bw":"0.00","id":"2c44ed25-232c-4a1a-88c0-5b6514d37d82","mac_address":"fc:7c:02:8d:b2:41","bcode":"0218-e7ca11ea-c7a0-4a61-875f-0a89241466c9","bind_at":"2019-02-18 10:47:29","cpu_count":4,"mem_size":"1.80G","storage_size":"6.34G","schedule":false,"info":"v0.4.2","calNeeds":"高","nat":0,"ext_ip":"115.201.66.205","status":"online","location":"浙江","needs":"低","stable":"高"},{"tx_bw":"89.10","id":"2d4d1ed8-ca52-4d1f-8bf6-58b67578a64f","mac_address":"fc:7c:02:88:a6:85","bcode":"0223-401589b7-5ed1-43ba-9dec-f6d416fac2bd","bind_at":"2019-03-11 11:29:04","cpu_count":4,"mem_size":"1.80G","storage_size":"6.34G","schedule":true,"info":"v0.4.2","calNeeds":"高","nat":6,"ext_ip":"115.202.24.155","status":"online","location":"浙江","needs":"低","stable":"高"},{"tx_bw":"0.00","id":"2ff32228-3046-4ce8-9899-72a7c7d07d89","mac_address":"fc:7c:02:27:ee:2c","bcode":"1017-74236be0-d0b6-472f-bbbe-cad4036eca09","bind_at":"2018-10-19 03:18:34","cpu_count":0,"mem_size":"","storage_size":"","schedule":false,"info":"v0.4.2","calNeeds":"高","nat":0,"ext_ip":"115.202.194.14","status":"online","location":"浙江","needs":"低","stable":"低","note":"01","noteStatus":true},{"tx_bw":"86.15","id":"3826c1bc-06b2-46a1-bd3f-560aec39caf3","mac_address":"fc:7c:02:8d:51:b4","bcode":"0220-64f38300-c669-4205-8a58-2601c35dbdd7","bind_at":"2019-03-11 02:08:27","cpu_count":4,"mem_size":"1.80G","storage_size":"155.34G","schedule":true,"info":"v0.4.2","calNeeds":"高","nat":6,"ext_ip":"115.202.1.33","status":"online","location":"浙江","needs":"低","stable":"高"},{"tx_bw":"37.51","id":"38f18976-e95c-47fd-8422-630f47bef732","mac_address":"fc:7c:02:8d:25:0e","bcode":"0210-3dcabff3-05c8-4121-8226-01968e151822","bind_at":"2019-02-18 11:18:29","cpu_count":4,"mem_size":"1.80G","storage_size":"6.34G","schedule":true,"info":"v0.4.2","calNeeds":"高","nat":6,"ext_ip":"115.202.10.100","status":"online","location":"浙江","needs":"低","stable":"低"},{"tx_bw":"0.00","id":"39677e82-52f9-4136-8d80-da5331ced1ef","mac_address":"fc:7c:02:87:ef:58","bcode":"1121-bee16fd5-0af6-47af-a370-f834ba473d35","bind_at":"2018-12-01 02:07:01","cpu_count":0,"mem_size":"","storage_size":"","schedule":false,"info":"","calNeeds":"高","nat":0,"ext_ip":"115.202.3.174","status":"online","location":"浙江","needs":"低","stable":"低","note":"07","noteStatus":true},{"tx_bw":"0.00","id":"3ebd94b1-b6f8-4814-a4cc-a98a4ea0c9b5","mac_address":"fc:7c:02:8b:34:16","bcode":"1121-e2e83f8e-3c45-4985-935b-52873f758beb","bind_at":"2018-12-01 02:15:27","cpu_count":0,"mem_size":"","storage_size":"","schedule":false,"info":"","calNeeds":"高","nat":0,"ext_ip":"115.202.10.204","status":"online","location":"浙江","needs":"低","stable":"中","note":"04","noteStatus":true},{"tx_bw":"73.04","id":"4000384b-be79-4975-a768-b0d2b03e73ef","mac_address":"fc:7c:02:4e:0f:43","bcode":"0224-9c77dae9-f9ea-474f-a908-e5659469809a","bind_at":"2019-03-17 08:11:09","cpu_count":4,"mem_size":"1.80G","storage_size":"471.34G","schedule":true,"info":"v0.4.2","calNeeds":"高","nat":6,"ext_ip":"115.202.19.85","status":"online","location":"浙江","needs":"低","stable":"高"},{"tx_bw":"0.00","id":"43ca7aea-0681-4ba6-a4ab-001b72a675b6","mac_address":"fc:7c:02:88:86:18","bcode":"1121-3adb43a8-3c73-4174-8d4a-3140e9df7568","bind_at":"2018-12-01 02:04:54","cpu_count":0,"mem_size":"","storage_size":"","schedule":false,"info":"","calNeeds":"高","nat":0,"ext_ip":"115.202.1.172","status":"online","location":"浙江","needs":"低","stable":"高","note":"05","noteStatus":true},{"tx_bw":"41.30","id":"440172c0-4536-4ca3-83d1-9ca9a1f87061","mac_address":"fc:7c:02:8d:33:8a","bcode":"0208-c19512d8-9710-476a-a4d0-ce24c5132c6c","bind_at":"2019-02-18 12:24:50","cpu_count":4,"mem_size":"1.80G","storage_size":"238.34G","schedule":true,"info":"v0.4.2","calNeeds":"高","nat":6,"ext_ip":"115.202.28.98","status":"online","location":"浙江","needs":"低","stable":"高"}],"deviceLength":76,"pageSize":20,"currentPage":"1"},"message":"get device list successfully"};y
    const res = { 'code': 200, 'ret': { 'allDevices': [{ 'label': '全部', 'value': 'all' }], 'list': [{ 'tx_bw': '68.25', 'id': '02868269-597b-4a40-aa3f-0850a695bf21', 'mac_address': 'fc:7c:02:4c:7a:52', 'bcode': '1120-65440283-6046-4a45-a36d-cccfdc33469b', 'bind_at': '2018-12-01 12:03:10', 'cpu_count': 4, 'mem_size': '1.80G', 'storage_size': '6.34G', 'schedule': true, 'info': 'v0.4.2', 'calNeeds': '高', 'nat': 6, 'ext_ip': '115.201.66.188', 'status': 'online', 'location': '浙江', 'needs': '低', 'stable': '高', 'note': '12', 'noteStatus': true },], 'deviceLength': 76, 'pageSize': 20, 'currentPage': '1' }, 'message': 'get device list successfully' };
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
    // const res = await ajaxDeviceWatchDetail(params);
    const res = {
      data: {

        "devs_info_log": {


          "24dacfd9-3447-436a-b6c5-a74f0566d2d4": [

            { "id":"0002ae58-6d4e-48f5-bd2e-3b627cb18660",

              "device_id":"24dacfd9-3447-436a-b6c5-a74f0566d2d4",

              "owner":"dd2a2667-f894-4da4-9f07-f18b2af61f5a",

              "stable":100,

              "tx_bandwidth":15,

              "ext_storage_size":0,

              "rx_bandwidth":51831111,

              "date_at":1552561214505,

            },

            { "id":"17b4f464-1855-416c-913d-6939c40993b1",

              "device_id":"24dacfd9-3447-436a-b6c5-a74f0566d2d4",

              "owner":"dd2a2667-f894-4da4-9f07-f18b2af61f5a",

              "stable":100, "tx_bandwidth":15, "ext_storage_size":0,

              "tx_bandwidth":44291850, "date_at":1552474779894
          
          }

          ]

        }
      }
    };
    return res.data.devs_info_log || {}; 
  },
};
