import Vue from 'vue'
import Router from 'vue-router'
import Logo from '@/components/login'
import Moban from '@/components/moban'
import List from '@/components/list'
import  Tabs from '@/components/tabs'
import  Tabs2 from '@/components/tabs2'
import Zc from '@/components/zhuce'
import AdminList from '@/components/adminlist'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'Logo',component: Logo}, 
    { path: '/moban', name: 'moban',component: Moban },  
    { path: '/list', name: 'list',component: List },
    { path: '/tab', name: 'tab',component: Tabs },
    { path: '/tab2', name: 'tabs',component: Tabs2 }, 
    { path: '/zhuce', name: 'zhuce',component: Zc }, 
    { path: '/adm', name: 'adminlist',component: AdminList }   
  ]
})
