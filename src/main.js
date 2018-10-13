
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-123196088-1', 'auto')
ga('send', 'pageview')

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import './plugins/element';
import i18n from './i18n';
import VueClipboard from 'vue-clipboard2';
import VueCookie from 'vue-cookie';
// import ga from 'vue-ga'
// import VueAnalytics from 'vue-analytics'

// Vue.use(VueAnalytics, {
//   id: 'UA-123196088-1'
// })

Vue.config.productionTip = false;
// 复制非button组件设置
VueClipboard.config.autoSetContainer = true ;// add this line
// 设置页面title
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
      document.title = to.meta.title
  }
  next()
})

// import {
//   MessageBox,
//   Message,
// } from 'element-ui';

// Vue.prototype.$msgbox = MessageBox;
// Vue.prototype.$message = Message;

router.afterEach(function (to) {
  if (window.ga) {
    let path = to.fullPath;
    if (path === '/') {
      path = '/console'
    }
    window.ga('set', 'page', path) // 你可能想根据请求参数添加其他参数，可以修改这里的 to.fullPath
    window.ga('send', 'pageview')
  }
})

Vue.use(VueClipboard);
Vue.use(VueCookie);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');

  
