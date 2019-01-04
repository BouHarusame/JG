<template>
  <div class="dict rs_view_item">
    <el-row :gutter="20">
      <el-col :span="6" v-show="cardSpanRight !== 24">
        <el-card class="rs_dict_card">
          <p slot="header">
            <span>分类名称</span>
            <el-button type="text" :icon="icon" @click="handleClickToggle" style="float: right;margin-top: -10px;"></el-button>
          </p>
          <el-tree :data="treeData" @node-click="handleNodeClick"></el-tree>
        </el-card>
      </el-col>
      <el-col :span="cardSpanRight">
        <el-button v-show="cardSpanRight === 24" type="text" :icon="icon" @click="handleClickToggle" style="position: absolute;left: -8px;"></el-button>
        <el-table :data="currentParamsData" class="rs_table_both">
            <el-table-column label="参数编码">
              <template slot-scope="scope">
                <p class="table-column">{{scope.row.code}}</p>
              </template>
            </el-table-column>
            <el-table-column label="参数名称">
              <template slot-scope="scope">
                <p class="table-column">{{scope.row.name}}</p>
              </template>
            </el-table-column>
            <el-table-column label="参数说明"  min-width="160">
              <template slot-scope="scope">
                <p class="table-column">{{scope.row.descp}}</p>
              </template>
            </el-table-column>
            <el-table-column label="参数值">
              <template slot-scope="scope">
                <p class="table-column">{{scope.row.value}}</p>
              </template>
            </el-table-column>
            <el-table-column label="参数值说明">
              <template slot-scope="scope">
                <p class="table-column">{{scope.row.valueDescp}}</p>
              </template>
            </el-table-column><el-table-column label="参数类型">
              <template slot-scope="scope">
                <p class="table-column">{{scope.row.type}}</p>
              </template>
            </el-table-column>
            <!-- <el-table-column label="组件名称">
              <template slot-scope="scope">
                <p class="table-column">{{scope.row.component}}</p>
              </template>
            </el-table-column> -->
            <el-table-column label="操作" width="100px">
              <template slot-scope="scope">
                <el-button size="small" type="primary" @click="handleClickEdit(scope.row, scope.$index)">参数设置</el-button>
              </template>
            </el-table-column>
          </el-table>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="addDialog" :title="title" top="20px">
      <el-form label-width="100px">
        <el-form-item label="参数编码：">
          <el-input v-model="formData.code" readonly></el-input>
        </el-form-item>
        <el-form-item label="参数名称：">
          <el-input v-model="formData.name" readonly></el-input>
        </el-form-item>
        <el-form-item label="参数说明：">
          <el-input v-model="formData.descp" readonly></el-input>
        </el-form-item>
        <el-form-item label="参数值：">
          <el-select v-model="formData.value" multiple placeholder="请选择"  style="width:100%;">
            <el-option label="998" value="998"></el-option>
            <el-option label="997" value="997"></el-option>
            <el-option label="996" value="996"></el-option>
            <el-option label="928" value="928"></el-option>
            <el-option label="966" value="966"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="参数值说明：">
          <el-input v-model="formData.valueDescp"></el-input>
        </el-form-item>
        <el-form-item label="参数类型：">
          <el-input v-model="formData.type" readonly></el-input>
        </el-form-item>
        <!-- <el-form-item label="组件名称：">
          <el-input v-model="formData.component"></el-input>
        </el-form-item> -->
      </el-form>
      <div slot="footer">
        <el-button size="small" type="primary" @click="handleClickSave">保存</el-button>
        <el-button size="small"  @click="addDialog = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import * as request from '@/utils/request'
export default {
  name: 'Type',
  data() {
    return {
      treeData: [
        {
          label: '全部',
          children: [
            {
              label: '系统参数',
              children: []
            },
            {
              label: '用户参数',
              children: [
                {
                  label: '1'
                },
                {
                  label: '2'
                }
              ]
            },
            {
              label: '角色参数',
              children: []
            }
          ]
        }
      ],
      paramsData: [
        {
          code: 'shipsU001',
          name: '用户允许查看的舰船',
          descp: '设置用户在系统中允许查看的舰船数据',
          value: ['998'],
          valueDescp: '舰船编号，必填项',
          type: 'Jc'
          // component: '1'
        },
        {
          code: 'shipsU002',
          name: '用户允许查看的项目',
          descp: '设置用户在系统中允许查看的项目数据',
          value: ['563256'],
          valueDescp: '项目编码，必填项',
          type: 'Pro'
          // component: '1'
        }
      ],
      currentParamsData: [],
      addDialog: false,
      cardSpanRight: 18,
      icon: 'el-icon-d-arrow-left',
      formData: {
        code: '',
        name: '',
        descp: '',
        value: '',
        valueDescp: '',
        type: '',
        component: ''
      },
      emptyFormData: {
        code: '',
        name: '',
        descp: '',
        value: '',
        valueDescp: '',
        type: '',
        component: ''
      },
      mode: '',
      title: '',
      addItemDialog: false,
      currentIndex: null
    }
  },
  methods: {
    init() {
      this.currentParamsData = this.paramsData
    },
    handleNodeClick(node) {
      // if (!node.children) {
      //   this.currentParamsData = []
      //   let num = Math.round(Math.random() * 1)
      //   this.currentParamsData.push(this.paramsData[num])
      // } else if (node.label === '系统参数') {
      //   this.currentParamsData = this.paramsData
      // }
    },
    makeCloneTreeData(index, data) {
      var tmpData = JSON.parse(JSON.stringify(this.treeData))
      tmpData[0].children[index].children = data
      return tmpData
    },
    handleClickToggle() {
      if (this.cardSpanRight === 24) {
        this.icon = 'el-icon-d-arrow-left'
        this.cardSpanRight = 18
      } else {
        this.icon = 'el-icon-d-arrow-right'
        this.cardSpanRight = 24
      }
    },
    handleClickEdit(row, index) {
      console.log(row)
      this.title = '参数设置'
      this.formData = row
      this.addDialog = true
      this.currentIndex = index
    },
    fetchUserList() {
      request
        .get('/user')
        .then(response => {
          if (response.data) {
            response.data.map(item => {
              item.key = item.id
              item.label = item.name
              // console.log(this.treeData[0])
            })
            this.treeData = this.makeCloneTreeData(1, response.data)
          }
        })
        .catch(e => {
          this.$message.error(e)
        })
    },
    fetchRoleList() {
      request
        .get('/user')
        .then(response => {
          if (response.data) {
            response.data.map(item => {
              item.key = item.id
              item.label = item.name
            })
            this.treeData = this.makeCloneTreeData(2, response.data)
          }
        })
        .catch(e => {
          this.$message.error(e)
        })
    },
    handleClickSave() {
      this.paramsData.splice(this.currentIndex, 1, this.formData)
      this.addDialog = false
    },
    handleClickDel(row, index) {
      this.$confirm('确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.paramsData.splice(index, 1)
        this.$message.success('删除成功!')
      })
    }
  },
  mounted() {
    this.fetchRoleList()
    this.fetchUserList()
    this.init()
  }
}
</script>
<style scoped>
.dict {
}
.search-form .el-input {
  width: 120px;
}
</style>
