import echarts from 'echarts'
// 系统分类监控
//tssc-总体交易趋势
export function transE (data, grid) {
	var opt={
	    "tooltip" : {
	        "trigger": "axis",
			"axisPointer": {
				"label": {
					"formatter": function (value) {
						var hour = 0, min = 0;
						if (value.value > 60) {
							hour = Math.floor(value.value / 60);
							min = value.value - hour * 60;
						} else {
							min = value.value
						}
						return "时间：" + hour + ":" + (min > 10 ? min : ("0" + min));;
					}
				}
			}
	    },
		// 设置图标在div的展示范围
		"grid": grid,
		// 图例，需要的时候可解锁
	//     "legend": {
	//     	"orient":'vertical',
	// 		  "x": 'right', 
	// 	      "y": 35,
	//         "data":["实时曲线"]
	//     },
	    "xAxis" : {
        	"type" : "category",
			"boundaryGap" : false,
			"data" : function() {
				var list = [];
				for (let i = 0; i < 60 * 24; i++) {
					list.push(i);
				}
				return list;
			}(),
			"axisLabel": {
				"interval": 239,
				"formatter": function (value, index) {
				    // value和index都是当前x的坐标刻度
				    return Math.ceil(value/60) + ":00";
				},
				"showMinLabel": true,
				"showMaxLabel": true
			}
		},	
	    "yAxis" : [
	        {
	            "type" : "value"
	        }
	    ],
	    "series" : [
	        {
	            "name":"交易量",
	            "type":"line",
	            "data": data,
				"areaStyle": {
				    "normal": {
				      "color": 'black' //改变区域颜色
				    }
				  },
	        }
	    ]
	};
	return opt;
}

// 饼状图
export function pieE (data) {
	var option = {
	    title: {
	        text: data + "%",
	        x: 'center',
	        y: 'center',
	        textStyle: {
	            fontWeight: 'normal',
	            color: '#0580f2',
	            fontSize: '20'
	        }
	    },
	    color: ['rgba(176, 212, 251, 1)'], 
	   
	    series: [{
	        name: 'Line 1',
	        type: 'pie',
	        clockWise: true,
	        radius: ['50%', '66%'],
	        itemStyle: {
	            normal: {
	                label: {
	                    show: false
	                },
	                labelLine: {
	                    show: false
	                }
	            }
	        },
	        hoverAnimation: false, 
	        data: [{
	            value: data,
	            name: '01',
	            itemStyle: {
	                normal: {
	                    color: { // 完成的圆环的颜色
	                        colorStops: [{
	                            offset: 0,
	                            color: 'red' // 0% 处的颜色
	                        }, {
	                            offset: 1,
	                            color: '#367bec' // 100% 处的颜色
	                        }]
	                    },
	                    label: {
	                        show: false
	                    },
	                    labelLine: {
	                        show: false
	                    }
	                } 
	            }
	        }, {
            name: '02',
            value: 100 - data
        	}]
	    }]
	}
	return option;
}

// 柱状图
export function barTopE (datas) {
	var data = datas.data;
	var titlename = datas.titlename;
	var valdata = datas.valdata;
	var myColor = ['#1089E7', '#F57474', '#56D0E3', '#F8B448', '#8B78F6'];
	var option = {
	    backgroundColor: '#0e2147',
	    grid: {
	    	y: 10,
	    	y2: 5,
	        x: 80,
	        x2: 80
	    },
	    xAxis: {
	        show: false
	    },
	    yAxis: [{
	        show: true,
	        data: titlename,
	        inverse: true,
	        axisLine: {
	            show: false
	        },
	        splitLine: {
	            show: false
	        },
	        axisTick: {
	            show: false
	        },
	        axisLabel: {
	            color: '#fff',
	            formatter: function(value, index) {
	                return [
	                    '{lg|' + (index + 1) + '}' + '{title|' + value + '} '
	                ].join('\n')
	            },
	            rich: {
	                lg: {
	                    backgroundColor: '#339911',
	                    color: '#fff',
	                    borderRadius: 15,
	                    // padding: 5,
	                    align: 'center',
	                    width: 15,
	                    height: 15
	                },
	            }
	        },


	    }, {
	        show: true,
	        inverse: true,
	        data: function (valdata) {
	        	for (var i = 0; i < valdata.length; i++) {
	        		valdata[i] = valdata[i] + "笔";
	        	}
	        	return valdata;
	        }(valdata),
	        axisLabel: {
	            textStyle: {
	                fontSize: 12,
	                color: '#fff',
	            },
	        },
	        axisLine: {
	            show: false
	        },
	        splitLine: {
	            show: false
	        },
	        axisTick: {
	            show: false
	        },

	    }],
	    series: [{
	        name: '条',
	        type: 'bar',
	        yAxisIndex: 0,
	        data: data,
	        barWidth: 10,
	        itemStyle: {
	            normal: {
	                barBorderRadius: 30,
	                color: function(params) {
	                    var num = myColor.length;
	                    return myColor[params.dataIndex % num]
	                },
	            }
	        },
	        label: {
	            normal: {
	                show: true,
	                color: "#fff",
	                fontSize: 10,
	                position: [40, 0],
	                formatter: '{c}%'
	            }
	        },
	    }, {
	        name: '框',
	        type: 'bar',
	        yAxisIndex: 1,
	        barGap: '-100%',
	        data: [100, 100, 100, 100, 100],
	        barWidth: 10,
	        itemStyle: {
	            normal: {
	                color: 'none',
	                borderColor: '#00c1de',
	                borderWidth: 1,
	                barBorderRadius: 15,
	            }
	        }
	    }, ]
	};
	return option;
}

export default {
	transE,
	pieE,
	barTopE
}