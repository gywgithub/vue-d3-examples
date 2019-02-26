<template>
  <div>
    <h2>Simple Bar Chart</h2>
    <svg></svg>
  </div>
</template>
<script>
import * as d3 from 'd3'
export default {
  data () {
    return {}
  },
  mounted () {
    // let marge = { top: 60, bottom: 60, left: 60, right: 60 }
    let dataset = [250, 210, 170, 130, 90]
    let svg = d3.select('svg')
    let g = svg.append('g')
    // .attr('transform', 'translate(' + marge.top + ',' + marge.left + ')')

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
        return d
      })
      .attr('height', rectHeight - 5)
      .attr('fill', 'lightblue')
  }
}
</script>
<style scoped>
</style>
