<template>
  <div id="app">
    <div class="float-layer left-float-layer">
       <fixed-attr-indicator class="fixed-attrs"/>
       <dynamic-attr-indicator 
          name=辖区居民
          value=5406537
          top=130
          id = xiaqu
          class="dynamic-attrs"
        />
        <dynamic-attr-indicator
          name=签约人数
          value=33768
          top=230
          id = qianyue
          class="dynamic-attrs"
       />

       <syou-group-bar-chart class="group-bar-chart"/>
       <syou-bubble-frequency-chart class="bubble-frequency-chart"/>
    </div>

    <syou-mapbox-view class="mapbox-view"/>

    <div class="float-layer right-float-layer">
      <syou-line-chart class="line-chart"/>
      <syou-venn-chart class="venn-chart"/>
      <syou-gauge-chart class="gauge-chart"/>
    </div>  

  </div>


</template>

<script>

import SyouMapboxView from './components/SyouMapboxView';
import SyouLineChart from './components/SyouLineChart';
import SyouVennChart from './components/SyouVennChart';
import SyouGaugeChart from './components/SyouGaugeChart';
import SyouGroupBarChart from './components/SyouGroupBarChart';
import FixedAttrIndicator from './components/FixedAttrIndicator';
import DynamicAttrIndicator from './components/DynamicAttrIndicator';
import SyouBubbleFrequencyChart from './components/SyouBubbleFrequencyChart';


export default {
  name: 'App',
  components: {
    SyouLineChart,
    SyouVennChart,
    SyouGaugeChart,
    SyouMapboxView,
    SyouGroupBarChart,
    FixedAttrIndicator,
    DynamicAttrIndicator,
    SyouBubbleFrequencyChart
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

.float-layer {
  position: absolute;
  z-index:999;
  width:25%;
  height:100%;

}

.left-float-layer{

  left:0px;
}

.right-float-layer{

  right:0px;
}


body {
    margin:0; 
    padding:0;
    width:100%;
    height:100%;
}

.chart-name{
    color:white; 
    margin-bottom:30px;
    border-top: 3px solid #F0B04D;
    background: rgba(255,255,255,0.1);
    padding:10px;
}

.chart-name-right{

    float:right; 
    margin-right:30px;
  
}

.chart-name-left{

    float:left; 
    margin-left:50px;

}
</style>
