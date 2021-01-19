import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import VueCookies from 'vue-cookies'
Vue.use(Router)

import {router_InfoPublishCn, router_InfoPublishEn, router_InfoPublishFr} from './routers/router_InfoPublish'
import {router_EventDeclaratonCn, router_EventDeclaratonEn, router_EventDeclaratonFr} from './routers/router_EventDeclaraton'
import {router_MyInfoCn, router_MyInfoEn,router_MyInfoFr} from "./routers/router_MyInfo";
import {router_ConductCn, router_ConductEn, router_ConductFr} from "./routers/router_Conduct";
import {router_OrgStatusCn, router_OrgStatusEn, router_OrgStatusFr} from "./routers/router_OrgStatus";


var routes
const lang = window.sessionStorage.getItem('language')
// const lang = document.cookie.split('=')[1]
// const lang = this.$route.params.id
// language=en
// console.log('lan', this.$route)
console.log('langs', lang)
if (lang === 'cn') {
  console.log('c')
  routes= [
    ...router_InfoPublishCn,
    ...router_EventDeclaratonCn,
    ...router_MyInfoCn,
    ...router_ConductCn,
    ...router_OrgStatusCn,
    {
      path: '/',
      redirect: '/cn/home',
      name: 'HomeCn',
      component: () => import('@/views/login/homeCn.vue'),
      // meta:{requireAuth:true,authority:'tourist'},

      children: [
        {
          path: '/cn/home',
          name: 'HomeCn',
          component: () => import('@/views/login/components/InfoPublishCn.vue'),
          // meta: {authority: 'tourist',requireAuth:false}
        },
      ]
    },
    { path: '/logout', component: () => import('@/components/content/Logout.vue') },

    {
      path: '*',
      redirect: '/cn/home',
      name: 'HomeCn',
      component: () => import('@/views/login/homeCn.vue'),
    }
  ]

} else if(lang === 'en') {
  console.log('e')

  routes= [
    ...router_InfoPublishEn,
    ...router_EventDeclaratonEn,
    ...router_MyInfoEn,
    ...router_ConductEn,
    ...router_OrgStatusEn,
    {
      path: '/',
      redirect: '/en/home',
      name: 'HomeEn',
      component: () => import('@/views/login/homeEn.vue'),
      // meta:{requireAuth:true,authority:'tourist'},

      children: [
        {
          path: '/en/home',
          name: 'HomeEn',
          component: () => import('@/views/login/components/InfoPublishEn.vue'),
          // meta: {authority: 'tourist',requireAuth:false}
        },

      ]
    },
    { path: '/logout', component: () => import('@/components/content/Logout.vue') },
    {
      path: '*',
      redirect: '/en/home',
      name: 'HomeEn',
      component: () => import('@/views/login/homeEn.vue'),
    },
    {
      path: '/en/loginEn',
      component: (resolve) => require(['@/views/login/loginEn.vue'],resolve),
      meta: {authority: 'tourist',requireAuth:false,isLoginPage:'1'}
    },
  ]
} else if(lang === 'fr') {
  console.log('f')

  routes= [
    ...router_InfoPublishFr,
    ...router_EventDeclaratonFr,
    ...router_MyInfoFr,
    ...router_ConductFr,
    ...router_OrgStatusFr,
    {
      path: '/',
      redirect: '/fr/home',
      name: 'HomeFr',
      component: () => import('@/views/login/homeFr.vue'),
      // meta:{requireAuth:true,authority:'tourist'},
      children: [
        {
          path: '/fr/home',
          name: 'HomeFr',
          component: () => import('@/views/login/components/InfoPublishFr.vue'),
          meta: {authority: 'tourist',requireAuth:false}
        },

      ]
    },
    { path: '/logout', component: () => import('@/components/content/Logout.vue') },
    {
      path: '*',
      redirect: '/fr/home',
      component: () => import('@/views/login/homeFr.vue'),
    }
  ]
} else {
  console.log('c1')

  // 默认显示中文环境
  routes= [
    ...router_InfoPublishCn,
    ...router_EventDeclaratonCn,
    ...router_MyInfoCn,
    ...router_ConductCn,
    ...router_OrgStatusCn,
    {
      path: '/',
      component: () => import('@/views/login/homeCn.vue'),
      // meta:{requireAuth:true,authority:'tourist'},
      redirect: '/home',
      children: [
        {
          path: '/home',
          component: () => import('@/views/login/components/InfoPublishCn.vue'),
          meta: {authority: 'tourist',requireAuth:false}
        },
      ]
    },
    { path: '/logout', component: () => import('@/components/content/Logout.vue') },
    {
      path: '*',
      redirect: '/home',
      component: () => import('@/views/login/homeCn.vue'),
    }
  ]

}

const vueRouter = new Router({
  // mode:'history', //去掉地址栏的#号
  routes
});


vueRouter.beforeEach(function (to, from, next) {
  // const auth = localStorage.getItem('IsLogin');
  // if (to.meta.requireAuth) {
  //   //未登录
  //   if (auth != '1') {
  //     vueRouter.push({path: '/login'})
  //   }
  // }
  // //已登录的情况再去登录页，跳转至首页
  // if (to.name === 'login') {
  //   if (auth.IsLogin) {
  //     vueRouter.push({path: '/home'});
  //   }
  // }
  next();
});

// vueRouter.beforeEach(function (to, from, next) {
//   // let tabActivie = sessionStorage.getItem('tabActivie');
//   // if(tabActivie){
//   //   if(to.path == '/'){
//   //     store.state.tabsStack = [];
//   //     store.state.storeTabActivie = '/';
//   //   }else{
//   //     setTimeout(()=>{
//   //       if(!store.state.storeTabActivie.split(',').includes(to.path)){
//   //         store.state.tabsStack = [];
//   //         store.state.storeTabActivie = '/';
//   //         vueRouter.push({path: '/'});
//   //       }
//   //     },100)
//   //
//   //   }
//   // }
//   //
//   next();
// });

export default vueRouter
