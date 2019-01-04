<template>
  <div class="strength rs_view_item">
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
            <p slot="header"><el-button @click="handleClickToggle" type="text" style="float:left;margin: -11px 10px 0 0;" :icon="icon"></el-button>合同及其收付款节点</p>
            <el-table
              :data="contractData"
              highlight-current-row
              style="width: 100%"
              @row-click="handClickContract">
              <el-table-column type="expand" fixed="left">
                <template slot-scope="props">
                  <div class="rs-contract-inner">
                    <el-table
                      :data="props.row.point"
                      style="width:100%;"
                      class="point">
                      <el-table-column
                        type="index"
                        width="55">
                      </el-table-column>
                      <el-table-column
                        label="类型"
                        prop="pointType">
                      </el-table-column>
                      <el-table-column
                        label="收付款节点">
                        <template slot-scope="scope">
                          <p class="table-column">{{scope.row.pointTime}}</p>
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="金额(万元)"
                        prop="pointAmount">
                      </el-table-column>
                      <el-table-column
                        label="经手人"
                        prop="pointHandler">
                      </el-table-column>
                      <el-table-column
                        label="备注"
                        prop="pointMark">
                      </el-table-column>
                      <!-- <el-table-column
                        label="操作"
                        width="180"
                        fixed="right">
                          <template slot-scope="scope">
                            <el-popover
                              :ref="'popoverPoint-'+scope.$index"
                              placement="top"
                              width="160"
                              :value="currentPointIndex === scope.$index && confirmPointDel && currentContractId === scope.row.conId">
                              <p>确定删除吗?</p>
                              <div style="text-align: right; margin: 0">
                                <el-button size="mini" type="text" @click="confirmPointDel = false">取消</el-button>
                                <el-button type="primary" size="mini" @click="handleConfirmPointDel(scope.row)">确定</el-button>
                              </div>
                            </el-popover>
                            <el-button @click="handleClickPointEdit(scope.$index, scope.row)" size="small" type="primary">编辑</el-button>
                            <el-button size="small" type="danger" @click="handleClickPointDel(scope.$index, scope.row)">删除</el-button>
                          </template>
                      </el-table-column> -->
                    </el-table>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="合同编码"
                min-width="120">
                <template slot-scope="scope">
                  <p class="table-column">{{scope.row.contractId}}</p>
                </template>
              </el-table-column>
              <el-table-column
                label="合同名称"
                prop="contractName"
                min-width="120">
              </el-table-column>
              <el-table-column
                label="合同类别"
                prop="contractCate">
              </el-table-column>
              <el-table-column
                label="合同区分"
                prop="contractKinds">
              </el-table-column>
              <el-table-column
                label="项目编码"
                prop="proId">
              </el-table-column>
              <el-table-column
                label="签订时间"
                prop="signedTime"
                min-width="120">
              </el-table-column>
              <el-table-column
                label="签订地点"
                prop="signedPlace">
              </el-table-column>
              <el-table-column
                label="签订人"
                prop="signedPerson">
              </el-table-column>
              <el-table-column
                label="经办人"
                prop="handlePeople">
              </el-table-column>
              <el-table-column
                label="签约单位"
                prop="signedUnit"
                min-width="100">
              </el-table-column>
              <el-table-column
                label="密级"
                prop="dense">
              </el-table-column>
              <el-table-column
                label="市场认定号"
                prop="identification"
                min-width="100">
              </el-table-column>
              <el-table-column
                label="备注"
                prop="mark"
                min-width="160">
              </el-table-column>
              <!-- <el-table-column
                label="操作"
                width="180"
                fixed="right">
                  <template slot-scope="scope">
                    <el-popover
                      :ref="'popover-'+scope.$index"
                      placement="top"
                      width="160"
                      :value="currentIndex === scope.$index && confirmDel"
                      popper-class="rs-popover">
                      <p>确定删除吗?</p>
                      <div style="text-align: right; margin: 0">
                        <el-button size="mini" type="text" @click="confirmDel = false">取消</el-button>
                        <el-button type="primary" size="mini" @click="handleConfirmDel">确定</el-button>
                      </div>
                    </el-popover>
                    <el-button @click="handleClickEdit(scope.$index, scope.row)" size="small" type="primary">编辑</el-button>
                    <el-button size="small" type="danger" @click="handleClickDel(scope.$index, scope.row)">删除</el-button>
                  </template>
              </el-table-column> -->
            </el-table>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog :title="title" :visible.sync="addDialog">
      <el-form label-width="110px">
        <el-row :gutter="20">
          <el-col :span='12'>
            <el-form-item label="合同编码：">
              <el-input v-model="formData.contractId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="合同名称：">
              <el-input v-model="formData.contractName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="合同类别：">
              <el-select v-model="formData.contractCate" placeholder="请选择" style="width:100%;">
                <el-option label="军用品" value="军用品"></el-option>
                <el-option label="民用品" value="民用品"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="合同区分：">
              <el-select v-model="formData.contractKinds" placeholder="请选择" style="width:100%;">
                <el-option label="收款" value="收款"></el-option>
                <el-option label="付款" value="付款"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="项目编码：">
              <el-input v-model="formData.proId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="签订时间：">
               <el-date-picker type="date" placeholder="选择日期" v-model="formData.signedTime" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="签订地点：">
              <el-input v-model="formData.signedPlace"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="签订人：">
              <el-input v-model="formData.signedPerson"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="经办人：">
              <el-input v-model="formData.handlePeople"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="签约单位：">
              <el-input v-model="formData.signedUnit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="密级：">
              <el-input v-model="formData.dense"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="市场认定号：">
              <el-input v-model="formData.identification"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='24'>
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
    <el-dialog :title="pointTitle" :visible.sync="addPointDialog">
      <el-form label-width="110px">
        <el-form-item label="类型：">
          <el-select v-model="pointData.pointType" placeholder="请选择" style="width:100%;">
            <el-option label="收款" value="收款"></el-option>
            <el-option label="付款" value="付款"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收付款节点：">
          <el-date-picker type="date" placeholder="选择日期" v-model="pointData.pointTime" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="金额：">
          <el-input v-model="pointData.pointAmount"></el-input>
        </el-form-item>
        <el-form-item label="经手人：">
          <el-input v-model="pointData.pointHandler"></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input type="textarea" :rows="5" v-model="pointData.pointMark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="handleClickPointSave">保存</el-button>
        <el-button @click="addPointDialog = false">取消</el-button>
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
      icon: 'el-icon-d-arrow-left',
      contractData: [],
      btnGroup: [
        {
          name: '新增合同',
          icon: 'el-icon-plus',
          eventType: 'add'
        },
        {
          name: '删除合同',
          icon: 'el-icon-minus',
          eventType: 'del'
        },
        {
          name: '编辑合同',
          icon: 'el-icon-edit',
          eventType: 'edit'
        },
        {
          name: '登记 ',
          icon: 'el-icon-document',
          eventType: 'registration'
        },
        {
          name: '删除节点',
          icon: 'el-icon-minus',
          eventType: 'del'
        },
        {
          name: '编辑节点',
          icon: 'el-icon-edit',
          eventType: 'edit'
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
      currentIndex: null,
      currentPointIndex: null,
      currentContractId: null,
      confirmDel: false,
      confirmPointDel: false,
      formData: [],
      pointData: [],
      pointsData: [],
      addDialog: false,
      addPointDialog: false,
      addRegisterDialog: false,
      title: '',
      pointTitle: '',
      registerTitle: '',
      pointShow: false,
      appointedData: []
      // selected: []
    }
  },
  methods: {
    handleRowClickJc() {},
    handSetting() {},
    showCurrentJcConfig() {},
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
    handClickContract(row) {
      this.pointsData = row.point
      this.currentContractId = row.contractId
    },
    handleClickEdit(index, row) {
      this.currentIndex = index
      this.title = '编辑'
      this.addDialog = true
      this.formData = row
      this.pointShow = true
    },
    handleClickPointEdit(index, row) {
      this.currentPointIndex = index
      this.pointTitle = '编辑收付款节点'
      this.addPointDialog = true
      this.pointData = row
    },
    handleClickDel(index, row) {
      this.currentIndex = index
      this.confirmDel = true
      this.$confirm(
        '此操作将永久删除该合同(包括该合同下的所有收付款节点), 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          this.contractData.splice(this.currentIndex, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    /*handleConfirmDel() {
      this.contractData.splice(this.currentIndex, 1)
      this.currentIndex = null
      this.confirmDel = false
    },*/
    handleClickPointDel(index, row) {
      this.currentContractId = row.conId
      this.currentPointIndex = index
      this.confirmPointDel = true
      this.$confirm('此操作将永久删除该收付款节点, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.contractData.forEach(item => {
            if (item.contractId === this.currentContractId) {
              item.point.splice(this.currentPointIndex, 1)
            }
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    /*handleConfirmPointDel(row) {
      // console.log(row)
      this.contractData.forEach(item => {
        if (item.contractId === row.conId) {
          item.point.splice(this.currentPointIndex, 1)
        }
      })
      this.currentContractId = null
      this.currentPointIndex = null
      this.confirmPointDel = false
    },*/
    handleAdd() {
      this.title = '新增合同'
      this.addDialog = true
      this.formData = []
      this.pointShow = false
    },
    handlePointAdd() {
      this.pointTitle = '新增收付款节点'
      this.addPointDialog = true
      this.pointData = []
    },
    /*handleRegistration() {
      this.addRegisterDialog = true
      this.registerTitle = '登记收付款节点'
    },*/
    handleClickSave() {
      if (this.title === '新增合同') {
        this.formData.point = []
        this.contractData.unshift(this.formData)
      }
      this.$message.success('保存成功')
      this.addDialog = false
    },
    handleClickPointSave() {
      if (this.pointTitle === '新增收付款节点') {
        this.contractData.forEach(item => {
          if (item.contractId === this.currentContractId) {
            this.pointData.conId = this.currentContractId
            item.point.unshift(this.pointData)
          }
        })
      }
      this.$message.success('保存成功')
      this.addPointDialog = false
    },
    fetchContractList() {
      request
        .get('/contractData')
        .then(response => {
          if (response && response.data) {
            this.contractData = response.data
          }
        })
        .catch(e => {
          this.$message.error(e)
        })
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
          this.handleAdd()
          break
        case 'registration':
          this.handlePointAdd()
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
    this.fetchContractList()
    this.fetchProjectList()
  },
  components: {
    TableBar
  }
}
</script>
<style scoped>
.strength {
  & .rs-popover {
    position: absolute;
    bottom: 100px;
    right: 100%;
    z-index: 2000;
  }
}
</style>
