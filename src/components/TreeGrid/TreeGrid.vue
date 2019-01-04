<template>
  <div class="tree-grid">
    <el-table :row-style="handleRowVisible" border stripe :data="dataClone">
      <el-table-column v-for="(c, i) in columns" :key="i" :label="c.label" :width="c.width">
        <template slot-scope="scope">
          <el-button type="text" v-if="handleVisible(i, scope.row)" @click="handleToggle(scope.$index, scope.row)">
            <i class="el-icon-caret-bottom" v-show="scope.row._expanded"></i>
            <i class="el-icon-caret-right" v-show="!scope.row._expanded"></i>
          </el-button>
          <span class="table-column" style="line-height: 1.2;">
            <span v-for="(cc, ii) in scope.row._level" :key="ii" v-if="handleSpaceVisible(i, scope.row)" class="rs_tg_space"></span>
            {{scope.row[c.key] || '-'}}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180px" fixed="right">
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
          <el-button type="primary" size="small" @click="handleClickEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button v-popover:popover type="danger" size="small" @click="handleClickDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="addDialog" class="rs_ms_dialog">
      <el-form label-width="90px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="类型：">
              <el-select v-model="formData.type">
                <el-option label="系统" value="s"></el-option>
                <el-option label="装备" value="m"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上级层级：">
              <el-select v-model="formData.parent">
                <el-option label="层级一" value="1"></el-option>
                <el-option label="层级二" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <div v-show="formData.type === 's'">
            <el-col :span="12">
              <el-form-item label="系统名称：">
                <el-input v-model="formData.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="功能：">
                <el-input v-model="formData.func"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="性能指标：">
                <el-input v-model="formData.property"></el-input>
              </el-form-item>
            </el-col>
          </div>
          <div v-show="formData.type === 'm'">
            <el-col :span="12">
              <el-form-item label="装备名称：">
                <el-input v-model="formData.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="数量：">
                <el-input v-model="formData.count"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="规格型号：">
                <el-input v-model="formData.model"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="生成厂家：">
                <el-input v-model="formData.productor"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="配置功用：">
                <el-input v-model="formData.func" type="textarea" :rows="5"></el-input>
              </el-form-item>
            </el-col>
          </div>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button type="primary" size="small" @click="handleClickSave">保存</el-button>
        <el-button size="small" @click="handleClickCancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { formatTreeData } from '@/utils'
export default {
  name: 'TreeGrid',
  data() {
    return {
      columns: [
        {
          label: '名称',
          key: 'name',
          width: '120px'
        },
        {
          label: '功能',
          key: 'func'
        },
        {
          label: '性能指标',
          key: 'property'
        },
        {
          label: '数量',
          key: 'count'
        },
        {
          label: '规格型号',
          key: 'type'
        },
        {
          label: '生产厂家',
          key: 'productor'
        }
      ],
      dataClone: null,
      lists: [
        {
          name: '常规系统',
          func: '舰艇常规系统与装备',
          property: '舰艇常规系统与装备',
          children: [
            {
              name: '电子对抗分系统',
              count: '',
              type: '',
              productor: ''
            },
            {
              name: '导航分系统',
              count: '',
              type: '',
              productor: ''
            },
            {
              name: '通信分系统',
              count: '',
              type: '',
              productor: ''
            }
          ]
        },
        {
          name: '任务系统',
          func: '舰艇任务系统与装备',
          property: '舰艇任务系统与装备',
          children: [
            {
              name: '舵装置',
              count: '',
              type: '',
              productor: ''
            },
            {
              name: '锚装置',
              count: '',
              type: '',
              productor: ''
            },
            {
              name: '系泊装置',
              count: '',
              type: '',
              productor: ''
            }
          ]
        }
      ],
      currentIndex: null,
      confirmDel: false,
      addDialog: false,
      formData: {
        type: 's',
        parent: '',
        name: '',
        func: '',
        property: '',
        count: '',
        model: '',
        productor: ''
      }
    }
  },
  methods: {
    handleVisible(i, row) {
      return i === 0 && row.children && row.children.length > 0
    },
    handleToggle(i, row) {
      this.dataClone[i]._expanded = !this.dataClone[i]._expanded
    },
    handleSpaceVisible(i, row) {
      return row._level > 0 && i === 0
    },
    handleRowVisible(opt) {
      const { row, rowIndex } = opt
      console.log(row._parent)
      const visible = row._parent ? row._parent._expanded : true
      return visible ? '' : 'display: none'
    },
    handleClickDel(index, row) {
      this.currentIndex = index
      this.confirmDel = true
    },
    handleConfirmDel() {
      this.dataClone.splice(this.currentIndex, 1)
      this.currentIndex = null
      this.confirmDel = false
    },
    handleClickEdit(index, row) {
      this.currentIndex = index
      this.addDialog = true
      this.formData = row
    },
    handleClickSave() {
      this.$message('保存成功')
      this.addDialog = false
    },
    handleClickCancel() {
      this.addDialog = false
    }
  },
  created() {
    this.dataClone = formatTreeData(JSON.parse(JSON.stringify(this.lists)))
    console.log('---------dataClone-------')
    console.log(this.dataClone)
  }
}
</script>
<style scoped>
.tree-grid {
  height: 100%;
  width: 100%;
  & .rs_table_header {
    width: 100%;
  }
  & .rs_table_body {
    width: 100%;
  }
  & .rs_tg_space {
    display: inline-block;
    padding: 0 10px;
    height: 1px;
  }
}
</style>
