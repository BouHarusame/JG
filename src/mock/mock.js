const MockJs = require('mockjs')
const Random = MockJs.Random
const userInfo = function() {
  return {
    access: Random.integer(1, 5)
  }
}

var tempData = []

const tableData = function() {
  let temp = []
  const string = 'qwertyuiopasdfghjklmnbvcxz1234567890'
  for (let i = 0; i < 10; i++) {
    temp.push({
      id: Random.string(string, 32),
      username: Random.ctitle(3, 5),
      name: Random.cname(),
      phone: Random.string('number', 11),
      email: Random.email()
    })
  }
  return temp
}

const roleData = function() {
  let temp = []
  const string = 'qwertyuiopasdfghjklmnbvcxz1234567890'
  for (let i = 0; i < 10; i++) {
    temp.push({
      id: Random.string(string, 8),
      roleId: Random.string('number', 8),
      rolename: Random.cname(),
      mark: Random.title(),
      whr: Random.cname(),
      whsj: Random.date()
    })
  }
  return temp
}

const authData = [{
  id: '100000000',
  label: '系统管理',
  children: [{
    id: '100000001',
    label: '用户管理',
  }, {
    id: '100000002',
    label: '角色管理',
  }]
}]

const typeData = function () {
  return tempData = [
    {
      type: '登陆舰艇',
      model: 'X71综合登陆舰',
      shipNum: '998',
      shipName: '昆仑山',
      index: '1#',
      park: '',
      build: '沪东中华',
      id: '111111',
      sign: '2017-09-09',
      start: '2017-09-10',
      devFunds: 5000,
      buildFunds: 6000,
      payDate: '2018-03-03',
      service: 8,
      retire: '2026-03-03'
    }, {
      type: '水雷舰艇',
      model: 'X81型扫雷舰',
      shipNum: '8X5',
      shipName: '沂蒙山',
      index: '',
      park: '',
      build: '',
      id: '2222222',
      sign: '2017-09-09',
      start: '2017-09-10',
      devFunds: 5000,
      buildFunds: 6000,
      payDate: '2018-03-03',
      service: 8,
      retire: '2026-03-03'
    }]
}


const statusData = function () {
  const status = ['立案论证立项审查会', '批复立项', '方案设计', '深化方案设计', '修改技术设计', '施工设计', '下水', '系泊试验', '航行试验', '交船', '专项试验', '定型']
  let tempData = []
  for (var i = 0; i < status.length; i++) {
    tempData.push({
      id: i,
      descp: status[i]
    })
  }
  return tempData
}

const projectStatusData = function () {
  const status = ['方案设计', '详细设计', '采购时间', '设备入场', '陆上联调', '厂检', '军检', '出厂评审', '出公司', '调试', '系泊试验', '航行试验', '交船', '归档', '全寿命保障']
  let tempData = []
  for (var i = 0; i < status.length; i++) {
    tempData.push({
      id: i,
      stage: status[i]
    })
  }
  return tempData
}

const standardStatus = function() {
  return tempData = [
    {
      id: 1,
      name: '方案设计',
      describe: '明确舰船需求，预计工期等，提出合理方案',
      children: [
        {
          id: 16,
          name: '需求',
          describe: '明确舰船需求'
        },
        {
          id: 17,
          name: '工期规划',
          describe: '预计工期等'
        },
        {
          id: 18,
          name: '方案设计',
          describe: '提出合理方案'
        }
      ]
    },
    {
      id: 2,
      name: '详细计划',
      describe: '给出计划的明细',
      children: [
        {
          id: 19,
          name: '工期计划',
          describe: '工期明细'
        },
        {
          id: 20,
          name: '资金计划',
          describe: '金额明细'
        }
      ]
    },
    {
      id: 3,
      name: '采购时间',
      describe: '材料的采购具体日期'
    },
    {
      id: 4,
      name: '设备入场',
      describe: '这是描述'
    },
    {
      id: 5,
      name: '陆上联调',
      describe: '这是描述'
    },
    {
      id: 6,
      name: '厂检',
      describe: '这是描述'
    },
    {
      id: 7,
      name: '军检',
      describe: '这是描述'
    },
    {
      id: 8,
      name: '出厂评审',
      describe: '这是描述'
    },
    {
      id: 9,
      name: '出公司',
      describe: '这是描述'
    },
    {
      id: 10,
      name: '调试',
      describe: '这是描述'
    },
    {
      id: 11,
      name: '系泊试验',
      describe: '这是描述'
    },
    {
      id: 12,
      name: '航行试验',
      describe: '这是描述'
    },
    {
      id: 13,
      name: '交船',
      describe: '这是描述'
    },
    {
      id: 14,
      name: '归档',
      describe: '这是描述'
    },
    {
      id: 15,
      name: '全寿命保障',
      describe: '这是描述'
    }
  ]
}

const proStatus = function() {
  return tempData = [
    {
      id: 1,
      name: '方案设计',
      startTime: '2017-02-03',
      endTime: '2018-12-14',
      fuze: '王江坤',
      content: '根据需求提出合理方案',
      children: [
        {
          id: 16,
          name: '需求规划',
          startTime: '2017-02-04',
          endTime: '2017-02-06',
          fuze: '王江坤',
          content: '明确舰船需求'
        },
        {
          id: 17,
          name: '工期规划',
          startTime: '2017-02-04',
          endTime: '2017-02-06',
          fuze: '王江坤',
          content: '预计工期等'
        },
        {
          id: 18,
          name: '方案设计',
          startTime: '2017-06-05',
          endTime: '2017-06-07',
          fuze: '王江坤',
          content: '提出合理方案'
        }
      ]
    },
    {
      id: 2,
      name: '详细计划',
      startTime: '2017-02-04',
      endTime: '2017-02-06',
      fuze: '王江坤',
      content: '给出计划的明细',
      children: [
        {
          id: 19,
          name: '工期计划',
          startTime: '2017-02-04',
          endTime: '2017-02-06',
          fuze: '王江坤',
          content: '工期明细'
        },
        {
          id: 20,
          name: '资金计划',
          startTime: '2017-02-04',
          endTime: '2017-02-06',
          fuze: '王江坤',
          content: '金额明细'
        }
      ]
    },
    {
      id: 3,
      name: '采购时间',
      startTime: '2017-02-04',
      endTime: '2017-02-06',
      fuze: '王江坤',
      content: '材料的采购具体日期'
    },
    {
      id: 4,
      name: '设备入场',
      startTime: '2017-02-04',
      endTime: '2017-02-06',
      fuze: '王江坤',
      content: '金额明细'
    },
    {
      id: 5,
      name: '陆上联调',
      startTime: '2017-02-04',
      endTime: '2017-02-06',
      fuze: '王江坤',
      content: '金额明细'
    }
  ]
}

const standardData = function () {
  return tempData = [
    {
      id: 1,
      name: '研究背景',
      pname: '',
      hasp: false
    },{
      id: 2,
      name: '使命任务',
      pname: '',
      hasp: false
    },{
      id: 3,
      name: '总长',
      pname: '主尺度',
      hasp: true
    },{
      id: 4,
      name: '水线长',
      pname: '主尺度',
      hasp: true
    },{
      id: 5,
      name: '型宽',
      pname: '主尺度',
      hasp: true
    },{
      id: 6,
      name: '正常',
      pname: '排水量',
      hasp: true
    },{
      id: 7,
      name: '最大',
      pname: '排水量',
      hasp: true
    },{
      id: 8,
      name: '最小',
      pname: '排水量',
      hasp: true
    },{
      id: 9,
      name: '续航力',
      pname: '',
      hasp: false
    },{
      id: 10,
      name: '自给力',
      pname: '',
      hasp: false
    },{
      id: 11,
      name: '续航力',
      pname: '',
      hasp: false
    },{
      id: 12,
      name: '抗风能力',
      pname: '',
      hasp: false
    },{
      id: 13,
      name: '最大',
      pname: '航速',
      hasp: true
    },{
      id: 14,
      name: '最小',
      pname: '航速',
      hasp: true
    }
  ]
}

const configDetails = function () {
  return tempData = [
    {
      jcId: '1#',
      standards: [
      {
        id: 1,
        name: '研究背景',
        pname: '',
        hasp: false,
        value: '这是1#的研究背景',
        type: 'textarea'
      },{
        id: 2,
        name: '使命任务',
        pname: '',
        hasp: false,
        value: '这是1#的使命任务',
        type: 'textarea'
      },{
        id: 3,
        name: '总长',
        pname: '主尺度',
        hasp: true,
        value: '100m',
        type: ''
      },{
        id: 4,
        name: '水线长',
        pname: '主尺度',
        hasp: true,
        value: '200m',
        type: ''
      },{
        id: 9,
        name: '续航力',
        pname: '',
        hasp: false,
        value: '2 days',
        type: ''
      },{
        id: 6,
        name: '正常',
        pname: '排水量',
        hasp: true,
        value: '4吨',
        type: ''
      },{
        id: 7,
        name: '最大',
        pname: '排水量',
        hasp: true,
        value: '8吨',
        type: ''
      },{
        id: 13,
        name: '最大',
        pname: '航速',
        hasp: true,
        value: '100km/h',
        type: ''
      },{
        id: 8,
        name: '最小',
        pname: '排水量',
        hasp: true,
        value: '2吨',
        type: ''
      },{
        id: 14,
        name: '最小',
        pname: '航速',
        hasp: true,
        value: '50km/h',
        type: ''
      }]
    }, {
      jcId: '2#',
      standards: [
      {
        id: 2,
        name: '使命任务',
        pname: '',
        hasp: false,
        value: '这是2#的使命任务',
        type: 'textarea'
      },{
        id: 3,
        name: '总长',
        pname: '主尺度',
        hasp: true,
        value: '100m',
        type: ''
      },{
        id: 4,
        name: '水线长',
        pname: '主尺度',
        hasp: true,
        value: '200m',
        type: ''
      }]
    }, {
      jcId: '3#',
      standards: [
      {
        id: 1,
        name: '研究背景',
        pname: '',
        hasp: false,
        value: '这是3#的研究背景',
        type: 'textarea'
      },{
        id: 2,
        name: '使命任务',
        pname: '',
        hasp: false,
        value: '这是3#的使命任务',
        type: 'textarea'
      },{
        id: 3,
        name: '总长',
        pname: '主尺度',
        hasp: true,
        value: '300m',
        type: ''
      },{
        id: 4,
        name: '水线长',
        pname: '主尺度',
        hasp: true,
        value: '500m',
        type: ''
      }]
    }, {
      jcId: '4#',
      standards: [
      {
        id: 2,
        name: '使命任务',
        pname: '',
        hasp: false,
        value: '这是4#的使命任务',
        type: 'textarea'
      },{
        id: 3,
        name: '总长',
        pname: '主尺度',
        hasp: true,
        value: '800m',
        type: ''
      },{
        id: 4,
        name: '水线长',
        pname: '主尺度',
        hasp: true,
        value: '700m',
        type: ''
      }]
    }]
}

const appointedDetails = function () {
  return tempData = [
    {
      proId: '54256',
      members: [{
        id: '1',
        memberId: '47282071',
        name: '杨德军',
        position: '舰船设计师'
      },
      {
        id: '3',
        memberId: '85471256',
        name: '陈峰和',
        position: '舰船铸造师'
      }]
    },
    {
      proId: '85469',
      members: [{
        id: '2',
        memberId: '75451265',
        name: '王克军',
        position: '舰船设计师'
      },
      {
        id: '3',
        memberId: '85471256',
        name: '陈峰和',
        position: '舰船铸造师'
      }]
    },
    {
      proId: '32526',
      members: [{
        id: '4',
        memberId: '25488963',
        name: '高东方',
        position: '舰船铸造师'
      },
      {
        id: '8',
        memberId: '56854125',
        name: '陈方',
        position: '舰船铸造师'
      }]
    }
  ]
}

const contractData = function () {
  return tempData = [
    {
      contractId: '12987122',
      contractName: '扫雷舰合同',
      contractCate: '军用品',
      contractKinds: '收款',
      proId: '54256',
      signedTime: '2018-03-12',
      signedPlace: '上海',
      signedPerson: '李艳杰',
      handlePeople: '杨建华',
      signedUnit: '签订单位1',
      dense: '1',
      identification: '7895421366',
      point: [{
        conId: '12987122',
        pointNum: 1,
        pointType: "收款",
        pointTime: '2018-04-15',
        pointAmount: '78',
        pointHandler: '李哈哈',
        pointMark: ''
      },{
        conId: '12987122',
        pointNum: 2,
        pointType: "付款",
        pointTime: '2018-04-23',
        pointAmount: '12',
        pointHandler: '王杰',
        pointMark: ''
      },{
        conId: '12987122',
        pointNum: 3,
        pointType: "付款",
        pointTime: '2018-05-15',
        pointAmount: '7',
        pointHandler: '姜海军',
        pointMark: ''
      },
      {
        conId: '12987122',
        pointNum: 4,
        pointType: "收款",
        pointTime: '2018-05-16',
        pointAmount: '45',
        pointHandler: '王忠',
        pointMark: ''
      },
      {
        conId: '12987122',
        pointNum: 5,
        pointType: "收款",
        pointTime: '2018-06-15',
        pointAmount: '87',
        pointHandler: '李弘基',
        pointMark: ''
      }],
      mark: '请按时交接'
    },
    {
      contractId: '87454512',
      contractName: '补给舰合同',
      contractCate: '军用品',
      contractKinds: '收款',
      proId: '85462',
      signedTime: '2017-12-01',
      signedPlace: '北京',
      signedPerson: '王杰',
      handlePeople: '李菊',
      signedUnit: '签订单位2',
      dense: '2',
      identification: '7451258476',
      point: [{
        conId: '87454512',
        pointNum: 1,
        pointType: "收款",
        pointTime: '2018-03-14',
        pointAmount: '58',
        pointHandler: '江宏杰',
        pointMark: ''
      },{
        conId: '87454512',
        pointNum: 2,
        pointType: "收款",
        pointTime: '2018-08-14',
        pointAmount: '85',
        pointHandler: '姜海军',
        pointMark: ''
      },{
        conId: '87454512',
        pointNum: 3,
        pointType: "收款",
        pointTime: '2018-09-17',
        pointAmount: '12',
        pointHandler: '李建华',
        pointMark: ''
      }],
      mark: ''
    },
    {
      contractId: '52314562',
      contractName: '登陆舰合同',
      contractCate: '军用品',
      contractKinds: '收款',
      proId: '75845',
      signedTime: '2014-12-12',
      signedPlace: '天津',
      signedPerson: '杨海军',
      handlePeople: '杨建华',
      signedUnit: '签订单位3',
      dense: '1',
      identification: '8541258745',
      point: [{
        conId: '52314562',
        pointNum: 1,
        pointType: "收款",
        pointTime: '2015-08-24',
        pointAmount: '37',
        pointHandler: '姜海军',
        pointMark: ''
      },{
        conId: '52314562',
        pointNum: 2,
        pointType: "收款",
        pointTime: '2017-09-09',
        pointAmount: '37',
        pointHandler: '姜海军',
        pointMark: ''
      }],
      mark: ''
    },
    {
      contractId: '85474596',
      contractName: '护卫舰合同',
      contractCate: '军用品',
      contractKinds: '收款',
      proId: '12547',
      signedTime: '2016-03-18',
      signedPlace: '上海',
      signedPerson: '陈汉典',
      handlePeople: '李航嘉',
      signedUnit: '签订单位4',
      dense: '2',
      identification: '78456241',
      point: [{
        conId: '85474596',
        pointNum: 1,
        pointType: "收款",
        pointTime: '2017-01-01',
        pointAmount: '37',
        pointHandler: '姜海军',
        pointMark: '备注信息'
      }],
      mark: ''
    }
  ]
}

const configData = function () {
  return tempData = [
    {
      jcId: '1#',
      standardId: [1,2,3,4,5,6,7]
    }, {
      jcId: '2#',
      standardId: [2,3,4,7,8,9,10]
    }, {
      jcId: '3#',
      standardId: [3,5,7,8,9,10]
    }, {
      jcId: '4#',
      standardId: [4,5,6,7,8,9]
    }]
}

const buildData = function () {
  return tempData = [
    {
      type: '登陆舰艇',
      model: 'X71综合登陆舰',
      shipNum: '998',
      shipName: '昆仑山',
      index: '1#',
      park: '',
      build: '沪东中华',
      id: '111111',
      sign: '2017-09-09',
      start: '2017-09-10',
      devFunds: 5000,
      buildFunds: 6000,
      payDate: '2018-03-03',
      service: 8,
      retire: '2026-03-03'
    }, {
      type: '水雷舰艇',
      model: 'X81型扫雷舰',
      shipNum: '8X5',
      shipName: '沂蒙山',
      index: '',
      park: '',
      build: '',
      id: '2222222',
      sign: '2017-09-09',
      start: '2017-09-10',
      devFunds: 5000,
      buildFunds: 6000,
      payDate: '2018-03-03',
      service: 8,
      retire: '2026-03-03'
    }]
}

// const projectData = function () {
//   return tempData = [
//     {
//       proId: '54256',
//       proName: 'X71综合登陆舰',
//       amount: '50',
//       customer: '军远设备通信有限公司',
//       mainDepartment: '铸造部',
//       manager: '王晓东',
//       general: '沪东中华',
//       delivery: '2019-01-02',
//       cooDelivery: '2019-09-09',
//       mark: '务必按时完成',
//       members: [{
//         pId: '54256',
//         role:'项目经理',
//         memberId: '47282071',
//         name: '杨德军',
//         sex: '男',
//         age: '30',
//         title: '高级设计师',
//         professional: '舰船设计',
//         memberMark: ''
//       },{
//         pId: '54256',
//         role:'铸造师',
//         memberId: '85471256',
//         name: '陈峰和',
//         sex: '男',
//         age: '30',
//         title: '高级铸造师',
//         professional: '舰船铸造',
//         memberMark: ''
//       }]
//     },
//     {
//       proId: '85469',
//       proName: 'X91综合登陆舰',
//       amount: '50',
//       customer: '客户2',
//       mainDepartment: '铸造部',
//       manager: '王晓东',
//       general: '沪东中华',
//       delivery: '2019-01-02',
//       cooDelivery: '2019-09-09',
//       mark: '',
//       members: [{
//         pId: '85469',
//         role:'项目经理',
//         memberId: '47282071',
//         name: '杨德军',
//         sex: '男',
//         age: '30',
//         title: '高级设计师',
//         professional: '舰船设计',
//         memberMark: ''
//       }]
//     },
//     {
//       proId: '32526',
//       proName: 'X56综合登陆舰',
//       amount: '50',
//       customer: '客户3',
//       mainDepartment: '铸造部',
//       manager: '王晓东',
//       general: '沪东中华',
//       delivery: '2019-01-02',
//       cooDelivery: '2019-09-09',
//       mark: '',
//       members: []
//     }]
// }
const projectDataAdd = function () {
  return tempData = [
    {
      label: '小张',
      model: '男',
      shipNum: '作战副长',
      shipName: '机电部门',
      BirthdayDate: '2017-07-06',
      stature: '180',
      weight: '120'
    },
    {
      label: '小李',
      model: '女',
      shipNum: '舰长',
      shipName: '机电部门',
      BirthdayDate: '2017-07-06',
      stature: '170',
      weight: '100'
    }
  ]
}
const projectData = function () {
  return tempData = [
    {
      type: '周毅',
      model: '男',
      proId: 'DA001',
      shipNum: '作战副长',
      shipName: '机电部门',
      BirthdayDate: '2017-07-06',
      filingDate: '2017-08-11',
      stature: '',
      weight: '',
      genetic: '',
      allergy: '',
      medicalHistory: '',
      treatment: '',
      occupational: '',
      detail: '',
      comment: '',
      delivery: '系统管理员',
      cooDelivery: '2018-08-11'
    }, {
      type: '周毅1',
      model: '男',
      proId: 'DA001',
      shipNum: '作战副长',
      shipName: '机电部门',
      BirthdayDate: '2017-07-06',
      filingDate: '2017-08-11',
      stature: '',
      weight: '',
      genetic: '',
      allergy: '',
      medicalHistory: '',
      treatment: '',
      occupational: '',
      detail: '',
      comment: '',
      delivery: '系统管理员',
      cooDelivery: '2018-09-11'
    }]
}
const repairType = function () {
  const type = ['改装', '小修', '中修', '大修', '坞修', '预防性维修', '战时修理', '改进性修理', '延寿修理']
  let tempData = []
  for (var i = 0; i < type.length; i++) {
    tempData.push({
      id: i,
      descp: type[i]
    })
  }
  return tempData
}

const repairData = function () {
  return tempData = [
    {
      type: '登陆舰艇',
      shipNum: '998',
      date1: '2018-02-03',
      date2: '2018-03-20'
    }, {
      type: '水雷舰艇',
      shipNum: '8X5',
      id: '2222222',
      date1: '2018-02-03',
      date2: '2018-03-20'
    }]
}

const shipTable = function () {
  return [
    {
      type: '登陆舰艇',
      model: 'X71综合登陆舰',
      shipNum: '998',
      shipName: '昆仑山',
      index: '1#',
      park: '',
      build: '沪东中华'
    },
    {
      type: '登陆舰艇',
      model: 'X71综合登陆舰',
      shipNum: '999',
      shipName: '井冈山',
      index: '2#',
      park: '',
      build: '沪东中华'
    },
    {
      type: '登陆舰艇',
      model: 'X71综合登陆舰',
      shipNum: '989',
      shipName: '长白山',
      index: '3#',
      park: '',
      build: '沪东中华'
    },
    {
      type: '登陆舰艇',
      model: 'X71综合登陆舰',
      shipNum: '988',
      shipName: '沂蒙山',
      index: '4#',
      park: '',
      build: '沪东中华'
    },
    {
      type: '登陆舰艇',
      model: 'X72A型登陆舰',
      shipNum: '9X8',
      shipName: '',
      index: '',
      park: '',
      build: ''
    },
    {
      type: '登陆舰艇',
      model: 'X72A型登陆舰',
      shipNum: '935',
      shipName: '',
      index: '',
      park: '',
      build: ''
    },
    {
      type: '登陆舰艇',
      model: 'X72A型登陆舰',
      shipNum: '936',
      shipName: '',
      index: '',
      park: '',
      build: ''
    },
    {
      type: '水雷舰艇',
      model: 'X81型扫雷舰',
      shipNum: '8X5',
      shipName: '',
      index: '',
      park: '',
      build: ''
    },
    {
      type: '水雷舰艇',
      model: 'X81型扫雷舰',
      shipNum: '81X',
      shipName: '',
      index: '',
      park: '',
      build: ''
    },
    {
      type: '水雷舰艇',
      model: 'X81型扫雷舰',
      shipNum: '839',
      shipName: '',
      index: '',
      park: '',
      build: ''
    }
  ]
}

const projectTable = function () {
  return [
    {
      proId: '54256',
      proName: 'X81综合登陆舰'
    },
    {
      proId: '85469',
      proName: 'X91综合登陆舰'
    },
    {
      proId: '32526',
      proName: 'X56综合登陆舰'
    },
    {
      proId: '85471',
      proName: 'X71水雷舰艇'
    },
    {
      proId: '65893',
      proName: 'X93水雷舰艇'
    },
    {
      proId: '85641',
      proName: 'X41水雷舰艇'
    }
  ]
}

const membersTable = function() {
  return [
    {
      id: '1',
      roleId: '82568466',
      memberId: '47282071',
      name: '杨德军',
      sex: '男',
      age: '30',
      title: '高级设计师',
      position: '舰船设计师',
      professional: '舰船设计',
      department: '设计部门',
      resume: {
        study: [{
          startTime: '2000-09-01',
          endTime: '2004-06-30',
          school: '华东科技大学',
          professional: '海洋船舶',
          degree: '本科',
          mark: ''
        },{
          startTime: '2004-09-01',
          endTime: '2007-06-30',
          school: '复旦大学',
          professional: '海洋船舶',
          degree: '硕士',
          mark: ''
        }],
        work: [{
          startTime: '2007-07-01',
          endTime: '2014-06-30',
          company: '军远设备通信有限公司',
          position: '设计师',
          achievement: '3获得年度最佳设计师',
          mark: ''
        },{
          startTime: '2014-07-01',
          endTime: '2018-06-30',
          company: '军远设备通信有限公司',
          position: '项目总监',
          achievement: '',
          mark: ''
        }]
      }
    },
    {
      id: '2',
      roleId: '58461338',
      memberId: '75451265',
      name: '王克军',
      sex: '男',
      age: '30',
      title: '初级设计师',
      position: '舰船设计师',
      professional: '舰船设计',
      department: '设计部门',
      resume: {
        study: [{
          startTime: '2000-09-01',
          endTime: '2004-06-30',
          school: '华东科技大学',
          professional: '海洋船舶',
          degree: '本科',
          mark: ''
        },{
          startTime: '2004-09-01',
          endTime: '2007-06-30',
          school: '复旦大学',
          professional: '海洋船舶',
          degree: '硕士',
          mark: ''
        }],
        work: [{
          startTime: '2007-07-01',
          endTime: '2014-06-30',
          company: '军远设备通信有限公司',
          position: '设计师',
          achievement: '3获得年度最佳设计师',
          mark: ''
        },{
          startTime: '2014-07-01',
          endTime: '2018-06-30',
          company: '军远设备通信有限公司',
          position: '项目总监',
          achievement: '',
          mark: ''
        }]
      }
    },
    {
      id: '3',
      roleId: '96512345',
      memberId: '85471256',
      name: '陈峰和',
      sex: '男',
      age: '30',
      title: '高级铸造师',
      position: '舰船铸造师',
      professional: '舰船铸造',
      department: '铸造部门',
      resume: {
        study: [],
        work: []
      }
    },
    {
      id: '4',
      roleId: '65412379',
      memberId: '25488963',
      name: '高东方',
      sex: '女',
      age: '30',
      title: '初级铸造师',
      position: '舰船铸造师',
      professional: '舰船铸造',
      department: '铸造部门',
      resume: {
        study: [],
        work: []
      }
    },
    {
      id: '5',
      roleId: '98546123',
      memberId: '74445621',
      name: '金建华',
      sex: '男',
      age: '30',
      title: '高级设计师',
      position: '舰船设计师',
      professional: '舰船设计',
      department: '设计部门',
      resume: {
        study: [],
        work: []
      }
    },
    {
      id: '6',
      roleId: '58461338',
      memberId: '65412541',
      name: '王抵军',
      sex: '男',
      age: '30',
      title: '初级设计师',
      position: '舰船设计师',
      professional: '舰船设计',
      department: '设计部门',
      resume: {
        study: [],
        work: []
      }
    },
    {
      id: '7',
      roleId: '74545465',
      memberId: '32562354',
      name: '江建华',
      sex: '男',
      age: '30',
      title: '高级铸造师',
      position: '舰船铸造师',
      professional: '舰船铸造',
      department: '铸造部门',
      resume: {
        study: [],
        work: []
      }
    },
    {
      id: '8',
      roleId: '74125632',
      memberId: '56854125',
      name: '陈方',
      sex: '女',
      age: '30',
      title: '初级铸造师',
      position: '舰船铸造师',
      professional: '舰船铸造',
      department: '铸造部门',
      resume: {
        study: [],
        work: []
      }
    }
  ]
}
const dutyTable = function () {
  return [
    {
      id: '1',
      roleId: '82568466',
      memberId: '47282071',
      name: '杨德军',
      sex: '男',
      age: '30',
      title: '1',
      position: '舰船设计师',
      professional: '舰船设计',
      department: '2018-08-07'
    },
    {
      id: '2',
      roleId: '58461338',
      memberId: '75451265',
      name: '王克军',
      sex: '男',
      age: '30',
      title: '1',
      position: '舰船设计师',
      professional: '舰船设计',
      department: '2018-08-07'
    },
    {
      id: '3',
      roleId: '96512345',
      memberId: '85471256',
      name: '陈峰和',
      sex: '男',
      age: '30',
      title: '1',
      position: '舰船铸造师',
      professional: '舰船铸造',
      department: '2018-08-07',
      resume: {
        study: [],
        work: []
      }
    },
    {
      id: '4',
      roleId: '65412379',
      memberId: '25488963',
      name: '高东方',
      sex: '女',
      age: '30',
      title: '1',
      position: '舰船铸造师',
      professional: '舰船铸造',
      department: '2018-08-07',
      resume: {
        study: [],
        work: []
      }
    },
    {
      id: '5',
      roleId: '98546123',
      memberId: '74445621',
      name: '金建华',
      sex: '男',
      age: '30',
      title: '1',
      position: '舰船设计师',
      professional: '舰船设计',
      department: '2018-08-07',
      resume: {
        study: [],
        work: []
      }
    },
    {
      id: '6',
      roleId: '58461338',
      memberId: '65412541',
      name: '王抵军',
      sex: '男',
      age: '30',
      title: '2',
      position: '舰船设计师',
      professional: '舰船设计',
      department: '2018-08-07',
      resume: {
        study: [],
        work: []
      }
    },
    {
      id: '7',
      roleId: '74545465',
      memberId: '32562354',
      name: '江建华',
      sex: '男',
      age: '30',
      title: '2',
      position: '舰船铸造师',
      professional: '舰船铸造',
      department: '2018-08-07',
      resume: {
        study: [],
        work: []
      }
    },
    {
      id: '8',
      roleId: '74125632',
      memberId: '56854125',
      name: '陈方',
      sex: '女',
      age: '30',
      title: '1',
      position: '舰船铸造师',
      professional: '舰船铸造',
      department: '2018-08-07',
      resume: {
        study: [],
        work: []
      }
    }
  ]
}


const pMembersTable = function() {
  return [
    {
      id: '1',
      role: '项目经理',
      roleId: '82568466',
      memberId: '47282071',
      name: '杨德军',
      sex: '男',
      age: '30',
      title: '高级设计师',
      position: '舰船设计师',
      professional: '舰船设计',
      department: '设计部门',
      resume: {
        study: [{
          startTime: '2000-09-01',
          endTime: '2004-06-30',
          school: '华东科技大学',
          professional: '海洋船舶',
          degree: '本科',
          mark: ''
        },{
          startTime: '2004-09-01',
          endTime: '2007-06-30',
          school: '复旦大学',
          professional: '海洋船舶',
          degree: '硕士',
          mark: ''
        }],
        work: [{
          startTime: '2007-07-01',
          endTime: '2014-06-30',
          company: '军远设备通信有限公司',
          position: '设计师',
          achievement: '3获得年度最佳设计师',
          mark: ''
        },{
          startTime: '2014-07-01',
          endTime: '2018-06-30',
          company: '军远设备通信有限公司',
          position: '项目总监',
          achievement: '',
          mark: ''
        }]
      }
    },
    {
      id: '2',
      role: '设计师',
      roleId: '58461338',
      memberId: '75451265',
      name: '王克军',
      sex: '男',
      age: '30',
      title: '初级设计师',
      position: '舰船设计师',
      professional: '舰船设计',
      department: '设计部门',
      resume: {
        study: [{
          startTime: '2000-09-01',
          endTime: '2004-06-30',
          school: '华东科技大学',
          professional: '海洋船舶',
          degree: '本科',
          mark: ''
        },{
          startTime: '2004-09-01',
          endTime: '2007-06-30',
          school: '复旦大学',
          professional: '海洋船舶',
          degree: '硕士',
          mark: ''
        }],
        work: [{
          startTime: '2007-07-01',
          endTime: '2014-06-30',
          company: '军远设备通信有限公司',
          position: '设计师',
          achievement: '3获得年度最佳设计师',
          mark: ''
        },{
          startTime: '2014-07-01',
          endTime: '2018-06-30',
          company: '军远设备通信有限公司',
          position: '项目总监',
          achievement: '',
          mark: ''
        }]
      }
    },
    {
      id: '3',
      role: '铸造师',
      roleId: '96512345',
      memberId: '85471256',
      name: '陈峰和',
      sex: '男',
      age: '30',
      title: '高级铸造师',
      position: '舰船铸造师',
      professional: '舰船铸造',
      department: '铸造部门',
      resume: {
        study: [],
        work: []
      }
    },
    {
      id: '4',
      role: '铸造师',
      roleId: '65412379',
      memberId: '25488963',
      name: '高东方',
      sex: '女',
      age: '30',
      title: '初级铸造师',
      position: '舰船铸造师',
      professional: '舰船铸造',
      department: '铸造部门',
      resume: {
        study: [],
        work: []
      }
    }
  ]
}

MockJs.mock('/userInfo', userInfo)
MockJs.mock('/table', tableData)
MockJs.mock('/user', tableData)
MockJs.mock('/role', roleData)
MockJs.mock('/auth', authData)
MockJs.mock('/type', typeData)
MockJs.mock('/status', statusData)
MockJs.mock('/projectStatus', projectStatusData)
MockJs.mock('/standard', standardData)
MockJs.mock('/build', buildData)
MockJs.mock('/project', projectData)
MockJs.mock('/repairType', repairType)
MockJs.mock('/repairRecord', repairData)
MockJs.mock('/shipTable', shipTable)
MockJs.mock('/projectTable', projectTable)
MockJs.mock('/membersTable', membersTable)
MockJs.mock('/dutyTable', dutyTable)
MockJs.mock('/config', configData)
MockJs.mock('/configDetails', configDetails)
MockJs.mock('/appointedDetails', appointedDetails)
MockJs.mock('/contractData', contractData)
MockJs.mock('/standardStatus', standardStatus)
MockJs.mock('/pMembersTable', pMembersTable)
MockJs.mock('/proStatus', proStatus)
MockJs.mock('/projectAdd', projectDataAdd)