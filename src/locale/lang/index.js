import Vue from 'vue'
import VueI18n from 'vue-i18n'

import zh from './zh-CN'
import en from './en'
import * as storage from '@/utils/storage'

Vue.use(VueI18n)

const messages = {
  zh,
  en
}

const i18n = new VueI18n({
  locale: storage.getItem('locale') || 'zh',
  messages
})

export default i18n
