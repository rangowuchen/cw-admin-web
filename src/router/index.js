/*
 * @Author: wuchen
 * @Date: 2019-01-03 10:17:29
 * @LastEditors: wuchen
 * @LastEditTime: 2019-01-03 15:32:09
 * @Description: 路由管理
 * @Email: rangowu@163.com
 */

import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/index/home.vue'
import Login from '@/views/login/index.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: './login',
      name: 'login',
      component: Login,
      hidden: true
    },
    {
      path: '/',
      component: Home,
      name: '仪表盘',
      iconCls: 'el-icon-tickets',
      leaf: false,
      meta: { title: '仪表盘' },
      children: [
        {
          path: '/dashBoard', name: '仪表盘', meta: { title: '仪表盘' }, hidden: false,component: function (resolve) { require(['@/views/test/main.vue'], resolve) },
        }
      ]
    },
    {
      path: '/',
      component: Home,
      name: '导航',
      iconCls: 'el-icon-printer',
      leaf: false,
      meta: { title: '导航' },
      children: [
        {
          path: '/menu1', name: '菜单', meta: { title: '菜单' }, hidden: false,component: function (resolve) { require(['@/views/test/page1.vue'], resolve) },
        },{
          path: '/menu2', name: '表格', meta: { title: '表格' }, hidden: false,component: function (resolve) { require(['@/views/test/page2.vue'], resolve) },
        }
      ]
    }
  ]
})