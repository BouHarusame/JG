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
            @row-click="showCurrentJcConfig"
            @row-dblclick="handEdit"
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
            <p slot="header"><el-button @click="handleClickToggle" type="text" style="float:left;margin: -11px 10px 0 0;" :icon="icon"></el-button>舰艇详情</p>
            <div class="rs_table_both">
              <table class="table out-table">
                <thead>
                  <th class="w140"  colspan="2">主要性能</th>
                  <th class="w140 th">功能及性能指标</th>
                </thead>
                <tbody>
                  <template v-for="s in currentStandardList">
                    <template v-if="s.hasp===false">
                      <tr :key="s.index">
                        <td class="w140" colspan="2">{{ s.name }}</td>
                        <td class="w140">{{ s.value }}</td>
                      </tr>
                    </template>
                    <template  v-else>
                      <tr :key="s.index"><td class="p-td w60" :rowspan="s.length+1">{{ s.pName }}</td></tr>
                      <template v-for="children in s">
                        <tr :key="children.index">
                          <td class="w80">{{ children.name }}</td>
                          <td class="w80">{{ children.value }}</td>
                        </tr>
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
    <el-dialog :visible.sync="addDialog" :title="title">
      <el-form class="form-list" label-width="80px">
        <template v-for="item in currentStandardList">
          <template v-if="item.hasp===false">
            <el-form-item :label="item.name" :key="item.index">
              <el-input :type="item.type" :rows="4" v-model="item.value"></el-input>
            </el-form-item>
          </template>
          <template v-else>
            <div class="rs_form_item" :key="item.index">
              <div class="rs_form_item_title">{{ item.pName}}</div>
              <el-row>
                <template v-for="children in item">
                  <el-col :span="12" :key="children.index">
                    <el-form-item :label="children.name">
                      <el-input v-model="children.value"></el-input>
                    </el-form-item>
                  </el-col>
                </template>
              </el-row>
            </div>
          </template>
        </template>
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
  name: 'Property',
  data() {
    return {
      btnGroup: [
        {
          name: '编辑',
          icon: 'el-icon-edit-outline',
          eventType: 'edit'
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
      // data: {
      //   bg: '',
      //   mission: '',
      //   totalLength: '',
      //   length: '',
      //   shapeWidth: '',
      //   shaprHeight: '',
      //   chishui: '',
      //   maxTonnage: '',
      //   normalTonnage: '',
      //   fullTonnage: '',
      //   standTonnage: '',
      //   maxSpeed: '',
      //   speed: '',
      //   range: '',
      //   self: '',
      //   kf: '',
      //   bc: '',
      //   cz: '',
      //   xh: '',
      //   bz: '',
      //   rw: '',
      //   mark: ''
      // },
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
    handleRowClickJc(row, column, rowIndex, columnIndex) {
      if (columnIndex !== 0) {
        this.currentJcIndex = row.index
      }
    },
    handEdit() {
      // this.$store.dispatch('fetchStandard')
      this.addDialog = true
      this.title = '设置参数值'
    },
    handleClickSave() {
      // this.$set(this.standardList, index, row)
      // request.post('/config',{ jcId: '3#', standardId: [1,2,3]})
      this.addDialog = false
      this.$message.success('保存成功')
    },
    // 显示所选船舰的参数列表
    showCurrentJcConfig() {
      request
        .get('/configDetails')
        .then(response => {
          response.data.forEach(item => {
            if (item.jcId === this.currentJcIndex) {
              this.currentStandardList = this.formateStandard(item.standards)
              console.log(this.currentStandardList)
            }
          })
        })
        .catch(e => {
          this.$message.error(e)
        })
    },
    /*getCurrentStandard() {
      const tempData = []
      this.currentStandardIdList.forEach(Iditem => {
        this.$store.getters.standardList.forEach(item => {
          if (Iditem === item.id) {
            tempData.push(item)
          }
        })
      })
      return tempData
    },*/
    formateStandard(sList) {
      // debugger
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
    handleSelectionChange(selections) {
      this.selected = selections
    },
    handleClickBtnGroup(options) {
      const { type } = options
      switch (type) {
        case 'edit':
          this.handEdit()
          break
        case 'export':
          this.$message.success('导出成功')
          break
      }
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
    ...mapGetters(['shipList'])
  },
  created() {
    this.$store.dispatch('fetchStandard')
  }
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
  & .rs_form_item {
    position: relative;
    padding: 25px 10px 0 10px;
    border: 1px solid #dcdfe6;
    border-radius: 5px;
    margin-top: 20px;
  }
  & .rs_form_item_title {
    height: 20px;
    line-height: 20px;
    display: inline-block;
    padding: 3px 10px;
    position: absolute;
    top: -15px;
    background: #fff;
  }
}
</style>
