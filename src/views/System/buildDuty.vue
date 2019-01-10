<template>
  <div class="rs_view_item">
    <el-card>
      <TableBar @click="handleClickBtnGroup" :btn-group="btnGroup" slot="header"></TableBar>
      <div class="rs-search-input">
        <div class="rs-search-item"><span>职务编码： </span><el-input placeholder="请输入查询内容"></el-input></div>
        <div class="rs-search-item"><span>名称:  </span><el-input placeholder="请输入查询内容"></el-input></div>
        <div class="button">查询</div>
      </div>
      <div @contextmenu="showMenu" id="demo" style="width: 100%;">
        <vue-context-menu :contextMenuData="contextMenuData"
                        @edit="handleClickEdit" @copy="savedata" @del="handleClickDel"
                        @add="handleClickAdd">
        </vue-context-menu>
         <el-table
          :data="membersList"
          style="width: 100%"
          ref="mulTable"
          highlight-current-row
          @cell-click="handleRowClick"
          @selection-change="handleSelectionChange">
          <el-table-column
            label="职务编码"
            prop="memberId">
          </el-table-column>
          <el-table-column
            label="名称"
            prop="name">
          </el-table-column>
          <el-table-column
            label="职务级别"
            prop="age">
          </el-table-column>
          <el-table-column
            label="编制人数"
            prop="title">
          </el-table-column>
          <el-table-column
            label="备注"
            prop="position">
          </el-table-column>
          <el-table-column
            label="维护人"
            prop="professional">
          </el-table-column>
          <el-table-column
            label="维护时间"
            prop="department">
          </el-table-column>
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
     </div>
    </el-card>
    <el-dialog :title="title" :visible.sync="addDialog" style="width: 600px; margin: 0 auto;">
      <el-form label-width="140px" :rules="rules">
        <el-form-item label="职务编码：" prop="memberId">
          <el-input v-model="formData.memberId" placeholder="请输入职务具体编码" title="请输入职务具体编码"></el-input>
        </el-form-item>
        <el-form-item label="名称：" prop="name">
          <el-input v-model="formData.name" placeholder="请输入职务具体名称" title="请输入职务具体名称"></el-input>
        </el-form-item>
        <el-form-item label="职务级别：">
          <el-input v-model="formData.position" placeholder="请输入职务级别" title="请输入职务级别"></el-input>
        </el-form-item>
        <el-form-item label="编制人数：">
          <el-input v-model="formData.age" placeholder="请输入编制人数" title="请输入编制人数"></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input type="textarea" v-model="formData.title"></el-input>
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
import { mapGetters } from 'vuex'
import * as request from '@/utils/request'
export default {
  name: 'Type',
  data() {
    return {
      rules: {
        name: [
          {
            required: true,
            message: '请输入职务具体名称'
          }
        ],
        memberId: [
          {
            required: true,
            message: '请输入职务具体编码'
          }
        ]
      },
      name: 'demo',
      contextMenuData: {
        // the contextmenu name(@1.4.1 updated)
        menuName: 'demo',
        // The coordinates of the display(菜单显示的位置)
        axis: {
          x: null,
          y: null
        },
        // Menu options (菜单选项)
        menulists: [
          {
            fnHandler: 'add',
            icoName: 'el-icon-more',
            btnName: '添加'
          },
          {
            fnHandler: 'copy',
            icoName: 'el-icon-setting',
            btnName: '复制'
          },
          {
            fnHandler: 'edit',
            icoName: 'el-icon-setting',
            btnName: '修改'
          },
          {
            fnHandler: 'del',
            icoName: 'el-icon-delete',
            btnName: '删除'
          }
        ]
      },
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
      membersList: [],
      currentIndex: null,
      currentRowIndex: null,
      confirmDel: false,
      formData: [],
      addDialog: false,
      title: '',
      selected: []
    }
  },
  methods: {
    showMenu() {
      event.preventDefault()
      var x = event.clientX
      var y = event.clientY
      // Get the current location
      this.contextMenuData.axis = {
        x,
        y
      }
    },
    savedata() {
      alert(1)
    },
    handleRowClick(row, column, rowIndex, columnIndex) {
      if (column.id !== 0) {
        this.currentRowIndex = rowIndex
        this.$refs.mulTable.clearSelection()
        this.$refs.mulTable.toggleRowSelection(row)
      }
    },
    fetchMembersList() {
      request
        .get('/dutyTable')
        .then(response => {
          if (response && response.data) {
            this.membersList = response.data
          }
        })
        .catch(e => {
          this.$message.error(e)
        })
    },
    handleConfirmDel() {
      this.membersList.splice(this.currentIndex, 1)
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
    handleClickSave() {
      if (this.title === '新增') {
        this.membersList.unshift(this.formData)
      }
      this.$message.success('保存成功')
      this.addDialog = false
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
    // this.$store.dispatch('fetchMembers')
    this.fetchMembersList()
  },
  /*computed: {
    ...mapGetters(['membersList'])
  },*/
  components: {
    TableBar
  }
}
</script>
<style scoped>
.rs-search-input {
  display: flex;
  margin: 20px auto;
  justify-content: space-around;
  width: 100%;
}
.rs-search-item {
  display: flex;
  align-items: center;
}
.rs-search-item span {
  display: inline-block;
  min-width: 80px;
  text-align: right;
  margin-right: 10px;
}
.rs-search-input .button {
  width: 120px;
  height: 30px;
  border: 1px solid #409eff;
  background: #409eff;
  text-align: center;
  line-height: 30px;
  color: #fff;
  border-radius: 4px;
}
.rs_view_item .el-dialog {
  width: 100%;
}
</style>
