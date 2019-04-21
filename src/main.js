import Vue from 'vue'
import App from './App.vue'
import utils from "./utils/index" //导入工具函数

// 把通用方法挂载到Vue原型上
Vue.prototype.$formatDate = utils.formatDate
Vue.prototype.$storage = utils.storage

new Vue({
  el: '#app',
  render: h => h(App)
})
