<template>
  <div class="build-record rs_view_item">
    <el-card>
      <el-button-group slot="header">
        <el-button @click="handleClickBtnGroup(btn, $event)" type="primary" size="small" v-for="(btn, index) in btnGroup" :key="index" :icon="btn.icon">{{btn.name}}</el-button>
        <el-dropdown @command="handleWFCommit">
          <el-button type="primary" size="small">
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
        tooltip-effect="drak"
        :data="recordList"
        style="width: 100%"
        ref="mulTable"
        :highlight-current-row="true"
        :cell-style="highlightCurrentRow"
        @cell-click="handleCellClick"
        @cell-dblclick="handleCellDblClick"
        @selection-change="handleSelectionChange">
          <el-table-column
          type="selection"
          width="55"></el-table-column>
          <el-table-column
            label="型号"
            prop="type">
          </el-table-column>
          <el-table-column
            label="舷号"
            prop="shipNum">
          </el-table-column>
          <el-table-column
            label="设计建造">
            <template v-for="(c, i) in statusList">
              <el-table-column
                :label="c.descp" align="center" :key="i" width="120">
                <template slot-scope="scope">
                  <el-tooltip placement="top">
                    <div slot="content">详细信息</div>
                    <p class="table-column">2018-02-02</p>
                  </el-tooltip>
                </template>
              </el-table-column>
            </template>
          </el-table-column>
          <el-table-column
            label="备注" width="160">
            <template slot-scope="scope">
              <el-input v-if="currentIndex === scope.$index && editVisible" v-model="scope.row.mark"></el-input>
              <p class="table-column" v-else>{{scope.row.mark}}</p>
            </template>
          </el-table-column>
        </el-table>
    </el-card>
    <el-dialog :visible.sync="addDialog" title="新增" width="800px" @open="handleGetShipName">
      <el-form label-width="160px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="舷号：">
              <el-select v-model="selectedShip" @change="handleGetShipName">
                <el-option v-for="(c, i) in shipList" :key="i" :label="c.label" :value="c.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="舰名：">
              <el-input v-model="selectedShipName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="handleSpanCount(i)" v-for="(c, i) in statusList" :key="i" >
            <el-form-item :label="c.descp + '：'">
              <el-date-picker v-model="startDate"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="上传附件：">
          <el-upload action="#">
            <el-input class="rs_upload_input" readonly placeholder="请选择附件"></el-input>
          </el-upload>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input type="textarea" :rows="5" v-model="mark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="addDialog = false">保存</el-button>
        <el-button @click="addDialog = false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="editDialog" title="编辑">
      <div slot="footer">
        <el-button type="primary" @click="editDialog = false">保存</el-button>
        <el-button @click="editDialog = false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="nsDialog" title="新增主要系统">
      <el-form label-width="120px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="类型">
              <el-select v-model="nsSekected">
                <el-option label="系统" value="s"></el-option>
                <el-option label="装备" value="m"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上级层级">
              <el-select v-model="nsParentNode">
                <el-option label="层级一" value="1"></el-option>
                <el-option label="层级二" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <div v-show="nsSekected === 's'">
            <el-col :span="12">
              <el-form-item label="系统名称">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="功能">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="性能指标">
                <el-input></el-input>
              </el-form-item>
            </el-col>
          </div>
          <div v-show="nsSekected === 'm'">
            <el-col :span="12">
              <el-form-item label="装备名称">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="数量">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="规格型号">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="生成厂家">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="配置功用">
                <el-input type="textarea" :rows="5"></el-input>
              </el-form-item>
            </el-col>
          </div>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="nsDialog = false">保存</el-button>
        <el-button @click="nsDialog = false">取消</el-button>
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
          name: '导出',
          icon: 'el-icon-share',
          eventType: 'export'
        },
        {
          name: '刷新',
          icon: 'el-icon-refresh',
          eventType: 'refresh'
        },
        {
          name: '附件',
          icon: 'fa fa-link',
          eventType: 'document'
        }
      ],
      model: '',
      shipNum: '',
      statusList: [],
      editVisible: false,
      currentIndex: null,
      currentRowIndex: null,
      confirmDel: false,
      recordList: [],
      addDialog: false,
      editDialog: false,
      selectedType: '',
      selectedShip: '',
      date: '',
      mark: '',
      endDate: '',
      startDate: '',
      sysData: [
        {
          name: '系统一',
          func: '功能一',
          property: '性能指标一'
        },
        {
          name: '系统一',
          func: '功能一',
          property: '性能指标一'
        },
        {
          name: '系统一',
          func: '功能一',
          property: '性能指标一'
        },
        {
          name: '系统一',
          func: '功能一',
          property: '性能指标一'
        },
        {
          name: '系统一',
          func: '功能一',
          property: '性能指标一'
        }
      ],
      equipData: [
        {
          name: '装备一',
          count: 10,
          type: '规格型号一',
          productor: '生产厂家一'
        },
        {
          name: '装备二',
          count: 10,
          type: '规格型号二',
          productor: '生产厂家二'
        },
        {
          name: '装备三',
          count: 10,
          type: '规格型号三',
          productor: '生产厂家三'
        },
        {
          name: '装备四',
          count: 10,
          type: '规格型号四',
          productor: '生产厂家四'
        },
        {
          name: '装备五',
          count: 10,
          type: '规格型号五',
          productor: '生产厂家五'
        }
      ],
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
      selectedUser: ''
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
    handleCellDblClick(row, column, rowIndex, columnIndex) {
      this.editDialog = true
    },
    fetchStatusList() {
      request
        .get('/status')
        .then(response => {
          if (response && response.data) {
            this.statusList = response.data
          }
        })
        .catch(e => {
          this.$message.error(e)
        })
    },
    fetchRecordList() {
      request
        .get('/build')
        .then(response => {
          if (response && response.data) {
            this.recordList = response.data
            console.log(this.recordList)
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
      this.statusList.splice(this.currentIndex, 1)
      this.currentIndex = null
      this.confirmDel = false
    },
    handleClickEdit(index, row) {
      this.currentIndex = index
      this.editVisible = true
    },
    handleClickDel(index, row) {
      this.currentIndex = index
      this.confirmDel = true
    },
    handleClickSave(index, row) {
      this.$set(this.statusList, index, row)
      this.editVisible = false
      this.$message.success('保存成功')
    },
    handleClickCancel(index) {
      this.currentIndex = index
      this.editVisible = false
    },
    handleSelectionChange(selections) {
      this.selected = selections
    },
    handleClickQuery() {
      this.fetchStatusList()
    },
    handleClickBtnGroup(options, e) {
      const type = options.eventType
      switch (type) {
        case 'add':
          this.addDialog = true
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
    handleClickNewSys() {
      this.nsDialog = true
    },
    handleSpanCount(i) {
      if (i === this.statusList.length && i % 2 === 0) {
        return 24
      } else {
        return 12
      }
    },
    handleGetShipName() {
      const row = this.shipList.find(item => item.value === this.selectedShip)
      if (row) {
        this.selectedShipName = row.shipName
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
    this.fetchStatusList()
    this.fetchRecordList()
    this.fetchUserList()
  },
  computed: {
    systemData() {
      this.sysData.forEach(item => {
        item.children = this.equipData
      })
      return this.sysData
    },
    ...mapGetters(['selectShip', 'shipList'])
  },
  watch: {
    selectShip: {
      handler(newV) {
        this.selectedShip = newV
      },
      immediate: true
    }
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
  & .rs_form_item {
    position: relative;
    padding: 10px;
    border: 1px solid #dcdfe6;
    border-radius: 5px;
    margin-top: 20px;
  }
  & .rs_form_item_title {
    height: 20px;
    line-height: 20px;
    display: inline-block;
    padding: 3px 10px;
    position: absolute;
    top: -15px;
    background: #fff;
  }
}
</style>
