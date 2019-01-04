<template>
  <div class="workflow">
    工作流
  </div>
</template>
<script>
import TableBar from '@/components/TableBar/TableBar'
export default {
  name: 'WorkFlow',
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
        }
      ],
      wfList: [
        {
          id: 1,
          name: '工作流一',
          status: '状态一',
          wait: '待处理人',
          start: '2018-03-30',
          end: '2018-04-05'
        },
        {
          id: 1,
          name: '工作流一',
          status: '状态一',
          wait: '待处理人',
          start: '2018-03-30',
          end: '2018-04-05'
        },
        {
          id: 1,
          name: '工作流一',
          status: '状态一',
          wait: '待处理人',
          start: '2018-03-30',
          end: '2018-04-05'
        },
        {
          id: 1,
          name: '工作流一',
          status: '状态一',
          wait: '待处理人',
          start: '2018-03-30',
          end: '2018-04-05'
        },
        {
          id: 1,
          name: '工作流一',
          status: '状态一',
          wait: '待处理人',
          start: '2018-03-30',
          end: '2018-04-05'
        }
      ]
    }
  },
  components: {
    TableBar
  }
}
</script>
