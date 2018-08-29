<template>
<div id="pie-container">
  <svg width="500" height="300"></svg>
</div>
</template>

<script>
const d3 = require('d3');
export default {

  name: 'pie-chart',

  mounted: function() {

    var svg = d3.select(this.$el).select('svg');
    var width = +svg.attr('width');
    var height = +svg.attr('height');
    var margin = { top:20, left:0, bottom:30, right:0 };
    var chartWidth = width - (margin.left + margin.right);
    var chartHeight = height - (margin.top + margin.bottom);
    this.chartLayer = svg
      .append('g')
      .attr(
        "transform",
        `translate(${margin.left}, ${margin.top})`
      );

    this.data = [1,2,3,4,5,6]
    this.arc = d3.arc()
      .outerRadius(chartHeight / 2)
      .innerRadius(chartHeight / 4)
      .padAngle(0.1)
      .cornerRadius(0)
    this.pieG = this.chartLayer
      .append("g")
      .attr(
        "transform",
        `translate(${chartWidth / 2}, ${chartHeight / 2})`
      )
    this.drawChart(this.data);
  },

  /*data() {
    return {
      points: [1,2,3,4,5],
    };
  },*/

  watch: {
    data: function(newData) {
      this.drawChart(newData);
    }
  },

  methods: {
    drawChart: function(data) {

        console.log(data)
      var arcs = d3.pie()
          .sort(null)
          .value(function(d) { return d; })
          (data)
      var block = this.pieG.selectAll(".arc")
        .data(arcs)
      block.select('path').attr('d', this.arc)
      var newBlock = block
        .enter()
        .append("g")
        .classed("arc", true)
      newBlock.append("path")
        .attr("d", this.arc)
        .attr("id", function(d, i) { return "arc-" + i })
        .attr("stroke", "none")
        .attr("fill", d => d3.interpolateCool(Math.random()))
        .attr("opacity", 0.7)
        .on('click', () =>{ this.$root.$emit('addAIcon') })

      newBlock.append("text")
        .attr("dx", 10)
        .attr("dy", -5)
        .append("textPath")
        .attr("xlink:href", function(d, i) { return "#arc-" + i; })
        .text(function(d) { return d.data.name })
    }
  }
}
</script>

<style lang="css">

div #pie-container{

  position: absolute;
  top:500px;
}

</style>