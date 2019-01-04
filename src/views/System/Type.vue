<template>
  <div class="type rs_view_item">
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
        <el-form-item label="名称">
          <el-input placeholder="名称" v-model="shipName"></el-input>
        </el-form-item>
      </el-form> -->
      <el-table
        :data="shipList"
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
            label="舰艇名称">
            <template slot-scope="scope">
              <p class="table-column">{{scope.row.shipName}}</p>
            </template>
          </el-table-column>
          <el-table-column
            label="舰艇类型">
            <template slot-scope="scope">
              <p class="table-column">{{scope.row.type}}</p>
            </template>
          </el-table-column>
          <el-table-column
            label="舰艇型号">
            <template slot-scope="scope">
              <p class="table-column">{{scope.row.model}}</p>
            </template>
          </el-table-column>
          <el-table-column
            label="舰艇舷号">
            <template slot-scope="scope">
              <p class="table-column">{{scope.row.shipNum}}</p>
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
              <el-button  @click="handleClickEdit(scope.row)" size="small" type="primary">编辑</el-button>
              <el-button v-popover:popover size="small" type="danger" @click="handleClickDel(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
    </el-card>
    <el-dialog :visible.sync="addDialog" :title="title">
      <el-form label-width="90px">
        <el-form-item label="舰艇类型：">
          <el-input v-model="formData.type"></el-input>
        </el-form-item>
        <el-form-item label="舰艇型号：">
          <el-input v-model="formData.model"></el-input>
        </el-form-item>
        <el-form-item label="舰艇舷号：">
          <el-input v-model="formData.shipNum"></el-input>
        </el-form-item>
        <el-form-item label="舰艇名称：">
          <el-input v-model="formData.shipName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="handleClickSave">保存</el-button>
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
      type: '',
      model: '',
      shipNum: '',
      shipList: [],
      currentIndex: null,
      currentRowIndex: null,
      confirmDel: false,
      addDialog: false,
      shipName: '',
      mode: '',
      formData: {
        type: '',
        model: '',
        shipName: '',
        shipName: ''
      },
      emptyFormData: null,
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
    fetchShipLists() {
      request
        .get('/type')
        .then(response => {
          if (response && response.data) {
            this.shipList = response.data
          }
        })
        .catch(e => {
          this.$message.error(e)
        })
    },
    handleConfirmDel() {
      this.shipList.splice(this.currentIndex, 1)
      this.currentIndex = null
      this.confirmDel = false
    },
    handleClickAdd() {
      this.title = '新增'
      this.formData = this.emptyFormData
      this.mode = 'add'
      this.addDialog = true
    },
    handleClickEdit(row) {
      this.title = '编辑'
      this.mode = 'edit'
      this.addDialog = true
      this.formData = row
    },
    handleClickDel(index, row) {
      this.currentIndex = index
      this.confirmDel = true
    },
    handleClickSave(index, row) {
      this.$set(this.shipList, index, row)
      this.$message.success('保存成功')
    },
    handleClickCancel(index) {
      this.currentIndex = index
    },
    handleSelectionChange(selections) {
      this.selected = selections
    },
    handleClickQuery() {
      this.fetchShipLists()
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
    this.fetchShipLists()
  },
  components: {
    TableBar
  }
}
</script>
<style scoped>
.type {
}
.search-form .el-input {
  width: 120px;
}
</style>
