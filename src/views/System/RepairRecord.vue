<template>
  <div class="repair-record rs_view_item">
    <el-card>
      <TableBar @click="handleClickBtnGroup" :btn-group="btnGroup" slot="header"></TableBar>
      <el-table
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
            label="修理改装">
            <template v-for="(c, i) in repairType">
              <el-table-column
                :label="c.descp" align="center" :key="i">
                <template v-for="num in 2">
                  <el-table-column
                    :label="`第${num}次`" align="center" :key="num" :prop="`date${num}`"
                    width="100">
                    <template slot-scope="scope">
                      <el-tooltip placement="top">
                        <div slot="content">维修内容</div>
                        <p class="table-column">{{scope.row[`date${num}`]}}</p>
                      </el-tooltip>
                    </template>
                  </el-table-column>
                </template>
              </el-table-column>
            </template>
          </el-table-column>
        </el-table>
    </el-card>
    <el-dialog :visible.sync="editDialog" title="编辑">
      <div slot="footer">
        <el-button type="primary" @click="editDialog = false">保存</el-button>
        <el-button @click="editDialog = false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog class="rs_rr_dialog" :visible.sync="addDialog" title="新增" @open="handleGetShipType">
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label">维修记录</span>
          <el-form label-width="120px">
            <el-form-item label="舷号：">
              <el-select v-model="selectedShip" @change="handleGetShipType">
                <el-option v-for="(c, i) in shipList" :key="i" :value="c.value" :label="c.label"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="类型：">
              <el-input :value="selectedType" readonly></el-input>
            </el-form-item>
            <el-form-item label="维修时间：">
              <el-date-picker v-model="date"></el-date-picker>
            </el-form-item>
            <el-form-item label="维修内容：">
              <el-input type="textarea" :rows="5" v-model="cont"></el-input>
            </el-form-item>
            <el-form-item label="上传附件：">
              <el-upload action="#">
                <el-input class="rs_upload_input" readonly placeholder="请选择附件"></el-input>
              </el-upload>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label">主要系统</span>
          <el-button-group class="btn-group" style="margin-bottom: 20px;">
            <el-button type="primary" size="small" @click="handleClickNewSys">新增</el-button>
            <el-button type="primary" size="small">刷新</el-button>
          </el-button-group>
          <TreeGrid :data="systemData"></TreeGrid>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label">总体性能</span>
          <el-form class="form-list" label-width="80px">
            <el-form-item label="研制背景">
              <el-input type="textarea" :rows="4"></el-input>
            </el-form-item>

            <el-form-item label="使命任务">
              <el-input type="textarea" :rows="4"></el-input>
            </el-form-item>

            <div class="rs_form_item">
              <div class="rs_form_item_title">主尺度</div>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="总长">
                    <el-input></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="水线长">
                    <el-input></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="型宽">
                    <el-input></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="型深">
                    <el-input></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="设计吃水">
                <el-input></el-input>
              </el-form-item>
            </div>
            
            <div class="rs_form_item">
              <div class="rs_form_item_title">排水量</div>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="正常">
                    <el-input></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="标准">
                    <el-input></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item label="满载">
                    <el-input></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="最大">
                    <el-input></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            
            <div class="rs_form_item">
              <div class="rs_form_item_title">航速</div>
            
              <el-row>
                <el-col :span="12">
                  <el-form-item label="最大">
                    <el-input></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="巡航">
                    <el-input></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item label="续航力">
                    <el-input></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="自给力">
                    <el-input></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>

            <div class="rs_form_item">
              <div class="rs_form_item_title">其他</div>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="抗风能力">
                    <el-input></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="不沉性">
                    <el-input></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item label="操作性">
                    <el-input></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="续航性">
                    <el-input></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item label="编制人数">
                    <el-input></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="任务能力">
                    <el-input></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item label="续航力">
                    <el-input></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="备注">
                    <el-input></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-form>
        </el-tab-pane>
        
      </el-tabs>
      <div slot="footer">
        <el-button type="primary" @click="addDialog = false">保存</el-button>
        <el-button @click="addDialog = false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="nsDialog" title="新增主要系统">
      <el-form label-width="80px">
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
  </div>
</template>
<script>
import TableBar from '@/components/TableBar/TableBar'
import TreeGrid from '@/components/TreeGrid/TreeGrid'
import * as request from '@/utils/request'
import { mapGetters } from 'vuex'
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
          name: '刷新',
          icon: 'el-icon-refresh',
          eventType: 'refresh'
        },
        {
          name: '导出',
          icon: 'el-icon-share',
          eventType: 'export'
        },
        {
          name: '附件',
          icon: 'fa fa-link',
          eventType: 'document'
        }
      ],
      model: '',
      shipNum: '',
      repairType: [],
      editVisible: false,
      currentIndex: null,
      currentRowIndex: null,
      confirmDel: false,
      recordList: [],
      editDialog: false,
      addDialog: false,
      propDialog: false,
      msDialog: false,
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
      selectedType: '',
      date: '',
      equipment: '',
      cont: '',
      selectedShip: '',
      nsDialog: false,
      nsSekected: 's',
      nsParentNode: ''
    }
  },
  methods: {
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
    fetchRepairType() {
      request
        .get('/repairType')
        .then(response => {
          if (response && response.data) {
            this.repairType = response.data
          }
        })
        .catch(e => {
          this.$message.error(e)
        })
    },
    fetchRepairRecord() {
      request
        .get('/repairRecord')
        .then(response => {
          if (response && response.data) {
            this.recordList = response.data
          }
        })
        .catch(e => {
          this.$message.error(e)
        })
    },
    handleConfirmDel() {
      this.recordList.splice(this.currentIndex, 1)
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
      this.$set(this.recordList, index, row)
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
      this.fetchRepairRecord()
    },
    handleClickBtnGroup(options) {
      const { type } = options
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
    handleGetShipType() {
      const row = this.shipList.find(item => item.value === this.selectedShip)
      if (row) {
        this.selectedType = row.type
      }
    }
  },
  created() {
    this.fetchRepairType()
    this.fetchRepairRecord()
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
.repair-record {
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
.search-form .el-input {
  width: 120px;
}
.el-select {
  width: 100%;
}
</style>
