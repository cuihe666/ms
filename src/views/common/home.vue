<template>
  <div class="home">
    <el-col :span="18" class="left-part height-100">
      <el-col :span="12" class="left-part-left height-100">
        <!-- 应用服务top5 -->
        <el-row class="height-46 border-box">
          <el-row class="title-box">应用服务TOP5</el-row>
          <el-row class="content-box top5">
            <el-row class="top5-item" v-for="(item, index) in top5Data.titlename" :key="index">
              <el-col class="top5-item-border height-100" :span="1"
                :style="{'border-color': top5Data.colorArr[index]}"></el-col>
              <el-col class="top5-item-title height-100" :span="4"
                :style="{'color': top5Data.colorArr[index]}">
                  <span>{{item}}</span>
              </el-col>
              <el-col class="top-item-percent-wrap height-100" :span="14">
                <el-col class="top-item-percent height-100" 
                  :style="{'width': top5Data.data[index] + '%', 'background': top5Data.colorArr[index]}"></el-col>
              </el-col>
              <el-col class="top-item-num height-100" :span="5"><span>{{top5Data.valdata[index]}}笔</span></el-col>
            </el-row>
          </el-row>
        </el-row>
        <el-row class="height-50 border-box">
          <el-row class="title-box">月交易量统计</el-row>
          <el-row class="content-box" id="diagram">

          </el-row>
        </el-row>
      </el-col>
      <el-col :span="12" class="left-part-right height-100">
        <!-- 总交易量 -->
        <el-row class="height-46 border-box">
          <el-row class="title-box">总交易量</el-row>
          <el-row class="content-box transNum">
            <el-row class="transNum-top">
              <el-col :span="14" class="height-100 trans-num">
                <el-row class="update-time color-white">最后数据更新于{{transNum.time}}</el-row>
                <el-row class="trans">{{transNum.total}}<span class="color-white">笔</span></el-row>
              </el-col>
              <el-col :span="10" class="height-100 trans-detail">
                <!-- <el-row class="trans-detail-item color-white">TPS：3 笔/秒</el-row>
                <el-row class="trans-detail-item color-white">RTT：3 US</el-row> -->
                <el-row class="trans-detail-item color-green align-left">成功数：{{transNum.successTotal}}</el-row>
                <el-row class="trans-detail-item color-red align-left">失败数：{{transNum.falseTotal}}</el-row>
                <el-row class="trans-detail-item color-green align-left">成功率：{{transNum.successPercentage}}%</el-row>
              </el-col>
            </el-row>
            <el-row class="transNum-bottom">
              <el-col :span="12" class="height-100 symmetric">
                <el-col :span="14" class="height-100 color-green">
                  <el-row class="icon-wrap">
                    <img src="@/assets/img/symmetric.png" alt="">
                    对称密钥总数
                  </el-row>
                  <el-row class="symmetric-num">
                    {{symmet.skTotal}}
                  </el-row>
                </el-col>
                <el-col :span="9" class="height-100">
                  <el-row class="color-white symmetric-item">
                    <el-col :span="8" class="align-left">AES:</el-col>
                    <el-col :span="16" class="align-right">{{symmet.aes}}/个</el-col>
                  </el-row>
                  <el-row class="color-white symmetric-item">
                    <el-col :span="8" class="align-left">SM4:</el-col>
                    <el-col :span="16" class="align-right">{{symmet.sm4}}/个</el-col>
                  </el-row>
                  <el-row class="color-white symmetric-item">
                    <el-col :span="8" class="align-left">DES:</el-col>
                    <el-col :span="16" class="align-right">{{symmet.des}}/个</el-col>
                  </el-row>
                </el-col>
              </el-col>
              <el-col :span="12" class="height-100 asymmetric">
                <el-col :span="14" class="height-100 color-red">
                  <el-row class="icon-wrap">
                    <img src="@/assets/img/asymmetric.png" alt="">
                    非对称密钥总数
                  </el-row>
                  <el-row class="symmetric-num">
                    {{asymmet.akTotal}}
                  </el-row>
                </el-col>
                <el-col :span="9" class="height-100">
                  <el-row class="color-white symmetric-item">
                    <el-col :span="8" class="align-left">SM2:</el-col>
                    <el-col :span="16" class="align-right">{{asymmet.sm2}}/个</el-col>
                  </el-row>
                  <el-row class="color-white symmetric-item">
                    <el-col :span="8" class="align-left">RAS:</el-col>
                    <el-col :span="16" class="align-right">{{asymmet.rsa}}/个</el-col>
                  </el-row>
                </el-col>
              </el-col>
            </el-row>
          </el-row>
        </el-row>
        <el-row class="height-50 border-box">
          <el-row class="title-box">系统设备拓扑图</el-row>
          <el-row class="content-box" id="echarts-wrap">

          </el-row>
        </el-row>
      </el-col>
    </el-col>
    <el-col :span="6" class="right-part height-100">
      <el-col class="right-part-content height-100">
        <el-row class="alerm-title-content">告警列表</el-row>
        <el-row class="outline">
          <el-col :span="7" class="height-100 alerm-type color-yellow">
            <img src="@/assets/img/alerm.png" alt="">
            <span>警告:{{alarmCount.warningTotal}}</span>
          </el-col>
          <el-col :span="10" class="height-100" id="alarmPie"></el-col>
          <el-col :span="7" class="height-100 alerm-type color-red">
            <img src="@/assets/img/serious.png" alt="">
            <span>严重:{{alarmCount.seriousTotal}}</span>
          </el-col>
        </el-row>
        <el-row class="color-white alerm-num">
          <span>告警总数:</span>{{alarmCount.total}}
        </el-row>
        <el-row class="alerm-content">
          <el-row :class="item.lvAlarm == 2 ? 'alerm-content-item bg-alarm' : 'alerm-content-item'" 
            v-for="(item, index) in alarmList" :key="index">
            <el-row class="alerm-item-top">
              <el-col :span="11" :class="item.lvAlarm == 2 ? 'align-left color-red height-100': 'align-left color-white height-100'">{{item.timeAlarm ? item.timeAlarm : '---'}}</el-col>
              <el-col :span="13" class="align-right height-100">
                <span class="color-yellow">持续:</span>
                <span class="color-white">{{item.dateTime ? item.dateTime : '---'}}</span>
              </el-col>
            </el-row>
            <el-row :class="item.lvAlarm == 2 ? 'alerm-item-bottom color-red' : 'alerm-item-bottom color-white'">
              {{item.content ? item.content : '---'}}
            </el-row>
          </el-row>
        </el-row>
      </el-col>
    </el-col>
  </div>
</template>

<script>
import { Diagram, LoopTP, alarm } from '@/assets/js/myEcharts'
export default {
  name: "home1",
  data () {
    return {
      top5Data: {
        data: [],
        titlename: [],
        valdata: [],
        colorArr: []
      },
      transNum: {},
      symmet: {
        skTotal: 0,
        aes: 0,
        sm4: 0,
        des: 0,
      },// 对称密钥
      asymmet: {
        akTotal: 0,
        sm2: 0,
        ras: 0,
      },// 非对称密钥
      timer: 0,
      transCount: {}, // 首页底部曲线图数据
      alermData: [],
      tpData: [],
      alarmCount: {
        total: 0,
        warningTotal: 0,
        seriousTotal: 0
      },
      alarmList: []
    }
  },
  computed: {
    
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
      this.getTop5();
      this.getTransactionData();
      this.getSecretKey();
      this.getTransCount();
      this.getTP();
      this.getAlarmNum();
      this.getAlarmList();
      var timer = setTimeout(function(th){
        th.setIntervalFun();
        clearTimeout(timer);
      },20000, _this);
      this.timer = timer;
    },
    // 应用服务TOP5
    getTop5 () {
      this.$http({
              url: this.$http.adornUrl('trans/getTransTop5ByCName'),
              method: 'get'
            })
            .then(({data}) => {
              if (data.respCode == '00') {
                  let dataObj = {
                    data: [],
                    valdata: [],
                    titlename: [],
                    colorArr: ['#E5D11C', '#57EB1D', '#17BBFF', '#BA6AFF', '#F75977']
                  };
                  for (let i = 0; i < data.data.length; i++) {
                    dataObj.data.push(data.data[i].proportion);
                    dataObj.valdata.push(data.data[i].count);
                    dataObj.titlename.push(data.data[i].channelName);
                  }
                  this.top5Data = dataObj;
              } else {
                this.$message.error('应用服务TOP5数据获取失败，请稍后再试！')
              }
            })
            .catch((err) => {
              console.log(err);
              this.$message.error('数据获取失败，请稍后再试！');
            })
    },
    // 获取交易量数据
    getTransactionData () {
      this.$http({
        url: this.$http.adornUrl('/trans/getTransNum'),
        method: 'get'
      })
        .then(({data}) => {
          if (data.respCode == '00') {
              let tim = new Date();
              this.transNum = data.data;
              this.transNum.time = tim.getFullYear() + '-' + (tim.getMonth() + 1) + '-' + tim.getDate() + ' ' + tim.getHours() + ':' + tim.getMinutes() + ':' + tim.getSeconds();
          } else {
            this.$message.error('总交易量数据获取失败，请稍后再试！')
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message.error('总交易量数据获取失败，请稍后再试！');
        })
    },
    // 获取kms的密钥信息
    getSecretKey () {
      this.$http({
              url: this.$http.adornUrl('/sk/getSkByAll'),
              method: 'get'
            })
            .then(({data}) => {
              if (data.respCode == '00') {
                  // 对称密钥
                this.symmet.skTotal = data.data.skTotal;
                this.symmet.aes = data.data.aes;
                this.symmet.sm4 = data.data.sm4;
                this.symmet.des = data.data.des;
                // 非对称密钥
                this.asymmet.akTotal = data.data.akTotal;
                this.asymmet.sm2 = data.data.sm2;
                this.asymmet.rsa = data.data.rsa;
              } else {
                this.$message.error('密钥数据获取失败，请稍后再试！')
              }
            })
            .catch((err) => {
              console.log(err);
              this.$message.error('数据获取失败，请稍后再试！');
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
              Diagram({
                days: this.transCount.days.slice(-7),
                tssl: this.transCount.tssl.slice(-7),
                kms: this.transCount.kms.slice(-7),
                hsm: this.transCount.hsm.slice(-7)
              });
            } else {
              this.$message.error('数据获取失败，请稍后再试！')
            }
          })
          .catch((err) => {
            this.$message.error('数据获取失败，请稍后再试！')
            console.log(err);
          })
    },
    // 获取首页拓扑图数据，用以首屏渲染
    getTP () {
      this.$http({
            url: this.$http.adornUrl('/devices/getTopology'),
            method: 'get'
          })
          .then(({data}) => {
            //console.log(data);
            if (data.respCode == '00') {
              this.tpData = data.data;
              LoopTP(this.tpData, this);
            } else {
              this.$message.error('拓扑图数据获取失败，请稍后再试！')
            }
          })
          .catch((err) => {
            this.$message.error('数据获取失败，请稍后再试！')
            console.log(err);
          })
    },
    // 告警数量
    getAlarmNum () {
      this.$http({
            url: this.$http.adornUrl('/alarm/getAlarmStatistics'),
            method: 'get'
          })
          .then(({data}) => {
            if (data.respCode == '00') {
              this.alarmCount.total = data.data.total;
              this.alarmCount.warningTotal = data.data.warningTotal;
              this.alarmCount.seriousTotal = data.data.seriousTotal;
              let alarmData = [
                {value: data.data.seriousTotal},
                {value: data.data.warningTotal}
              ];
              alarm(alarmData);
            } else {
              this.$message.error('告警数量获取失败，请稍后再试！')
            }
          })
          .catch((err) => {
            this.$message.error('数据获取失败，请稍后再试！')
            console.log(err);
          })
    },
    // 获取告警列表
    getAlarmList () {
      this.$http({
            url: this.$http.adornUrl('/devices/getAlertDetails?noDevice=&pageNum=1&pageSize=1000'),
            method: 'get'
          })
          .then(({data}) => {
            //console.log(data);
            if (data.respCode == '00') {
              console.log(data);
              this.alarmList = data.data;
            } else {
              this.$message.error('告警数量获取失败，请稍后再试！')
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
<style lang="scss" scoped>
  .home{
    min-height: 741px;
    div{
      box-sizing: border-box;
    }
    .height-100{
      height: 100%;
    }
    .color-white{
      color: #C5AAFF;
    }
    .color-green{
      color: #57EB1D;
    }
    .color-red{
      color: #F75977;
    }
    .color-yellow{
      color: #FFE817;
    }
    .align-left{
      text-align: left;
    }
    .align-right{
      text-align: right;
    }
    .bg-alarm{
      background: rgba(209,192,249,0.1)
    }
    height: 1px;
    background: url('../../assets/img/bgpic.png') 0 0/100% 100% repeat;
    .left-part{
      padding-top: 20px;
      .height-46{
        height: 46%;
        margin-bottom: 4%;
        border-radius: 10px;
      }
      .height-50{
        height: 50%;
        border-radius: 10px;
      }
      .border-box{
        border-radius: 10px 10px 0 0;
      }
      .title-box{
        height: 14%;
        background: linear-gradient(0deg,rgba(48,11,123,0),rgba(107,85,255,1));
        font-size: 16px;
        border-radius: 10px 9px 0 0;
        color: rgba(197,170,255,1);
        font-family: PingFang SC;
        font-weight: 400;
        width: 100%;
        border: 2px solid rgba(118, 70, 221, 1);
        padding-left: 16px;
        padding-top: calc(3%);
      }
      .content-box{
        height: 86%;
        background:rgba(250,3,3,0);
        border-left: 2px solid rgba(118, 70, 221, 1);
        border-right: 2px solid rgba(118, 70, 221, 1);
        border-bottom: 2px solid rgba(118, 70, 221, 1);
        border-radius: 0 0 10px 10px;
      }
      .left-part-left{
        padding: 0 10px 0 20px;
        /*应用服务top5*/
        .top5{
          .top5-item{
            height: 20%;
            padding: 4% 4%;
            .top5-item-border{
              border-left: 3px solid;
            }
            .top5-item-title{
              font-size: 14px;
              line-height: 100%;
              position: relative;
              span{
                position: absolute;
                top: calc(50% - 8px);
                left: 0;
              }
            }
            .top-item-percent-wrap{
              background: #5F24DD;
            }
            .top-item-num{
              font-size: 12px;
              color: rgba(187,160,249,1);
              position: relative;
              span{
                position: absolute;
                top: calc(50% - 6px);
                right: 0;
              }
            }
          }
        }
      }
      .left-part-right{
        padding: 0 20px 0 10px;
        /*总交易量*/
        .transNum{
          padding: 2%;
          .transNum-top, .transNum-bottom{
            height: 50%;
          }
          .transNum-top{
            border-bottom: 1px solid #8B60E8;
            .trans-num{
              .trans{
                font-size: 50px;
                color: #E5D11C;
                font-family: Helvetica-Condensed-Black-Se;
                font-weight: 500;
                height: 90%;
                padding-top: 10%;
                span{
                  font-family: PingFang-SC-Bold;
                  font-size: 26px;
                  padding-left: 6px;
                }
              }
              .update-time{
                font-size: 12px;
                height: 10%;
                font-family: PingFang-SC-Bold;
              }
            }
            .trans-detail{
              .trans-detail-item{
                height: 33.33%;
                font-size: 14px;
                padding-top: calc(16% - 14px);
              }
            }
            
          }
          .transNum-bottom{
            padding: 2% 0 0 0;
            .symmetric{
              border-right: 2px dashed gray;
              .symmetric-item{
                height: 33.33%;
                font-size: 12px;
                padding-top: calc(16%);
              }
            }
            .asymmetric{
              .symmetric-item{
                height: 50%;
                font-size: 12px;
                padding-top: calc(25%);
              }
            }
            .icon-wrap{
              padding-left: 2%;
              height: 30%;
              font-size: 12px;
              padding-top: calc(15% - 7px);
              img{
                width: 20px;
                height: 20px;
              }
            }
            .symmetric-num{
              height: 70%;
              font-size: 36px;
              text-align: center;
              font-weight: 500;
              padding-top: calc(35% - 18px);
            }
          }
        }
      }
    }
    .right-part{
      padding: 20px 16px 10px 0;
      background: rgba(250,3,3,0);
      .right-part-content{
        border: 2px solid rgba(118, 70, 221, 1);
        width: 100%;
        border-radius: 10px;
        position: relative;
        .alerm-title-content{
          height: 6%;
          width: calc(50%);
          margin-left: 25%;
          background: url('../../assets/img/alarm.png') 0 0/100% 100% no-repeat;
          border-radius: 0 0 28% 20%;
          color: #C5AAFF;
          text-align: center;
          font-size: 16px;
          padding-top: calc(3% + 4px);
        }
        .outline{
          height: 20%;
          .alerm-type{
            padding-top: calc(10%);
            font-size: 12px;
            img{
              margin: 0 auto;
              display: block;
            }
            span{
              padding-top: 20px;
              display: block;
              text-align: center;
            }
          }
        }
        .alerm-num{
          font-size: 16px;
          text-align: center;
          height: 5%;
          width: 96%;
          margin: 0 2%;
          border-bottom: 2px dashed gray;
        }
        .alerm-content{
          width: 100%;
          padding: 0 2%;
          height: 69%;
          overflow: hidden;
          overflow-y: auto;
          .alerm-content-item{
            height: 12%;
            font-size: 10px;
            font-weight: 300;
            .alerm-item-top, .alerm-item-bottom{
              height: 50%;
              padding-top: calc(6% - 6px);
            }
          }
        }
      }
    }
  }
</style>
