<template>
  <div class="statisticalSummary">
    <div class="transaction">
      <!-- 交易信息汇总框 -->
      <div class="transaction-information">
        <p>交易信息统计</p>
        <TablePart 
          :tableHeader="transTableHeader" 
          :tableData="transactionData"
          :maxHeight="maxHeight">
        </TablePart>
        <div style="clear:both;"></div>
      </div>
      <!-- 这是当天以及历史交易量排行板块 -->
      <div id="transaction-mount">
        <div class="today">
          <p>今日交易量排行</p>
          <TablePart 
            :tableHeader="todayRanking" 
            :tableData="todayTransSort" 
            :maxHeight="maxHeight"></TablePart>
        </div>
        <div class="history">
          <p>历史交易量排行</p>
          <TablePart 
            :tableHeader="historyRanking" 
            :tableData="historyTransSort"
            :maxHeight="maxHeight"></TablePart>
        </div>
        <div style="clear:both;"></div>
      </div>
      <div style="clear:both;"></div>
    </div>
    <!-- 业务系统总交易量曲线图板块 -->
    <div id="diagram"></div>
  </div>
</template>

<script>
import { Diagram } from '@/assets/js/myEcharts'
import TablePart from '@/components/tablePart'
export default {
  data () {
    return {
      maxHeight: 250, // 表格的最大高度
      // 当天交易量排行表头
      todayRanking: [
          {
            prop: "deviceType",
            label: '平台',
            isCenter: 'center',
            type: 'select',
            selectObj: {
                '1': 'TSSC',
                '2': 'KMS',
                '3': '加密机',
                '4': 'DB'
            }
          },{
            prop: "transToday",
            label: '今日交易量',
            isCenter: 'center'
          }
      ],
      // 历史交易量排行表头
      historyRanking: [
          {
            prop: "deviceType",
            label: '平台',
            isCenter: 'center',
            type: 'select',
            selectObj: {
                '1': 'TSSC',
                '2': 'KMS'
            }
          },{
            prop: "transHistory",
            label: '历史总交易量',
            isCenter: 'center'
          }
      ],
      // 交易量表格表头
      transTableHeader: [
        {
          prop: 'deviceType',
          label: '平台',
          isCenter: 'center',
          isfixed: 'fixed',
          type: 'select',
          selectObj: {
              '1': 'TSSC',
              '2': 'KMS',
              '3': '加密机',
              '4': 'DB'
          }
        },{
          prop: 'transToday',
          label: '今日交易量',
          isCenter: 'center'
        },{
          prop: 'transHistory',
          label: '历史交易总量',
          isCenter: 'center'
        }
      ],
      transCount: {}, // 首页底部曲线图数据
      transactionData: [], // 交易量表格的数据
      todayTransSort: [], // 今日交易排行数据
      historyTransSort: [], // 历史交易排行数据
      timer: 0
    }
  },
  components: { TablePart },
  created () {
    console.log(this.$router.currentRoute.name)
  },
  mounted () {},
  // 此方法是为了进入页面的时候调取页面数据
  activated () {
    this.setIntervalFun();
  },
  methods: {
    // 这是实现5秒请求一次数据
    setIntervalFun () {
      let _this = this;
      // 此处写想要进行的操作
      this.getTransactionData();
      this.getTransSort();
      this.getTransCount();
      var timer = setTimeout(function(th){
        th.setIntervalFun();
        clearTimeout(timer);
      },20000, _this);
      this.timer = timer;
    },
    // 获取交易量数据
    getTransactionData () {
      this.$http({
            url: this.$http.adornUrl('/trans/getTransSum'),
            method: 'get'
          })
          .then(({data}) => {
            if (data.respCode == '00') {
              this.transactionData = data.data;
            } else {
              this.$message.error('交易量信息获取失败，请稍后再试！')
            }
          })
          .catch((err) => {
            this.$message.error('数据获取失败，请稍后再试！')
            console.log(err);
          })
    },
    // 获取交易量排行
    getTransSort () {
      this.$http({
            url: this.$http.adornUrl('/trans/getTransaction'),
            method: 'get'
          })
          .then(({data}) => {
            console.log(data);
            if (data.respCode == '00') {
              // 这两个if判断用来做排行的排序，目前是倒序
              if (data.data.sumRankTransVoList[0].transToday < data.data.sumRankTransVoList[1].transToday) {
                [data.data.sumRankTransVoList[1], data.data.sumRankTransVoList[0]] = [data.data.sumRankTransVoList[0], data.data.sumRankTransVoList[1]]
              }
              if (data.data.historySumTransVoList[0].transHistory < data.data.historySumTransVoList[1].transHistory) {
                [data.data.historySumTransVoList[1], data.data.historySumTransVoList[0]] = [data.data.historySumTransVoList[0], data.data.historySumTransVoList[1]]
              }
              this.todayTransSort = data.data.sumRankTransVoList;
              this.historyTransSort = data.data.historySumTransVoList;
            } else {
              this.$message.error('交易量排行获取失败，请稍后再试！')
            }
          })
          .catch((err) => {
            this.$message.error('数据获取失败，请稍后再试！')
            console.log(err);
          })
    },
    // 获取近一个月内交易信息曲线图
    getTransCount () {
      this.$http({
            url: this.$http.adornUrl('/trans/getDiagramData'),
            method: 'get'
          })
          .then(({data}) => {
            console.log(data);
            if (data.respCode == '00') {
              this.transCount = data.data;
              Diagram(this.transCount);
            } else {
              this.$message.error('数据获取失败，请稍后再试！')
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
  },
}
</script>

<style lang="scss">
.transaction{
  padding: 10px 0;
  .transaction-information{
    width: 48%;
    float: left;
    background: white;
    clear:both;
    p{
      font-size: 24px;
      line-height: 50px;
      text-align: center;
    }
  }
  #transaction-mount{
    float: right;
    margin-left: 4%;
    width: 48%;
    .today, .history{
      width: 48%;
      background: white;
      height: 100%;
      float: left;
      .container{
        border: none;
      }
      p{
        font-size: 24px;
        line-height: 50px;
        text-align: center;
      }
    }
    .today{
      margin-right: 4%;
    }
  }
}
#diagram{
  width: 100%;
  height: 400px;
  background: white;
  clear: both;
}
</style>
