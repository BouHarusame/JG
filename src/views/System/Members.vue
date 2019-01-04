<template>
  <div class="rs_view_item">
    <el-card>
      <TableBar @click="handleClickBtnGroup" :btn-group="btnGroup" slot="header"></TableBar>
      <!-- <div class="rs-search-input">
        <el-input placeholder="请输入查询内容" prefix-icon="el-icon-search"></el-input>
      </div> -->
      <el-table
        :data="membersList"
        style="width: 100%"
        ref="mulTable"
        highlight-current-row
        @cell-click="handleRowClick"
        @selection-change="handleSelectionChange">
          <el-table-column type="expand" fixed="left">
            <template slot-scope="props">
              <div class="rs-resume-outer">
                <p class="rs-resume">学习经历</p>
                <el-table
                  :data="props.row.resume.study"
                  style="width:100%;"
                  highlight-current-row
                  class="point">
                  <el-table-column
                    type="index"
                    width="55">
                  </el-table-column>
                  <el-table-column
                    label="开始时间"
                    width='120'>
                    <template slot-scope="scope">
                      <p class="table-column">{{scope.row.startTime}}</p>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="结束时间"
                    prop="endTime">
                  </el-table-column>
                  <el-table-column
                    label="学校"
                    prop="school">
                  </el-table-column>
                  <el-table-column
                    label="专业"
                    prop="professional">
                  </el-table-column>
                  <el-table-column
                    label="学位"
                    prop="degree">
                  </el-table-column>
                  <el-table-column
                    label="备注"
                    prop="mark">
                  </el-table-column>
                </el-table>
                <p class="rs-resume">工作经历</p>
                <el-table
                  :data="props.row.resume.work"
                  style="width:100%;"
                  highlight-current-row
                  class="point">
                  <el-table-column
                    type="index"
                    width="55">
                  </el-table-column>
                  <el-table-column
                    label="开始时间"
                    width='120'>
                    <template slot-scope="scope">
                      <p class="table-column">{{scope.row.startTime}}</p>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="结束时间"
                    prop="endTime">
                  </el-table-column>
                  <el-table-column
                    label="公司"
                    prop="company">
                  </el-table-column>
                  <el-table-column
                    label="职位"
                    prop="position">
                  </el-table-column>
                  <el-table-column
                    label="成果"
                    prop="achievement">
                  </el-table-column>
                  <el-table-column
                    label="备注"
                    prop="mark">
                  </el-table-column>
                </el-table>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="人员编码"
            prop="memberId">
          </el-table-column>
          <el-table-column
            label="姓名"
            prop="name">
          </el-table-column>
          <el-table-column
            label="性别"
            prop="sex"
            width="55">
          </el-table-column>
          <el-table-column
            label="年龄"
            width="55"
            prop="age">
          </el-table-column>
          <el-table-column
            label="职称"
            prop="title">
          </el-table-column>
          <el-table-column
            label="职务"
            prop="position">
          </el-table-column>
          <el-table-column
            label="专业"
            prop="professional">
          </el-table-column>
          <el-table-column
            label="部门"
            prop="department">
          </el-table-column>
          <el-table-column
            label="用户编码">
            <template slot-scope="scope">
              <p class="table-column">{{scope.row.roleId}}</p>
            </template>
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
    </el-card>
    <el-dialog :title="title" :visible.sync="addDialog">
      <el-form label-width="140px">
        <el-form-item label="人员编码：">
          <el-input v-model="formData.memberId"></el-input>
        </el-form-item>
        <el-form-item label="姓名：">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="性别：">
          <el-input v-model="formData.sex"></el-input>
        </el-form-item>
        <el-form-item label="年龄：">
          <el-input v-model="formData.age"></el-input>
        </el-form-item>
        <el-form-item label="职称：">
          <el-input v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item label="职务：">
          <el-input v-model="formData.position"></el-input>
        </el-form-item>
        <el-form-item label="专业：">
          <el-input v-model="formData.professional"></el-input>
        </el-form-item>
        <el-form-item label="部门：">
          <el-input v-model="formData.department"></el-input>
        </el-form-item>
        <el-form-item label="用户编码：">
          <el-input v-model="formData.roleId"></el-input>
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
    handleRowClick(row, column, rowIndex, columnIndex) {
      if (column.id !== 0) {
        this.currentRowIndex = rowIndex
        this.$refs.mulTable.clearSelection()
        this.$refs.mulTable.toggleRowSelection(row)
      }
    },
    fetchMembersList() {
      request
        .get('/membersTable')
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
.strength {
}
</style>
