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
//自定义格式化时间的全局过滤器
Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  //需要转为字符串调用padStart  确定为几位 如果不足 就以什么填充 因为 month 是从0开始的，所以需要+1
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  //
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
