import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'
// 导入用户图标
import './assets/fonts/iconfont.css'
//导入axios
import axios from 'axios'
//导入treetable
import TreeTable from 'vue-table-with-tree-grid'

//配置axios的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 添加拦截器 为请求头添加token  config就是请求对象
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

//挂载到vue原型上面  通过$http来访问
Vue.prototype.$http = axios

Vue.config.productionTip = false
//全局注册该组件
Vue.component('tree-table', TreeTable)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
