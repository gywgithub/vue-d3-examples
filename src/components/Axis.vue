<template>
  <div>
    <h2>Axis</h2>
    <svg width="960" height="600"></svg>
  </div>
</template>
<script>
import * as d3 from 'd3'
export default {
  data() {
    return {}
  },
  mounted() {
    let marge = { top: 10, bottom: 60, left: 10, right: 60 }
    let dataset = [2.5, 2.1, 1.7, 1.3, 0.9]
    let scaleLinear = d3
      .scaleLinear()
      .domain([0, d3.max(dataset)])
      .range([0, 250])
    let svg = d3.select('svg')
    let g = svg.append('g').attr('transform', 'translate(' + marge.top + ',' + marge.left + ')')
    let rectHeight = 30
    g.selectAll('rect')
      .data(dataset)
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
    let xScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataset)])
      .range([0, 250])
    let xAxis = d3.axisBottom(xScale).ticks(7)
    g.append('g')
      .attr('transform', 'translate(' + 20 + ',' + dataset.length * rectHeight + ')')
      .call(xAxis)
  }
}
</script>
<style scoped>
</style>
