import * as request from '@/utils/request'
import TableBar from '@/components/TableBar/TableBar'

export default {
  data() {
    return {
      currentRowIndex: null,
      userList: [],
      currentIndex: 0,
      editVisible: false,
      confirmDel: false,
      delDialog: false,
      dialogVisible: false,
      selected: null,
      roleDialog: false,
      selectedRole: '',
      roleList: [],
      authDialog: false,
      authList: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
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
    fetchRoleList() {
      request
        .get('/role')
        .then(response => {
          if (response.data) {
            this.roleList = response.data
          }
        })
        .catch(e => {
          this.$message.error(e)
        })
    },
    fetchAuthList() {
      request
        .get('/auth')
        .then(response => {
          if (response.data) {
            this.authList = response.data
          }
        })
        .catch(e => {
          this.$message.error(e)
        })
    },
    handleClickEdit(index, row) {
      this.currentIndex = index
      this.editVisible = true
    },
    handleClickCancel(index) {
      this.currentIndex = index
      this.editVisible = false
    },
    handleClickDel(index, row) {
      this.currentIndex = index
      this.confirmDel = true
    },
    handleClickAdd() {
      this.dialogVisible = true
    },
    handleSelectionChange(selections) {
      this.selected = selections
    },
    handleClickDelDialogVisible() {
      if (this.selected === null) {
        this.$message.warning('未选择任何数据')
      } else {
        this.delDialog = true
      }
    },
    handleClickExport() {
      this.$message.success('导出成功')
    },
    handleClickAllotRoleSave() {
      this.roleDialog = false
      this.$message.success('保存成功')
    },
    handleClickAllotAuth() {
      this.authDialog = true
    },
    handleClickAllotAuthSave() {
      this.authDialog = false
      this.$message.success('保存成功')
    }
  },
  created() {
    this.fetchAuthList()
    this.fetchUserList()
    this.fetchRoleList()
  },
  components: {
    TableBar
  }
}
