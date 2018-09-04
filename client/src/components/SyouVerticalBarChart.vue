<template>
  <div id='vertical-bar-chart-container'>
    <div class='chart-name chart-name-right'>慢病类型-签约情况统计</div>
    <div id='vertical-bar-chart'>
   
    </div>
  </div>
</template>
<script>

import G2 from '@antv/g2';

import * as d3 from 'd3';

import DataProvider from '../DataProvider';

export default {

  name:'vertical-bar-chart',

  mounted(){

    this.chart = null

    DataProvider.getItemGroupCsv().then(response => {

          this.data = response.data
              
          let data = this.dataProcess(response.data, 'sum')

          this.chartInit(data)

        }, error => {
       
    });

    this.$root.$on('updateVerticalBar', (msg) => {

      let data = this.dataProcess(this.data, msg)

      this.chart.changeData(data)

      console.log('updateVerticalBar')
    })

  },
  methods:{

      dataProcess(lists, dim){

          let newData = []

          for (let j=0;j<lists.length;j++){
           
            if (lists[j]['type'] == '签约人数'){

              let meta = {}

              meta['item'] = lists[j]['item']
              meta['type'] = '已签约'
              meta['value'] = parseInt(lists[j][dim])

              newData.push(meta)

            } 

            if (lists[j]['type'] == '签约率'){

              let meta = {}
              
              meta['item'] = lists[j]['item']
              meta['type'] = '未签约'
              meta['value'] = parseInt(lists[j][dim])

              newData.push(meta)

            } 

             if (lists[j]['type'] == '随访次数'){

              let meta = {}
              
              meta['item'] = lists[j]['item']
              meta['visited'] = parseInt(lists[j][dim])

              newData.push(meta)

            } 
    
          }

          return newData
          
      },

      chartInit(data){

        this.chart = new G2.Chart({
          container: 'vertical-bar-chart',
          height: 350,
          width: 650,
          padding:[30,20,120,50]
        });

        this.chart.source(data);
       // chart.legend();
        this.chart.axis('value', {
          position: 'right'
        });
        this.chart.axis('item', {
          label: {
            offset: 12
          }
        });
       // chart.coord().transpose().scale(1, -1);
        this.chart.interval().position('item*value').color('type').adjust([{
          type: 'dodge',
          marginRatio: 1/ 128
        }]);

        this.chart.point().position('item*visited')
        .shape('circle')
        .color('#A33').size(5)
        .label('visited', {
          offset: 20, // 文本距离图形的距离
          textStyle: {
            fill:'white'
          },
          formatter: function formatter(val) {

              if(val > 0)
              return '随访 ' + val + ' 人次'; // 格式化坐标轴显示文本
          }
        })

        this.chart.axis('item', {

          label: {
              textStyle: {
                  fontSize: 12, 
                  textAlign: 'center', 
                  fill: '#ccc', 
              }
            }
        });

        this.chart.axis('visited', {
          label: null,
          grid: null,
        });

        this.chart.axis('value', {
          label: {
            textStyle: {
                fontSize: 12, 
                textAlign: 'center', 
                fill: '#ccc', 
            }
          }
        });

        this.chart.render();
      }
  }
}
</script>

<style scoped>

#vertical-bar-chart-container{

  height:300px;
  position:absolute;
  top:20px;
  right:20px;
}

</style>