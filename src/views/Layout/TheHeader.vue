<template>
  <div class="app-header">
    <div class="app-bars app-header-item left-item" @click="handleClickBars">
      <i class="fa fa-bars app-bars-icon" :class="{collapse: isSidebarCollapse}" aria-hidden="true"></i>
    </div>
    <div class="app-header-item left-item">
      <h3 class="app-header-title">海军辅助舰船信息化管理系统</h3>
    </div>
    <!-- <div class="app-header-item left-item rs_select_ship">
      <span class="label">请选择：</span>
      <el-select :value="selectShip" placeholder="请选择类型" @change="handleSelectShip">
        <el-option v-for="(c, i) in shipList" :key="i" :label="c.type" :value="c.value"></el-option>
      </el-select>
    </div>
    <div class="app-header-item left-item rs_select_ship">
      <el-input placeholder="请输入型号" clearable></el-input>
    </div>
    <div class="app-header-item left-item rs_select_ship">
      <el-input placeholder="请输入舷号/舰名" clearable></el-input>
    </div>
    <div class="app-header-item right-item">
      <div class="right-menu-item app-header-logout">
        <el-button  type="text" @click="handleLogout">注销</el-button>
      </div>

      <el-dropdown class="right-menu-item">
        <div>
          <i class="fa fa-image"></i>
        </div>
        <el-dropdown-menu slot="dropdown" class="app-header-dropdown-menu">
          <el-dropdown-item :class="{ 'is-disabled': theme === 'theme-dark' }" >
            <span @click="setTheme('theme-dark')" style="display:block;">深色主题</span>
          </el-dropdown-item>
          <el-dropdown-item :class="{ 'is-disabled': theme === 'theme-light' }">
            <span @click="setTheme('theme-light')" style="display:block;">浅色主题</span>
          </el-dropdown-item>
          <el-dropdown-item :class="{ 'is-disabled': theme === 'theme-blue' }" >
            <span @click="setTheme('theme-blue')" style="display:block;">蓝色主题</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <div class="right-menu-item">
        <el-tooltip effect="dark" content="全屏" placement="bottom">
          <screenfull class="screenfull"></screenfull>
        </el-tooltip>
      </div>
    </div> -->
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { use } from 'element-ui/lib/locale'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import enLocale from 'element-ui/lib/locale/lang/en'

import * as types from '@/store/mutation-types'
import Screenfull from '@/components/Screenfull/Screenfull'
import * as storage from '@/utils/storage'
import * as request from '@/utils/request'

export default {
  name: 'the-header',
  components: {
    Screenfull
  },
  data() {
    return {
      titleList: [],
      locale: storage.getItem('locale') || 'zh',
      theme: ''
    }
  },
  computed: {
    ...mapGetters([
      'isSidebarCollapse',
      'routeTitleList',
      'selectShip',
      'shipList'
    ])
  },
  created() {
    // 设置上次使用过的主题或初始默认主题theme-dark
    const theme = storage.getItem('theme') || 'theme-blue'
    this.setTheme(theme)
    const ship = storage.getItem('ship')
    if (ship) {
      this.$store.commit('SET_SHIP', ship)
    }
    this.fetchShipList()
  },
  methods: {
    ...mapMutations({
      handleClickBars: types.TOGGLE_SIDEBAR
    }),
    setTheme(themeClassName) {
      if (document.body.className !== themeClassName)
        document.body.className = themeClassName
      this.theme = themeClassName
      storage.setItem('theme', themeClassName)
    },
    switchLang(locale) {
      use(locale === 'zh' ? zhLocale : enLocale)
      this.$i18n.locale = this.locale = locale
      storage.setItem('locale', this.$i18n.locale)
    },
    handleLogout() {
      this.$router.push({ name: 'login' })
    },
    handleSelectShip(value) {
      storage.setItem('ship', value)
      this.$store.commit(types.SET_SHIP, value)
    },
    fetchShipList() {
      request
        .get('/shipTable')
        .then(response => {
          if (response && response.data) {
            const tempData = []
            response.data.forEach(item => {
              tempData.push({
                label: item.shipNum + '号--' + item.model,
                value: item.shipNum,
                shipName: item.shipName,
                type: item.type,
                model: item.model,
                index: item.index
              })
              this.$store.commit(
                types.SET_SHIPLIST,
                JSON.parse(JSON.stringify(tempData))
              )
            })
          }
        })
        .catch(e => {
          this.$message.error(e)
        })
    }
  }
}
</script>

<style scoped>
:root {
  --header-height: 50px;
}

.app-header {
  background: #f1f1f1;
  height: var(--header-height);
  line-height: var(--header-height);

  & .app-bars {
    padding: 0 10px;
    cursor: pointer;
  }

  & .app-breadcrumb {
    margin-left: 10px;
  }

  & .app-header-item {
    display: inline-block;
    line-height: var(--header-height);

    & .app-bars-icon {
      font-size: 1.4rem;
      height: var(--header-height);
      line-height: var(--header-height);
    }

    & .app-bars-icon.collapse {
      transform: rotate(90deg);
      transition: 0.38s;
    }

    & .el-breadcrumb__item {
      line-height: var(--header-height);
    }

    & .switch-lang {
      display: inline-block;
      height: var(--header-height);
      vertical-align: top;
      margin: 0 10px;

      & .header-lang {
        cursor: pointer;
        opacity: 0.7;

        &.is-active {
          opacity: 1;
        }
      }
    }

    & .app-header-title {
      margin: 0;
    }
  }

  & .left-item {
    float: left;
  }

  & .right-item {
    float: right;
    height: 100%;
    &:focus {
      outline: none;
    }
    & .right-menu-item {
      margin: 0 14px;
      float: right;
      height: 100%;
      font-size: 14px;
      font-weight: bold;
      color: #2c3e50;
    }

    & .screenfull {
      height: 20px;
      position: relative;
      top: 15px;
    }

    & .fa {
      font-size: 22px;
      line-height: var(--header-height);
    }

    & .dropdown-container {
      height: var(--header-height);
      margin-right: 30px;
      & .dropdown-img-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        & .dropdown-img {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        & .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
  & .rs_select_ship {
    margin-left: 40px;
    & .label {
      font-weight: bold;
    }
  }
}

.app-header-dropdown-menu {
  & .router-link-active {
    text-decoration: none;
  }

  & .is-disabled {
    cursor: none;
    color: #bbb;
    pointer-events: none;
  }
}
</style>
