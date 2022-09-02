import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home.vue')
const login = () => import('../views/login.vue')
const admin = () => import('../views/admin.vue')
const dashboard = () => import('../views/dashboard.vue')
const announceManage = () => import('../views/announceManage.vue')
const userManagement = () => import('../views/userManagement.vue')
const modifyPassword = () => import('../views/modifyPassword.vue')
const roleManage = () => import('../views/roleManage.vue')
const permissionManage = () => import('../views/permissionManage.vue')
const unitTestManage = () => import('../views/unitTestManage.vue')

// 1.安装插件
Vue.use(VueRouter)

// 2.创建路由对象
const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/admin/login',
    component: login,
  },
  {
    path: '/admin',
    component: admin,
    children: [
      {
        path: '',
        redirect: 'dashboard'
      },
      {
        path: '/admin/dashboard',
        component: dashboard
      },
      {
        path: '/announceManage',
        component: announceManage
      },
      {
        path: '/userManage',
        component: userManagement
      },
      {
        path: '/roleManage',
        component: roleManage
      },
      {
        path: '/permissionManage',
        component: permissionManage
      },
      {
        path: '/unitTestManage',
        component: unitTestManage
      },
    ]
  },
  {
    path: '/modifyPassword',
    component: modifyPassword
  },
]
const router = new VueRouter({
  routes,
  mode: 'history'
})

// 每次跳转登录页面时都要修改本地储存，导致重复代码过多，这里统一用导航守卫修改
router.beforeEach((to, from, next) => {
  // console.log(to.fullPath)
  if (to.fullPath == '/admin/login') {
    localStorage.setItem("indexStrs", '');
  }
  next()
})

// 3.导出router
export default router