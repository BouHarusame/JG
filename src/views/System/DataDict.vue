<template>
  <div class="dict rs_view_item">
    <el-card>
      <TableBar @click="handleClickBtnGroup" :btn-group="btnGroup" slot="header"></TableBar>
      <el-row :gutter="20">
        <el-col :span="7" v-show="cardSpanRight !== 24">
          <el-card class="rs_dict_card">
            <p slot="header">字典列表</p>
            <el-table :data="dictList" class="rs_table_both">
              <el-table-column label="字典编码">
                <template slot-scope="scope">
                  <p class="table-column">{{scope.row.code}}</p>
                </template>
              </el-table-column>
              <el-table-column label="字典名称">
                <template slot-scope="scope">
                  <p class="table-column">{{scope.row.name}}</p>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="180px">
                <template slot-scope="scope">
                  <el-button size="small" type="primary" @click="handleClickEditDataDict(scope.row)">编辑</el-button>
                  <el-button size="small" type="danger" @>删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
        <el-col :span="cardSpanRight">
          <el-card class="">
            <div slot="header" class="btn-geoup">
              <el-button type="text" :icon="icon" @click="handleClickToggle"></el-button>
              <el-button size="small" type="primary" @click="handleClickAddDataDictItem">新增</el-button>
            </div>
            <el-table :data="dictListItem" class="rs_table_both">
              <el-table-column label="字典编码">
                <template slot-scope="scope">
                  <p class="table-column">{{scope.row.code}}</p>
                </template>
              </el-table-column>
              <el-table-column label="值描述">
                <template slot-scope="scope">
                  <p class="table-column">{{scope.row.descp}}</p>
                </template>
              </el-table-column>
              <el-table-column label="值">
                <template slot-scope="scope">
                  <p class="table-column">{{scope.row.value}}</p>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="180px">
                <template slot-scope="scope">
                  <el-button size="small" type="primary" @click="handleClickEditDataDictItem(scope.row)">编辑</el-button>
                  <el-button size="small" type="danger">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog :visible.sync="addDialog" :title="title">
      <el-form label-width="80px">
        <el-form-item label="字典编码:">
          <el-input v-model="formData.code"></el-input>
        </el-form-item>
        <el-form-item label="字典名称:">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="small" type="primary" @click="addDialog = false">保存</el-button>
        <el-button size="small"  @click="addDialog = false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="addItemDialog" :title="title">
      <el-form label-width="80px">
        <el-form-item label="字典编码:">
          <el-input v-model="itemFormData.code"></el-input>
        </el-form-item>
        <el-form-item label="值:">
          <el-input v-model="itemFormData.value"></el-input>
        </el-form-item>
        <el-form-item label="描述:">
          <el-input v-model="itemFormData.descp"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="small" type="primary" @click="addItemDialog = false">保存</el-button>
        <el-button size="small"  @click="addItemDialog = false">取消</el-button>
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
      dictList: [
        {
          name: '字典一',
          code: 1
        },
        {
          name: '字典二',
          code: 2
        },
        {
          name: '字典三',
          code: 3
        },
        {
          name: '字典四',
          code: 4
        },
        {
          name: '字典五',
          code: 5
        }
      ],
      dictListItem: [
        {
          code: 1,
          value: '值一',
          descp: '描述一'
        },
        {
          code: 2,
          value: '值二',
          descp: '描述二'
        },
        {
          code: 3,
          value: '值三',
          descp: '描述三'
        },
        {
          code: 4,
          value: '值四',
          descp: '描述四'
        },
        {
          code: 5,
          value: '值五',
          descp: '描述五'
        }
      ],
      addDialog: false,
      cardSpanRight: 17,
      icon: 'el-icon-d-arrow-left',
      formData: {
        code: '',
        name: ''
      },
      emptyFormData: {
        code: '',
        name: ''
      },
      mode: '',
      title: '',
      addItemDialog: false,
      itemFormData: {
        code: '',
        value: '',
        descp: ''
      },
      itemEmptyFormData: {
        code: '',
        value: '',
        descp: ''
      }
    }
  },
  methods: {
    handleClickBtnGroup(options) {
      const { type } = options
      switch (type) {
        case 'add':
          this.handleClickAddDataDict()
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
    },
    handleClickToggle() {
      if (this.cardSpanRight === 24) {
        this.icon = 'el-icon-d-arrow-left'
        this.cardSpanRight = 17
      } else {
        this.icon = 'el-icon-d-arrow-right'
        this.cardSpanRight = 24
      }
    },
    handleClickAddDataDict() {
      this.title = '新增'
      this.formData = this.emptyFormData
      this.addDialog = true
    },
    handleClickEditDataDict(row) {
      this.title = '编辑'
      this.formData = row
      this.addDialog = true
    },
    handleClickAddDataDictItem() {
      this.title = '新增'
      this.itemFormData = this.itemEmptyFormData
      this.addItemDialog = true
    },
    handleClickEditDataDictItem(row) {
      this.title = '编辑'
      this.itemFormData = row
      this.addItemDialog = true
    }
  },
  components: {
    TableBar
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
