// 此文件用来保存系统首页的曲线图
// 引入ecahrts
import echarts from 'echarts'
export default function diagram (data) {
	console.log(data);
	var nameObj = {
		'tssl': '加密平台',
		'kms': '密钥管理',
		'hsm': '加密机'
	}
	var names = Object.keys(data);
	var charts = {
	    unit: '交易量/笔',
	    names: ['加密平台', '密钥管理', '加密机'],
	    lineX: data.days,
	    value: [data.tssl, data.kms, data.hsm]

	}
	var color = ['rgba(23, 255, 243', 'rgba(255,100,97', 'rgba(255,1390,124']
	var lineY = []

	for (var i = 0; i < charts.names.length; i++) {
	    var x = i
	    if (x > color.length - 1) {
	        x = color.length - 1
	    }
	    var data = {
	        name: charts.names[i],
	        type: 'line',
	        color: color[x] + ')',
	        smooth: true,
	        areaStyle: {
	            normal: {
	                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
	                    offset: 0,
	                    color: color[x] + ', 0.3)'
	                }, {
	                    offset: 0.8,
	                    color: color[x] + ', 0)'
	                }], false),
	                shadowColor: 'rgba(0, 0, 0, 0.1)',
	                shadowBlur: 10
	            }
	        },
	        symbol: 'circle',
	        symbolSize: 5,
	        data: charts.value[i]
	    }
	    lineY.push(data)
	}

	lineY[0].markLine = {
	    silent: true,
	    data: [{
	        yAxis: 5
	    }, {
	        yAxis: 100
	    }, {
	        yAxis: 200
	    }, {
	        yAxis: 300
	    }, {
	        yAxis: 400
	    }]
	}
	var option = {
	    backgroundColor:'#1b2735',
	    tooltip: {
	        trigger: 'axis'
	    },
	    legend: {
	        data: charts.names,
	        textStyle: {
	            fontSize: 12,
	            color: 'rgb(0,253,255,0.6)'
	        },
	        right: '4%'
	    },
	    grid: {
	        top: '14%',
	        left: '4%',
	        right: '4%',
	        bottom: '12%',
	        containLabel: true
	    },
	    xAxis: {
	        type: 'category',
	        boundaryGap: false,
	        data: charts.lineX,
	        axisLabel: {
	            textStyle: {
	                color: 'rgb(0,253,255,0.6)'
	            },
	            formatter: function(params) {
	                return params.split(' ')[0];
	            }
	        }
	    },
	    yAxis: {
	        name: charts.unit,
	        type: 'value',
	        axisLabel: {
	            formatter: '{value}',
	            textStyle: {
	                color: 'rgb(0,253,255,0.6)'
	            }
	        },
	        splitLine: {
	            lineStyle: {
	                color: 'rgb(23,255,243,0.3)'
	            }
	        },
	        axisLine: {
	            lineStyle: {
	                color: 'rgb(0,253,255,0.6)'
	            }
	        }
	    },
	    series: lineY
	}
	return option;
}