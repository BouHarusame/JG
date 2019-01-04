<template>
  <div class="property rs_view_item">
    <el-card class="card-box">
      <TableBar :btn-group="btnGroup" slot="header" @click="handleClickBtnGroup" />
      <el-row class="rs_p_row" :gutter="20">
        <el-col :span="8" v-show="cardSpanRight !== 24">
          <el-card class="rs_ps_card">
            <p slot="header">舰艇列表</p>
            <el-table
            border
            :data="shipList"
            :highlight-current-row="true"
            @cell-click="handleRowClickJc"
            @row-dblclick="handSetting"
            @row-click="showCurrentJcConfig"
            height="100%">
             <el-table-column
              type="index"
              width="55"></el-table-column>
              <el-table-column label="型号">
                <template slot-scope="scope">
                  <p class="table-column">{{scope.row.model}}</p>
                </template>
              </el-table-column>
              <el-table-column label="舷号">
                <template slot-scope="scope">
                  <p class="table-column">{{scope.row.value}}</p>
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
            <p slot="header"><el-button @click="handleClickToggle" type="text" style="float:left;margin: -11px 10px 0 0;" :icon="icon"></el-button>性能参数</p>
            <div class="rs_table_both">
              <table class="table out-table">
                <thead>
                  <th class="w140" colspan="2">主要性能</th>
                </thead>
                <tbody>
                  <template v-for="s in currentStandardList">
                    <template v-if="s.hasp===false">
                      <tr :key="s.index"><td class="w140" colspan="2">{{ s.name }}</td></tr>
                    </template>
                    <template  v-else>
                      <tr :key="s.index"><td class="p-td w60" :rowspan="s.length+1">{{ s.pName }}</td></tr>
                      <template v-for="children in s">
                        <tr :key="children.index"><td class="w80">{{ children.name }}</td></tr>
                      </template>
                    </template>
                  </template>
                </tbody>
              </table>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog :visible.sync="addDialog" :title="title" @open="handleDialogOpen">
      <el-table
      :data="standardList"
      style="width: 100%"
      ref="mulTable"
      :highlight-current-row="true"
      @selection-change="handleSelectionChange">
        <el-table-column
        type="selection"
        width="55"></el-table-column>
        <el-table-column
          label="性能名称">
          <template slot-scope="scope">
            <p class="table-column">{{scope.row.name}}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="所属类型">
          <template slot-scope="scope">
            <p class="table-column">{{scope.row.pname}}</p>
          </template>
        </el-table-column>
      </el-table>
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
  name: 'Configuration',
  data() {
    return {
      btnGroup: [
        {
          name: '设置',
          icon: 'el-icon-setting',
          eventType: 'setting'
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
      // model: '',
      // shipNum: '',
      // shipName: '',
      cardSpanRight: 16,
      icon: 'el-icon-d-arrow-left',
      currentJcIndex: null,
      addDialog: false,
      title: '',
      selected: [],
      currentStandardIdList: [],
      currentStandardList: []
    }
  },
  components: {
    TableBar
  },
  methods: {
    handleDialogOpen() {
      this.$nextTick(() => {
        this.currentStandardIdList.forEach(item => {
          this.$refs.mulTable.toggleRowSelection(this.standardList[item - 1])
        })
      })
    },
    handleRowClickJc(row, column, rowIndex, columnIndex) {
      if (columnIndex !== 0) {
        this.currentJcIndex = row.index
      }
    },
    handleClickBtnGroup(options) {
      const { type } = options
      switch (type) {
        case 'setting':
          this.handSetting()
          break
        case 'export':
          this.$message.success('导出成功')
          break
      }
    },
    handSetting() {
      console.log(this.currentJcIndex)
      this.$store.dispatch('fetchStandard').then(response => {
        this.title = '设置舰艇性能参数'
        this.addDialog = true
      })
    },
    handleSelectionChange(selections) {
      this.selected = selections
    },
    handleClickSave() {
      // console.log(this.selected)
      this.currentStandardList = this.formateStandard(this.selected)
      this.addDialog = false
      this.$message.success('保存成功')
    },
    showCurrentJcConfig() {
      request
        .get('/configDetails')
        .then(response => {
          response.data.forEach(item => {
            if (item.jcId === this.currentJcIndex) {
              this.currentStandardIdList = []
              item.standards.forEach(itemStandards => {
                this.currentStandardIdList.push(itemStandards.id)
              })
              this.currentStandardList = this.formateStandard(item.standards)
              // console.log(this.currentStandardList)
              // console.log(this.currentStandardIdList)
            }
          })
        })
        .catch(e => {
          this.$message.error(e)
        })
    },
    formateStandard(sList) {
      const formateS = []
      sList.forEach(item => {
        if (item.hasp === false) {
          item.handled = true
          formateS.push(item)
          // console.log(formateS)
        }
      })
      sList.forEach(item => {
        if (!item.handled) {
          const group = []
          group.pName = item.pname
          sList.forEach(itemhasp => {
            if (!itemhasp.handled && itemhasp.pname === item.pname) {
              itemhasp.handled = true
              group.push(itemhasp)
              // console.log(itemhasp.id + ':' + itemhasp.name)
            }
          })
          formateS.push(group)
        }
      })
      return formateS
    },
    handleClickToggle() {
      if (this.cardSpanRight === 24) {
        this.icon = 'el-icon-d-arrow-left'
        this.cardSpanRight = 16
      } else {
        this.icon = 'el-icon-d-arrow-right'
        this.cardSpanRight = 24
      }
    }
  },
  computed: {
    ...mapGetters(['shipList', 'standardList'])
  },
  created() {
    this.$store.dispatch('fetchStandard')
  }
  // created() {
  // }
}
</script>
<style scope>
:root {
  --border-color: #ebeef5;
}
.property {
  width: 100%;
  height: 100%;
  font-size: 14px;
  & .w60 {
    width: 60px;
  }
  & .w80 {
    width: 80px;
  }
  & .w140 {
    width: 140px;
  }
  & .th {
    width: 300px;
  }
  & .table {
    width: 100%;
    text-align: center;
    border-spacing: 0;
    & td {
      padding: 0;
      height: 32px;
    }
  }
  & .table {
    border: 1px solid var(--border-color);
    padding: 0;
  }
  & .table thead th {
    height: 32px;
    line-height: 32px;
    border-bottom: 1px solid var(--border-color);
    &:last-child {
      border-right: none;
    }
  }
  & .table td {
    border-bottom: 1px solid var(--border-color);
    border-right: 1px solid var(--border-color);
  }
  & .td-table {
    width: 100%;
    border-spacing: 0;
    border: none;
    & td {
      border-bottom: 1px solid var(--border-color);
      border-right: 1px solid var(--border-color);
    }
  }
  & .td-table03 td {
    border-right: none;
  }
  & .p-td {
    width: 60px;
    border-right: 1px solid var(--border-color);
  }
  & .bdr-n {
    border-right: none !important;
  }
  & .table-column {
    cursor: pointer;
  }
  & .rs_p_row {
    height: calc(100% - 45px);
  }
}
</style>
