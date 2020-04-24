import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
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
        component: () => import('@/views/size/index')
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
        meta: { title: '首页', icon: 'dashboard' }
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
        meta: { title: '个人资料', icon: 'form' }
      }
    ]
  },

  {
    path: '/course',
    component: Layout,
    name: 'course',
    meta: {
      title: '课程',
      icon: 'nested'
    },
    children: [
      {
        path: 'courselist',
        component: () => import('@/views/course/courselist/index'),
        meta: { title: '课程表' }
      },
      {
        path: 'courseupdatalist',
        component: () => import('@/views/course/courseupdatalist/index'),
        meta: { title: '上传课程表' }
      },
      {
        path: 'edit/:id',
        component: () => import('@/views/course/edit/index'),
        name: 'edit',
        meta: { title: '修改课程表', noCache: true, activeMenu: '/example/list' }

      }
    ]
  },
  {
    path: '/score ',
    component: Layout,
    name: 'score',
    meta: {
      title: '成绩',
      icon: 'nested'
    },
    children: [
      {
        path: 'scorelist',
        component: () => import('@/views/score/scorelist/index'),
        meta: { title: '成绩表' }
      }
    ]
  },
  {
    path: '/article',
    component: Layout,
    name: ' article',
    meta: { title: '共享社区', icon: 'example' },
    children: [
      {
        path: 'created',
        name: '新增文章',
        component: () => import('@/views/article/created/index'),
        meta: { title: '新增文章', icon: 'table' }
      },
      {
        path: 'list',
        name: '文章列表',
        component: () => import('@/views/article/list/index'),
        meta: { title: '文章列表', icon: 'tree' }
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
