// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/base.css'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import 'vx-easyui/dist/themes/default/easyui.css'
import 'vx-easyui/dist/themes/icon.css'
import 'vx-easyui/dist/themes/vue.css'
import EasyUI from 'vx-easyui'
// import Gantt from 'vue-easy-gantt'

/* mock 数据 */
import './mock/mock'

import i18n from '@/locale/lang'
import App from './App'
import router from './router'
import store from './store'
import * as storage from '@/utils/storage'

import 'font-awesome/css/font-awesome.min.css'
import 'nprogress/nprogress.css'
import '@/common/styles/index.pcss'
import '@/common/styles/theme-dark.pcss'
import '@/common/styles/theme-light.pcss'
import '@/common/styles/theme-blue.pcss'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(EasyUI)
Vue.component(CollapseTransition.name, CollapseTransition)
// Vue.use(Gantt)

storage.setItem('version', '1.0.0')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
