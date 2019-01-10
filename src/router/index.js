import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import { Message } from 'element-ui'
import TheLayout from '@/views/Layout/TheLayout'
import store from '../store'
import * as storage from '@/utils/storage'
import * as types from '../store/mutation-types'

Vue.use(Router)

const systemRoute = {
  path: '/system',
  name: 'system',
  component: TheLayout,
  meta: { id: 100000000, title: '系统管理' },
  children: [
    {
      path: 'user',
      name: 'user',
      component: resolve => {
        require(['@/views/System/User'], resolve)
      },
      meta: { id: 100010001, title: '用户管理' }
    },
    {
      path: 'params',
      name: 'params',
      component: resolve => {
        require(['@/views/System/Params'], resolve)
      },
      meta: { id: 100010001, title: '参数设置' }
    },
    {
      path: 'role',
      name: 'role',
      component: resolve => {
        require(['@/views/System/Role'], resolve)
      },
      meta: { id: 100010002, title: '角色管理' }
    },
    {
      path: 'type',
      name: 'type',
      component: resolve => {
        require(['@/views/System/Type'], resolve)
      },
      meta: { id: 100010002, title: '舰艇类型管理' }
    },
    {
      path: 'strength',
      name: 'strength',
      component: resolve => {
        require(['@/views/System/Strength'], resolve)
      },
      meta: { id: 100020002, title: '舰艇实力' }
    },
    {
      path: 'buildrecord',
      name: 'buildrecord',
      component: resolve => {
        require(['@/views/System/BuildRecord'], resolve)
      },
      meta: { id: 102000005, title: '设计建造记录' }
    },
    {
      path: 'buildstatus',
      name: 'buildstatus',
      component: resolve => {
        require(['@/views/System/BuildStatus'], resolve)
      },
      meta: { id: 101000005, title: '设计建造状态' }
    },
    {
      path: 'repairtype',
      name: 'repairtype',
      component: resolve => {
        require(['@/views/System/RepairType'], resolve)
      },
      meta: { id: 103000005, title: '修理改装类型' }
    },
    {
      path: 'repairrecord',
      name: 'repairrecord',
      component: resolve => {
        require(['@/views/System/RepairRecord'], resolve)
      },
      meta: { id: 104000005, title: '修理改装记录' }
    },
    {
      path: 'standard',
      name: 'standard',
      component: resolve => {
        require(['@/views/System/Standard'], resolve)
      },
      meta: { id: 101040002, title: '标准性能参数维护' }
    },
    {
      path: 'configuration',
      name: 'configuration',
      component: resolve => {
        require(['@/views/System/Configure'], resolve)
      },
      meta: { id: 102040002, title: '舰船性能参数配置' }
    },
    {
      path: 'total',
      name: 'total',
      component: resolve => {
        require(['@/views/System/Property'], resolve)
      },
      meta: { id: 103040002, title: '总体性能' }
    },
    {
      path: 'mainsystem',
      name: 'mainsystem',
      component: resolve => {
        require(['@/views/System/MainSystem'], resolve)
      },
      meta: { id: 104040002, title: '主要系统' }
    },
    {
      path: 'project',
      name: 'project',
      component: resolve => {
        require(['@/views/Project/Project'], resolve)
      },
      meta: { id: 100000003, title: '项目管理' }
    },
    {
      path: 'workflow',
      name: 'workflow',
      component: resolve => {
        require(['@/views/WorkFlow/WorkFlow'], resolve)
      },
      meta: { id: 100000005, title: '工作流' }
    },
    {
      path: 'files',
      name: 'files',
      component: resolve => {
        require(['@/views/Files/Files'], resolve)
      },
      meta: { id: 100000004, title: '文档' }
    },
    {
      path: 'basic',
      name: 'basic',
      component: resolve => {
        require(['@/views/Basic/Basic'], resolve)
      },
      meta: { id: 100000001, title: '基础数据' }
    },
    {
      path: 'dict',
      name: 'dict',
      component: resolve => {
        require(['@/views/System/DataDict'], resolve)
      },
      meta: { id: 100010003, title: '数据字典' }
    },
    {
      path: 'members',
      name: 'members',
      component: resolve => {
        require(['@/views/System/Members'], resolve)
      },
      meta: { id: 101050002, title: '人员基本信息' }
    },
    {
      path: 'buildDuty',
      name: 'buildDuty',
      component: resolve => {
        require(['@/views/System/buildDuty'], resolve)
      },
      meta: { id: 100010006, title: '职务配置' }
    },
    {
      path: 'prostatus',
      name: 'prostatus',
      component: resolve => {
        require(['@/views/System/projectStatus'], resolve)
      },
      meta: { id: 102050002, title: '标准项目计划' }
    },
    {
      path: 'projectrecord',
      name: 'projectrecord',
      component: resolve => {
        require(['@/views/System/projectRecord'], resolve)
      },
      meta: { id: 103050002, title: '项目基本信息' }
    },
    {
      path: 'crewMedicalRecords',
      name: 'crewMedicalRecords',
      component: resolve => {
        require(['@/views/System/crewMedicalRecords'], resolve)
      },
      meta: { id: 100030051, title: '舰员医疗档案' }
    },
    {
      path: 'appointed',
      name: 'appointed',
      component: resolve => {
        require(['@/views/System/appointed'], resolve)
      },
      meta: { id: 104050002, title: '人员任命书' }
    },
    {
      path: 'planSet',
      name: 'planSet',
      component: resolve => {
        require(['@/views/System/planSet'], resolve)
      },
      meta: { id: 105050002, title: '项目计划编制' }
    },
    {
      path: 'planAudit',
      name: 'planAudit',
      component: resolve => {
        require(['@/views/System/planAudit'], resolve)
      },
      meta: { id: 106050002, title: '项目计划审核' }
    },
    {
      path: 'planPerform',
      name: 'planPerform',
      component: resolve => {
        require(['@/views/System/planPerform'], resolve)
      },
      meta: { id: 107050002, title: '项目计划执行' }
    },
    {
      path: 'planConfirm',
      name: 'planConfirm',
      component: resolve => {
        require(['@/views/System/planConfirm'], resolve)
      },
      meta: { id: 108050002, title: '项目计划确认' }
    },
    {
      path: 'planChange',
      name: 'planChange',
      component: resolve => {
        require(['@/views/System/planChange'], resolve)
      },
      meta: { id: 109050002, title: '项目计划变更' }
    },
    {
      path: 'planInquire',
      name: 'planInquire',
      component: resolve => {
        require(['@/views/System/planInquire'], resolve)
      },
      meta: { id: 110050002, title: '查询计划执行情况' }
    },
    {
      path: 'contract',
      name: 'contract',
      component: resolve => {
        require(['@/views/System/Contract'], resolve)
      },
      meta: { id: 111050002, title: '收入合同信息' }
    }
  ]
}

const appRoutes = [
  {
    path: '/login',
    name: 'login',
    component: resolve => require(['@/views/Login/Login'], resolve)
  },
  {
    path: '/signup',
    name: 'signup',
    component: resolve => require(['@/views/SignUp/SignUp'], resolve)
  },
  {
    path: '',
    component: TheLayout,
    redirect: 'home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: resolve => require(['@/views/Home/Home'], resolve),
        meta: { id: 0, title: '首页' }
      },
      {
        path: 'error',
        name: 'errorpage',
        component: resolve => require(['@/views/Error/ErrorPage'], resolve),
        meta: { id: 100000002, title: '错误页面' }
      },
      {
        path: '/access-test',
        name: 'access-test',
        component: resolve => require(['@/views/Access/AccessTest'], resolve),
        meta: { id: 100000005, title: '权限测试', access: 4 }
      }
    ]
  },
  {
    path: '/403',
    name: 'error-403',
    component: resolve => {
      require(['@/views/Error/TheError403'], resolve)
    }
  },
  {
    path: '/500',
    name: 'error-500',
    component: resolve => {
      require(['@/views/Error/TheError500'], resolve)
    }
  },
  {
    path: '*',
    name: 'error-404',
    component: resolve => {
      require(['@/views/Error/TheError404'], resolve)
    }
  }
]

export const routes = [systemRoute, ...appRoutes]

const router = new Router({
  routes
})

// 路由匹配的回调函数
router.afterEach(to => {
  // 设置当前激活的菜单项
  NProgress.done()
  const routeName = to.name
  store.commit(types.SET_ACTIVE_MENU_INDEX, routeName)

  // 设置面包屑的值
  let routeTitleList = []
  const matched = to.matched
  if (matched.length > 0 && matched[matched.length - 1].name !== 'home') {
    matched.forEach(
      record => record.path && routeTitleList.push(record.meta.title)
    )

    to.meta.title &&
      store.commit(types.ADD_TAB, {
        name: routeName,
        id: to.meta.id,
        title: to.meta.title,
        closable: true
      })
  }
  store.commit(types.SET_ROUTE_TITLE_LIST, routeTitleList)

  // 设置当前激活的标签页
  store.commit(types.SET_CURRENT_TAB_NAME, routeName)
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  const token = storage.getItem('token')
  if (to.name === 'login') {
    next()
    NProgress.done()
  } else {
    if (token === null) {
      next('/login')
      NProgress.done()
    } else {
      store
        .dispatch('getUserInfo')
        .then(access => {
          if (to.meta && to.meta.access > access.access) {
            next('/403')
            NProgress.done()
          }
        })
        .catch(err => {
          Message.error('身份认证出错，请重新登录')
          next('/login')
          NProgress.done()
        })
      next()
      NProgress.done()
    }
  }
})

export default router
