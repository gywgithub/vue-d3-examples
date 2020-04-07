<template>
  <div class="container">
    <h2>Scale</h2>
    <svg width="960" height="600"></svg>
  </div>
</template>
<script>
import * as d3 from 'd3'
export default {
  data () {
    return {}
  },
  mounted () {
    // 线性比例尺
    let dataset = [1.2, 2.3, 0.9, 1.5, 3.3]
    let min = d3.min(dataset)
    let max = d3.max(dataset)
    let scaleLinear = d3.scaleLinear()
      .domain([min, max])
      .range([0, 300])
    // console.log(scaleLinear(1)) // 12.499999999999996
    // console.log(scaleLinear(2)) // 137.5
    // console.log(scaleLinear(3.3)) // 300
    // console.log(scaleLinear(6.3)) // 675
    // console.log(scaleLinear(-6.3)) // -900

    // 比例计算关系
    // x / (3.3 - 0.9)  = y / (300 - 0)
    // 比例为：  x * 125 = y
    // 计算 2 对应的值
    // (2 - 0.9) * 125 = y - 0
    // 得到 137.5

    // ----------------------------------------------------------

    // 序数比例尺
    let index = [0, 1, 2, 3, 4]
    let color = ['red', 'blue', 'yellow', 'black', 'green']
    d3.scaleOrdinal()
      .domain(index)
      .range(color)
    // console.log(scaleOrdinal(1)) // blue
    // console.log(scaleOrdinal(2)) // yellow
    // console.log(scaleOrdinal(4)) // green
    // console.log(scaleOrdinal(14)) // red
    // console.log(scaleOrdinal(-2)) // blue

    // -----------------------------------------------------------
    let dataset2 = [2.5, 2.1, 1.7, 1.3, 0.9]
    d3.scaleLinear()
      .domain([0, d3.max(dataset2)])
      .range([0, 300])
    let svg = d3.select('svg')
    let g = svg.append('g')
    let rectHeight = 30
    g.selectAll('rect')
      .data(dataset2)
      .enter()
      .append('rect')
      .attr('x', 20)
      .attr('y', function (d, i) {
        return i * rectHeight
      })
      .attr('width', function (d) {
        return scaleLinear(d)
      })
      .attr('height', rectHeight - 5)
      .attr('fill', 'lightblue')
  }
}
</script>
<style scoped>
.container {
  width: 100%;
  padding: 0 !important;
  margin-right: auto;
  margin-left: auto;
}
</style>
