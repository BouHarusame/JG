<template>
  <div class="strength rs_view_item">
    <el-card>
      <TableBar @click="handleClickBtnGroup" :btn-group="btnGroup" slot="header"></TableBar>
     <!--  <el-form class="search-form" :inline="true" label-width="60px">
        <el-form-item label="类型">
          <el-input placeholder="类型" v-model="type"></el-input>
        </el-form-item>
        <el-form-item label="型号">
          <el-input placeholder="型号" v-model="model"></el-input>
        </el-form-item>
        <el-form-item label="舷号">
          <el-input placeholder="舷号" v-model="shipNum"></el-input>
        </el-form-item>
      </el-form> -->
      <el-table
        :data="strengthList"
        style="width: 100%"
        ref="mulTable"
        :highlight-current-row="true"
        :cell-style="highlightCurrentRow"
        @cell-click="handleRowClick"
        @selection-change="handleSelectionChange">
          <el-table-column
          type="selection"
          width="55"></el-table-column>
          <el-table-column
            label="类型">
            <template slot-scope="scope">
              <p class="table-column">{{scope.row.type}}</p>
            </template>
          </el-table-column>
          <el-table-column
            label="型号" width="200">
            <template slot-scope="scope">
              <p class="table-column">{{scope.row.model}}</p>
            </template>
          </el-table-column>
          <el-table-column
            label="舷号">
            <template slot-scope="scope">
              <p class="table-column">{{scope.row.shipNum}}</p>
            </template>
          </el-table-column>
          <el-table-column
            label="舰名">
            <template slot-scope="scope">
              <p class="table-column">{{scope.row.shipName}}</p>
            </template>
          </el-table-column>
          <el-table-column
            label="序号"
            prop="index"
            width="50"></el-table-column>
          <el-table-column
            label="驻泊地">
            <template slot-scope="scope">
              <p class="table-column">{{scope.row.park}}</p>
            </template>
          </el-table-column>
          <el-table-column
            label="建造厂">
            <template slot-scope="scope">
              <p class="table-column">{{scope.row.build}}</p>
            </template>
          </el-table-column>
          <el-table-column
            label="合同签订日期"
            width="110">
            <template slot-scope="scope">
              <p class="table-column">{{scope.row.sign}}</p>
            </template>
          </el-table-column>
          <el-table-column
            label="开工日期"
            width="100">
            <template slot-scope="scope">
              <p class="table-column">{{scope.row.start}}</p>
            </template>
          </el-table-column>
          <el-table-column
            label="研发经费（万元）">
            <template slot-scope="scope">
              <p class="table-column">{{scope.row.devFunds}}</p>
            </template>
          </el-table-column>
          <el-table-column
            label="建造经费">
            <template slot-scope="scope">
              <p class="table-column">{{scope.row.buildFunds}}</p>
            </template>
          </el-table-column>
          <el-table-column
            label="交付日期"
            width="100">
            <template slot-scope="scope">
              <p class="table-column">{{scope.row.payDate}}</p>
            </template>
          </el-table-column>
          <el-table-column
            label="服役年限（年）"
            width="80">
            <template slot-scope="scope">
              <p class="table-column">{{scope.row.service}}</p>
            </template>
          </el-table-column>
          <el-table-column
            label="退役时间"
            width="100">
            <template slot-scope="scope">
              <p class="table-column">{{scope.row.retire}}</p>
            </template>
          </el-table-column>
          <el-table-column
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
          </el-table-column>
        </el-table>
    </el-card>
    <el-dialog :title="title" :visible.sync="addDialog">
      <el-form label-width="140px">
        <el-form-item label="类型：">
          <el-input v-model="formData.type"></el-input>
        </el-form-item>
        <el-form-item label="型号：">
          <el-input v-model="formData.model"></el-input>
        </el-form-item>
        <el-form-item label="舷号：">
          <el-input v-model="formData.shipNum"></el-input>
        </el-form-item>
        <el-form-item label="舰名：">
          <el-input v-model="formData.shipName"></el-input>
        </el-form-item>
        <el-form-item label="序号：">
          <el-input v-model="formData.index" readonly></el-input>
        </el-form-item>
        <el-form-item label="驻泊地：">
          <el-input v-model="formData.park"></el-input>
        </el-form-item>
        <el-form-item label="建造厂：">
          <el-input v-model="formData.build"></el-input>
        </el-form-item>
        <el-form-item label="合同签订日期：">
          <el-input v-model="formData.sign"></el-input>
        </el-form-item>
        <el-form-item label="开工日期：">
          <el-input v-model="formData.start"></el-input>
        </el-form-item>
        <el-form-item label="研发经费（万元）：">
          <el-input v-model="formData.devFunds"></el-input>
        </el-form-item>
        <el-form-item label="建造经费：">
          <el-input v-model="formData.buildFunds"></el-input>
        </el-form-item>
        <el-form-item label="交付日期：">
          <el-input v-model="formData.payDate"></el-input>
        </el-form-item>
        <el-form-item label="服役年限（年）：">
          <el-input v-model="formData.service"></el-input>
        </el-form-item>
        <el-form-item label="退役时间：">
          <el-input v-model="formData.retire"></el-input>
        </el-form-item>
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
import * as request from '@/utils/request'
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
      // type: '',
      // model: '',
      // shipNum: '',
      strengthList: [],
      currentIndex: null,
      currentRowIndex: null,
      confirmDel: false,
      formData: {
        type: '',
        model: '',
        shipNum: '',
        shipName: '',
        index: '',
        park: '',
        build: '',
        sign: '',
        start: '',
        devFunds: '',
        buildFunds: '',
        payDate: '',
        service: '',
        retire: ''
      },
      emptyFormData: null,
      addDialog: false,
      title: ''
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
    handleRowClick(row, column, rowIndex, columnIndex) {
      if (columnIndex !== 0) {
        this.currentRowIndex = rowIndex
        this.$refs.mulTable.clearSelection()
        this.$refs.mulTable.toggleRowSelection(row)
      }
    },
    fetchStrengthList() {
      request
        .get('/shipTable')
        .then(response => {
          if (response && response.data) {
            this.strengthList = response.data
          }
        })
        .catch(e => {
          this.$message.error(e)
        })
    },
    handleConfirmDel() {
      this.strengthList.splice(this.currentIndex, 1)
      this.currentIndex = null
      this.confirmDel = false
    },
    handleClickAdd() {
      this.title = '新增'
      this.formData = this.emptyFormData
      this.addDialog = true
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
    handleClickSave(index, row) {
      this.$set(this.strengthList, index, row)
      this.$message.success('保存成功')
      this.addDialog = false
    },
    handleSelectionChange(selections) {
      this.selected = selections
    },
    handleClickQuery() {
      this.fetchStrengthList()
    },
    handleClickBtnGroup(options) {
      const { type } = options
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
    }
  },
  created() {
    this.emptyFormData = JSON.parse(JSON.stringify(this.formData))
    this.fetchStrengthList()
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
