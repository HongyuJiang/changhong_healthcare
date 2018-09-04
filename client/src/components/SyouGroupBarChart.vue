<template>
  <div id='group-bar-chart-container'>
    <div class='chart-name chart-name-left special'>小组签约类型组成</div>
    <div id='group-bar-chart'>
   
    </div>
  </div>
</template>
<script>

import G2 from '@antv/g2';
import { DataSet } from '@antv/data-set'
import DataProvider from '../DataProvider';

import * as d3 from 'd3';

export default {

  name:'group-bar-chart',

  mounted(){
  

    DataProvider.getItemGroupCsv().then(response => {
              
          this.dataProcess(response.data)

        }, error => {
       
    });
  },
  methods:{

      dataProcess(lists){

        let newData = []

          const groupNames = ['group1', 'group2', 'group3', 
          'group4', 'group5', 'group6', 'group7', 
          'group8', 'group9', 'group10']

          const _groupNames = ['一组', '二组', '三组', 
          '四组', '五组', '六组', '七组', 
          '八组', '九组', '十组']

          for (let i=0;i<groupNames.length;i++){

            let meta = {}

            meta.label = _groupNames[i]

            for (let j=0;j<lists.length;j++){
           
              if(lists[j]['type'] == '签约人数'){
                
                  meta[lists[j]['item']] = parseInt(lists[j][groupNames[i]])
              }
            }

            newData.push(meta)
          }

          this.chartInit(newData)
      },

      chartInit(data){

        var ds = new DataSet();
        var dv = ds.createView().source(data);
        dv.transform({
          type: 'fold',
          fields: ['高血压', '糖尿病', '肺结核', '低保',
           '五保', '残疾人口', '贫困人口', '低龄儿童',
            '孕产妇', '一般人群'], // 展开字段集
          key: '慢病类型', // key字段
          value: '数量', // value字段
          retains: ['label'] // 保留字段集，默认为除fields以外的所有字段
        });
       
        var chart = new G2.Chart({
          container: 'group-bar-chart',
          height: 600,
          width: 400,
          padding: [0,50,60,60],
        });
        chart.source(dv);
        chart.coord().transpose();
        chart.axis('label', {
          label: {
            offset: -300,
            textStyle: {
                fontSize: 12, 
                fill: '#ccc', 
            }
          }
        });
        chart.axis('数量', {
          label: {
            textStyle: {
                fontSize: 12, 
                fill: '#ccc', 
            }
          }
        });
        chart.intervalStack().position('label*数量').color('慢病类型');
       
        chart.on('click', ev => {

          //console.log(ev)

          this.$root.$emit('updateRatio')

          this.$root.$emit('updateVerticalBar', 'group1')

           this.$root.$emit('updateBubble','糖尿病')

          
        });

        chart.render();
  
      }
  }
}
</script>

<style scoped>

#group-bar-chart-container{

  width:70%;
  height:300px;
  position:absolute;
  top:325px;
  left:100px;
}

.special{

  margin-left: -14%;

}

</style>