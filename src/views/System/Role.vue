<template>
  <div class="role rs_view_item">
    <el-card class="card-box">
      <TableBar @click="handleClickBtnGroup" slot="header" :btn-group="btnGroup" />
      <el-table
      :data="roleList"
      style="width: 100%"
      ref="rolelist"
      @selection-change="handleSelectionChange">
        <el-table-column
        type="selection"
        width="55"></el-table-column>
        <el-table-column
          label="角色编码">
          <template slot-scope="scope">
            <p class="table-column">{{scope.row.roleId}}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="角色名称">
          <template slot-scope="scope">
            <p class="table-column">{{scope.row.rolename}}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="备注">
          <template slot-scope="scope">
            <p class="table-column">{{scope.row.mark}}</p>
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
            <el-button v-show="!(currentIndex === scope.$index && editVisible)" @click="handleClickEdit(scope.row)" size="small" type="primary">编辑</el-button>
            <el-button v-popover:popover v-show="!(currentIndex === scope.$index && editVisible)" size="small" type="danger" @click="handleClickDel(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog :visible.sync="dialogVisible" :title="title">
      <el-form label-width="100px" :rules="rules" ref="addrole" :model="formData" status-icon>
        <el-form-item label="角色编码：" prop="roleId">
          <el-input v-model="formData.roleId"></el-input>
        </el-form-item>
        <el-form-item label="角色名称：" prop="rolename">
          <el-input v-model="formData.rolename"></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="formData.mark" type="textarea" :row="3"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="handleClickSave" type="primary">保存</el-button>
        <el-button @click="handleClickCancle">关闭</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="delDialog" title="提示" width="400px">
      <p>确认删除？</p>
      <div slot="footer">
        <el-button @click="handleClickDelArr" type="primary">确认</el-button>
        <el-button @click="delDialog = false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="roleDialog" title="分配用户">
      <el-transfer :titles="['所有用户', '当前用户所属角色']" v-model="userSelected" :data="userList"></el-transfer>
      <div slot="footer">
        <el-button @click="handleClickAllotUserSave" type="primary">保存</el-button>
        <el-button @click="roleDialog = false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="authDialog" title="分配权限">
      <el-tree
        :data="authList"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps">
      </el-tree>
      <div slot="footer">
        <el-button @click="handleClickAllotAuthSave" type="primary">保存</el-button>
        <el-button @click="authDialog = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as request from '@/utils/request'
import mixins from '@/mixins/mixins'
export default {
  name: 'SystemUser',
  data() {
    return {
      userList: [],
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
          name: '分配权限',
          icon: 'el-icon-tickets',
          eventType: 'auth'
        },
        {
          name: '分配用户',
          icon: 'el-icon-date',
          eventType: 'user'
        },
        {
          name: '附件',
          icon: 'fa fa-link',
          eventType: 'document'
        }
      ],
      formData: {
        rolename: '',
        roleId: '',
        mark: ''
      },
      rules: {
        rolename: [
          {
            required: true,
            message: '请输入角色名',
            trigger: 'blur'
          }
        ],
        roleId: [
          {
            required: true,
            message: '请输入角色编码',
            trigger: 'blur'
          }
        ]
      },
      userSelected: [],
      mode: '',
      title: '',
      emptyFormData: null
    }
  },
  mixins: [mixins],
  methods: {
    fetchUserList() {
      request
        .get('/user')
        .then(response => {
          if (response.data) {
            response.data.map(item => {
              item.key = item.id
              item.label = item.name
            })
            this.userList = response.data
          }
        })
        .catch(e => {
          this.$message.error(e)
        })
    },
    handleConfirmDel() {
      this.userList.splice(this.currentIndex, 1)
      this.currentIndex = null
      this.confirmDel = false
    },
    handleClickBtnGroup(options) {
      switch (options.type) {
        case 'add':
          this.handleClickAdd()
          break
        case 'del':
          this.handleClickDelDialogVisible()
          break
        case 'refresh':
          this.handleClickRefresh()
          break
        case 'export':
          this.handleClickExport()
          break
        case 'user':
          this.handleClickAllotUser()
          break
        case 'auth':
          this.handleClickAllotAuth()
      }
    },
    handleClickSave() {
      this.dialogVisible = true
      this.$refs.addrole.validate(valid => {
        if (valid) {
          const temp = JSON.parse(JSON.stringify(this.formData))
          this.dialogVisible = false
          if (this.mode === 'add') {
            this.userList.unshift(temp)
          }
          this.$message.success('保存成功')
          this.formData = this.emptyFormData
        } else {
          return false
        }
      })
    },
    handleClickCancle() {
      this.dialogVisible = false
      this.formData = this.emptyFormData
    },
    handleClickDelArr() {
      this.selected.forEach(c => {
        this.roleList.forEach((ci, index) => {
          if (c.id === ci.id) {
            this.roleList.splice(index, 1)
          }
        })
      })
      this.delDialog = false
      this.$message.success('删除成功')
    },
    handleClickRefresh() {
      this.fetchRoleList()
      this.$message.success('刷新成功')
    },
    handleClickAllotUserSave() {
      this.roleDialog = false
      this.$message.success('保存成功')
    },
    handleClickAllotUser() {
      this.roleDialog = true
    },
    handleClickAdd() {
      this.formData = this.emptyFormData
      this.title = '新增'
      this.mode = 'add'
      this.dialogVisible = true
    },
    handleClickEdit(row) {
      this.title = '编辑用户'
      this.mode = 'edit'
      this.formData = row
      this.dialogVisible = true
    }
  },
  created() {
    this.emptyFormData = JSON.parse(JSON.stringify(this.formData))
  }
}
</script>

<style scoped>
.user {
  color: maroon;
  font-size: 2rem;
  & .card-box .el-card__header {
    padding: 9px 20px;
  }
}
</style>
