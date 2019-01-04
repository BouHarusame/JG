<template>
  <div class="home">
    <div class="home-wrapper">
      <div class="home-content">
        <!-- 舰值班表 -->
        <div class="duty-schedule">
          <div class="duty-schedule-head">
            <div class="title">舰值班表</div>
            <div class="button">
              <i class="fa fa-refresh"></i>
              <i class="fa fa-minus" v-if="show"
                 @click="show = !show"></i>
              <i class="fa fa-plus" v-else
                 @click="show = !show"></i>
            </div>
          </div>
          <el-collapse-transition>
            <div class="duty-schedule-body"
                 v-show="show">

            </div>
          </el-collapse-transition>
        </div>
        <!-- 在位情况 -->
        <div class="duty-schedule">
          <div class="duty-schedule-head">
            <div class="title">在位情况</div>
            <div class="button">
              <i class="fa fa-refresh"></i>
              <i class="fa fa-minus" v-if="show1"
                 @click="show1 = !show1"></i>
              <i class="fa fa-plus" v-else
                 @click="show1 = !show1"></i>
            </div>
          </div>
          <el-collapse-transition>
            <div class="duty-schedule-body"
                 v-show="show1">
              <el-table style="width: 100%; height: 260px;border:1px solid #ccc">
                <el-table-column prop="item1"
                                 label="部门"
                                 width="300">
                </el-table-column>
                <el-table-column prop="item2"
                                 label="在位">
                </el-table-column>
                <el-table-column prop="item3"
                                 label="休假">
                </el-table-column>
                <el-table-column prop="item4"
                                 label="调学">
                </el-table-column>
                <el-table-column prop="item5"
                                 label="出差">
                </el-table-column>
                <el-table-column prop="item6"
                                 label="住院">
                </el-table-column>
                <el-table-column prop="item7"
                                 label="统计">
                </el-table-column>
              </el-table>
            </div>
          </el-collapse-transition>
        </div>

        <div class="home-row">
          <div class="left">
            <!-- 通知公告 -->
            <div class="duty-schedule">
              <div class="duty-schedule-head">
                <div class="title">通知公告</div>
                <div class="button">
                  <i class="fa fa-refresh"></i>
                  <i class="fa fa-minus" v-if="show2"
                     @click="show2 = !show2"></i>
                  <i class="fa fa-plus" v-else
                     @click="show2 = !show2"></i>
                </div>
              </div>
              <el-collapse-transition>
                <div class="duty-schedule-body"
                     v-show="show2">
                  <el-table style="width: 100%; height: 260px;border:1px solid #ccc">
                    <el-table-column prop="item1"
                                     label="主题"
                                     width="300">
                    </el-table-column>
                    <el-table-column prop="item2"
                                     label="发布日期">
                    </el-table-column>
                    <el-table-column prop="item3"
                                     label="附件数">
                    </el-table-column>
                  </el-table>
                </div>
              </el-collapse-transition>
            </div>
          </div>
          <div class="right">
            <!-- 报警信息 -->
            <div class="duty-schedule">
              <div class="duty-schedule-head">
                <div class="title">报警信息</div>
                <div class="button">
                  <i class="fa fa-refresh"></i>
                  <i class="fa fa-minus" v-if="show3"
                     @click="show3 = !show3"></i>
                  <i class="fa fa-plus" v-else
                     @click="show3 = !show3"></i>
                </div>
              </div>
              <el-collapse-transition>
                <div class="duty-schedule-body"
                     v-show="show3">
                  <el-table style="width: 100%; height: 260px;border:1px solid #ccc">
                    <el-table-column prop="item1"
                                     label="分类名称"
                                     width="300">
                    </el-table-column>
                    <el-table-column prop="item2"
                                     label="超期数量">
                    </el-table-column>
                    <el-table-column prop="item3"
                                     label="不足数量">
                    </el-table-column>
                  </el-table>
                </div>
              </el-collapse-transition>
            </div>
          </div>
        </div>

        <!-- 油水库存情况 -->
        <div class="duty-schedule">
          <div class="duty-schedule-head">
            <div class="title">油水库存情况</div>
            <div class="button">
              <i class="fa fa-refresh"></i>
              <i class="fa fa-minus" v-if="show4"
                 @click="show4 = !show4"></i>
              <i class="fa fa-plus" v-else
                     @click="show4 = !show4"></i>
            </div>
          </div>
          <el-collapse-transition>
            <div class="duty-schedule-body"
                 v-show="show4">
            </div>
          </el-collapse-transition>
        </div>

        <div class="home-row">
          <div class="left">
            <!-- 体能测试 -->
            <div class="duty-schedule">
              <div class="duty-schedule-head">
                <div class="title">体能测试</div>
                <div class="button">
                  <i class="fa fa-refresh"></i>
                  <i class="fa fa-minus" v-if="show5"
                     @click="show5 = !show5"></i>
                  <i class="fa fa-plus" v-else
                     @click="show5 = !show5"></i>
                </div>
              </div>
              <el-collapse-transition>
                <div class="duty-schedule-body"
                     v-show="show5">
                  <el-table style="width: 100%; height: 260px;border:1px solid #ccc">
                    <el-table-column prop="item1"
                                     label="部门"
                                     width="150">
                    </el-table-column>
                    <el-table-column prop="item2"
                                     label="俯卧撑">
                      <el-table-column prop="item21"
                                       label="合格"
                                       >
                      </el-table-column>
                      <el-table-column prop="item22"
                                       label="不合格">
                      </el-table-column>
                    </el-table-column>
                    <el-table-column prop="item3"
                                     label="往返跑">
                      <el-table-column prop="item31"
                                       label="合格"
                                       >
                      </el-table-column>
                      <el-table-column prop="item32"
                                       label="不合格">
                      </el-table-column>
                    </el-table-column>
                    <el-table-column prop="item3"
                                     label="仰卧起坐">
                      <el-table-column prop="item31"
                                       label="合格"
                                       >
                      </el-table-column>
                      <el-table-column prop="item32"
                                       label="不合格">
                      </el-table-column>
                    </el-table-column>
                    <el-table-column prop="item3"
                                     label="3000米跑">
                      <el-table-column prop="item31"
                                       label="合格"
                                      >
                      </el-table-column>
                      <el-table-column prop="item32"
                                       label="不合格">
                      </el-table-column>
                    </el-table-column>
                  </el-table>
                </div>
              </el-collapse-transition>
            </div>
          </div>
          <div class="right">
            <!-- 体能测试柱状图 -->
            <div class="duty-schedule">
              <div class="duty-schedule-head">
                <div class="title">体能测试柱状图</div>
                <div class="button">
                  <i class="fa fa-refresh"></i>
                  <i class="fa fa-minus" v-if="show6"
                     @click="show6 = !show6"></i>
                  <i class="fa fa-plus" v-else
                     @click="show6 = !show6"></i>
                </div>
              </div>
              <el-collapse-transition>
                <div class="duty-schedule-body"
                     v-show="show6">
                  <div class="duty-schedule-select">
                    <el-select v-model="value" 
                    popper-class="select-items" 
                    value-key="俯卧撑"
                               placeholder="俯卧撑">
                      <el-option v-for="item in options"
                                 :key="item.value"
                                 :label="item.label"
                                 :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </el-collapse-transition>
            </div>
          </div>
        </div>
          <!-- 待处理事务 -->
        <div class="duty-schedule">
          <div class="duty-schedule-head">
            <div class="title">待处理事务</div>
            <div class="button">
              <i class="fa fa-refresh"></i>
              <i class="fa fa-minus" v-if="show7"
                 @click="show7 = !show7"></i>
              <i class="fa fa-plus" v-else
                     @click="show7 = !show7"></i>
            </div>
          </div>
          <el-collapse-transition>
            <div class="duty-schedule-body"
                 v-show="show7">
              <el-table style="width: 100%; height: 260px;border:1px solid #ccc">
                <el-table-column prop="item1"
                                  label="事务名称"
                                  width="300">
                </el-table-column>
                <el-table-column prop="item2"
                                  label="状态">
                </el-table-column>
                <el-table-column prop="item3"
                                  label="主题">
                </el-table-column>
                 <el-table-column prop="item4"
                                  label="事务收到时间">
                </el-table-column>
                <el-table-column prop="item5"
                                  label="要求完成时间">
                </el-table-column>
                 <el-table-column prop="item6"
                                  label="操作">
                </el-table-column>
              </el-table>
            </div>
          </el-collapse-transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as request from '@/utils/request'
import { mapGetters } from 'vuex'
export default {
  name: 'home',
  data() {
    return {
      show: false,
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false,
      show6: false,
      show7: false,
      value: '俯卧撑',
      options: [
        {
          value: '俯卧撑',
          label: '俯卧撑'
        },
        {
          value: '往返跑',
          label: '往返跑'
        },
        {
          value: '仰卧起坐',
          label: '仰卧起坐'
        },
        {
          value: '3000米跑',
          label: '3000米跑'
        }
      ],
      version: '',
      typeList: [],
      ship: '',
      data: [
        {
          label: '舰艇一',
          children: [
            {
              label: '系统一',
              status: 'add',
              children: [
                {
                  label: '装备一',
                  status: 'edit'
                },
                {
                  label: '装备二',
                  status: 'add'
                }
              ]
            },
            {
              label: '系统二',
              children: [
                {
                  label: '装备一',
                  status: 'reduce'
                },
                {
                  label: '装备二'
                },
                {
                  label: '装备三'
                }
              ]
            },
            {
              label: '系统三',
              children: [
                {
                  label: '装备一',
                  status: 'edit'
                },
                {
                  label: '装备二'
                },
                {
                  label: '装备三'
                }
              ]
            }
          ]
        }
      ],
      dDialog: false,
      icon: 'el-icon-minus',
      visible: false,
      selectedShip: ''
    }
  },
  methods: {
    fetchTypeList() {
      request
        .get('/repairType')
        .then(response => {
          if (response && response.data) {
            this.typeList = response.data
          }
        })
        .catch(e => {
          this.$message.error(e)
        })
    },
    handleClickViewDetail(data) {
      this.dDialog = true
    },
    handleExpand() {
      this.icon = this.icon === 'el-icon-minus' ? 'el-icon-plus' : this.icon
      this.visible = !this.visible
    }
  },
  created() {
    this.fetchTypeList()
  },
  computed: {
    ...mapGetters(['selectShip', 'shipList'])
  },
  watch: {
    selectShip: {
      handler(newV) {
        this.selectedShip = newV
      },
      immediate: true
    }
  }
}
</script>

<style scoped lang="stylus">
.home
  width 100%
  height 100%
  .home-wrapper
    width 100%
    min-height 100%
    background url('../../common/images/home.jpg') no-repeat center
    background-size cover
    padding 20px 10px
    box-sizing border-box
    .home-content
      width 100%
      .duty-schedule
        width 100%
        background #ffffff
        border-radius 3px
        border-top 3px solid #00c0ef
        transition box-shadow ease-in-out 0.33s
        cursor pointer
        margin-bottom 20px
        &:hover
          box-shadow -1px 3px 9px -1px rgba(171, 171, 171, 1)
      .duty-schedule-head
        height 34px
        display flex
        justify-content flex-start
        align-items center
        .title
          flex 1
          font-size 14px
          color #000000
          padding-left 10px
        .button
          width 80px
          i
            display inline-block
            color #97a0b3
            margin-right 15px
          .fa-refresh
            margin-left 10px
        &:hover
          background #f9f9f9
      .duty-schedule-body
        height 300px
        padding 20px
        position relative
      .home-row
        width 100%
        display flex
        justify-content space-between
        .left
          margin-right 40px
          flex 1
          max-width 50%
        .right
          flex 1
      .duty-schedule-select
        width 100px
        height 24px
        position absolute
        right 20px
        top 10px
        .select-items
          width 100px
</style>
