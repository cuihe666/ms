// 此文件保存首页拓扑图的方法
export default  function tuopu (datas) {
	
	// 拓扑图正式开始
    // 处理拓扑图所需要的数据
 //    console.log(datas);
    var data = {
        nodes: [],
        links:[]
    };
    var centerNode = {}
    for (let i = 0; i < datas.length; i++) {
        var singleNode = {
            name: datas[i].name,
            img: datas[i].pic
        }
        if (datas[i].isAlarm == 0) {
            singleNode.alarm = "产生告警了哦";
        } else {
            singleNode.alarm = "";
        }
        if (datas[i].typeLocat == 0 || datas[i].typeLocat == 2) {
            data.nodes.push(singleNode);
            if (datas[i].devicesRels.length > 0) {
                for (let j = 0; j < datas[i].devicesRels.length; j++) {
                    var singleLink = {};
                    singleLink.source = datas[i].name;
                    for (let k = 0; k < datas.length; k++) {
                        if (datas[i].devicesRels[j].noTarget == datas[k].no) {
                            singleLink.target = datas[k].name;
                            break;
                        }
                    }
                    singleLink.name = datas[i].devicesRels[j].statusLine == 1 ? '连接正常' : '连接中断';
                    singleLink.isOk = datas[i].devicesRels[j].statusLine
                    data.links.push(singleLink);
                }
            }
        } else {
            centerNode = singleNode;
        }
        
    }
	for (let i = 0; i < data.nodes.length; i++) {
        data.nodes[i].angle = (360 / data.nodes.length * (i + 1));
    }
    data.nodes[data.nodes.length] = centerNode;
    data.nodes[data.nodes.length - 1].value = [0, 0];
    var charts = {
	    nodes: [],
	    links: [],
	    linesData: []
	}
    var dataMap = new Map()
    for (let j = 0; j < data.nodes.length; j++) {
        var node = {
            // show: false,
            name: data.nodes[j].name,
            value: data.nodes[j].value || [1, data.nodes[j].angle],
            symbolSize: 50,
            alarm: data.nodes[j].alarm,
            symbol: 'image://' + data.nodes[j].img,
            itemStyle: {
                normal: {
                    color: '#12b5d0',
                }
            }
        }
        dataMap.set(data.nodes[j].name, node.value)
        charts.nodes.push(node)
    }
    for (let i = 0; i < data.links.length; i++) {
        var link = {
            source: data.links[i].source,
            target: data.links[i].target,
            label: {
                normal: {
                    show: true,
                    formatter: data.links[i].name
                }
            },
            lineStyle: {
                normal: {
                    color: data.links[i].isOk == 1 ? '#12b5d0' : 'red'
                }
            }
        }
        charts.links.push(link)

        // 组装动态移动的效果数据
        var lines = {
            coords: [
                dataMap.get(data.links[i].source),
                dataMap.get(data.links[i].target)
            ]
        }

        charts.linesData.push(lines)
    }
    var option = {
        // title: {
        //     text: '系统设备拓扑图'
        // },
        backgroundColor: "rgba(0,0,0,0)",
        polar: {},
        radiusAxis: {
            show: false
        },
        angleAxis: {
            type: 'value',
            show: false
        },
        series: [{
            type: 'graph',
            //layout: 'none',
            coordinateSystem: 'polar',
            symbolSize: 50,
            label: {
                normal: {
                    show: true,
                    position: 'bottom',
                    color: '#12b5d0'
                }
            },
            lineStyle: {
                normal: {
                    width: 2,
                    shadowColor: 'none'
                }
            },
            edgeSymbolSize: 8,
            data: charts.nodes,
            links: charts.links,
            // nodes: charts.nodes,
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        formatter: function(item) {
                            return item.data.name
                        }
                    }
                }
            }
        }
        // , {
        //     name: 'A',
        //     type: 'lines',
        //     coordinateSystem: 'polar',
        //     lineStyle: {
        //         color: '#a6c84c',
        //         width: 1,
        //         opacity: 0.6,
        //         curveness: 0.5
        //     },
        //     effect: {
        //         show: true,
        //         trailLength: 0,
        //         symbol: 'triangle',
        //         color: '#12b5d0',
        //         symbolSize: 8
        //     },
        //     data: charts.linesData
        // }
        ]
    };
    return {option, charts};
}