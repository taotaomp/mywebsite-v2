import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
//全局样式
import './assets/css/global.css'
import date from '@/utils/date'

Vue.config.productionTip = false

Vue.use(date)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
