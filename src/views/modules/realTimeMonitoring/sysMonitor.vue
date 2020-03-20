<template>
	<div>
		<el-row style="height: 670px;">
			<el-col :span="17" class=" border-right">
				<!-- <div class="padding border-bottom">
					<font-awesome-icon :icon="['fas', 'volume-up']" class="text-blue" />
					<span class="text-gray m-l-10">是一款基于css框架的网页字体图标库,它完全免费... 最新的4.7.0版,收录了675个图标</span>
				</div> -->

				<el-row>
					<el-col :span="12" class="padding">
						<h4 class="title border-bottom">案例服务——TSSC</h4>
						<div class="text-blue">总交易量</div>
						<el-row>
							<el-col :span="16" style="padding-top: 15px;">
								<span class="text-large">50.452</span>
								笔
							</el-col>
							<el-col :span="8">
								<div>
									TPS:
									<span class="text-blue">3</span>
									笔/秒
								</div>
								<div>
									RTT:
									<span class="text-blue">3</span>
									us
								</div>
								<div>
									成功数:
									<span class="text-blue">3</span>
								</div>
								<div>
									失败数:
									<span class="text-red">123123</span>
								</div>
							</el-col>
						</el-row>
						<div class="text-blue m-t-10">交易趋势</div>
						<div class="transE" style="height: 100px;"></div>
					</el-col>
					<el-col :span="12" class="padding">
						<h4 class="title border-bottom">密钥服务——KMS</h4>
						<el-row>
							<el-col :span="3"><font-awesome-icon :icon="['fas', 'key']" class="text-blue" style="font-size: 30px; margin-top: 36px;" /></el-col>
							<el-col :span="13">
								<div style="margin-top: 24px;">对称密钥</div>
								<div class="m-t-10">
									总数量:
									<span style="font-size: 20px;">{{symmet.skTotal}}</span>
								</div>
							</el-col>
							<el-col :span="3">
								<div class="m-t-10">AES</div>
								<div class="m-t-10">SM4</div>
								<div class="m-t-10">DES</div>
							</el-col>
							<el-col :span="5" class="text-right">
								<div class="m-t-10">
									<span class="text-blue">{{symmet.aes}}</span>
									个
								</div>
								<div class="m-t-10">
									<span class="text-blue">{{symmet.sm4}}</span>
									个
								</div>
								<div class="m-t-10">
									<span class="text-blue">{{symmet.des}}</span>
									个
								</div>
							</el-col>
						</el-row>

						<el-row style="margin-top: 20px;">
							<el-col :span="3"><font-awesome-icon :icon="['fas', 'key']" class="text-blue" style="font-size: 30px; margin-top: 36px;" /></el-col>
							<el-col :span="13">
								<div style="margin-top: 24px;">非对称密钥</div>
								<div class="m-t-10">
									总数量:
									<span style="font-size: 20px;">{{asymmet.akTotal}}</span>
								</div>
							</el-col>
							<el-col :span="3">
								<div style="margin-top: 30px;">SM2</div>
								<div class="m-t-10">RAS</div>
							</el-col>
							<el-col :span="5" class="text-right">
								<div style="margin-top: 30px;">
									<span class="text-blue">{{asymmet.sm2}}</span>
									个
								</div>
								<div class="m-t-10">
									<span class="text-blue">{{asymmet.rsa}}</span>
									个
								</div>
							</el-col>
						</el-row>
					</el-col>
				</el-row>
				<el-row style="margin-top: 20px;">
					<el-col :span="12">
						<h4 class="text-center">交易信息统计</h4>
						<TablePart 
				            :tableHeader="transTableHeader" 
				            :tableData="transactionData"
				            :maxHeight="maxHeight">
				        </TablePart>
					</el-col>
					<el-col :span="6">
						<h4 class="text-center">今日交易量排行</h4>
						<TablePart 
				            :tableHeader="todayRanking" 
				            :tableData="todayTransSort" 
				            :maxHeight="maxHeight">
				        </TablePart>
					</el-col>
					<el-col :span="6">
						<h4 class="text-center">历史交易量排行</h4>
						<TablePart 
				            :tableHeader="historyRanking" 
				            :tableData="historyTransSort"
				            :maxHeight="maxHeight">
				        </TablePart>
					</el-col>
				</el-row>
			</el-col>

			<el-col :span="7" class="padding msgWrap">
				<div class="alertTit">
					<h4 class="title m-0">
						<font-awesome-icon :icon="['fas', 'exclamation-circle']" class="text-red" />
						告警列表
					</h4>
					<el-row>
						<el-col :span="12" class="padding">
							告警总数：
							<span class="text-red">123</span>
						</el-col>
						<el-col :span="12" class="padding">
							警告：
							<span class="text-yellow">123</span>
						</el-col>
					</el-row>
				</div>
				
				<div class="alertMsg">
					<div class="border m-t-10 padding">
						<div class="">2020-01-01 12:00:00 <strong class="m-l-10">持续:34:11:35</strong></div>
						<div class="text-gray m-t-10">asdfa sdfa sdf124 2342 342341</div>
					</div>
					<div class="border m-t-10 padding">
						<div class="">2020-01-01 12:00:00 <strong class="m-l-10">持续:34:11:35</strong></div>
						<div class="text-gray m-t-10">asdfa sdfa sdf124 2342 342341</div>
					</div>
					<div class="border m-t-10 padding">
						<div class="">2020-01-01 12:00:00 <strong class="m-l-10">持续:34:11:35</strong></div>
						<div class="text-gray m-t-10">asdfa sdfa sdf124 2342 342341</div>
					</div>
					<div class="border m-t-10 padding">
						<div class="">2020-01-01 12:00:00 <strong class="m-l-10">持续:34:11:35</strong></div>
						<div class="text-gray m-t-10">asdfa sdfa sdf124 2342 342341</div>
					</div>
					<div class="border m-t-10 padding">
						<div class="">2020-01-01 12:00:00 <strong class="m-l-10">持续:34:11:35</strong></div>
						<div class="text-gray m-t-10">asdfa sdfa sdf124 2342 342341</div>
					</div>
					<div class="border m-t-10 padding">
						<div class="">2020-01-01 12:00:00 <strong class="m-l-10">持续:34:11:35</strong></div>
						<div class="text-gray m-t-10">asdfa sdfa sdf124 2342 342341</div>
					</div>
					<div class="border m-t-10 padding">
						<div class="">2020-01-01 12:00:00 <strong class="m-l-10">持续:34:11:35</strong></div>
						<div class="text-gray m-t-10">asdfa sdfa sdf124 2342 342341</div>
					</div>
					<div class="border m-t-10 padding">
						<div class="">2020-01-01 12:00:00 <strong class="m-l-10">持续:34:11:35</strong></div>
						<div class="text-gray m-t-10">asdfa sdfa sdf124 2342 342341</div>
					</div>
					<div class="border m-t-10 padding">
						<div class="">2020-01-01 12:00:00 <strong class="m-l-10">持续:34:11:35</strong></div>
						<div class="text-gray m-t-10">asdfa sdfa sdf124 2342 342341</div>
					</div>
					<div class="border m-t-10 padding">
						<div class="">2020-01-01 12:00:00 <strong class="m-l-10">持续:34:11:35</strong></div>
						<div class="text-gray m-t-10">asdfa sdfa sdf124 2342 342341</div>
					</div>
					<div class="border m-t-10 padding">
						<div class="">2020-01-01 12:00:00 <strong class="m-l-10">持续:34:11:35</strong></div>
						<div class="text-gray m-t-10">asdfa sdfa sdf124 2342 342341</div>
					</div>
					<div class="border m-t-10 padding">
						<div class="">2020-01-01 12:00:00 <strong class="m-l-10">持续:34:11:35</strong></div>
						<div class="text-gray m-t-10">asdfa sdfa sdf124 2342 342341</div>
					</div>
					<div class="border m-t-10 padding">
						<div class="">2020-01-01 12:00:00 <strong class="m-l-10">持续:34:11:35</strong></div>
						<div class="text-gray m-t-10">asdfa sdfa sdf124 2342 342341</div>
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import {TsscTrans} from '@/assets/js/myEcharts'
import TablePart from '@/components/tablePart'
export default {
	data() {
		return {
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
			maxHeight: 250, // 表格的最大高度
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
	        transactionData: [], // 交易量表格的数据
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
		    todayTransSort: [], // 今日交易排行数据
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
            	   label: '历史交易量',
             	   isCenter: 'center'
            	}
        	],
        	historyTransSort: [], // 历史交易排行数据
        	timer: 0
		};
	},
	components: { TablePart },
	mounted () {
		
	},
	// 此方法是为了进入页面的时候调取页面数据
	activated () {
		this.setIntervalFun();
	},
	methods: {
		// 这是实现5秒请求一次数据
		setIntervalFun () {
			let _this = this;
			// 此处写想要进行的操作
			this.getSecretKey();
			this.getTsscLine();
			this.getTransactionData();
			this.getTransSort();
			var timer = setTimeout(function(th){
			 	th.setIntervalFun();
				clearTimeout(timer);
			},20000, _this);
			this.timer = timer;
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
		// 获取tssc的总体交易趋势折线图
		getTsscLine () {
			this.$http({
	            url: this.$http.adornUrl('/trans/getTransByMinData'),
	            method: 'get',
	            params: this.$http.adornParams({
	              typeDevice: 1
	            }, false)
	          })
	          .then(({data}) => {
	            if (data.respCode == '00') {
	              var grid = {
					  top: '10%',
				      left: '16%',
					  right: '6%',
					  bottom: '20%'
				  }
	              TsscTrans(data.data.data, grid);
	            } else {
	              this.$message.error('总体交易趋势数据获取失败，请稍后再试！')
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
	},
	// 此方法是为了页面切换的时候，清楚页面内数据刷新；
	beforeRouteLeave(to, from, next) {
		clearTimeout(this.timer);
		next();
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body{
    font-size:14px;
  }
  .padding{
    padding: 10px;
  }
  .p-l-10{
	padding-left: 10px;
  }
  .text-blue{
    color: #409EFF;
  }
  .text-gray{
	color: #606266;
  }
  .text-red{
    color: #F56C6C;
  }
  .text-yellow{
    color: #E6A23C;
  }
  .m-0{
	margin: 0;
  }
  .m-t-10{
    margin-top: 10px;
  }
  .m-l-10{
	margin-left: 10px;
  }
  .text-right{
    text-align: right;
  }
  .text-center{
    text-align: center;
  }
  .text-middle{
    /*让元素渲染为表格单元格*/
        display:table-cell;
    /*设置文本水平居中*/
        text-align:center; 
    /*设置文本垂直居中*/
        vertical-align:middle;  
  }
  .border-bottom{
	border-bottom: 1px solid #EBEEF5;
  }
  .border-left{
	border-left: 1px solid #EBEEF5;
  }
  .border-right{
	border-right: 1px solid #EBEEF5;
  }
  .border{
	border: 1px solid #EBEEF5;
  }
  
  .flex{
	display: flex;
  }
  .justify-content-end{
	justify-content:flex-end;
  }
  .justify-content-between{
	justify-content:space-between;
  }
  .align-items-center{
	align-items:center;
  }
  .align-items-end{
	align-items:flex-end;
  }
.title {
	height: 40px;
	line-height: 40px;
	color: #303133;
}

.text-large {
	font-size: 36px;
}
.msgWrap{
	height: 100%;
	padding-top: 90px;
	position: relative;

}
.alertTit{
	height: 90px;
	position: absolute;
	left: 0;
	top: 0;
	z-index: 10;
	background: white;
	width: 100%;
}
.alertMsg{
	overflow: hidden;
	overflow-y: auto;
	height: 100%;
}
</style>
