import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/login' //登陆  
import Home from '../views/home/home' //主组件
// 引入nav组件
import HomePage from '../components/1.homePage/homePage' //首页
import DataMonitor from '../components/2.dataMonitor/dataMonitor' //数据监控
import MessageList from '../components/3.dangerAlarm/messageList' //消息列表
import AlarmConfig from '../components/3.dangerAlarm/alarmConfig' //报警配置
import DataAnalysis from '../components/4.dataAnalysis/dataAnalysis' //数据分析
import SystemLog from '../components/5.systemLog/systemLog' //系统日志
import SystemReport from '../components/6.systemReport/systemReport' //系统报表
import CheckCalendar from '../components/7.checkManage/checkCalendar' //巡检记录
import ExecutePlan from '../components/7.checkManage/executePlan' //巡检记录--未执行
import CheckPlan from '../components/7.checkManage/checkPlan' //巡检计划
import AddNewPlan from '../components/7.checkManage/addNewPlan' //巡检计划--新增巡检计划
import Knowledge from '../components/8.knowledge/knowledge' //知识库
import SortConfig from '../components/9.sortConfig/sortConfig' //层级设置
import User from '../components/10.user/user' //个人中心
import ReportPrint from '../components/6.systemReport/reportPrint' //打印界面
// 次级界面
import AlarmAdd from '../components/3.dangerAlarm/alarmAdd' //报警配置--添加
import AlarmBatch from '../components/3.dangerAlarm/alarmBatch' //报警配置--批量修改
import AlarmAmend from '../components/3.dangerAlarm/alarmAmend' //报警配置--单个修改

Vue.use(Router)

export default new Router({
  // mode: "history", //去掉#
  routes: [{
      name: 'login',
      path: '/',
      component: Login,
    },
    // 报表打印界面
    {
      name: 'reportPrint',
      path: '/reportPrint',
      component: ReportPrint,
    },
    {
      name: 'home',
      path: '/home',
      component: Home,
      redirect: to => {
        return '/homePage'
      },
      children: [{
          name: '首页',
          path: '/homePage',
          component: HomePage,
        },
        {
          name: '数据监控',
          path: '/dataMonitor',
          component: DataMonitor,
        },
        // 报警管理
        {
          name: '消息列表',
          path: '/messageList',
          component: MessageList,
        },
        {
          name: '报警配置',
          path: '/alarmConfig',
          component: AlarmConfig,
        },
        {
          name: 'alarmAdd',
          path: '/alarmConfig/alarmAdd',
          component: AlarmAdd,
        },
        {
          name: 'alarmBatch',
          path: '/alarmConfig/alarmBatch',
          component: AlarmBatch,
        },
        {
          name: 'alarmAmend',
          path: '/alarmConfig/alarmAmend',
          component: AlarmAmend,
        },
        {
          name: '数据分析',
          path: '/dataAnalysis',
          component: DataAnalysis,
        },
        {
          name: '系统日志',
          path: '/systemLog',
          component: SystemLog,
        },
        {
          name: '系统报表',
          path: '/systemReport',
          component: SystemReport,
        },
        //巡检管理
        {
          name: '巡检日历',
          path: '/checkCalendar',
          component: CheckCalendar,
        },
        {
          name: '巡检计划',
          path: '/checkPlan',
          component: CheckPlan,
        },
        // 新增巡检计划
        {
          name: 'addNewPlan',
          path: '/checkPlan/addNewPlan',
          component: AddNewPlan,
        },
        // 未执行
        {
          name: 'executePlan',
          path: '/checkCalendar/executePlan',
          component: ExecutePlan,
        },
        {
          name: '知识库',
          path: '/knowledge',
          component: Knowledge,
        },
        {
          name: '分类设置',
          path: '/sortConfig',
          component: SortConfig,
        },
        {
          name: '用户设置',
          path: '/user',
          component: User,
        }
      ]
    }
  ]
})
