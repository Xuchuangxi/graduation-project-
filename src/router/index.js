import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }
  // 404 page must be placed at the end !!!
]

export const asyncRoutes = [
  {
    path: '/size',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'siz',
        component: () => import('@/views/size/index'),
        meta: { title: '设置个人信息', roles: ['user', 'admin', 'super-admin'] },
        hidden: true
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: '首页',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', icon: 'dashboard', roles: ['user', 'admin', 'super-admin'] }
      }
    ]
  },
  {
    path: '/personal',
    component: Layout,

    children: [
      {
        path: 'index',
        name: '个人资料',
        component: () => import('@/views/personal/index'),
        meta: { title: '个人资料', icon: 'user', roles: ['user', 'admin', 'super-admin'] }
      }
    ]
  },

  {
    path: '/course',
    component: Layout,
    name: 'course',
    meta: {
      title: '课程',
      icon: 'education'
    },
    children: [
      {
        path: 'courselist',
        component: () => import('@/views/course/courselist/index'),
        meta: { title: '课程表', icon: 'list', roles: ['user', 'admin', 'super-admin'] }
      },
      {
        path: 'courseupdatalist',
        component: () => import('@/views/course/courseupdatalist/index'),
        meta: { title: '上传课程表', icon: 'edit', roles: ['admin', 'super-admin'] }
      },
      {
        path: 'edit/:id',
        component: () => import('@/views/course/edit/index'),
        name: 'edit',
        meta: { title: '修改课程表', noCache: true, roles: ['admin', 'super-admin'] },
        hidden: true

      }
    ]
  },
  {
    path: '/score ',
    component: Layout,
    name: 'score',
    meta: {
      title: '成绩',
      icon: 'star'
    },
    children: [
      {
        path: 'scorelist',
        component: () => import('@/views/score/scorelist/index'),
        meta: { title: '成绩表', icon: 'nested', roles: ['user', 'admin', 'super-admin'] }
      },
      {
        path: 'addscorelist',
        component: () => import('@/views/score/addscorelist/index'),
        meta: { title: '管理成绩表', icon: 'search', roles: ['admin', 'super-admin'] }
      }
    ]
  },
  {
    path: '/article',
    component: Layout,
    name: ' article',
    meta: { title: '共享社区', icon: 'guide' },
    children: [
      {
        path: 'created',
        name: '新增文章',
        component: () => import('@/views/article/created/index'),
        meta: { title: '新增文章', icon: 'edit', roles: ['user', 'admin', 'super-admin'] }
      },
      {
        path: 'list',
        name: '文章列表',
        component: () => import('@/views/article/list/index'),
        meta: { title: '文章列表', icon: 'list', roles: ['user', 'admin', 'super-admin'] }
      },
      {
        path: 'editlist',
        name: '管理文章',
        component: () => import('@/views/article/editlist/index'),
        meta: { title: '管理文章', icon: 'component', roles: ['admin', 'super-admin'] }
      },
      {
        path: 'editarticle/:id',
        name: '编辑文章',
        component: () => import('@/views/article/editArticle/index'),
        meta: { title: '编辑文章', icon: 'component', roles: ['user', 'admin', 'super-admin'] },
        hidden: true
      }
    ]
  },
  {
    path: '/permission',
    component: Layout,
    name: ' 权限管理',
    meta: { title: '权限管理', icon: 'example', roles: ['super-admin'] },
    children: [
      {
        path: 'updatelist',
        name: '修改权限',
        component: () => import('@/views/permission/updatelist/index'),
        meta: { title: '修改权限', icon: 'lock', roles: ['super-admin'] }
      },
      {
        path: 'addUser',
        name: '新增用户',
        component: () => import('@/views/permission/addUser/index'),
        meta: { title: '新增用户', icon: 'education', roles: ['super-admin'] }
      },
      {
        path: 'addCourse',
        name: '新增课程表',
        component: () => import('@/views/permission/addCourse/index'),
        meta: { title: '新增课程表', icon: 'user', roles: ['super-admin'] }
      }

    ]
  },
  {
    path: '/chinaMap',
    component: Layout,
    name: ' 地图',
    meta: { title: '地图', icon: 'example' },
    children: [
      {
        path: 'index',
        name: '学校人员分布',
        component: () => import('@/views/Map/chinaMap/index'),
        meta: { title: '学校人员分布', icon: 'list' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
