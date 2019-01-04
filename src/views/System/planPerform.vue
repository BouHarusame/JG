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
            <p slot="header"><el-button @click="handleClickToggle" type="text" style="float:left;margin: -11px 10px 0 0;" :icon="icon"></el-button>项目计划</p>
            <TreeGrid
              :data="standardStatus" idField="id" treeField="name">
              <GridColumn field="name" title="计划阶段" width="200px"></GridColumn>
              <GridColumn field="startTime" title="开始时间"></GridColumn>
              <GridColumn field="endTime" title="结束时间"></GridColumn>
              <GridColumn field="fuze" title="负责人"></GridColumn>
              <GridColumn field="content" title="计划内容"></GridColumn>
            </TreeGrid>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog :title="title" :visible.sync="addDialog">
      <el-form label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="执行日期：">
              <el-date-picker value-format="yyyy-MM-dd"  style="width:100%"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="执行人：">
              <el-input ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="执行内容：">
              <el-input type="textarea" :rows="5"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="addDialog = false">保存</el-button>
        <el-button @click="addDialog = false">取消</el-button>
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
          name: '执行',
          icon: 'el-icon-plus',
          eventType: 'add'
        },
        /*{
          name: '删除',
          icon: 'el-icon-minus',
          eventType: 'del'
        },
        {
          name: '编辑',
          icon: 'el-icon-edit',
          eventType: 'edit'
        },*/
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
      addDialog: false,
      addPMemberDialog: false,
      addAppointedDialog: false,
      title: '',
      pMemberTitle: '',
      appointedTitle: '',
      standardStatus: []
      // pointShow: false
      // selected: []
    }
  },
  methods: {
    handleRowClickJc() {},
    handSetting() {},
    showCurrentJcConfig() {},
    fetchProjectStatusList() {
      request
        .get('/proStatus')
        .then(response => {
          if (response && response.data) {
            this.standardStatus = response.data
          }
        })
        .catch(e => {
          this.$message.error(e)
        })
    },
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
        item => item.memberId === this.pMemberData.memberId
      )
      if (row) {
        this.pMemberData.name = row.name
        this.pMemberData.sex = row.sex
        this.pMemberData.age = row.age
        this.pMemberData.title = row.title
        this.pMemberData.professional = row.professional
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
    handleZhixing() {
      this.title = '执行'
      this.addDialog = true
      // this.pMemberData = []
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
    handleClickBtnGroup(options) {
      const { type } = options
      switch (type) {
        case 'add':
          this.handleZhixing()
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
    this.fetchProjectStatusList()
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
