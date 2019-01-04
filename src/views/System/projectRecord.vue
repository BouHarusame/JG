<template>
  <div class="rs_view_item">
    <el-card>
      <!-- <TableBar @click="handleClickBtnGroup" :btn-group="btnGroup" slot="header"></TableBar> -->
      <el-button-group slot="header">
        <el-button @click="handleClickBtnGroup(btn, $event)" type="primary" size="mini" v-for="(btn, index) in btnGroup" :key="index" :icon="btn.icon">{{btn.name}}</el-button>
        <el-dropdown @command="handleWFCommit">
          <el-button type="primary" size="mini">
            工作流<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="submit">提交</el-dropdown-item>
            <el-dropdown-item command="return">退回</el-dropdown-item>
            <el-dropdown-item command="recall">撤回</el-dropdown-item>
            <el-dropdown-item command="deliver">转交</el-dropdown-item>
            <el-dropdown-item command="manage">调度</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-button-group>
      <el-table
        :data="projectRecordList"
        style="width: 100%"
        ref="mulTable"
        highlight-current-row
        @cell-click="handleCellClick">
          <el-table-column
            type="index"
            width="55">
          </el-table-column>
          <el-table-column
            label="项目编码">
            <template slot-scope="scope">
              <p class="table-column">{{scope.row.proId}}</p>
            </template>
          </el-table-column>
          <el-table-column
            label="项目名称"
            min-width="120">
            <template slot-scope="scope">
              <p class="table-column">{{scope.row.proName}}</p>
            </template>
          </el-table-column>
          <el-table-column
            label="合同金额(万元)">
            <template slot-scope="scope">
              <p class="table-column">{{scope.row.amount}}</p>
            </template>
          </el-table-column>
          <el-table-column
            label="客户">
            <template slot-scope="scope">
              <p class="table-column">{{scope.row.customer}}</p>
            </template>
          </el-table-column>
          <el-table-column
            label="主承担部门">
            <template slot-scope="scope">
              <p class="table-column">{{scope.row.mainDepartment}}</p>
            </template>
          </el-table-column>
          <el-table-column
            label="项目经理">
            <template slot-scope="scope">
              <p class="table-column">{{scope.row.manager}}</p>
            </template>
          </el-table-column>
          <el-table-column
            label="总师">
            <template slot-scope="scope">
              <p class="table-column">{{scope.row.general}}</p>
            </template>
          </el-table-column>
          <el-table-column
            label="交货期"
            width="120">
            <template slot-scope="scope">
              <p class="table-column">{{scope.row.delivery}}</p>
            </template>
          </el-table-column>
          <el-table-column
            label="协调交货期"
            width="120">
            <template slot-scope="scope">
              <p class="table-column">{{scope.row.cooDelivery}}</p>
            </template>
          </el-table-column>
          <el-table-column
            label="备注" width="160">
            <template slot-scope="scope">
              <p class="table-column">{{scope.row.mark}}</p>
            </template>
          </el-table-column>
          <!-- <el-table-column
            label="项目阶段">
            <template v-for="(c, i) in projectStatusList">
              <el-table-column
                :label="c.stage" align="center" :key="i" width="240">
                <el-table-column label="计划时间" align="center" width="120">
                  <template slot-scope="scope">
                    <el-tooltip placement="top">
                      <div slot="content">详细信息</div>
                      <p class="table-column">2018-07-06</p>
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column label="完成时间" align="center" width="120">
                  <template slot-scope="scope">
                    <el-tooltip placement="top">
                      <div slot="content">详细信息</div>
                      <p class="table-column">2018-07-08</p>
                    </el-tooltip>
                  </template>
                </el-table-column>
              </el-table-column>
            </template>
          </el-table-column> -->
          <!-- <el-table-column
            label="操作"
            width="180"
            fixed="right">
              <template slot-scope="scope">
                <el-popover
                  ref="popover"
                  placement="top"
                  width="160"
                  :value="currentIndex === scope.$index && confirmDel">
                  <p>确定删除吗?</p>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="confirmDel = false">取消</el-button>
                    <el-button type="primary" size="mini" @click="handleConfirmDel">确定</el-button>
                  </div>
                </el-popover>
                <el-button @click="handleClickEdit(scope.$index, scope.row)" size="small" type="primary">编辑</el-button>
                <el-button v-popover:popover size="small" type="danger" @click="handleClickDel(scope.$index, scope.row)">删除</el-button>
              </template>
          </el-table-column> -->
      </el-table>
    </el-card>
    <el-dialog :visible.sync="addDialog" :title="title">
      <el-form label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="项目编码：">
              <el-input v-model="formData.proId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目名称：">
              <el-input v-model="formData.proName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同金额：">
              <el-input v-model="formData.amount"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户：">
              <el-input v-model="formData.customer"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="主承担部门：">
              <el-input v-model="formData.mainDepartment"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目经理：">
              <el-input v-model="formData.manager"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="总师：">
              <el-input v-model="formData.general"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="交货期：">
              <el-date-picker v-model="formData.delivery" value-format="yyyy-MM-dd"  style="width:100%"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="协调交货期：">
              <el-date-picker v-model="formData.cooDelivery" value-format="yyyy-MM-dd"  style="width:100%"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="上传附件：">
              <el-upload action="#">
                <el-input class="rs_upload_input" readonly placeholder="请选择附件"></el-input>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注：">
              <el-input type="textarea" :rows="5" v-model="formData.mark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="handleClickSave">保存</el-button>
        <el-button @click="addDialog = false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="wfVisible" class="wfDialog" :title="wfTitle" width="800px" top="20px" style="height: 580px;overflow: hidden;">
      <el-row :gutter="20" style="overflow: hidden;">
        <el-col :span="14">
          <el-form>
            <el-form-item label="1、 请填写意见：">
              <el-input type="textarea" :rows="4"></el-input>
            </el-form-item>
            <el-form-item label="2、 请选择状态：" style="border: 1px solid #dcdfe6; padding: 10px 10px 15px;">
              <el-table :show-header="false" :data="statusData">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="code"></el-table-column>
                <el-table-column prop="descp"></el-table-column>
              </el-table>
            </el-form-item>
            <el-form-item label="已选择的待处理人员：">
              <el-input type="textarea" :rows="4" readonly :value="selectedUser"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="10">
          <el-table :data="userData" height="400px" @selection-change="handleWFUserSelectionChange">
            <el-table-column label="选择" type="selection" width="55"></el-table-column>
            <el-table-column label="编码" prop="id"></el-table-column>
            <el-table-column label="名称" prop="name"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <div slot="footer">
        <el-button type="primary" size="mini" @click="wfVisible = false">确认</el-button>
        <el-button size="mini" @click="wfVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import TableBar from '@/components/TableBar/TableBar'
import TreeGrid from '@/components/TreeGrid/TreeGrid'
import * as request from '@/utils/request'
import { mapGetters } from 'vuex'
const COMMAND_TYPE_TO_TITLE = {
  submit: '提交',
  return: '退回',
  recall: '撤回',
  deliver: '转交',
  manage: '调度'
}
export default {
  name: 'Type',
  data() {
    return {
      btnGroup: [
        {
          name: '新增',
          icon: 'el-icon-plus',
          eventType: 'add'
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
      model: '',
      shipNum: '',
      projectStatusList: [],
      editVisible: false,
      currentIndex: null,
      currentRowIndex: null,
      confirmDel: false,
      projectRecordList: [],
      addDialog: false,
      title: '',
      editDialog: false,
      selectedType: '',
      selectedProject: '',
      date: '',
      mark: '',
      endDate: '',
      timeDate: [],
      nsDialog: false,
      nsSekected: 's',
      nsParentNode: '',
      selectedShipName: '',
      wfTitle: '',
      wfVisible: false,
      statusData: [
        {
          code: '0000',
          descp: '开始'
        },
        {
          code: '0010',
          descp: '审核'
        }
      ],
      userData: [],
      selectedUser: '',
      formData: []
    }
  },
  methods: {
    handleWFCommit(c) {
      this.wfTitle = COMMAND_TYPE_TO_TITLE[c]
      this.wfVisible = true
    },
    highlightCurrentRow(row, column, rowIndex, columnIndex) {
      if (this.currentRowIndex === rowIndex) {
        return {
          background: '#ecf5ff'
        }
      } else {
        return ''
      }
    },
    handleCellClick(row, column, rowIndex, columnIndex) {
      if (columnIndex !== 0) {
        this.currentRowIndex = rowIndex
        this.$refs.mulTable.clearSelection()
        this.$refs.mulTable.toggleRowSelection(row)
      }
    },
    /*handleCellDblClick(row, column, rowIndex, columnIndex) {
      this.editDialog = true
    },*/
    fetchProjectStatusList() {
      request
        .get('/projectStatus')
        .then(response => {
          if (response && response.data) {
            this.projectStatusList = response.data
          }
        })
        .catch(e => {
          this.$message.error(e)
        })
    },
    fetchRecordList() {
      request
        .get('/project')
        .then(response => {
          if (response && response.data) {
            this.projectRecordList = response.data
          }
        })
        .catch(e => {
          this.$message.error(e)
        })
    },
    fetchUserList() {
      request
        .get('/user')
        .then(response => {
          if (response.data) {
            this.userData = response.data
          }
        })
        .catch(e => {
          this.$message.error(e)
        })
    },
    handleConfirmDel() {
      this.projectRecordList.splice(this.currentIndex, 1)
      this.currentIndex = null
      this.confirmDel = false
    },
    handleClickEdit(index, row) {
      this.currentIndex = index
      this.title = '编辑'
      this.addDialog = true
      this.formData = row
    },
    handleClickDel(index, row) {
      this.currentIndex = index
      this.confirmDel = true
    },
    handleClickAdd() {
      this.title = '新增'
      this.addDialog = true
      this.formData = []
    },
    handleClickSave() {
      if (this.title === '新增') {
        this.projectRecordList.unshift(this.formData)
      }
      // this.$set(this.projectStatusList, index, row)
      this.addDialog = false
      this.$message.success('保存成功')
    },
    handleClickCancel(index) {
      this.currentIndex = index
      this.editVisible = false
    },
    handleSelectionChange(selections) {
      this.selected = selections
    },
    handleClickBtnGroup(options, e) {
      const type = options.eventType
      switch (type) {
        case 'add':
          this.handleClickAdd()
          break
        case 'del':
          this.$message.success('删除成功')
          break
        case 'refresh':
          this.$message.success('刷新成功')
          break
        case 'export':
          this.$message.success('导出成功')
          break
      }
    },
    /*handleClickNewSys() {
      this.nsDialog = true
    },*/
    handleSpanCount(i) {
      if (i === this.projectStatusList.length && i % 2 === 0) {
        return 24
      } else {
        return 12
      }
    },
    handleWFUserSelectionChange(selection) {
      console.log(selection)
      let tmp = []
      selection.forEach(item => {
        tmp.push(item.name)
      })
      this.selectedUser = tmp.join(',')
    }
  },
  created() {
    this.fetchProjectStatusList()
    this.fetchRecordList()
    this.fetchUserList()
    // this.fetchProjectList()
  },
  computed: {
    /*systemData() {
      this.sysData.forEach(item => {
        item.children = this.equipData
      })
      return this.sysData
    },*/
    // ...mapGetters(['projectList'])
  },
  components: {
    TableBar,
    TreeGrid
  }
}
</script>
<style scoped>
.build-record {
  & .form-list {
    overflow: auto;
  }
  /*& .rs_form_item {
    position: relative;
    padding: 10px;
    border: 1px solid #dcdfe6;
    border-radius: 5px;
    margin: 20px 0;
  }*/
  /* & .rs_form_item_title {
    height: 20px;
    line-height: 20px;
    display: inline-block;
    padding: 3px 10px;
    position: absolute;
    top: -15px;
    background: #fff;
  }
  & .rs_form_item {
    position: relative;
    padding: 25px 10px 0 10px;
    border: 1px solid #dcdfe6;
    border-radius: 5px;
    margin-top: 20px;
  } */
}
</style>
