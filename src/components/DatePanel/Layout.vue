<template>
	<div class="date-panel-layout">
		<Header type='home-header' />
    <el-row class="tac data-panel-wrap">
      <el-col :span="4">
        <h5 class="panel-wrap">{{ $t('local_home_layout.dataPanel')}}</h5>
        <el-menu
          :default-openeds="defaultOption"
          class="bonus-menu"
          background-color="#0A0E22"
          active-text-color="#fff"
          text-color="#989AA2" 
					router="router">
          <!-- 数据面板 -->
          <el-menu-item index="0"  route="/" class="home-page-wrap"  v-bind:class="{ isActive: (thisPath === '/') }">
            <img  class="menu-icon home-icon" src="../../assets/menu/homeIcon.png" >
            <span slot="title">{{ $t('local_home_layout.menu.data_panel')}}</span>
          </el-menu-item>
          <!-- 收益总览 -->
          <el-submenu index="1" route="/revenue" class="revenue-wrap">
            <template slot="title">
              <div v-bind:class="{ revenuePad: true }">
                <img class="menu-icon home-icon total-revenue-icon" src="../../assets/menu/totalRevenue.png" >
                <span>{{ $t('local_home_layout.menu.all_revenue')}}</span>
              </div>
            </template>
            <el-menu-item-group :span="3">
              <el-menu-item route="/revenue" v-bind:class="{ isActive: (thisPath === '/revenue') }">{{ $t('local_home_layout.menu.all_revenue') }}</el-menu-item>
              <el-menu-item route="/devAllRevenue" v-bind:class="{ isActive: (thisPath === '/devAllRevenue') }">{{ $t('local_home_layout.menu.dev_all_revenue') }}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 网络任务 -->
          <el-submenu index="2" route="/revenue" class="revenue-wrap">
            <template slot="title">
              <div v-bind:class="{ revenuePad: true }">
                <img class="menu-icon home-icon" src="../../assets/menu/network.png" >
                <span>{{ $t('local_home_layout.menu.network_task')}}</span>
              </div>
            </template>
            <el-menu-item-group :span="3" >
              <el-menu-item index="1-1" route="/netStatus" v-bind:class="{ isActive: (thisPath === '/netStatus') }">{{ $t('local_home_layout.menu.task_status') }}</el-menu-item>
              <el-menu-item index="1-2" route="/netDetail"  v-bind:class="{ isActive: (thisPath === '/netDetail') }">{{ $t('local_home_layout.menu.revenue_details') }}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>  
          <!-- 计算任务 -->
           <el-submenu index="3" route="/calcuteDetail" class="revenue-wrap">
            <template slot="title">
              <div v-bind:class="{ revenuePad: true }">
                <img class="menu-icon home-icon" src="../../assets/menu/computeTask.png" >
                <span>{{ $t('local_home_layout.menu.computing_task')}}</span>
              </div>
            </template>
            <el-menu-item-group :span="3" >
              <el-menu-item index="3-1" route="/calcuteStatus" v-bind:class="{ isActive: (thisPath === '/calcuteStatus') }">{{ $t('local_home_layout.menu.task_status') }}</el-menu-item>
              <el-menu-item index="3-2" route="/calculateDetail" v-bind:class="{ isActive: (thisPath === '/calculateDetail') }">{{ $t('local_home_layout.menu.calculate_detail') }}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>  
          <!-- <el-menu-item index="4" route="/calcuteDetail">
            <img  class="menu-icon home-icon" src="../../assets/menu/computeTask.png">
            <span slot="title">{{ $t('local_home_layout.menu.computing_task') }}</span>
          </el-menu-item> -->
           <!-- 在线收益详情 -->
          <el-menu-item index="4" route="/revenueDetail" v-bind:class="{ isActive: (thisPath === '/revenueDetail') }">
            <img  class="menu-icon home-icon" src="../../assets/menu/online.png" >
            <span slot="title">{{ $t('local_home_layout.menu.revenue_detail') }}</span>
          </el-menu-item>     
          <!-- 邀请奖励详情 -->
          <el-menu-item index="5" route="/inviteDetail" v-bind:class="{ isActive: (thisPath === '/inviteDetail') }">
            <img  class="menu-icon home-icon" src="../../assets/menu/invite.png" >
            <span slot="title">{{ $t('local_home_layout.menu.invite_detail') }}</span>
          </el-menu-item>     
          <!-- 提现 -->
          <el-menu-item index="6" route="/withdrawal" v-bind:class="{ isActive: (thisPath === '/withdrawal') }">
            <img  class="menu-icon home-icon" src="../../assets/menu/withdrawal.png" >
            <span slot="title">{{ $t('local_home_layout.menu.withdrawal') }}</span>
          </el-menu-item>
          <el-menu-item index="7" disabled>
            <img  class="menu-icon home-icon" src="../../assets/menu/powerAnalysis.png">
            <span slot="title">{{ $t('local_home_layout.menu.power_analysis') }}</span>
          </el-menu-item>
          <el-menu-item index="8" disabled>
            <img  class="menu-icon home-icon" src="../../assets/menu/networkCbt.png" >
            <span slot="title">{{ $t('local_home_layout.menu.net_contribution') }}</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20" class="bonus-content">
        <div class="title">
          <!-- title img -->
          <img v-if="thisPath === '/'" class="title-img" src="../../assets/menu/homeIconBlack.png" />
          <img v-if="thisPath === '/revenue' || thisPath === '/devAllRevenue'" class="title-img" src="../../assets/menu/totalRevenueBlack.png" />
          <img v-if="thisPath === '/netStatus' || thisPath === '/netDetail'" class="title-img" src="../../assets/menu/networdBlack.png" />
          <img v-if="thisPath === '/revenueDetail'" class="title-img" src="../../assets/menu/onlineBlack.png" />
          <img v-if="thisPath === '/inviteDetail'" class="title-img" src="../../assets/menu/inviteBlack.png" />
          <img v-if="thisPath === '/withdrawal'" class="title-img" src="../../assets/menu/withdrawalBlack.png" />
          <img v-if="thisPath === '/calcuteStatus' || thisPath === '/calculateDetail'" class="title-img" src="../../assets/menu/couputeBlack.png" />
          {{ pageTitle }}
        </div>
				<slot></slot>
      </el-col>
    </el-row>
	</div>
</template>

<i18n>
{
  "en": {
    "local_home_layout": {
      "dataPanel": "Data Panel",
      "menu": {
        "data_panel": "Home Page",
        "all_revenue": "Revenue Overview",
        "dev_all_revenue": "Device Revenue Detatils",
        "revenue_detail": "Online Revenue Details",
        "invite_detail": "Invitation Bonus Details",
        "network_task": "Network Task",
        "task_status":"Task Status",
        "calculate_detail":"Revenue Details",
        "revenue_details": "Revenue Details",
        "computing_task": "Computing Task",
        "withdrawal": "Withdrawal",
        "power_analysis": "Power Analysis",
        "net_contribution": "Network Contribution"
      }
    }
  },
  "zn": {
    "local_home_layout": {
      "dataPanel": "数据面板",
      "menu": {
        "data_panel": "数据面板首页",
        "all_revenue": "收益总览",
        "dev_all_revenue": "设备收益详情",
        "revenue_detail": "在线收益详情",
        "invite_detail": "邀请奖励详情",
        "network_task": "网络任务",
        "task_status": "任务执行状态",
        "calculate_detail":"计算收益详情",        
        "revenue_details": "收益详情",
        "computing_task": "计算任务",
        "withdrawal": "提现",
        "power_analysis": "算力分析",
        "net_contribution": "全网贡献"
      }
    }
  }
}
</i18n>

<script>
import Header from "@/components/Header.vue";

export default {
  name: "DatePanelLayout",
  props: {
    type: "",
    isRevenue: '',
    pageTitle: '',
    titleSrc: ''
  },
  components: {
    Header
  },
  data() {
    return {
      activeIndex: "0",
      revenueActive: true,
      // defaultOption: ['2']
    };
  },
  computed: {
    thisPath() {
      return  this.$route.path;
    },
    defaultOption() {
      let thisPath = this.$route.path;
      if (thisPath === '/revenue'
      || thisPath === '/devAllRevenue') { 
        return ["1"];
      } else if (thisPath === '/netStatus'
        || thisPath === '/netDetail') {
        return ["2"];
      } else if (thisPath === '/calcuteStatus' 
        || thisPath === '/calculateDetail') {
        return ["3"];
      }

}
  },
};
</script>

<style lang="stylus">
.revenue-wrap .revenuePad {
  padding-left: 20px;
}

.revenue-wrap .el-submenu__title {
  padding-left: 0 !important;
}

.content-wrap {
  display: flex;
  justify-content: flex-start;
}

.menu-detail {
  width: 168px;
}

.panel-wrap {
  padding-left: 25px;
  text-align: left;
  height: 40px;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  line-height: 40px;
  opacity: 0.5;
  background: #0A0F22;
  line-height: 40px;
  color: #fff;
}

.home-panel {
  height: 45px;
  line-height: 45px;
  background: #032031;
  position: relative;
}

.home-panel-border {
  position: absolute;
  left: 0;
  top: 0;
  position: absolute;
  left: 0;
  top: 0;
  background-image: linear-gradient(-180deg, #15BCAD 2%, #10B2CB 100%);
  width: 4px;
  height: 100%;
}

.home-panel-text {
  padding: 0 20px;
  color: #fff;
  font-size: 12px;
  line-height: 45px;
  display: flex;
  vertical-align: middle;
}

.home-icon {
  display: inline-block;
  margin-top: 15px;
  width: 15px;
  height: 15px;
}

.menu-panel {
  width: 168px;
  background: #000519;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
}

.bonus-menu .el-menu-item {
  height: 45px;
  line-height: 45px;
  font-size: 15px;
  text-align: left;
}

.bonus-menu .el-submenu__title {
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  text-align: left;
}

.detail-wrap {
  width: 100%;
}

.title-img{
  width: 12px;
  height:12px;
  margin-right:5px;
}

.el-alert__title {
  font-size: 10px;
}

.home .el-menu {
  border-right: 0px;
}

.menu-icon {
  margin: -2px 8px 0 0;
  width: 12px;
  height: 12px;
}

.isActive, .el-menu-item.is-active {
  background-color: #032031;
  border-left: 3px solid #11B6BD;
  color: #fff !important;
}

.bonus-content {
  background: #F6F6F7;
  // height: 100%;
  padding: 0 35px 35px;
}

.bonus-content {
  font-family: PingFangSC-Medium;
}

.bonus-content .title {
  font-family: PingFangSC-Regular;
  font-size: 18px;
  color: #65686A;
  line-height: 45px;
  text-align: left;
  font-weight: bold;
}

.annouce {
  background: #FFFFFF;
  border: 1px solid #E3E3E7;
  position: relative;
}

.annouce .more {
  font-size: 14px;
  color: #999B98;
  text-align: right;
  line-height: 40px;
  position: absolute;
  right: 30px;
  top: 0;
}

.annouce .title {
  padding: 0 30px;
  font-size: 14px;
  color: #343739;
  line-height: 40px;
  border-bottom: 1px solid #E7EAEC;
}

.bonus-menu .el-submenu .el-menu-item {
  min-width: 20px;
}

.annouce-content {
  margin: 0 23px;
}

</style>
