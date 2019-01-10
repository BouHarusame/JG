<template>
  <div class="rs_view_item">
    <el-card>
      <!-- <TableBar @click="handleClickBtnGroup" :btn-group="btnGroup" slot="header"></TableBar> -->
      <el-button-group slot="header">
        <el-button @click="handleClickBtnGroup(btn, $event)" type="primary" size="mini" v-for="(btn, index) in btnGroup" :key="index" :icon="btn.icon">{{btn.name}}</el-button>
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
            label="舰员">
            <template slot-scope="scope">
              <p class="table-column">{{scope.row.type}}</p>
            </template>
          </el-table-column>
          <el-table-column
            label="档案编码"
            min-width="120">
            <template slot-scope="scope">
              <p class="table-column">{{scope.row.proId}}</p>
            </template>
          </el-table-column>
          <el-table-column
            label="性别">
            <template slot-scope="scope">
              <p class="table-column">{{scope.row.model}}</p>
            </template>
          </el-table-column>
          <el-table-column
            label="职务">
            <template slot-scope="scope">
              <p class="table-column">{{scope.row.shipNum}}</p>
            </template>
          </el-table-column>
          <el-table-column
            label="部门">
            <template slot-scope="scope">
              <p class="table-column">{{scope.row.shipName}}</p>
            </template>
          </el-table-column>
          <el-table-column
            label="建档日期">
            <template slot-scope="scope">
              <p class="table-column">{{scope.row.filingDate}}</p>
            </template>
          </el-table-column>
          <el-table-column
            label="备注">
            <template slot-scope="scope">
              <p class="table-column">{{scope.row.comment}}</p>
            </template>
          </el-table-column>
          <el-table-column
            label="维护人"
            width="120">
            <template slot-scope="scope">
              <p class="table-column">{{scope.row.delivery}}</p>
            </template>
          </el-table-column>
          <el-table-column
            label="维护时间"
            width="120">
            <template slot-scope="scope">
              <p class="table-column">{{scope.row.cooDelivery}}</p>
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
    <el-dialog :visible.sync="addDialog" :title="title" style="width:800px;margin: 0 auto;">
      <el-form label-width="120px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="舰员：">
               <el-select v-model="formData.type" placeholder="请选择" @change="handleChange" >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="职务：">
               <el-select v-model="formData.shipNum" placeholder="请选择">
                <el-option
                  v-for="item in shipNumList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="出生日期：">
               <el-date-picker v-model="formData.BirthdayDate" value-format="yyyy-MM-dd"  style="width:100%"></el-date-picker>
            </el-form-item>
             <el-form-item label="身高：">
              <el-input v-model="formData.stature"></el-input>
            </el-form-item>
             <el-form-item label="遗传病：">
              <el-input v-model="formData.genetic"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="性别：">
               <el-select v-model="formData.model" placeholder="请选择">
                <el-option
                  v-for="item in sexList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="部门：">
               <el-select v-model="formData.shipName" placeholder="请选择">
                <el-option
                  v-for="item in shipNameList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="建档日期：">
               <el-date-picker v-model="formData.filingDate" value-format="yyyy-MM-dd"  style="width:100%"></el-date-picker>
            </el-form-item>
             <el-form-item label="体重：">
              <el-input v-model="formData.weight"></el-input>
            </el-form-item>
             <el-form-item label="过敏药物：">
              <el-input v-model="formData.allergy"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <div class="awater"></div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="往来病史：">
              <el-input type="textarea" :rows="5" v-model="formData.mark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="治疗信息：">
              <el-input type="textarea" :rows="5" v-model="formData.mark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="职业病：">
              <el-input type="textarea" :rows="5" v-model="formData.mark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
         <el-row>
          <el-col :span="24">
            <el-form-item label="详细信息：">
              <el-input type="textarea" :rows="5" v-model="formData.mark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
         <el-row>
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
      options: [
        {
          value: '小张',
          label: '小张'
        },
        {
          value: '小李',
          label: '小李'
        }
      ],
      sexList: [
        {
          value: '男',
          label: '男'
        },
        {
          value: '女',
          label: '女'
        }
      ],
      shipNumList: [
        {
          value: '舰长',
          label: '舰长'
        },
        {
          value: '作战副长',
          label: '作战副长'
        }
      ],
      shipNameList: [
        {
          value: '机电部门',
          label: '机电部门'
        },
        {
          value: '副炮班',
          label: '副炮班'
        }
      ],
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
      formData: [],
      autoRecordList: []
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
    handleChange(val) {
      console.log(val)
      console.log(this.autoRecordList)
      if (val) {
        this.autoRecordList.forEach(item => {
          if (item.label === val) {
            this.formData = item
          }
        })
      }
      console.log(this.formData)
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
    fetchProjectAdd() {
      request
        .get('/projectAdd')
        .then(response => {
          if (response && response.data) {
            this.autoRecordList = response.data
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
    this.fetchProjectAdd()
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
.awater {
  width: 120px;
  height: 160px;
  border: 2px solid #ddd;
  margin: 10px auto;
}
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
