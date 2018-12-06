

<template>
  <div class="Footer">
    <div class="user-protocol">
      <router-link class="footer-agree-link" target="_blank" to="/protocol">BonusCloud User Agreement</router-link>
    </div>
    <div>2018 BonusCloud Foundation © All rights reserved</div>
  </div>
  <!-- </div> -->
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scopes lang="stylus">
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
</style>