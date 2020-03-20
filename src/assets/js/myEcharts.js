 // 此页面用来实验写入echarts
 // 引入echarts
 import echarts from 'echarts'
 import tuopu from './echarts/topological'
 import diagram from './echarts/diagram'
 import { transE, pieE, barTopE } from './echarts/tsscEcharts'
 
 // 首页拓扑图
 export function LoopTP (data, th) {
 	// 首屏加载；
 	var myChart = echarts.init(document.getElementById('echarts-wrap'));
 	let {option, charts} = tuopu(data);
 	myChart.setOption(option);
 	// 由于需要点击节点可以进入修改页面或者警报详情页面
 	myChart.on('click', function (params) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].name == params.data.name) {
                if (data[i].type == 1) {// 跳转到tssc实时监控
                    th.$router.push({path: '/realTimeMonitoring-tsscMonitor', query: {no: data[i].no}});
                } else if (data[i].type == 2) {// 跳转到kms实时监控
                    th.$router.push({path: '/realTimeMonitoring-fkmsMonitor', query: {no: data[i].no}});
                }
                break;
            }
        }
 	})
 	//用于告警的动态效果
    var timer = setInterval((charts) => {
        var dataI = []
        for (var n = 0; n < charts.nodes.length; n++) {
            var alarm = charts.nodes[n].alarm
            if (alarm !== null && alarm !== '' && alarm !== undefined) {
                option.series[0].data[n].symbolSize = 60
                option.series[0].data[n].label = {
                    normal: {
                        color: '#DC143C'
                    }
                }
                option.series[0].itemStyle.normal.label.formatter = function(item) {
                    if (alarm !== null && alarm !== '' && alarm !== undefined) {
                        return item.data.name + '\n[ ' + item.data.alarm + ' ]'
                    } else {
                        return item.data.name
                    }
                }
                dataI.push(n)
            }
        }
        myChart.setOption(option)
        setTimeout(() => {
            for (var m = 0; m < dataI.length; m++) {
                option.series[0].data[dataI[m]].symbolSize = 50
                option.series[0].data[dataI[m]].label = {
                    normal: {
                        color: '#12b5d0'
                    }
                }
                option.series[0].itemStyle.normal.label.formatter = function(item) {
                    return item.data.name
                }
            }
            myChart.setOption(option)
        }, 500)
    }, 1000, charts);
    // 返回计时器timer，再次请求数据的时候关闭上一次的计时器，防止计时器累加造成错乱
    return timer;
 }

// 首页曲线图
export function Diagram (data) {
	var myDiagram = echarts.init(document.getElementById('diagram'));
	var option = diagram(data);
	myDiagram.setOption(option);
}

// 系统分类监控-tssc-总体交易趋势（line）
export function TsscTrans (data, grid) {
    var myChart = echarts.init(document.getElementsByClassName("transE")[0]);
    var option = transE(data, grid);
    myChart.setOption(option);
}
// 系统分类监控-tssc-cpu(pie)
export function TsscCpuPie (data) {
    var myChart = echarts.init(document.getElementsByClassName("cpuE")[0]);
    var option = pieE(data);
    myChart.setOption(option);
}
// 系统分类监控-tssc-memory(pie)
export function TsscMemoryPie (data) {
    var myChart = echarts.init(document.getElementsByClassName("memoryE")[0]);
    var option = pieE(data);
    myChart.setOption(option);
}
// 系统分类监控-tssc-storage(pie)
export function TsscStoragePie (data) {
    var myChart = echarts.init(document.getElementsByClassName("storageE")[0]);
    var option = pieE(data);
    myChart.setOption(option);
}

// 系统分类监控-tssc-top5(bar)
export function TsscTopBar (data) {
    var myChart = echarts.init(document.getElementsByClassName("top5Wrap")[0]);
    var option = barTopE(data);
    myChart.setOption(option);
}
export default {
	LoopTP,
	Diagram,
    TsscTrans,
    TsscCpuPie,
    TsscMemoryPie,
    TsscStoragePie,
    TsscTopBar
}