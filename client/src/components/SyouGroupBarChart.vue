<template>
  <div id='group-line-chart-container'>
    <div class='chart-name chart-name-left'>区域签约排名</div>
    <div id='group-line-chart'>
   
    </div>
  </div>
</template>
<script>

import G2 from '@antv/g2';

import * as d3 from 'd3';

var data = [{
  "label": "一组",
  "type": "慢病人数",
  "value": 2800
}, {
  "label": "一组",
  "type": "签约人数",
  "value": 2260
}, {
  "label": "二组",
  "type": "慢病人数",
  "value": 1800
}, {
  "label": "二组", 
  "type": "签约人数",
  "value": 1300
}, {
  "label": "三组",
  "type": "慢病人数",
  "value": 950
}, {
  "label": "三组",
  "type": "签约人数",
  "value": 900
}, {
  "label": "四组",
  "type": "慢病人数",
  "value": 500
}, {
  "label": "四组",
  "type": "签约人数",
  "value": 390
}, {
  "label": "五组",
  "type": "慢病人数",
  "value": 170
}, {
  "label": "五组",
  "type": "签约人数",
  "value": 100
},{
  "label": "六组", 
  "type": "慢病人数",
  "value": 170
}, {
  "label": "六组",
  "type": "签约人数",
  "value": 100
}];

export default {
  name:'group-line-chart',
  data () {
    return {
      setsData: sets
    }
  },
  mounted(){
    
    this.chartInit()
  },
  methods:{

      chartInit(){

        var chart = new G2.Chart({
          container: 'group-line-chart',
          forceFit: true,
          height: 300
        });

        chart.source(data);
        chart.axis('value', {
          position: 'right'
        });
        chart.axis('label', {
          label: {
            offset: 12
          }
        });
        chart.coord().transpose().scale(1, -1);
        chart.interval().position('label*value').color('type').adjust([{
          type: 'dodge',
          marginRatio: 1 / 128
        }]);

        chart.axis('label', {
        label: {
            textStyle: {
            fontSize: 12, 
            textAlign: 'center', 
            fill: '#ccc', 
            }
          }
        });

        chart.axis('value', {
          label: {
            textStyle: {
            fontSize: 12, 
            textAlign: 'center', 
            fill: '#ccc', 
            }
          }
        });

        chart.render();
      }
  }
}
</script>

<style scoped>

#group-line-chart-container{
  width:80%;
  height:300px;
  position:absolute;
  top:350px;
}

</style>