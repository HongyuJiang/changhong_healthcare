<template>
<div id='bubble-chart-container'>
      <div class='chart-name chart-name-right'>慢病-小组统计</div>
      <h1 id='bubble-container-name'> 高血压</h1>
      <div id='bubble-container'>
   
      </div>
  </div>
</template>

<script>

const d3 = require('d3');

import DataProvider from '../DataProvider';

var data = [{
  item: '高血压',
  group: 1,
  value: 34,
  ratio: 100
},  {
  item: '高血压',
  group: 2,
  value: 50,
  ratio: 100
}, {
  item: '高血压',
  group: 3,
  value: 40,
  ratio: 100
},  {
  item: '高血压',
  group: 4,
  value: 20,
  ratio: 100
}, {
  item: '高血压',
  group: 5,
  value: 70,
  ratio: 100
}, {
  item: '高血压',
  group: 6,
  value: 55,
  ratio: 100
}, {
  item: '高血压',
  group: 7,
  value: 55,
  ratio: 100
}, {
  item: '高血压',
  group: 8,
  value: 55,
  ratio: 100
}, {
  item: '高血压',
  group: 9,
  value: 55,
  ratio: 100
}, {
  item: '高血压',
  group: 10,
  value: 55,
  ratio: 40
}];

export default {

  name: 'bubble-chart',
  data () {
    return {
      data: data
    }
  },

  mounted: function() {

    this.chart = null

    this.focus = '高血压'
    
    DataProvider.getItemGroupCsv().then(response => {

          this.data = response.data
              
          var data = this.dataProcess(response.data, '高血压')

          this.chartInit(data)

        }, error => {
       
    });

    this.$root.$on('updateBubble', (msg) => {

      var data = this.dataProcess(this.data, msg)

      d3.select('#bubble-container-name').text(msg)

      this.chart.changeData(data)

      console.log('updateBubble')
    })
    
  },

  methods: {

    dataProcess(lists, dim){

        let newData = []

          const groupNames = ['group1', 'group2', 'group3', 
            'group4', 'group5', 'group6', 'group7', 
            'group8', 'group9', 'group10']

          for (let i=0;i<groupNames.length;i++){

            let meta = {}

            for (let j=0;j<lists.length;j++){
           
              if(lists[j]['item'] == dim && lists[j]['type'] == '签约人数'){
                
                  meta['value'] = parseInt(lists[j][groupNames[i]])

                  meta['group'] = i

                  meta['ratio'] = 100

                  meta['item'] = dim

                  continue;
              }
            }

            newData.push(meta)
          }

        return newData
      },


    chartInit(){

        this.chart = new G2.Chart({
          container: 'bubble-container',
          height: 350,
          width: 600,
          padding: [50, 20, 50, 80],
        });

       this.chart.source(data, {
        group: {
            tickInterval: 1, // 自定义刻度间距
            nice: false, // 不对最大最小值优化
          
        },
        ratio: {
            tickInterval: 20,
            nice: false,
            max: 100,
            min: 0
        }
        });
        // 开始配置坐标轴
        this.chart.axis('group', {
        label: {
            formatter: function formatter(val) {
              return val + ' 组'; // 格式化坐标轴显示文本
            },
             textStyle: {
              fontSize: 12, 
              textAlign: 'center', 
              fill: '#ccc', 
            }
        },
        grid: {
            lineStyle: {
            stroke: '#d9d9d9',
            lineWidth: 1,
            lineDash: [2, 2]
            }
        }
        });
        this.chart.axis('ratio', {
        title: {
            offset: 64
        },
        label: {
            formatter: function formatter(val) {
              if (val > 0) {
                  return val + ' %';
              }
            },
             textStyle: {
              fontSize: 12, 
              fill: '#ccc', 
            }
        }
        });
        this.chart.legend(false);
        this.chart.tooltip({
          title: 'country'
        });
        this.chart.point().position('group*ratio').size('value', [5, 20]).label('group*value', {
          offset: 0, // 文本距离图形的距离
          textStyle: {
              fill:'white'
        }
        }).opacity(0.3).shape('circle').tooltip('group*value').style({
          lineWidth: 1,
          stroke: '#1890ff'
        });
    
        this.chart.render();
    }
  }
}
</script>

<style lang="css">


#bubble-chart-container{
  height:200px;
  position:absolute;
  top:450px;
  right:20px;
}

#bubble-container-name{

   position:absolute;
   width:100%;
   top:60%;
   color:rgba(255,255,255,0.5);
   font-size: 70px;
   text-align: center;
   text-anchor: middle;

}

</style>