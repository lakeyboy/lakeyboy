import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'

Vue.use(VueRouter)

// 配置路由映射关系
const routes = [
  //配置重定向
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/home', component: Home }
]

const router = new VueRouter({
  routes
})
//拦截路由导航守卫
// to表示要访问的路径
// from 从哪个路径来的 
// next 为函数  表示继续执行
// next()   next("具体跳转到哪个页面")

router.beforeEach((to, frome, next) => {
  if (to.path == "/login") return next()
  const tokenStr = window.sessionStorage.getItem("token")
  if (!tokenStr) return next("/login")
  next()
})

export default router
