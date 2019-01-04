<template>
    <div class="side-bar">
       <div>
      <div class="meun-button" @click="show1 = !show1"><i class="fa fa-th-large"></i><span>常用功能</span></div>
        <el-collapse-transition>
          <div v-show="show1" class="meun-box">
            <el-menu class="el-menu" :unique-opened="true" active-text-color="#409eff" :collapse="isSidebarCollapse" :default-active="activeMenuIndex">
              <template v-for="menu in navMenuList" >

                <el-submenu v-if="menu.children && menu.children.length" :key="menu.routeName" :index="menu.routeName">

                  <template slot="title">
                    <i v-if="menu.icon" :class="menu.icon"></i>
                    <span>{{ menu.title }}</span>
                  </template>

                  <template v-for="child in menu.children">
                    <div :key="child.routeName" class="wrap" >
                      <el-submenu v-if="child.children && child.children.length"  :key="child.routeName" :index="child.routeName">
                        <template slot="title">
                          <i v-if="child.icon" :class="menu.icon"></i>
                          <span>{{ child.title }}</span>
                        </template>
                        <el-menu-item v-for="cchild in child.children" :key="cchild.routeName" :index="cchild.routeName">
                          {{ cchild.title }}
                        </el-menu-item>
                      </el-submenu>
                      <el-menu-item v-else :index="child.routeName">
                        {{ child.title }}
                      </el-menu-item>
                    </div>
                  </template>
                </el-submenu>

                <el-menu-item v-else :key="menu.routeName" :index="menu.routeName">
                  <i v-if="menu.icon" :class="menu.icon"></i>
                  <span>{{ menu.title }}</span>
                </el-menu-item>

              </template>
            </el-menu>
          </div>
        </el-collapse-transition>
      </div>
      <div >
        <div class="meun-button" @click="show = !show"><i class="fa fa-list-ul"></i><span>功能列表</span></div>
        <div class="search-box">
          <el-input></el-input><i class="fa fa-search"></i>
        </div>
        <el-collapse-transition>
          <div v-show="show" class="meun-box">
          <el-menu class="el-menu" :unique-opened="true" active-text-color="#409eff" :collapse="isSidebarCollapse" @select="handleMenuSelect" :default-active="activeMenuIndex">
            <template v-for="menu in navMenu" >

              <el-submenu v-if="menu.children && menu.children.length" :key="menu.routeName" :index="menu.routeName">

                <template slot="title">
                  <i v-if="menu.icon" :class="menu.icon"></i>
                  <span>{{ menu.title }}</span>
                </template>

                <template v-for="child in menu.children">
                  <div :key="child.routeName" class="wrap" >
                    <el-submenu v-if="child.children && child.children.length"  :key="child.routeName" :index="child.routeName">
                      <template slot="title">
                        <i v-if="child.icon" :class="menu.icon"></i>
                        <span>{{ child.title }}</span>
                      </template>
                      <el-menu-item v-for="cchild in child.children" :key="cchild.routeName" :index="cchild.routeName">
                        {{ cchild.title }}
                      </el-menu-item>
                    </el-submenu>
                    <el-menu-item v-else :index="child.routeName">
                      {{ child.title }}
                    </el-menu-item>
                  </div>
                </template>
              </el-submenu>

              <el-menu-item v-else :key="menu.routeName" :index="menu.routeName">
                <i v-if="menu.icon" :class="menu.icon"></i>
                <span>{{ menu.title }}</span>
              </el-menu-item>

            </template>
          </el-menu>
          </div>
        </el-collapse-transition>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'the-sidebar',
  data() {
    return {
      show: false,
      show1: true,
      // menus: [
      //   {
      //     id: '100010001',
      //     name: 'user',
      //     title: '用户管理',
      //     parent: '100000000',
      //     index: 0
      //   },
      //   {
      //     id: '100010002',
      //     name: 'role',
      //     title: '角色管理',
      //     parent: '100000000',
      //     index: 1
      //   },
      //   {
      //     id: '100010003',
      //     name: 'dict',
      //     title: '数据字典',
      //     parent: '100000000',
      //     index: 2
      //   },
      //   {
      //     id: '100010004',
      //     name: 'params',
      //     title: '参数设置',
      //     parent: '100000000',
      //     index: 3
      //   },
      //   {
      //     id: '100010005',
      //     name: 'workflow',
      //     title: '工作流',
      //     parent: '100000000',
      //     index: 4
      //   },
      //   {
      //     id: '100010002',
      //     name: 'type',
      //     title: '舰艇类型管理',
      //     parent: null,
      //     icon: 'el-icon-info',
      //     index: 0
      //   },
      //   {
      //     id: '100020002',
      //     name: 'strength',
      //     title: '舰艇实力',
      //     icon: 'el-icon-rank',
      //     parent: null,
      //     index: 1
      //   },
      //   {
      //     id: '100030002',
      //     name: 'record',
      //     title: '舰艇履历',
      //     icon: 'el-icon-printer',
      //     parent: null,
      //     index: 2
      //   },
      //   {
      //     id: '101000005',
      //     name: 'buildstatus',
      //     title: '设计建造阶段',
      //     parent: '100030002',
      //     index: 0
      //   },
      //   {
      //     id: '102000005',
      //     name: 'buildrecord',
      //     title: '设计建造记录',
      //     parent: '100030002',
      //     index: 1
      //   },
      //   {
      //     id: '103000005',
      //     name: 'repairtype',
      //     title: '修理改装类型',
      //     parent: '100030002',
      //     index: 2
      //   },
      //   {
      //     id: '104000005',
      //     name: 'repairrecord',
      //     title: '修理改装记录',
      //     parent: '100030002',
      //     index: 3
      //   },
      //   {
      //     id: '100040002',
      //     name: 'property',
      //     title: '舰艇性能',
      //     parent: null,
      //     icon: 'el-icon-date',
      //     index: 3
      //   },
      //   {
      //     id: '101040002',
      //     name: 'standard',
      //     title: '标准性能参数维护',
      //     parent: '100040002',
      //     index: 0
      //   },
      //   {
      //     id: '102040002',
      //     name: 'configuration',
      //     title: '舰船性能参数配置',
      //     parent: '100040002',
      //     index: 1
      //   },
      //   {
      //     id: '103040002',
      //     name: 'total',
      //     title: '总体性能',
      //     parent: '100040002',
      //     index: 2
      //   },
      //   {
      //     id: '104040002',
      //     name: 'mainsystem',
      //     title: '主要系统',
      //     parent: '100040002',
      //     index: 3
      //   },
      //   {
      //     id: '100050002',
      //     name: 'project',
      //     title: '项目管理',
      //     parent: null,
      //     icon: 'el-icon-document',
      //     index: 4
      //   },
      //   {
      //     id: '101050002',
      //     name: 'members',
      //     title: '人员基本信息',
      //     parent: '100050002',
      //     index: 0
      //   },
      //   {
      //     id: '102050002',
      //     name: 'prostatus',
      //     title: '标准项目计划',
      //     parent: '100050002',
      //     index: 1
      //   },
      //   {
      //     id: '103050002',
      //     name: 'projectrecord',
      //     title: '项目基本信息',
      //     parent: '100050002',
      //     index: 2
      //   },
      //   {
      //     id: '104050002',
      //     name: 'appointed',
      //     title: '人员任命书',
      //     parent: '100050002',
      //     index: 3
      //   },
      //   {
      //     id: '105050002',
      //     name: 'planSet',
      //     title: '项目计划编制',
      //     parent: '100050002',
      //     index: 4
      //   },
      //   {
      //     id: '106050002',
      //     name: 'planAudit',
      //     title: '项目计划审核',
      //     parent: '100050002',
      //     index: 5
      //   },
      //   {
      //     id: '107050002',
      //     name: 'planPerform',
      //     title: '项目计划执行',
      //     parent: '100050002',
      //     index: 6
      //   },
      //   {
      //     id: '108050002',
      //     name: 'planConfirm',
      //     title: '项目计划确认',
      //     parent: '100050002',
      //     index: 7
      //   },
      //   {
      //     id: '109050002',
      //     name: 'planChange',
      //     title: '项目计划变更',
      //     parent: '100050002',
      //     index: 8
      //   },
      //   {
      //     id: '110050002',
      //     name: 'planInquire',
      //     title: '查询计划执行情况',
      //     parent: '100050002',
      //     index: 9
      //   },
      //   {
      //     id: '111050002',
      //     name: 'contract',
      //     title: '收入合同信息',
      //     parent: '100050002',
      //     index: 10
      //   },
      //   {
      //     id: '100000000',
      //     name: 'system',
      //     title: '系统管理',
      //     parent: null,
      //     icon: 'el-icon-setting',
      //     index: 5
      //   }
      // ],
      menus: [
        {
          id: '100010002',
          name: 'strength',
          title: '军事工作',
          icon: 'el-icon-rank',
          parent: null,
          index: 1
        },
        {
          id: '100020001',
          name: 'strength1',
          title: '计划管理',
          icon: 'el-icon-rank',
          parent: '100010002',
          index: 0
        },
        {
          id: '100030001',
          name: 'strength11',
          title: '使用方案管理',
          icon: 'el-icon-rank',
          parent: '100020001',
          index: 0
        },
        {
          id: '100030002',
          name: 'strength12',
          title: '训练方案管理',
          icon: 'el-icon-rank',
          parent: '100020001',
          index: 0
        },
        {
          id: '100030003',
          name: 'strength13',
          title: '培训计划管理',
          icon: 'el-icon-rank',
          parent: '100020001',
          index: 0
        },
        {
          id: '100020002',
          name: 'strength2',
          title: '训练管理',
          icon: 'el-icon-rank',
          parent: '100010002',
          index: 1
        },
        {
          id: '100030002',
          name: 'strength2',
          parent: '100020002',
          index: 0
        },
        {
          id: '100020003',
          name: 'strength3',
          title: '人员管理',
          icon: 'el-icon-rank',
          parent: '100010002',
          index: 2
        },
        {
          id: '100030003',
          name: 'strength2',
          parent: '100020003',
          index: 0
        },
        {
          id: '100020004',
          name: 'strength4',
          title: '舰务管理',
          icon: 'el-icon-rank',
          parent: '100010002',
          index: 3
        },
        {
          id: '100030004',
          name: 'strength2',
          parent: '100020004',
          index: 0
        },
        {
          id: '100020005',
          name: 'strength5',
          title: '出航检查',
          icon: 'el-icon-rank',
          parent: '100010002',
          index: 4
        },
        {
          id: '100030005',
          name: 'strength2',
          parent: '100020005',
          index: 0
        },
        {
          id: '100020006',
          name: 'strength6',
          title: '部署表',
          icon: 'el-icon-rank',
          parent: 100010002,
          index: 5
        },
        {
          id: '100030006',
          name: 'strength2',
          parent: '100020006',
          index: 0
        },
        {
          id: '100010003',
          name: 'projectrecord',
          title: '政治工作',
          icon: 'el-icon-rank',
          parent: null,
          index: 2
        },
        {
          id: '100020031',
          name: 'projectrecor1',
          title: '组织工作',
          icon: 'el-icon-rank',
          parent: '100010003',
          index: 0
        },
        {
          id: '100030021',
          name: 'projectrecord11',
          icon: 'el-icon-rank',
          parent: '100020031',
          index: 0
        },
        {
          id: '100020032',
          name: 'projectrecor2',
          title: '干部工作',
          icon: 'el-icon-rank',
          parent: '100010003',
          index: 1
        },
        {
          id: '100030031',
          name: 'projectrecord21',
          title: '任免',
          icon: 'el-icon-rank',
          parent: '100020032',
          index: 0
        },
        {
          id: '100030032',
          name: 'projectrecord22',
          title: '调配',
          icon: 'el-icon-rank',
          parent: '100020032',
          index: 1
        },
        {
          id: '100030033',
          name: 'projectrecord23',
          title: '科干',
          icon: 'el-icon-rank',
          parent: '100020032',
          index: 2
        },
        {
          id: '100030034',
          name: 'projectrecord24',
          title: '福利',
          icon: 'el-icon-rank',
          parent: '100020032',
          index: 3
        },
        {
          id: '100030035',
          name: 'projectrecord25',
          title: '计生',
          icon: 'el-icon-rank',
          parent: '100020032',
          index: 4
        },
        {
          id: '100020033',
          name: 'projectrecor3',
          title: '宣传工作',
          icon: 'el-icon-rank',
          parent: '100010003',
          index: 2
        },
        {
          id: '100030041',
          name: 'projectrecord31',
          icon: 'el-icon-rank',
          parent: '100020033',
          index: 0
        },
        {
          id: '100020034',
          name: 'projectrecor4',
          title: '安全工作',
          icon: 'el-icon-rank',
          parent: '100010003',
          index: 3
        },
        {
          id: '100030051',
          name: 'projectrecor41',
          icon: 'el-icon-rank',
          parent: '100020034',
          index: 0
        },
        {
          id: '100010004',
          name: 'projectrecord1',
          title: '装备工作',
          icon: 'el-icon-rank',
          parent: null,
          index: 3
        },
        {
          id: '100020041',
          name: 'projectrecord41',
          icon: 'el-icon-rank',
          parent: '100010004',
          index: 0
        },
        {
          id: '100010005',
          name: 'projectrecord2',
          title: '后勤工作',
          icon: 'el-icon-rank',
          parent: null,
          index: 4
        },
        {
          id: '100020051',
          name: 'projectrecord51',
          icon: 'el-icon-rank',
          title: '供给保障',
          parent: '100010005',
          index: 0
        },
        {
          id: '100020052',
          name: 'projectrecord52',
          icon: 'el-icon-rank',
          title: '卫勤保障',
          parent: '100010005',
          index: 1
        },
        {
          id: '100030051',
          name: 'crewMedicalRecords',
          icon: 'el-icon-rank',
          title: '舰员医疗档案',
          parent: '100020052',
          index: 0
        },
        {
          id: '100020053',
          name: 'projectrecord53',
          title: '油水保障',
          icon: 'el-icon-rank',
          parent: '100010005',
          index: 2
        },
        {
          id: '100010006',
          name: 'projectrecord3',
          title: '基础配置',
          icon: 'el-icon-rank',
          parent: null,
          index: 5
        },
        {
          id: '100020061',
          name: 'projectrecord61',
          icon: 'el-icon-rank',
          parent: '100010006',
          index: 0
        },
        {
          id: '100010007',
          name: 'projectrecord4',
          title: '工作流',
          icon: 'el-icon-rank',
          parent: null,
          index: 6
        },
        {
          id: '100020071',
          name: 'projectrecord71',
          icon: 'el-icon-rank',
          parent: '100010007',
          index: 0
        },
        {
          id: '100010008',
          name: 'projectrecord5',
          title: '系统管理',
          icon: 'el-icon-rank',
          parent: null,
          index: 7
        },
        {
          id: '100020081',
          name: 'projectrecord81',
          icon: 'el-icon-rank',
          parent: '100010008',
          index: 0
        }
      ],
      menuss: [
        {
          id: '200010001',
          name: 'user1',
          title: '检修任务',
          icon: 'el-icon-setting',
          index: 0
        },
        {
          id: '200010002',
          name: 'role1',
          title: '个人文件柜',
          icon: 'el-icon-setting',
          index: 1
        },
        {
          id: '200010003',
          name: 'dict1',
          title: '状态信息监测',
          icon: 'el-icon-setting',
          index: 2
        },
        {
          id: '200010004',
          name: 'params1',
          title: '装备报表分析',
          icon: 'el-icon-setting',
          index: 3
        },
        {
          id: '200010005',
          name: 'workflow1',
          title: '装修工程单',
          icon: 'el-icon-setting',
          index: 4
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'navMenuList',
      'navMenu',
      'isSidebarCollapse',
      'activeMenuIndex'
    ])
  },
  created() {
    this.$store.dispatch('fetchNavMenu', this.menus)
    this.$store.dispatch('fetchNavMenuS', this.menuss)
  },
  methods: {
    handleMenuSelect(routeName, index) {
      this.$router.push({ name: routeName })
    }
  }
}
</script>

<style scoped>
.side-bar {
  height: 100%;
  background: #1d89b8;
  & .el-input {
    width: 125px;
  }
}
.search-box {
  border: 1px solid #fff;
  width: 150px;
  height: 30px;
  line-height: 30px;
  margin: 10px auto;
  border-radius: 5px;
}
.fa-search {
  color: #fff;
}
.meun-button {
  width: 100%;
  height: 40px;
  line-height: 40px;
  padding-left: 24px;
  background: #1d89b8;
  color: #fff;
  border-bottom: 1px solid #999;
}
.meun-button i {
  color: #fff;
}
.meun-button span {
  margin-left: 10px;
  font-size: 14px;
}
.meun-box {
  height: 260px;
}
.el-menu {
  overflow: auto;
  height: 100%;
  /* &:not(.el-menu--collapse) {
    min-height: 400px;
  } */

  & .el-menu--collapse > .el-menu-item span,
  & .el-menu--collapse > .el-submenu > .el-submenu__title span {
    opacity: 0;
    transition: opacity 0.1s cubic-bezier(0.55, 0, 0.1, 1);
  }
}
</style>
