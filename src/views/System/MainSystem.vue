<template>
  <div class="main-system rs_view_item">
    <el-card class="card-box">
      <TableBar @click="handleClickBtnGroup" slot="header" :btn-group="btnGroup" />
      <el-row :gutter="20">
        <el-col :span="6" v-show="cardSpanRight !== 24">
          <el-card class="rs_ps_card">
            <p slot="header">舰艇列表</p>
            <el-table class="rs_table_both" border stripe :data="shipList">
              <el-table-column label="型号">
                <template slot-scope="scope">
                  <p class="table-column">{{scope.row.model}}</p>
                </template>
              </el-table-column>
              <el-table-column label="舰名">
                <template slot-scope="scope">
                  <p class="table-column">{{scope.row.shipName}}</p>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
        <el-col :span="cardSpanRight">
          <el-card class="rs_ps_card">
            <p slot="header"><el-button @click="handleClickToggle" type="text" style="float:left;margin: -11px 10px 0 0;" :icon="icon"></el-button>详情</p>
            <TreeGrid :data="systemData" class-name="rs_table_both"></TreeGrid>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
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
import TableBar from '@/components/TableBar/TableBar'
import TreeGrid from '@/components/TreeGrid/TreeGrid'
import { mapGetters } from 'vuex'
export default {
  name: 'MainSystem',
  data() {
    return {
      btnGroup: [
        {
          name: '新增',
          icon: 'el-icon-plus',
          eventType: 'add'
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
      currentNode: null,
      sysData: [
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
      model: '',
      shipNum: '',
      shipName: '',
      cardSpanRight: 18,
      icon: 'el-icon-d-arrow-left',
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
    handleClickBtnGroup(opt) {
      const { type } = opt
      switch (type) {
        case 'add':
          this.handleClickAdd()
          break
      }
    },
    handleNodeClick(row) {
      if (row.type && (row.type === 's' || row.type === 'm')) {
        this.currentNode = row
      }
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
    handleClickAdd() {
      this.addDialog = true
    },
    handleClickSave() {
      this.$message('保存成功')
    },
    handleClickCancel() {
      this.addDialog = false
    }
  },
  computed: {
    systemData() {
      this.sysData.forEach(item => {
        item._expanded = false
      })
      return this.sysData
    },
    type() {
      return this.currentNode && this.currentNode.type
    },
    ...mapGetters(['shipList'])
  },
  components: {
    TableBar,
    TreeGrid
  }
}
</script>
<style scope>
</style>
