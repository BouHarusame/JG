<template>
  <div class="user rs_view_item">
    <el-card class="card-box">
      <TableBar @click="handleClickBtnGroup" slot="header" :btn-group="btnGroup" />
      <el-table
      :data="userList"
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
          prop="username"
          label="用户名">
          <template slot-scope="scope">
            <p class="table-column">{{scope.row.username}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名">
          <template slot-scope="scope">
            <p class="table-column">{{scope.row.name}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱">
          <template slot-scope="scope">
            <p class="table-column">{{scope.row.email}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话">
          <template slot-scope="scope">
            <p class="table-column">{{scope.row.phone}}</p>
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

    <!-- 新增和编辑 -->
    <el-dialog :visible.sync="dialogVisible" :title="title">
      <el-form label-width="100px" :rules="rules" ref="adduser" :model="formData" status-icon>
        <el-form-item label="用户名：" prop="username">
          <el-input v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="姓名：" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="pwd" v-if="mode === 'add'">
          <el-input v-model="formData.pwd"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="pwd2" v-if="mode === 'add'">
          <el-input v-model="formData.pwd2"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" prop="email">
          <el-input v-model="formData.email"></el-input>
        </el-form-item>
        <el-form-item label="联系方式：" prop="phone">
          <el-input v-model="formData.phone"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="handleClickSave" type="primary">保存</el-button>
        <el-button @click="handleClickCancle">关闭</el-button>
      </div>
    </el-dialog>

    <!-- 删除提示 -->
    <el-dialog :visible.sync="delDialog" title="提示" width="400px">
      <p>确认删除？</p>
      <div slot="footer">
        <el-button @click="handleClickDelArr" type="primary">确认</el-button>
        <el-button @click="delDialog = false">取消</el-button>
      </div>
    </el-dialog>

    <!-- 分配角色 -->
    <el-dialog :visible.sync="roleDialog" title="分配角色" width="400px">
      <el-form label-width="80px">
        <el-form-item label="角色：">
          <el-select v-model="selectedRole">
            <el-option v-for="(c, i) in roleList" :key="i" :label="c.rolename" :value="c.roleId"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="handleClickAllotRoleSave" type="primary">确认</el-button>
        <el-button @click="roleDialog = false">取消</el-button>
      </div>
    </el-dialog>

    <!-- 分配权限 -->
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
    const confirmPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.formData.pwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
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
          name: '分配权限',
          icon: 'el-icon-tickets',
          eventType: 'auth'
        },
        {
          name: '分配角色',
          icon: 'el-icon-date',
          eventType: 'role'
        },
        {
          name: '附件',
          icon: 'fa fa-link',
          eventType: 'document'
        }
      ],
      formData: {
        name: '',
        username: '',
        pwd: '',
        pwd2: '',
        email: '',
        phone: ''
      },
      emptyFormData: null,
      rules: {},
      commRules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        name: [
          {
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: '请输入邮箱地址',
            trigger: 'blur'
          }
        ]
      },
      pwdRule: {
        pwd: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ],
        pwd2: [
          {
            validator: confirmPwd,
            trigger: 'blur'
          }
        ]
      },
      title: '',
      mode: ''
    }
  },
  mixins: [mixins],
  methods: {
    fetchUserList() {
      request
        .get('/user')
        .then(response => {
          if (response.data) {
            this.userList = response.data
          }
        })
        .catch(e => {
          this.$message.error(e)
        })
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
        case 'role':
          this.handleClickAllotRole()
          break
        case 'auth':
          this.handleClickAllotAuth()
      }
    },
    handleClickAllotRole() {
      this.roleDialog = true
    },
    handleConfirmDel() {
      this.userList.splice(this.currentIndex, 1)
      this.currentIndex = null
      this.confirmDel = false
    },
    handleClickSave() {
      this.dialogVisible = true
      this.$refs.adduser.validate(valid => {
        if (valid) {
          const temp = JSON.parse(JSON.stringify(this.formData))
          this.dialogVisible = false
          if (this.mode === 'add') {
            this.userList.unshift(temp)
          }
          this.$message.success('保存成功')
        } else {
          return false
        }
      })
    },
    handleClickCancle() {
      this.formData = this.emptyFormData
      this.dialogVisible = false
    },
    handleClickDelArr() {
      this.selected.forEach(c => {
        this.userList.forEach((ci, index) => {
          if (c.id === ci.id) {
            this.userList.splice(index, 1)
          }
        })
      })
      this.delDialog = false
    },
    handleClickRefresh() {
      this.fetchUserList()
      this.$message.success('刷新成功')
    },
    handleClickEdit(index, row) {
      this.rules = this.commRules
      this.title = '编辑用户'
      this.mode = 'edit'
      this.formData = row
      this.dialogVisible = true
    },
    handleClickAdd() {
      this.formData = this.emptyFormData
      this.rules = Object.assign(this.rules, this.commRules, this.pwdRule)
      this.title = '新增'
      this.mode = 'add'
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
