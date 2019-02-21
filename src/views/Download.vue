<template>
  <div class="home">
    <div class="header">
      <a class="logo" href="https://bonuscloud.io">
        <img class="header-logo " alt="header-logo" src="../assets/bonus-logo.png">
      </a>
      <div class="line"></div>
    </div>
    <main class="download-wrap">
      <div class="download-content">
        <h2 class="download-title">Download</h2>
        <!-- android -->
        <section class="download-node">
          <div class="section-wrap">
            <icon class="download-icon android-icon"></icon>
           <span class="section-title">Android APP For Binding</span>
          </div>
          <div class="section-wrap version-wrap">
            <icon class="download-icon info-icon"></icon>
            <p class="version">Lastest Version</p>
          </div>
          <div class=" detail-wrap">
            <div class="update-time">Update Time: 2018-12-15</div>
            <div>MD5: 1454b4b5312033d19c164a598d4d0823</div>
          </div>
          <a href="http://bonuscloud-imgs.oss.cn-north-1.jcloudcs.com/BonusCloud-LiteNode-admin-forPI.apk" target="_blank" class="download-tab">
            <icon class="download-icon xz-icon"></icon>
            <span>Download</span>
          </a>
          <a href="https://play.google.com/store/apps/details?id=io.bonuscloud.app" target="_blank" class="download-tab second-tab">
            <icon class="download-icon google-icon small-icon"></icon>
            <span>Google Play</span>
          </a>
        </section>
        <!-- 树莓派 -->
        <section class="download-node">
          <div class="section-wrap">
            <icon class="download-icon cpu-icon"></icon>
           <span class="section-title">RaspberryPi Image File</span>
          </div>
          <div class="section-wrap version-wrap">
            <icon class="download-icon info-icon"></icon>
            <p class="version">Lastest Version</p>
          </div>
          <div class=" detail-wrap">
            <div class="update-time">Update Time：2018-12-11</div>
            <div>MD5: e74f1456538b436716b651ef54c81b8a</div>
          </div>
          <a href="http://bonuscloud-imgs.oss.cn-north-1.jcloudcs.com/BonusCloud-LiteNode-raspberryPi-armv7l-20181210.img.xz" target="_blank" class="download-tab">
            <icon class="download-icon xz-icon"></icon>
            <span>Download</span>
          </a>
          <a href="https://bonuscloud.club/viewtopic.php?f=19&t=802" target="_blank" class="download-tab second-tab">
            <icon class="download-icon small-icon down-guide-icon"></icon>
            <span>Tutorial</span>
          </a>
        </section>
        <!-- N1 -->
        <section class="download-node">
          <div class="section-wrap">
            <icon class="download-icon cpu-icon"></icon>
           <span class="section-title">N1 Image File</span>
          </div>
          <div class="section-wrap version-wrap">
            <icon class="download-icon info-icon"></icon>
            <p class="version">Lastest Version</p>
          </div>
          <div class=" detail-wrap">
            <div class="update-time">Update Time：2019-1-24</div>
            <div>MD5: 90268ee4780237e57a90b486ae21a446</div>
          </div>
          <a href="http://bonuscloud-imgs.oss.cn-north-1.jcloudcs.com/BonusCloud-LiteNode-raspberryPi-armv7l-20181210.img.xz" target="_blank" class="download-tab">
            <icon class="download-icon xz-icon"></icon>
            <span>Download</span>
          </a>
          <a href="https://bonuscloud.club/viewtopic.php?f=19&t=4217" target="_blank" class="download-tab second-tab">
            <icon class="download-icon down-guide-icon small-icon"></icon>
            <span>Tutorial</span>
          </a>
        </section>
        <!-- NanoPi -->
        <section class="download-node">
          <div class="section-wrap">
            <icon class="download-icon cpu-icon"></icon>
           <span class="section-title">NanoPi Image File</span>
          </div>
          <div class="section-wrap version-wrap">
            <icon class="download-icon info-icon"></icon>
            <p class="version">Latest Version</p>
          </div>
          <div class=" detail-wrap">
            <div class="update-time">Update Time：2018-11-03</div>
            <div>MD5: a4c5d5f3fb4933e4868e88762a9d913a</div>
          </div>
          <a href="http://bonuscloud-imgs.oss.cn-north-1.jcloudcs.com/BonusCloud-LiteNode-nanoPiNeoPlus2-aarch64.tar.bz2" target="_blank" class="download-tab">
            <icon class="download-icon xz-icon"></icon>
            <span>Download</span>
          </a>
          <a href="https://bonuscloud.club/viewtopic.php?f=19&t=4216" target="_blank" class="download-tab second-tab">
            <icon class="download-icon down-guide-icon small-icon"></icon>
            <span>Tutorial</span>
          </a>
        </section>
        <!-- Merlin -->
        <section class="download-node router-node">
          <div class="section-wrap">
            <icon class="download-icon router-icon"></icon>
           <span class="section-title">Router Plugin For Merlin</span>
          </div>
          <div class="section-wrap version-wrap">
            <icon class="download-icon info-icon"></icon>
            <p class="version">ARM v7/ARM v8</p>
          </div>
          <a href="https://github.com/BonusCloud/BonusCloud-Node" target="_blank" class="download-tab">
            <icon class="download-icon github-icon"></icon>
            <span>Github</span>
          </a>
          <a href="https://bonuscloud.club/viewtopic.php?f=15&t=2014" target="_blank" class="download-tab second-tab">
            <icon class="download-icon down-guide-icon small-icon"></icon>
            <span>Tutorial</span>
          </a>
        </section>
        <div class="more-wrap">
          <div class="left-content">
            <p class="text">Only officially supported firmware or plugins are available here. If you do not find the resources you need, go to the BonusCloud Club for community compatible firmware and technical support.</p>
            <p class="other">Router Firmware：OpenWrt/Padavan ...</p>
            <p class="other">CPU Architecture：MIPS/MIPSEL/ARM v7/ARM v8 ...</p>
            <p class="other">Designated Brand：PHICOMM/ASUS/XIAOMI/NETGEAR/NewWifi ...</p>
          </div>
          <div class="right-content">
            <icon class="download-icon people-icon"></icon>
            <a href="https://bonuscloud.club/index.php" target="_blank" class="go-tab">Go</a>
          </div>
        </div>
      </div>
      
    </main>
  </div>
</template>

<script>

export default {
  name: "download",
  components: {},
  

};
</script>

<style lang="stylus">
#app {
  height: auto;
}
.download-wrap
  padding: 100px 20px;
  width: 100%;
  background: #f5f5f5;
.download-content
  padding-top: 80px;
  height: auto;
  width: 903px;
  margin: 0 auto;
  background: #fff;
  padding: 20px;
  text-align left;
.download-title
  color: #0db4c5;
  text-align left;
  font-size: 20px;
  font-weight: bold;
  height: 25px;
  line-height: 25px;
  border-bottom: 1px dashed #E3E3E3;
  padding: 30px;
  margin-bottom: 40px;
.download-icon 
  display: inline-block;
  background-size: cover;
  width: 20px;
  height: 20px;
  margin-right: 10px;
.small-icon
  width: 15px;
  height: 15px;
.android-icon 
  background-image: url('../assets/download/android.png');
// .google-icon 
  // background-image: url('../assets/download/google.png');
.router-icon
  background-image: url('../assets/download/router.png');
.cpu-icon
  background-image: url('../assets/download/CPU.png');
.people-icon
  background-image: url('../assets/download/people.png');
  width: 60px;
  height:50px;
  margin-bottom: 20px;
.xz-icon
  background-image: url('../assets/download/download.png');
  width: 15px;
  height: 15px;
  position: absolute;
  left: 10px;
  top: 14px;
  width: 12px;
  height: 12px;
.small-icon
  position: absolute;
  left: 10px;
  top: 14px;
.download-tab span 
  display: block;
  width: 100%;
  text-align: center;
.info-icon
  background-image: url('../assets/download/i.png');
  width: 15px;
  height: 15px;
  margin: 2.5px;
.github-icon
  background-image: url('../assets/download/github.png');
  width: 14px;
  height: 12px;
  left: 18px;
  position: absolute;
  top: 12px;
.down-guide-icon
  background-image: url('../assets/guide.png');
  left: 20px;
  width: 10px;
  height: 10px;
.section-title 
  line-height: 20px;
  font-weight: bold;
.download-node
  position: relative;
  padding: 30px;
  border-bottom: 1px dashed #e3e3e3;
.section-wrap
  display: flex;
.version-wrap
  padding: 10px 10px 10px 30px;
.detail-wrap 
  padding-left: 60px;
  font-size: 12px;
.update-time
  padding-bottom: 10px;
.download-tab
  display: flex;
  background-color: #0db4c5;
  width: 100px;
  padding: 10px;
  border-radius: 10px;
  color: #fff;
  font-size: 12px;
  position: absolute;
  right: 30px;
  top: 30px;
.go-tab 
  text-align: center;
  display: block;
  background-color: #0db4c5;
  width: 100px;
  padding: 10px;
  border-radius: 10px;
  color: #fff;
  font-size: 12px;
  text-align: center;
.second-tab
  display: flex;
  right: 30px;
  top: 80px;
.router-node
  min-height: 100px;
.more-wrap
  display: flex;
  margin: 30px;
.left-content .text
  font-size: 16px;
  margin: 10px 10px 30px;
.left-content .other
  margin: 5px 0 10px 50px;
  font-size: 14px;
.left-content
  width: 70%;
.right-content
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
</style>

<i18n>
{
  "en": {

  },
  "zn": {

  }
}
</i18n>
