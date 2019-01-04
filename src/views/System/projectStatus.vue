<template>
  <div class="pro-status rs_view_item">
  <el-card>
    <TableBar @click="handleClickBtnGroup" :btn-group="btnGroup" slot="header"></TableBar>
    <TreeGrid
      :data="standardStatus" idField="id" treeField="name">
      <GridColumn field="name" title="标准计划名称" width="200px"></GridColumn>
      <GridColumn field="describe" title="计划内容"></GridColumn>
    </TreeGrid>
  </el-card>
    <el-dialog :visible.sync="addDialog" :title="title">
      <el-form label-width="100px">
        <el-form-item label="阶段名称：">
          <el-input v-model="formData.stage"></el-input>
        </el-form-item>
        <el-form-item label="计划内容">
          <el-input type="textarea" :rows="5"></el-input>
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
      projectStatusList: [],
      currentIndex: null,
      currentRowIndex: null,
      confirmDel: false,
      formData: [],
      addDialog: false,
      title: '',
      standardStatus: []
    }
  },
  methods: {
    handleRowClick(row, column, rowIndex, columnIndex) {
      if (columnIndex !== 0) {
        this.currentRowIndex = rowIndex
        this.$refs.mulTable.clearSelection()
        this.$refs.mulTable.toggleRowSelection(row)
      }
    },
    fetchProjectStatusList() {
      request
        .get('/standardStatus')
        .then(response => {
          if (response && response.data) {
            this.standardStatus = response.data
          }
        })
        .catch(e => {
          this.$message.error(e)
        })
    },
    handleConfirmDel() {
      this.projectStatusList.splice(this.currentIndex, 1)
      this.currentIndex = null
      this.confirmDel = false
    },
    handleClickAdd() {
      this.title = '新增'
      this.formData = []
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
      if (this.title === '新增') {
        this.projectStatusList.push(this.formData)
      }
      this.addDialog = false
      this.$message.success('保存成功')
    },
    handleSelectionChange(selections) {
      this.selected = selections
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
    this.fetchProjectStatusList()
  },
  components: {
    TableBar
  }
}
</script>
<style scoped>
.pro-status {
  /*& .datagrid-cell {
    text-align: center !important;
  }*/
}
</style>
