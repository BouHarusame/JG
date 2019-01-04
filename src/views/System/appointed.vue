<template>
  <div class="rs_view_item">
    <el-card>
      <TableBar @click="handleClickBtnGroup" :btn-group="btnGroup" slot="header"></TableBar>
      <el-row class="rs_p_row" :gutter="20">
        <el-col :span="6" v-show="cardSpanRight !== 24">
          <el-card class="rs_ps_card">
            <p slot="header">项目列表</p>
            <el-table
            border
            :data="appointedData"
            :highlight-current-row="true"
            @cell-click="handleRowClickJc"
            @row-dblclick="handSetting"
            @row-click="showCurrentJcConfig"
            height="100%">
             <el-table-column
              type="index"
              width="55"></el-table-column>
              <el-table-column label="项目名称">
                <template slot-scope="scope">
                  <p class="table-column">{{scope.row.proName}}</p>
                </template>
              </el-table-column>
              <el-table-column label="客户">
                <template slot-scope="scope">
                  <p class="table-column">{{scope.row.customer}}</p>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
        <el-col :span="cardSpanRight">
          <el-card class="rs_ps_card">
            <p slot="header"><el-button @click="handleClickToggle" type="text" style="float:left;margin: -11px 10px 0 0;" :icon="icon"></el-button>项目成员</p>
            <el-table
              :data="pMembersList"
              style="width: 100%"
              ref="mulTable"
              highlight-current-row
              @cell-click="handleRowClick">
                <el-table-column type="expand" fixed="left">
                  <template slot-scope="props">
                    <div class="rs-resume-outer">
                      <p class="rs-resume">学习经历</p>
                      <el-table
                        :data="props.row.resume.study"
                        style="width:100%;"
                        highlight-current-row
                        class="point">
                        <el-table-column
                          type="index"
                          width="55">
                        </el-table-column>
                        <el-table-column
                          label="开始时间"
                          width='120'>
                          <template slot-scope="scope">
                            <p class="table-column">{{scope.row.startTime}}</p>
                          </template>
                        </el-table-column>
                        <el-table-column
                          label="结束时间"
                          prop="endTime">
                        </el-table-column>
                        <el-table-column
                          label="学校"
                          prop="school">
                        </el-table-column>
                        <el-table-column
                          label="专业"
                          prop="professional">
                        </el-table-column>
                        <el-table-column
                          label="学位"
                          prop="degree">
                        </el-table-column>
                        <el-table-column
                          label="备注"
                          prop="mark">
                        </el-table-column>
                      </el-table>
                      <p class="rs-resume">工作经历</p>
                      <el-table
                        :data="props.row.resume.work"
                        style="width:100%;"
                        highlight-current-row
                        class="point">
                        <el-table-column
                          type="index"
                          width="55">
                        </el-table-column>
                        <el-table-column
                          label="开始时间"
                          width='120'>
                          <template slot-scope="scope">
                            <p class="table-column">{{scope.row.startTime}}</p>
                          </template>
                        </el-table-column>
                        <el-table-column
                          label="结束时间"
                          prop="endTime">
                        </el-table-column>
                        <el-table-column
                          label="公司"
                          prop="company">
                        </el-table-column>
                        <el-table-column
                          label="职位"
                          prop="position">
                        </el-table-column>
                        <el-table-column
                          label="成果"
                          prop="achievement">
                        </el-table-column>
                        <el-table-column
                          label="备注"
                          prop="mark">
                        </el-table-column>
                      </el-table>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  label="项目角色"
                  prop="role">
                </el-table-column>
                <el-table-column
                  label="人员编码"
                  prop="memberId">
                </el-table-column>
                <el-table-column
                  label="姓名"
                  prop="name">
                </el-table-column>
                <el-table-column
                  label="职称"
                  prop="title">
                </el-table-column>
                <!-- <el-table-column
                  label="职务"
                  prop="position">
                </el-table-column> -->
                <el-table-column
                  label="专业">
                  <template slot-scope="scope">
                    <p class="table-column">{{scope.row.professional}}</p>
                  </template>
                </el-table-column>
                <el-table-column
                  label="备注">
                  <template slot-scope="scope">
                    <p class="table-column">{{scope.row.mark}}</p>
                  </template>
                </el-table-column>
                <!-- <el-table-column
                  label="部门"
                  prop="department">
                </el-table-column>
                <el-table-column
                  label="用户编码">
                  <template slot-scope="scope">
                    <p class="table-column">{{scope.row.roleId}}</p>
                  </template>
                </el-table-column> -->
            </el-table>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog :title="pMemberTitle" :visible.sync="addPMemberDialog" @open="handleGetMemberInfo">
      <el-form label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="项目角色：">
              <el-select v-model="pMemberData.role" placeholder="请选择" style="width:100%;">
                <el-option label="项目经理" value="项目经理"></el-option>
                <el-option label="设计师" value="设计师"></el-option>
                <el-option label="铸造师" value="铸造师"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="人员编码：">
              <el-select v-model="pMembersList.memberId" @change="handleGetMemberInfo" style="width:100%;">
                <el-option v-for="(c, i) in pMembersList" :key="i" :label="c.memberId" :value="c.memberId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名：">
              <el-input v-model="pMembersList.name" readonly></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item label="性别：">
              <el-input v-model="pMembersList.sex" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年龄">
              <el-input v-model="pMembersList.age" readonly></el-input>
            </el-form-item>
          </el-col> -->
          <el-col :span="12">
            <el-form-item label="职称：">
              <el-input v-model="pMembersList.title" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="专业：">
              <el-input v-model="pMembersList.professional" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注：">
              <el-input type="textarea" :rows="5" v-model="pMembersList.memberMark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="handleClickPointSave">保存</el-button>
        <el-button @click="addPMemberDialog = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import TableBar from '@/components/TableBar/TableBar'
import { mapGetters } from 'vuex'
import * as request from '@/utils/request'
export default {
  name: 'Type',
  data() {
    return {
      cardSpanRight: 18,
      appointedData: [],
      icon: 'el-icon-d-arrow-left',
      btnGroup: [
        {
          name: '新增',
          icon: 'el-icon-plus',
          eventType: 'appointed'
        },
        {
          name: '删除',
          icon: 'el-icon-minus',
          eventType: 'del'
        },
        {
          name: '编辑',
          icon: 'el-icon-edit',
          eventType: 'edit'
        },
        {
          name: '查看',
          icon: 'fa fa-file-text',
          eventType: 'view',
          disabled: false
        },
        {
          name: '查询',
          icon: 'fa fa-search',
          eventType: 'search',
          disabled: false
        },
        {
          name: '设置',
          icon: 'el-icon-setting',
          eventType: 'setting',
          disabled: false
        },
        {
          name: '附件',
          icon: 'fa fa-link',
          eventType: 'link'
        },
        {
          name: '打印',
          icon: 'fa fa-print',
          eventType: 'print'
        },
        {
          name: '导出',
          icon: 'fa fa-share',
          eventType: 'share',
          disabled: false
        },
        {
          name: '工作流',
          icon: 'el-icon-refresh',
          eventType: 'refresh'
        }
      ],
      // currentIndex: null,
      currentPMemberIndex: null,
      currentProId: null,
      // confirmDel: false,
      confirmPMemberDel: false,
      // formData: [],
      pMemberData: [],
      pMembersData: [],
      // addDialog: false,
      addPMemberDialog: false,
      addAppointedDialog: false,
      // title: '',
      pMemberTitle: '',
      appointedTitle: '',
      pMembersList: []
      // pointShow: false
      // selected: []
    }
  },
  methods: {
    handleRowClickJc() {},
    handSetting() {},
    showCurrentJcConfig() {},
    handleRowClick(row, column, rowIndex, columnIndex) {
      if (column.id !== 0) {
        this.currentRowIndex = rowIndex
        this.$refs.mulTable.clearSelection()
        this.$refs.mulTable.toggleRowSelection(row)
      }
    },
    handleClickToggle() {
      if (this.cardSpanRight === 24) {
        this.icon = 'el-icon-d-arrow-left'
        this.cardSpanRight = 18
      } else {
        this.icon = 'el-icon-d-arrow-right'
        this.cardSpanRight = 24
      }
    },
    handClickProject(row) {
      this.pMembersData = row.members
      this.currentProId = row.proId
      // this.btnGroup[0].disabled = false
    },
    handleGetMemberInfo() {
      const row = this.$store.getters.membersList.find(
        item => item.memberId === this.pMembersList.memberId
      )
      if (row) {
        this.pMembersList.name = row.name
        this.pMembersList.title = row.title
        this.pMembersList.professional = row.professional
      }
    },
    handleClickPMemberEdit(index, row) {
      this.pMemberTitle = '编辑项目成员信息'
      this.addPMemberDialog = true
      this.pMemberData = row
    },
    handleClickPMemberDel(index, row) {
      this.currentProId = row.pId
      this.currentPMemberIndex = index
      this.confirmPMemberDel = true
    },
    handleConfirmPointDel(row) {
      this.appointedData.forEach(item => {
        if (item.proId === row.pId) {
          item.members.splice(this.currentPMemberIndex, 1)
        }
      })
      this.currentProId = null
      this.currentPMemberIndex = null
      this.confirmPMemberDel = false
    },
    handlePMemberAdd() {
      this.pMemberTitle = '新增项目成员'
      this.addPMemberDialog = true
      this.pMemberData = []
      // console.log(this.currentProId)
    },
    /*handleAppointed() {
      this.addAppointedDialog = true
      this.appointedTitle = '任命项目成员'
    },*/
    handleClickPointSave() {
      if (this.pMemberTitle === '新增项目成员') {
        this.appointedData.forEach(item => {
          if (item.proId === this.currentProId) {
            this.pMemberData.pId = this.currentProId
            item.members.unshift(this.pMemberData)
          }
        })
      }
      this.$message.success('保存成功')
      this.addPMemberDialog = false
    },
    fetchProjectList() {
      request
        .get('/project')
        .then(response => {
          if (response && response.data) {
            this.appointedData = response.data
          }
        })
        .catch(e => {
          this.$message.error(e)
        })
    },
    fetchPMembersList() {
      request
        .get('/pMembersTable')
        .then(response => {
          if (response && response.data) {
            this.pMembersList = response.data
          }
        })
        .catch(e => {
          this.$message.error(e)
        })
    },
    handleClickBtnGroup(options) {
      const { type } = options
      switch (type) {
        case 'appointed':
          this.handlePMemberAdd()
          break
        case 'refresh':
          this.$message.success('刷新成功')
          break
        case 'export':
          this.$message.success('导出成功')
          break
      }
    }
  },
  created() {
    this.fetchProjectList()
    this.fetchPMembersList()
    this.$store.dispatch('fetchMembers')
  },
  computed: {
    ...mapGetters(['membersList'])
  },
  components: {
    TableBar
  }
}
</script>
<style scoped>
.strength {
}
</style>
