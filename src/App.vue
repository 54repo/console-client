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
</style>
