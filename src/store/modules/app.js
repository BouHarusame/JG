import * as storage from '@/utils/storage'
import * as types from '../mutation-types'
import * as request from '@/utils/request'
import { formatMenuData } from '@/utils'

const state = {
  // default: false
  isSidebarCollapse: !!storage.getItem('isSidebarCollapse'),
  activeMenuIndex: null,
  routeTitleList: null,
  openedTabs: storage.getItem('openedTabs') || [
    {
      id: 0,
      name: 'home',
      title: '首页',
      closable: false
    }
  ],
  currentTabName: 'home',
  navMenu: [],
  navMenuList: [],
  access: 0,
  selectShip: '',
  shipList: [],
  standardList: [],
  membersList: [],
  projectList: [],
  proMembersList: []
}
const getters = {
  isSidebarCollapse: state => state.isSidebarCollapse,
  activeMenuIndex: state => state.activeMenuIndex,
  routeTitleList: state => state.routeTitleList,
  openedTabs: state => state.openedTabs,
  currentTabName: state => state.currentTabName,
  navMenu: state => state.navMenu,
  navMenuList: state => state.navMenuList,
  access: state => state.access,
  selectShip: state => state.selectShip,
  shipList: state => state.shipList,
  standardList: state => state.standardList,
  membersList: state => state.membersList,
  projectList: state => state.projectList,
  proMembersList: state => state.proMembersList
}
const actions = {
  fetchNavMenu({ commit }, data) {
    commit('SET_NAV_MENU', formatMenuData(data))
  },
  fetchNavMenuS({ commit }, data) {
    commit('SET_NAV_MENULIST', formatMenuData(data))
  },
  fetchStandard({ commit }) {
    return new Promise((resolve, reject) => {
      request
        .get('/standard')
        .then(response => {
          resolve(response.data)
          commit('SET_STANDARD', response.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  fetchMembers({ commit }) {
    return new Promise((resolve, reject) => {
      request
        .get('/membersTable')
        .then(response => {
          resolve(response.data)
          commit('SET_MEMBERSLIST', response.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  fetchProject({ commit }) {
    return new Promise((resolve, reject) => {
      request
        .get('/projectTable')
        .then(response => {
          resolve(response.data)
          commit('SET_PROJECTLIST', response.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  fetchProMembers({ commit }) {
    return new Promise((resolve, reject) => {
      request
        .get('/appointedDetails')
        .then(response => {
          resolve(response.data)
          commit('SET_PROMEMBERSLIST', response.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  getUserInfo({ commit }) {
    return new Promise((resolve, reject) => {
      request
        .get('/userInfo')
        .then(response => {
          resolve(response.data)
          commit('SET_ACCESS', response.data.access)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
const mutations = {
  [types.TOGGLE_SIDEBAR]: state => {
    state.isSidebarCollapse = !state.isSidebarCollapse
    storage.setItem('isSidebarCollapse', state.isSidebarCollapse)
  },
  [types.SET_ACTIVE_MENU_INDEX]: (state, activeMenuIndex) => {
    state.activeMenuIndex = activeMenuIndex
  },
  [types.SET_ROUTE_TITLE_LIST]: (state, titleList) => {
    state.routeTitleList = titleList
  },
  [types.ADD_TAB]: (state, tab) => {
    let openedTabs = state.openedTabs
    if (!openedTabs.find(value => value.id === tab.id)) {
      state.openedTabs.push(tab)
      storage.setItem('openedTabs', state.openedTabs)
    }
  },
  [types.REMOVE_TAB]: (state, index) => {
    state.openedTabs.splice(index, 1)
    storage.setItem('openedTabs', state.openedTabs)
  },
  [types.SET_CURRENT_TAB_NAME]: (state, tabName) => {
    state.currentTabName = tabName
  },
  [types.SET_NAV_MENU]: (state, menus) => {
    state.navMenu = menus
  },
  [types.SET_NAV_MENULIST]: (state, menuss) => {
    state.navMenuList = menuss
  },
  [types.SET_STANDARD]: (state, standard) => {
    state.standardList = standard
  },
  [types.SET_ACCESS]: (state, access) => {
    state.access = access
  },
  [types.SET_SHIP]: (state, ship) => {
    state.selectShip = ship
  },
  [types.SET_SHIPLIST]: (state, shipList) => {
    state.shipList = shipList
  },
  [types.SET_MEMBERSLIST]: (state, membersList) => {
    state.membersList = membersList
  },
  [types.SET_PROJECTLIST]: (state, projectList) => {
    state.projectList = projectList
  },
  [types.SET_PROMEMBERSLIST]: (state, proMembersList) => {
    state.proMembersList = proMembersList
  }
}

const app = {
  state,
  getters,
  actions,
  mutations
}

export default app
