<template>

  <div id='gauge-chart-container'>
      <div class='chart-name chart-name-right'>一些指标</div>
      <div id='gauge-chart'>
   
      </div>
  </div>
</template>
<script>

import G2 from '@antv/g2';

import * as d3 from 'd3';

let Shape = G2.Shape;
Shape.registerShape('point', 'pointer', {
  drawShape: function drawShape(cfg, group) {
    let center = this.parsePoint({ // 获取极坐标系下画布中心点
      x: 0,
      y: 0
    });
    // 绘制指针
    group.addShape('line', {
      attrs: {
        x1: center.x,
        y1: center.y,
        x2: cfg.x,
        y2: cfg.y,
        stroke: cfg.color,
        lineWidth: 5,
        lineCap: 'round',
        opacity: 0.7
      }
    });
    return group.addShape('circle', {
      attrs: {
        x: center.x,
        y: center.y,
        r: 9.75,
        stroke: '#333',
        stroke: cfg.color,
        lineWidth: 4.5,
        fill: cfg.color,
        opacity: 0.5
      }
    });
  }
});

function creatData() {
    var data = [];
    var val = Math.random() * 6;
    val = val.toFixed(1);
    data.push({
        value: val * 1
    });
    return data;
}

let color = ['#52040B', '#D67200', '#DE1F00'];

export default {
  name:'gauge-chart',
  methods:{

        draw(data) {
            
            console.log(data)

            const lineWidth = 20;
            const val = data[0].value;
            const yFixedPos = 0.92
            const fixedStyle = {
                zIndex: 1,
                start: [0, yFixedPos],
                end: [val, yFixedPos],
                style: {
                    stroke: color[0],
                    opacity: 0.7,
                    lineWidth: lineWidth
                }
            }
           
            this.chart.guide().clear();
        // 绘制仪表盘背景
            this.chart.guide().arc({
                zIndex: 0,
                top: false,
                start: [0, 0.92],
                end: [6, 0.92],
                style: { // 底灰色
                    stroke: '#ccc',
                    opacity: '0.3',
                    lineWidth: lineWidth
                }
            });

        //for deep copy
        console.log(JSON.stringify(fixedStyle))
        let z2Style = JSON.parse(JSON.stringify(fixedStyle));
        let z3Style = JSON.parse(JSON.stringify(fixedStyle));
        let z4Style = JSON.parse(JSON.stringify(fixedStyle));
        let z5Style = JSON.parse(JSON.stringify(fixedStyle));

        z2Style.stroke = color[0];

        z3Style.start = [2, yFixedPos];
        z3Style.end = [4, yFixedPos];
        z3Style.stroke = color[1];

        z4Style.start = [4, yFixedPos];
        z4Style.stroke = color[2];

        z5Style.start = [2, yFixedPos];
        z5Style.stroke = color[1];

        console.log(fixedStyle, z2Style, z3Style, z4Style, z5Style)

        val >= 2 && this.chart.guide().arc(z2Style);
        val >= 4 && this.chart.guide().arc(z3Style);
        val > 4 && val <= 6 && this.chart.guide().arc(z4Style);
        val > 2 && val <= 4 && this.chart.guide().arc(z5Style);
        val < 2 && this.chart.guide().arc(fixedStyle);

    
        // 绘制指标数字
        this.chart.guide().html({
            position: ['50%', '110%'],
            html: '<div style="width: 300px;text-align: center;">' +
             '<p style="font-size: 15px; color: #fff;margin: 0;">完成率</p>' +
              '<p style="font-size: 20px;color: #fff;margin: 0;">' +
               val * 10 + '%</p>' + '</div>'
        });
        this.chart.changeData(data);
    },

      chartInit(){

            this.chart = new G2.Chart({
                container: 'gauge-chart',
                //forceFit: true,
                height: 250,
                width: 250,
                padding: [50, 0, 30, 0],
                animate: false
            });
            this.chart.source(creatData);

            this.chart.coord('polar', {
                startAngle: -9 / 8 * Math.PI,
                endAngle: 1 / 8 * Math.PI,
                radius: 0.75
            });
            this.chart.scale('value', {
                min: 0,
                max: 6,
                tickInterval: 1,
            nice: false
            });

            this.chart.axis('1', false);
            this.chart.axis('value', {
            zIndex: 2,
            line: null,
            label: {
                offset: -20,
                textStyle: {
                fontSize: 12,
                fill: '#fff',
                textAlign: 'center',
                textBaseline: 'middle'
                }
            },
            tickLine: {
                length: -20,
                stroke: '#000',
                strokeOpacity: 1
            },
            grid: null
            });
            this.chart.legend(false);
            this.chart.point().position('value*1').shape('pointer').color('value', function(val) {
            if (val < 2) {
                return color[0];
            } else if (val <= 4) {
                return color[1];
            } else if (val <= 6) {
                return color[2];
            }
            }).active(false);

            this.draw(creatData());
        
        }
  },

  mounted(){
    
    this.chartInit()
  },
}
</script>

<style scoped>

#gauge-chart-container{

  width:100%;
  height:200px;
  position:absolute;
  top:780px;
  
}

</style>