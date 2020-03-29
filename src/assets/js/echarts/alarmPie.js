// 引入ecahrts
import echarts from 'echarts'
export default function alarmPie (data) {
	var option = {
	    color:['#F75977','#E5D11C'],
	    series : [
	        {
	            name: '签到比例分析',
	            type: 'pie',
	            radius: '80%',
	            center: ['50%', '50%'],
	            data: data,
	            label: {
                    normal: {
                        position: 'inner',//隐藏引导线
                        show : false//隐藏标识文字
                    }   
                }
	        }
	    ]
	};
	return option;
}