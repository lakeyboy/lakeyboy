import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'
import Rights from '../components/power/Rights.vue'
import Roles from '../components/power/Roles.vue'
import Cate from '../components/goods/Cate.vue'
import Params from '../components/goods/Params.vue'

Vue.use(VueRouter)

// 配置路由映射关系
const routes = [
  //配置重定向
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  // 相当于子路由   重定向到子路由   children 为子路由路径
  {
    path: '/home', component: Home, redirect: '/welcome', children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: Users },
      // 其中rights  是页面中跳转地地址
      { path: '/rights', component: Rights },
      { path: '/roles', component: Roles },
      { path: '/categories', component: Cate },
      { path: '/params', component: Params },
    ]
  }
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
