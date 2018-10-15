<template>
	<div class="date-panel-layout" v-bind:class="{ revenueAllLayout: !isRevenue }" >
		<Header type='home-header' />
    <el-row class="tac data-panel-wrap">
      <el-col :span="4">
        <h5 class="panel-wrap">{{ $t('local_home_layout.dataPanel')}}</h5>
        <el-menu
          class="bonus-menu"
          background-color="#0A0E22"
          active-text-color="#fff"
          text-color="#989AA2" 
					router="router">
          <el-menu-item index="0"  route="/" class="home-page-wrap"  v-bind:class="{ isActive: (thisPath === '/') }">
            <img  class="menu-icon home-icon" src="../../assets/homeIcon.png" >
            <span slot="title">{{ $t('local_home_layout.menu.0_value')}}</span>
          </el-menu-item>
          <el-submenu index="1" route="/revenue" class="revenue-wrap">
            <template slot="title">
              <div v-bind:class="{ revenuePad: true }">
                <img class="menu-icon home-icon" src="../../assets/revenue.png" >
                <span>{{ $t('local_home_layout.menu.1_value')}}</span>
              </div>
            </template>
            <el-menu-item-group :span="3" >
              <el-menu-item index="1-1" route="/revenue" v-bind:class="{ isActive: (thisPath === '/revenue') }">{{ $t('local_home_layout.menu.1_1_value') }}</el-menu-item>
              <el-menu-item index="1-2" disabled>{{ $t('local_home_layout.menu.1_2_value') }}</el-menu-item>
              <el-menu-item index="1-3" disabled>{{ $t('local_home_layout.menu.1_3_value') }}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- <el-submenu index="2" disabled>
             <template slot="title">
              <img  class="menu-icon home-icon" src="../../assets/revenue.png" >
              <span slot="title" disabled>{{ $t('local_home_layout.menu.2_value') }}</span>
            </template>
             <el-menu-item-group :span="3" disabled>
              <el-menu-item index="2-1" disabled>Revenue</el-menu-item>
              <el-menu-item index="2-2" disabled>Get Task</el-menu-item>
              <el-menu-item index="2-3" disabled>Implementation</el-menu-item>
            </el-menu-item-group>
          </el-submenu> -->
          <el-menu-item index="2" disabled>
            <img  class="menu-icon home-icon" src="../../assets/revenue.png" >
            <span slot="title">{{ $t('local_home_layout.menu.2_value') }}</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <img  class="menu-icon home-icon" src="../../assets/home/task.png" >
            <span slot="title">{{ $t('local_home_layout.menu.3_value') }}</span>
          </el-menu-item>
          <!-- <el-submenu index="3" disabled>
             <template slot="title">
              <img  class="menu-icon home-icon" src="../../assets/home/task.png" >
              <span slot="title" disabled>{{ $t('local_home_layout.menu.3_value') }}</span>
            </template>
             <el-menu-item-group :span="3" disabled>
              <el-menu-item index="2-1" disabled>Revenue</el-menu-item>
              <el-menu-item index="2-2" disabled>Get Task</el-menu-item>
              <el-menu-item index="2-3" disabled>Implementation</el-menu-item>
            </el-menu-item-group>
          </el-submenu> -->
          <!-- <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i> 
            <span slot="title">Power Analysis</span>
          </el-menu-item> -->
          <el-menu-item index="4" disabled>
            <img  class="menu-icon home-icon" src="../../assets/revenue.png" >
            <span slot="title">{{ $t('local_home_layout.menu.4_value') }}</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20" class="bonus-content">
        <div class="title">{{ pageTitle }}</div>
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
        "0_value": "Home Page",

        "1_value": "Network Task Revenue",
        "1_1_value": "Revenue",
        "1_2_value": "Contribution",
        "1_3_value": "Withdrawal",
        
        "2_value": "Computing Task Revenue",
        "2_1_value": "Revenue",
        "2_2_value": "Contribution",
        "2_3_value": "Withdrawal",
        
        "3_value": "Power Analysis",
        "4_value": "Network Contribution"
      }
    }
  },
  "zn": {
    "local_home_layout": {
      "dataPanel": "数据面板",
      "menu": {
        "0_value": "数据面板首页",
        "1_value": "网络任务收益",
        "1_1_value": "收益情况",
        "1_2_value": "贡献详情",
        "1_3_value": "提现",
        "2_value": "计算任务收益",
        "2_1_value": "收益情况",
        "2_2_value": "任务执行",
        "2_3_value": "提现",
        "3_value": "算力分析",
        "4_value": "全网贡献"
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
  },
  components: {
    Header
  },
  data() {
    return {
      activeIndex: "0",
      revenueActive: true,
    };
  },
  computed: {
    thisPath() {
      return  this.$route.path;
    },
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
  padding-top: 2px;
}

.isActive, .el-menu-item.is-active {
  background-color: #032031;
  border-left: 3px solid #11B6BD;
  color: #fff !important;
}

.bonus-content {
  background: #F6F6F7;
  height: 100%;
  padding: 0 35px 35px;
}

.bonus-content {
  font-family: PingFangSC-Medium;
}

.bonus-content .title {
  font-family: PingFangSC-Regular;
  font-size: 16px;
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
