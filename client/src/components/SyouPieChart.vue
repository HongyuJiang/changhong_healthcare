<template>
<div id='pie-chart-container'>
      <div id='pie-container'>
   
      </div>
  </div>
</template>

<script>
const d3 = require('d3');

var data = [{
  item: '已签约',
  count: 40,
  percent: 0.4
}, {
  item: '',
  count: 60,
  percent: 0.6
}];

export default {

  name: 'pie-chart',
  data () {
    return {
      data: data
    }
  },

  mounted: function() {

    this.chartInit(this.data);
  },

  methods: {

    chartInit(){
        var chart = new G2.Chart({
          container: 'pie-container',
          height: 250
        });
        chart.source(data, {
          percent: {
            formatter: function formatter(val) {
              val = val * 100 + '%';
              return val;
            }
          }
        });
        chart.coord('theta');
        chart.tooltip({
          showTitle: false
        });
        chart.intervalStack().position('percent').color('item').label('percent', {
          // autoRotate: false,
          offset: -20,
          textStyle: {
            rotate: 0,
            textAlign: 'center',
            shadowBlur: 2,
            shadowColor: 'rgba(255, 255, 255, .45)',
            fill:'#fff'
          }
        }).tooltip('item*percent', function(item, percent) {
          percent = percent * 100 + '%';
          return {
            name: item,
            value: percent
          };
        }).style({
          lineWidth: 2,
          stroke: '#000'
        });

        chart.render();
    }
  }
}
</script>

<style lang="css">


#pie-chart-container{
  width:80%;
  height:200px;
  position:absolute;
  top:150px;
  left:50px;
}

</style>