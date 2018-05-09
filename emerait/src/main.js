
import Vue from 'vue'
import router from './router'
import'./css/Font-Awesome-3.2.1/css/font-awesome.min.css'
import './css/rest.css'
import crypto from 'crypto'
import Echarts from 'echarts'
import Element from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
Vue.use(Element)
Vue.config.productionTip = false
  
new Vue({
  el: '#app',
  router,
})
