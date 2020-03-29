<!-- 这是首页 -->
<!-- created by cuihe 2019-12-20 -->
<template>
  <div class="site-content-wrap">
    <!-- 拓扑图 -->
    <div id="topological">
      <!-- 首页拓扑图 -->
      <div id="echarts-wrap"></div>
      <!-- 拓扑图右侧警告框 -->
      <div class="warn-wrap">
        <div class="warn-msg">
          <h4>告警信息汇总</h4>
          <TablePart 
            :tableHeader="warnAllHeader" 
            :tableData="alarmCounts" 
            :maxHeight="230"
            :tableStyle="tableStyle">
          </TablePart>
        </div>
        <div class="deal-msg">
          <h4>待处理信息</h4>
          <TablePart 
            :tableHeader="warnTableHeader" 
            :tableData="alarmData" 
            :maxHeight="200"
            :tableStyle="tableStyle">
          </TablePart>
        </div>
      </div>
      <div style="clear:both;"></div>
    </div>
  </div>
</template>

<script>
  // 首页拓扑图相关的信息方法
import { LoopTP } from '@/assets/js/myEcharts'
import TablePart from '@/components/tablePart'
export default {
  name: 'index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      a: 1,
      maxHeight: 250, // 表格的最大高度
      // 待处理信息表格表头信息
      warnTableHeader: [
          {
            prop: "noName",
            label: '设备名称',
            isCenter: 'center'
          },{
            prop: "seriousCount",
            label: '严重',
            isCenter: 'center'
          },{
            prop: "alertCount",
            label: '警告',
            isCenter: 'center'
          },{
            label: '操作',
            isCenter: 'center',
            isfixed: 'right',// fixed='right'会使此列在表格右侧固定
            oper: [
              {
                clickFun (row, th) {
                   console.log(row);
                   th.$router.push({path: '/homeDetails-pendingDisposal', query: {noDeivce: row.noDevice}});
                },
                name: '查看详情',
                isAuth: 'home:home:list'
              }
            ]
          }
      ],
      // 告警信息汇总的头部
      warnAllHeader: [
          {
            prop: "noName",
            label: '设备名称',
            isCenter: 'center'
          },{
            prop: "seriousAllCount",
            label: '严重',
            isCenter: 'center'
          },{
            prop: "alertAllCount",
            label: '警告',
            isCenter: 'center'
          }
      ],
      // 表格的样式
      tableStyle: {

      },
      tpData: [],// 拓扑图的数据
      alarmData: [],// 待处理信息的数据
      alarmCounts: [],// 告警信息汇总的数据
      timer: 0
    }
  },
  components: {TablePart},
  created () {
  },
  mounted () {
    // console.log(this.$router.currentRoute.name)
    // 获取拓扑图数据
    // this.getTP();
    // this.getAlarmData();
    // 5秒请求一次数据
    //this.setIntervals();
  },
  // 此方法是为了进入页面的时候调取页面数据
  activated () {
    // 获取平台
    this.setIntervalFun();
  },
  methods: {
    // 这是实现5秒请求一次数据
    setIntervalFun () {
      let _this = this;
      // 获取警告信息
      _this.getAlarmData();
      // 获取拓扑图数据
      _this.getTP();
      var timer = setTimeout(function(th){
        // 判断当前路由是不是首页，是的话进行轮询，不是的话就停止轮询，
        // 解决首页在这个项目里面一直处于存活状体；
        if (th.$router.currentRoute.name == "home") {
          th.setIntervalFun();
        }
        clearTimeout(timer);
      },20000, _this);
      this.timer = timer;
    },
    getTP () {
      // 获取首页拓扑图数据，用以首屏渲染
      this.$http({
            url: this.$http.adornUrl('/devices/getTopology'),
            method: 'get'
          })
          .then(({data}) => {
            //console.log(data);
            if (data.respCode == '00') {
              this.tpData = data.data;
              this.timer = LoopTP(this.tpData, this);
            } else {
              this.$message.error('拓扑图数据获取失败，请稍后再试！')
            }
          })
          .catch((err) => {
            this.$message.error('数据获取失败，请稍后再试！')
            console.log(err);
          })
    },
    // 获取告警信息
    getAlarmData () {
      this.$http({
            url: this.$http.adornUrl('/devices/getStatusCount'),
            method: 'get'
          })
          .then(({data}) => {
            if (data.respCode == '00') {
              this.alarmData = data.data.alarmVos;
              this.alarmCounts = data.data.alarmCounts;
            } else {
              this.$message.error('警告及待处理信息获取失败，请稍后再试！')
            }
          })
          .catch((err) => {
            this.$message.error('数据获取失败，请稍后再试！')
            console.log(err);
          })
    }
  },
  // 此方法是为了页面切换的时候，清楚页面内数据刷新；
  beforeRouteLeave(to, from, next) {
    clearTimeout(this.timer);
    next();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.site-content-wrap{
  width: 96%;
  /*margin: 10px auto;*/
  div{
    box-sizing: border-box;
  }
  text-align: center;
  position: relative;
  #topological{
    #echarts-wrap{
      width: 100%;
      height: 460px;
      float: left;
    }
    
    .warn-wrap{
      width: 100%;
      float: right;
      margin-top: 10px;
      box-sizing: border-box;
      .warn-msg, .deal-msg{
        width: 50%;
        float: left;
        height: 240px;
        background: white;
        padding: 10px;
        h4{
          margin: 10px;
        }
      }
    }
  }
}
</style>
