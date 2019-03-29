

<template>
  <div class="Footer">
    <div class="line"></div>
    <div class="foot-link">
      <div class="foot-detail">
        <a class="foot-detail-title">BonusCloud</a>
        <a class="foot-detail-link" target="_blank" :href="$t('Whitepaper_link')">{{ $t('Whitepaper') }}</a>
        <a class="foot-detail-link" target="_blank" href="https://bonuscloud.io/#highlight">{{ $t('Highlight') }}</a>
        <a class="foot-detail-link" target="_blank" href="https://bonuscloud.io/#advantage">{{ $t('Advantage') }}</a>
        <a class="foot-detail-link" target="_blank" href="https://bonuscloud.io/#team">{{ $t('Member') }}</a>
        <a class="foot-detail-link" target="_blank" href="https://bonuscloud.io/#agency">{{ $t('Partner') }}</a>
        <a class="foot-detail-link" target="_blank" href="https://bonuscloud.io/#token">{{ $t('Token') }}</a>
        <a class="foot-detail-link" target="_blank" :href="$t('FAQ_link')">{{ $t('FAQ') }}</a>
        <a class="foot-detail-link" target="_blank" href="https://bonuscloud.io/#roadmap">{{ $t('Roadmap') }}</a>
        <a class="foot-detail-link" target="_blank" href="https://console.bonuscloud.io/protocol">{{ $t('Agreement') }}</a>
      </div>
      <div class="foot-detail">
        <a class="foot-detail-title">Data Panel</a>
        <a class="foot-detail-link" target="_blank" href="https://console.bonuscloud.io/">{{ $t('Get_BCode') }}</a>
        <a class="foot-detail-link" target="_blank" href="https://console.bonuscloud.io/revenue">{{ $t('Revenue_Overview') }}</a>
        <a class="foot-detail-link" target="_blank" href="https://console.bonuscloud.io/netStatus">{{ $t('Network_Task') }}</a>
        <a class="foot-detail-link" target="_blank" href="https://console.bonuscloud.io/calcuteStatus">{{ $t('Computing_Task') }}</a>
        <a class="foot-detail-link" target="_blank" href="https://console.bonuscloud.io/revenueDetail">{{ $t('Online_Revenue') }}</a>
        <a class="foot-detail-link" target="_blank" href="https://console.bonuscloud.io/withdrawal">{{ $t('Withdrawal') }}</a>
      </div>
      <div class="foot-detail">
        <a class="foot-detail-title">My Hardware</a>
        <a class="foot-detail-link" target="_blank" href="https://console.bonuscloud.io/withdrawal">{{ $t('Hardware_List') }}</a>
      </div>
      <div class="foot-detail">
        <a class="foot-detail-title">Resources And Help</a>
        <a class="foot-detail-link" target="_blank" :href="$t('Guide_link')">{{ $t('Guide') }}</a>
        <a class="foot-detail-link" target="_blank" href="https://bonuscloud.gitbook.io/help/bonuscloud-resource-navigation-zi-yuan-dao-hang">{{ $t('Resource') }}</a>
        <a class="foot-detail-link" target="_blank" :href="$t('Support_link')">{{ $t('Support') }}</a>
        <a class="foot-detail-link" target="_blank" :href="$t('Tutorial_link')">{{ $t('Tutorial') }}</a>
        <a class="foot-detail-link" target="_blank" href="https://console.bonuscloud.io/download">{{ $t('Download') }}</a>
      </div>
      <div class="foot-detail">
        <a class="foot-detail-title">Contact Us</a>
        <a target="_blank" href="mailto:hi@bonuscloud.io" class="footer-detail-email">
          <img src="../../assets/footer/email.png" />
          <span>hi@bonuscloud.io</span>
        </a>

        <a class="foot-detail-title tech-community">Technology Community</a>
        <a target="_blank" href="mailto:hi@bonuscloud.io" class="foot-detail-link footer-club community-content">
          <img src="../../assets/footer/club.png" />
          <span>BonusCloud Club</span>
        </a>
        <a target="_blank" href="mailto:hi@bonuscloud.io" class="foot-detail-link community-content">
          <img src="../../assets/footer/qq.png" />
          <span>740788277</span>
        </a>
        <div class="community-content footer-tele">
          <img src="../../assets/footer/telegram.png" />
          <a href="https://t.me/Bonuscloud">EN</a>
          <span> / </span>
          <a href="https://t.me/bonuscloudcn">CN</a>
          <span> / </span>
          <a href="https://t.me/BonuscloudRu">RU</a>
        </div>
      </div>
    </div>
    <div class="user-protocol">
      <div>
        <a href="https://medium.com/@bonuscloud" class="foot-annouce-icon">
          <img src="../../assets/footer/medium.png">
        </a>
        <a href="https://www.facebook.com/BonusCloud.io" class="foot-annouce-icon">
          <img src="../../assets/footer/facebook.png">
        </a>
        <a href="https://twitter.com/bonus_cloud" class="foot-annouce-icon">
          <img src="../../assets/footer/twitter.png">
        </a>
        <a href="https://www.youtube.com/channel/UCqVL-o6r_WFf3ZzavCZHWyg?view_as=subscriber" class="foot-annouce-icon">
          <img src="../../assets/footer/youtube.png">
        </a>
        <a href="https://github.com/BonusCloud" class="foot-annouce-icon">
          <img src="../../assets/footer/github.png">
        </a>
      </div>
      <router-link class="footer-agree-link" target="_blank" to="/protocol">2018 BonusCloud Foundation © All rights reserved</router-link>
    </div>
    <!-- <div>2018 BonusCloud Foundation © All rights reserved</div> -->
  </div>
  <!-- </div> -->
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scopes lang="stylus">
  .line
    margin-top: 20px
    border-bottom: 1px solid #979797;
    opacity: 0.3;
    width: 100%;
    top: 62px;
  .Footer
    margin-top: 50px;
    padding: 10px;
    margin: 0 auto;
    text-align: center;
    color: #666;
    line-height: 16px;
  .footer-agree-link
    display:inline-block;
    padding: 20px 0 10px;
    z-index: 20000;
    position: relative;
  .user-protocol a:hover  
    color: #fff;
  .foot-link
    // border-top: 1px solid #ddd;
    width: 80%;
    margin: 40px auto 10px;
    display: flex;
    font-family: Arial, 'Helvetica Neue';
  .foot-detail
    width: 20%;
    text-align: left;
  .foot-detail-title
    font-weight: bold
    display: block;
    margin: 10px 10px 20px;
    font-size: 16px;
    color: #fff;
  .foot-detail-link
    font-size: 14px;
    display: block;
    margin: 14px;
.footer-detail-email
  margin-left: 10px;
.footer-detail-email img, .community-content img
  width: 16px;
  height: 10px;
  margin-right: 10px;
.community-content
  display: flex;
  margin: 10px 0 15px 10px;
.tech-community
  margin-top: 50px;
.footer-club img
  width: 20px;
  height: 20px;
.footer-tele 
  font-size: 14px;
.footer-tele span 
  margin: 0 4px;
.foot-annouce-icon img
  display: inline-block;
  width: 18px;
  height: 18px;
  margin-right: 30px;
</style>


<i18n>
{
  "zn": {
    "BonusCloud": "BonusCloud",
    "Whitepaper": "项目白皮书",
    "Highlight": "项目亮点", 
    "Advantage": "项目优势",
    "Member": "团队成员",
    "Partner": "合作伙伴",
    "Token": "Token",
    "FAQ": "FAQ",
    "Roadmap": "Roadmap",
    "Agreement": "用户协议",
    "Whitepaper_link": "https://bonuscloud.gitbook.io/help/bonuscloud-bai-pi-shu-v1.0", 
    "FAQ_link": "https://bonuscloud.gitbook.io/help/faq-chang-jian-wen-ti/faq-cn",
    "Get_BCode": "领取BCode",
    "Overview_link": "",
    "Revenue_Overview": " 收益总览",
    "Network_Task": "网络任务",
    "Computing_Task": "计算任务",
    "Online_Revenue": "在线收益",
    "Withdrawal": "提现",
    "Hardware_List": "硬件列表",
    "Guide": "新手指南",
    "Guide_link": "https://bonuscloud.club/viewtopic.php?f=15&t=12",
    "Resource": "资源导航",
    "Support": "设备支持列表",
    "Support_link": "https://bonuscloud.gitbook.io/help/lite-jie-dian-she-bei-zhi-chi-lie-biao",
    "Tutorial": "刷机教程导航",
    "Tutorial_link": "https://bonuscloud.club/viewtopic.php?f=15&t=2014",
    "Download": "下载中心"
  },
  "en": {
    "BonusCloud": "BonusCloud",
    "Whitepaper": "Whitepaper", 
    "Highlight": "Highlight", 
    "Advantage": "Advantage",
    "Member": "Member",
    "Partner": "Partner",
    "Token": "Token",
    "FAQ": "FAQ",
    "Roadmap": "Roadmap",
    "Agreement": "Agreement",
    "Whitepaper_link": "https://bonuscloud.gitbook.io/help/bonuscloud-whitepaper-v-1.1-2018", 
    "FAQ_link": "https://bonuscloud.gitbook.io/help/faq-chang-jian-wen-ti/faq-en",
    "Get_BCode": "Get BCode",
    "BCode_link": "https://console.bonuscloud.io/",
    "Revenue_Overview": "Revenue Overview",
    "Network_Task": "Network Task",
    "Computing_Task": "Computing Task",
    "Online_Revenue": "Online Revenue",
    "Withdrawal": "Withdrawal",

    "Hardware_List": "Hardware List",
    "Guide": "Guide For Beginners",
    "Guide_link": "https://bonuscloud.club/viewforum.php?f=18",
    "Resource": "Resource Navigation",
    "Support": "Support List Of Lite Node",
    "Support_link": "https://bonuscloud.gitbook.io/help/device-support-list-of-lite-node",
    "Tutorial": "Brush Tutorial",
    "Tutorial_link": "https://bonuscloud.club/viewforum.php?f=19",
    "Download": "Download"
  }
}
</i18n>