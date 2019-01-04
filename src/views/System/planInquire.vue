<!-- <template>
  <div class="rs_view_item">
    <el-card>
      <TableBar @click="handleClickBtnGroup" :btn-group="btnGroup" slot="header"></TableBar>
      
    </el-card>
    <el-dialog :title="title" :visible.sync="addDialog">
      <TreeGrid
        :data="standardStatus" idField="id" treeField="name" :checkbox="true">
        <GridColumn field="name" title="标准计划名称" width="200px"></GridColumn>
        <GridColumn field="describe" title="描述"></GridColumn>
      </TreeGrid>
      <div slot="footer">
        <el-button type="primary" @click="handleClickPointSave">保存</el-button>
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
      }
  },
  methods: {
  },
  created() {
  },
  computed: {
  },
  components: {
  }
}
</script>
<style scoped>
.strength {
}
</style>
 -->