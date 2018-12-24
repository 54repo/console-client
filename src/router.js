import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import SignUp from './views/SignUp.vue';
import Forget from './views/Forget.vue';
import Revenue from './views/Revenue.vue';
import RevenueDetail from './views/RevenueDetail.vue';
import InviteDetail from './views/InviteDetail.vue';
import AccountSet from './views/AccountSet.vue';
import HardList from './views/HardList.vue';
import BindWallet from './views/BindWallet.vue';
import Withdrawal from './views/Withdrawal.vue';
import Protocol from './views/Protocol.vue';
import NetStatus from './views/NetStatus.vue';
import NetDetail from './views/NetDetail.vue';
import CalculateDetail from './views/CalculateDetail.vue';
// import Change from './views/Change.vue';

Vue.use(Router);
const title = 'BonusCloud: The next generation infrastructure driven by blockchain';

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        title,
      },
      component: Home,
    },
    {
      path: '/revenue',
      name: 'revenue',
      meta: {
        title,
      },
      component: Revenue,
    },
    {
      path: '/revenueDetail',
      name: 'revenueDetail',
      meta: {
        title,
      },
      component: RevenueDetail,
    },
    {
      path: '/inviteDetail',
      name: 'inviteDetail',
      meta: {
        title,
      },
      component: InviteDetail,
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title,
      },
      component: Login,
    },
    {
      path: '/signUp',
      name: 'signUp',
      meta: {
        title,
      },
      component: SignUp,
    },
    {
      path: '/forget',
      name: 'forget',
      meta: {
        title,
      },
      component: Forget,
    },
    {
      path: '/AccountSet',
      name: 'accountSet',
      meta: {
        title,
      },
      component: AccountSet,
    },
    {
      path: '/hardList',
      name: 'hardList',
      meta: {
        title,
      },
      component: HardList,
    },
    {
      path: '/bindWallet',
      name: 'bindWallet',
      meta: {
        title,
      },
      component: BindWallet,
    },
    {
      path: '/withdrawal',
      name: 'withdrawal',
      meta: {
        title,
      },
      component: Withdrawal,
    },
    {
      path: '/protocol',
      name: 'Protocol',
      meta: {
        title,
      },
      component: Protocol,
    },
    {
      path: '/netStatus',
      name: 'netStatus',
      meta: {
        title,
      },
      component: NetStatus,
    },
    {
      path: '/netDetail',
      name: 'netDetail',
      meta: {
        title,
      },
      component: NetDetail,
    },
    {
      path: '/calculateDetail',
      name: 'calculateDetail',
      meta: {
        title,
      },
      component: CalculateDetail,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    // },
  ],
});
