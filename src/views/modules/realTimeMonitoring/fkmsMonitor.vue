<template>
	<div>
		<el-row>
			<el-col :span="17" class="">
				<div class="padding border-bottom flex justify-content-end align-items-center">
					<div>
						<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px">
							<el-form-item label="平台" class="m-0">
								<el-select v-model="ruleForm.region" placeholder="请选择平台" @change="changePlatform()">
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
				<el-row style="margin-top: 40px; margin-bottom: 40px;">
					<el-col :span="8" class="padding text-center">
						<font-awesome-icon :icon="['fas', 'key']" class="text-blue" style="font-size: 60px; margin-top:86px;" />
					</el-col>
					<el-col :span="8" class="padding" style="margin-top: 70px;">
						<h4>对称密钥</h4>
						<p>总数量：<span class="text-large">{{symmet.skTotal}}</span></p>
					</el-col>
					<el-col :span="6" class="padding">
						<div class="flex justify-content-between align-items-end">
							<div>AES</div>
							<div>
								<span class="text-blue text-large">{{symmet.aes}}</span> 个
							</div>
						</div>
						<div class="flex justify-content-between align-items-end m-t-10">
							<div>SM4</div>
							<div>
								<span class="text-blue text-large">{{symmet.sm4}}</span> 个
							</div>
						</div>
						<div class="flex justify-content-between align-items-end m-t-10">
							<div>DES</div>
							<div>
								<span class="text-blue text-large">{{symmet.des}}</span> 个
							</div>
						</div>
						<hr class="border">
						<div class="flex justify-content-between align-items-end">
							<div>今日增加</div>
							<div>
								<span class="text-blue text-large">{{symmet.skTodayAdd}}</span> 个
							</div>
						</div>
						<div class="flex justify-content-between align-items-end m-t-10">
							<div>今日更新</div>
							<div>
								<span class="text-blue text-large">{{symmet.skTodayUpdate}}</span> 个
							</div>
						</div>
					</el-col>
				</el-row>
				<hr class="border">
				<el-row style="margin-top: 40px;">
					<el-col :span="8" class="padding text-center">
						<font-awesome-icon :icon="['fas', 'key']" class="text-blue" style="font-size: 60px; margin-top:66px;" />
					</el-col>
					<el-col :span="8" class="padding" style="margin-top: 40px;">
						<h4>非对称密钥</h4>
						<p>总数量：<span class="text-large">{{asymmet.akTotal}}</span></p>
					</el-col>
					<el-col :span="6" class="padding">
						<div class="flex justify-content-between align-items-end">
							<div>SM2</div>
							<div>
								<span class="text-blue text-large">{{asymmet.sm2}}</span>个
							</div>
						</div>
						<div class="flex justify-content-between align-items-end m-t-10">
							<div>RAS</div>
							<div>
								<span class="text-blue text-large">{{asymmet.ras}}</span> 个
							</div>
						</div>
						<hr class="border">
						<div class="flex justify-content-between align-items-end">
							<div>今日增加</div>
							<div>
								<span class="text-blue text-large">{{asymmet.akTodayAdd}}</span> 个
							</div>
						</div>
						<div class="flex justify-content-between align-items-end m-t-10">
							<div>今日更新</div>
							<div>
								<span class="text-blue text-large">{{asymmet.akTodayUpdate}}</span> 个
							</div>
						</div>
					</el-col>
				</el-row>
			</el-col>

			<el-col :span="7" class="padding border-left">
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
					<!-- <img src="../../../assets/img/img-01.png" width="50%" alt="">
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
				<hr class="border">
				<h4 class="title">应用服务TOP5</h4>
				<div class="top5Wrap" style="height: 200px;"></div>
				<hr class="border">
				<h4 class="title">KMS</h4>
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
import {TsscCpuPie, TsscStoragePie, TsscMemoryPie, TsscTopBar} from '@/assets/js/myEcharts'
export default {
	data() {
		return {
			ruleForm: {
				region: ''
			},
			platForm: [], // 平台下拉框
			symmet: {
				skTotal: 0,
				aes: 0,
				sm4: 0,
				des: 0,
				skTodayAdd: 0,
				skTodayUpdate: 0
			},// 对称密钥
			asymmet: {
				akTotal: 0,
				sm2: 0,
				ras: 0,
				akTodayAdd: 0,
				akTodayUpdate: 0
			},// 非对称密钥
			rules: {
				region: [{ required: true, message: '请选择平台', trigger: 'change' }]
			},
			timer: 0,
			connectionNumber: 0
		};
	},
	// 此方法是为了页面切换的时候，清楚页面内数据刷新；
	beforeRouteLeave(to, from, next) {
		clearTimeout(this.timer);
		next();
	},
	mounted () {},
	// 此方法是为了进入页面的时候调取页面数据
	activated () {
		this.getPlatForms();
		
	},
	methods: {
		// 这是实现5秒请求一次数据
		setIntervalFun () {
			let _this = this;
			// 此处写想要进行的操作
			// 获取密钥信息
			this.getSecretKey();
			this.getTop5();
			this.getPie();
			var timer = setTimeout(function(th){
			 	th.setIntervalFun();
				clearTimeout(timer);
			},20000, _this);
			this.timer = timer;
		},
		// 获取kms平台
		getPlatForms () {
			this.$http({
	            url: this.$http.adornUrl('/devices/getDevicesByType'),
	            method: 'get',
	            params: this.$http.adornParams({
	              type: 2
	            }, false)
	          })
	          .then(({data}) => {
	            if (data.respCode == '00') {
	              this.platForm = data.data;
	              if (!this.$route.query['no']) { // 如果路由没有参数，则为直接打开页面，默认显示第一项
	              	this.ruleForm.region = data.data[0].no
	              } else { // 如果路由有设备编号，证明是从首页跳转过来的，下拉框选择相应项
	              	this.ruleForm.region = this.$route.query['no'];
	              }
	              // this.getSecretKey();
	              this.setIntervalFun()
	            } else {
	              this.$message.error('平台获取失败，请稍后再试！')
	            }
	          })
	          .catch((err) => {
	          	console.log(err);
	            this.$message.error('平台数据获取失败，请稍后再试！');
	          })
		},
		// 切换平台
		changePlatform () {
			clearTimeout(this.timer);
			this.setIntervalFun();
		},
		// 获取kms的密钥信息
		getSecretKey () {
			this.$http({
	            url: this.$http.adornUrl('/sk/getSkByNoDevice'),
	            method: 'get',
	            params: this.$http.adornParams({
	              noDevice: this.ruleForm.region
	            }, false)
	          })
	          .then(({data}) => {
	            if (data.respCode == '00') {
                  // 对称密钥
	              this.symmet.skTotal = data.data.skTotal;
	              this.symmet.aes = data.data.aes;
	              this.symmet.sm4 = data.data.sm4;
	              this.symmet.des = data.data.des;
	              this.symmet.skTodayAdd = data.data.skTodayAdd;
	              this.symmet.skTodayUpdate = data.data.skTodayUpdate;
	              // 非对称密钥
	              this.asymmet.akTotal = data.data.akTotal;
	              this.asymmet.sm2 = data.data.sm2;
	              this.asymmet.rsa = data.data.rsa;
	              this.asymmet.akTodayAdd = data.data.akTodayAdd;
	              this.asymmet.akTodayUpdate = data.data.akTodayUpdate;
	            } else {
	              this.$message.error('密钥数据获取失败，请稍后再试！')
	            }
	          })
	          .catch((err) => {
	          	console.log(err);
	            this.$message.error('数据获取失败，请稍后再试！');
	          })
		},
		// 应用服务TOP5
		getTop5 () {
			this.$http({
	            url: this.$http.adornUrl('/trans/getTransTop5'),
	            method: 'get',
	            params: this.$http.adornParams({
	              typeDevice: 2
	            }, false)
	          })
	          .then(({data}) => {
	            if (data.respCode == '00') {
                  console.log(data.data.length);
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
                  TsscCpuPie(data.data.cpu ? data.data.cpu : 0);
                  TsscMemoryPie(data.data.ram ? data.data.ram : 0);
                  TsscStoragePie(data.data.disk ? data.data.disk : 0);
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
	beforeDesotry () {
		clearTimeout(this.timer);
	}
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
	font-size: 24px;
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
