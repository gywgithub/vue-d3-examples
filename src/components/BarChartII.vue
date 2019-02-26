<template>
  <div>
    <h2>Bar Chart II</h2>
    <svg class="chart"></svg>
  </div>
</template>

<script>
import * as d3 from 'd3'
export default {
  data () {
    return {}
  },
  mounted () {
    let data = [4, 8, 15, 16, 23, 42]
    let width = 420
    let barHeight = 20

    let x = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([0, width])

    let chart = d3.select('.chart')
      .attr('width', width)
      .attr('height', barHeight * data.length)

    let bar = chart.selectAll('g')
      .data(data)
      .enter().append('g')
      .attr('transform', function (d, i) { return 'translate(0,' + i * barHeight + ')' })

    bar.append('rect')
      .attr('width', x)
      .attr('height', barHeight - 1)

    bar.append('text')
      .attr('x', function (d) { return x(d) - 6 })
      .attr('y', barHeight / 2)
      .attr('dy', '.35em')
      .text(function (d) { return d })
    // d3.select('.chart')
    //   .selectAll('div')
    //   .data(data)
    //   .enter().append('div')
    //   .style('width', function (d) { return d * 10 + 'px' })
    //   .text(function (d) { return d })
  }
}
</script>
<style scoped>
</style>

<style>
.chart rect {
  fill: steelblue;
}
.chart text {
  fill: white;
  font: 10px sans-serif;
  text-anchor: end;
}
/* .chart div {
  font: 10px sans-serif;
  background-color: steelblue;
  text-align: right;
  padding: 3px;
  margin: 1px;
  color: white;
} */
</style>
