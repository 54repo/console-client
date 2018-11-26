<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>
<style lang="stylus">
html, body
  height: 100%
  font-family: 'Avenir', Arial, sans-serif, Helvetica, Tahoma, Arial, STXihei, '华文细黑', Heiti, '黑体', 'Microsoft YaHei', '微软雅黑', SimSun, '宋体', sans-serif;
  -webkit-font-smoothing: antialiased;
#app
  height: 100%
*
  margin: 0
  padding: 0
body
  // background: #171E22;
  background: #0A0E22;
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50

#nav
  padding 30px
  a
    font-weight bold
    color #2c3e50
    &.router-link-exact-active
      color #42b983
a:active
  text-decoration:none
a
  text-decoration:none;
.bonus-cursor
  cursor: pointer;

.input 
    width: 200px;
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #000;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 30px;
    outline: none;
    padding: 0 10px;
    -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    font-size: 16px;
.button
    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(2%, #15bcad), to(#10b2cb));
    background-image: linear-gradient(-180deg, #15bcad 2%, #10b2cb 100%);
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #fff;
    text-align: center;
    line-height: 30px;
    width: 90px;
    height: 35px;
    cursor: pointer;
.loading
  color: #909399;
  line-height: 30px;

.link
  font-size: 10px;
  color: #13b8bc;
  line-height: 42px

.buttonDisabled
  background :#d0d0d0 !important;

.bonus-color {
  color: #0db4c5
}

.none {
  display: none
}
</style>
