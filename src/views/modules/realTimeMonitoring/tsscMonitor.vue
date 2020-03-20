<template>
	<div class="tsscAndFkms">
		<el-row>
			<el-col :span="17" class=" border-right">
				<!-- 选择模块 -->
				<div class="padding border-bottom flex justify-content-end align-items-center">
					<div>
						<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px">
							<el-form-item label="平台" class="m-0">
								<el-select v-model="ruleForm.region" placeholder="请选择平台" @change="changeOpt()">
									<el-option v-for="item in platForm" 
										:label="item.name" 
										:value="item.no"></el-option>
								</el-select>
							</el-form-item>
						</el-form>
					</div>
					<div class="p-l-10"><font-awesome-icon :icon="['fa', 'bolt']" class="text-blue" /></div>
					<div class="p-l-10"><font-awesome-icon :icon="['fa', 'volume-up']" class="text-blue" /></div>
					<div class="p-l-10"><font-awesome-icon :icon="['fa', 'envelope']" class="text-blue" /></div>
				</div>
				<div>
					<h4 class="title">总交易量</h4>
					<div class="text-center">
						<span class="text-large">123,234</span>
						笔
					</div>
					<el-row class="text-center" style="margin-top: 30px; margin-bottom: 20px;">
						<el-col :span="6">
							<div>2019-02-10：</div>
							<div class="m-t-10">
								<span class="text-blue">0</span>
								笔
							</div>
						</el-col>
						<el-col :span="6">
							<div>闲比：</div>
							<div class="m-t-10">
								<span class="text-blue">0</span>
								%
							</div>
						</el-col>
						<el-col :span="6">
							<div>TPS：</div>
							<div class="m-t-10">
								<span class="text-blue">1</span>
								笔/秒
							</div>
						</el-col>
						<el-col :span="6">
							<div>ATT：</div>
							<div class="m-t-10">
								<span class="text-blue">1</span>
								笔/秒
							</div>
						</el-col>
					</el-row>

					<hr class="border" />
					<h4 class="title">总体交易趋势(单位:笔/分)</h4>
					<div class="transE" style="height: 200px;">

					</div>
					<hr class="border" />
					<el-row>
						<el-col :span="12">
							<h4 class="title">TPS</h4>
							<div style="height: 200px;">图表</div>
						</el-col>
						<el-col :span="12">
							<h4 class="title">RTT</h4>
							<div style="height: 200px;">图表</div>
						</el-col>
					</el-row>
				</div>
			</el-col>
			<!-- 右侧部分 -->
			<el-col :span="7" class="padding">
				<h4 class="title m-0">
					<font-awesome-icon :icon="['fas', 'exclamation-circle']" class="text-red" />
					告警列表
				</h4>
				<el-row>
					<el-col :span="10" class="padding">
						告警总数：
						<span class="text-red">123</span>
					</el-col>
					<el-col :span="7" class="padding">
						严重：
						<span class="text-yellow">123</span>
					</el-col>
					<el-col :span="7" class="padding">
						严重：
						<span class="text-yellow">123</span>
					</el-col>
				</el-row>
				<div class="text-center alertWrap">
					<!-- <img src="../../../assets/img/img-01.png" width="50%" alt="" />
					<div class="text-gray">暂无告警信息</div> -->
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
				<hr class="border" />
				<h4 class="title">应用服务TOP5</h4>
				<div class="top5Wrap" style="height: 200px;">
					
				</div>
				<hr class="border" />
				<h4 class="title">TSSC</h4>
				<div class="pieWrap" style="height: 220px;">
					<div class="cpuWrap">
						<p>CPU</p>
						<div class="cpuE"></div>
					</div>
					<div class="memoryWrap">
						<p>内存</p>
						<div class="memoryE"></div>
					</div>
					<div class="storageWrap">
						<p>存储</p>
						<div class="storageE"></div>
					</div>
					<div class="connectionNumber">
						<p>连接数</p>
						<p>端口{{connectionNumber}}</p>
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import {TsscTrans, TsscCpuPie, TsscStoragePie, TsscMemoryPie, TsscTopBar} from '@/assets/js/myEcharts'
export default {
	data() {
		return {
			area: '',
			ruleForm: {
				region: ''
			},
			platForm: [],
			rules: {
				region: [{ required: true, message: '请选择平台', trigger: 'change' }]
			},
			timer: 0,
			connectionNumber: 0
		};
	},
	created () {
		
	},
	mounted () {
		// TsscCpuPie();
		// TsscStoragePie();
		// TsscMemoryPie();
		// TsscTopBar();
		// 请求
		// this.setIntervalFun();
	},
	// 此方法是为了进入页面的时候调取页面数据
	activated () {
		// 获取平台
		this.getPlatForms();
	},
	methods: {
		// 这是实现5秒请求一次数据
		setIntervalFun () {
			let _this = this;
			this.getTsscLine();
			this.getTop5();
			this.getPie();
			var timer=setTimeout(function(th){
			 	th.setIntervalFun();
				clearTimeout(timer);
			},20000, _this);
			this.timer = timer;
		},
		// 这是选择平台后切换的方法
		changeOpt () {
			clearTimeout(this.timer);
			this.setIntervalFun();
		},
		// 获取tssc的总体交易趋势折线图
		getTsscLine () {
			this.$http({
	            url: this.$http.adornUrl('/trans/getTransByMinAndNoDevice'),
	            method: 'get',
	            params: this.$http.adornParams({
	              noDevice: this.ruleForm.region
	            }, false)
	          })
	          .then(({data}) => {
	            if (data.respCode == '00') {
	              // grid用于配制图表在其div里面的显示范围
	              var grid = {
					  top: '10%',
					  left: '10%',
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
		// 获取tssc平台
		getPlatForms () {
			this.$http({
	            url: this.$http.adornUrl('/devices/getDevicesByType'),
	            method: 'get',
	            params: this.$http.adornParams({
	              type: 1
	            }, false)
	          })
	          .then(({data}) => {
	            if (data.respCode == '00') {
	              this.platForm = data.data;
	              if (!this.$route.query['no']) {
	              	this.ruleForm.region = data.data[0].no
	              } else {
	              	this.ruleForm.region = this.$route.query['no'];
	              }
	              this.setIntervalFun();
	            } else {
	              this.$message.error('平台获取失败，请稍后再试！')
	            }
	          })
	          .catch((err) => {
	          	console.log(err);
	            this.$message.error('平台数据获取失败，请稍后再试！');
	          })
		},
		// 应用服务TOP5
		getTop5 () {
			this.$http({
	            url: this.$http.adornUrl('/trans/getTransTop5'),
	            method: 'get',
	            params: this.$http.adornParams({
	              typeDevice: 1
	            }, false)
	          })
	          .then(({data}) => {
	            if (data.respCode == '00') {
                  let dataObj = {
                  	data: [],
                  	valdata: [],
                  	titlename: []
                  };
                  console.log(data.data.length)
                  for (let i = 0; i < data.data.length; i++) {
                  	dataObj.data.push(data.data[i].proportion);
                  	dataObj.valdata.push(data.data[i].count);
                  	dataObj.titlename.push(data.data[i].noDevice);
                  }
                  TsscTopBar(dataObj);
	            } else {
	              this.$message.error('应用服务TOP5数据获取失败，请稍后再试！')
	            }
	          })
	          .catch((err) => {
	          	console.log(err);
	            this.$message.error('数据获取失败，请稍后再试！');
	          })
		},
		// 获取cpu、内存、存储、连接数信息
		getPie () {
			this.$http({
	            url: this.$http.adornUrl('/sysResource/getSysResource'),
	            method: 'get',
	            params: this.$http.adornParams({
	              noDevice: this.ruleForm.region
	            }, false)
	          })
	          .then(({data}) => {
	            if (data.respCode == '00') {
                  this.connectionNumber = data.data.port;
                  TsscCpuPie(data.data.cpu);
                  TsscMemoryPie(data.data.ram);
                  TsscStoragePie(data.data.disk);
	            } else {
	              this.$message.error('数据获取失败，请稍后再试！')
	            }
	          })
	          .catch((err) => {
	          	console.log(err);
	            this.$message.error('数据获取失败，请稍后再试！');
	          })
		}
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
  .text-center .text-gray{
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
.cpuWrap, .memoryWrap, .storageWrap{
	float: left;
	width: 33.33%;
	height: 70%;
}
.pieWrap div p{
	line-height: 30px;
	margin: 0;
	font-size: 20px;
	text-align: center;
	height: 30px;
	font-weight: bold;
}
.cpuE, .memoryE, .storageE{
	height: 170px;
}
.connectionNumber{
	clear: both;
}
.connectionNumber p{
	font-size: 18px!important;
	text-align: left!important;
}
.connectionNumber p:first-child{
	border-bottom: 1px solid #666;
}
.alertWrap{
	height: 200px;
	overflow: hidden;
	overflow-y: auto;
}
.alertWrap .padding{
	text-align: left!important;
}
</style>
