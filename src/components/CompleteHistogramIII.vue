<template>
  <div>
    <h2>Complete Histogram III</h2>
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
    let marge = { top: 60, bottom: 60, left: 60, right: 60 }
    let svg = d3.select('svg')
    let width = svg.attr('width')
    let height = svg.attr('height')
    let g = svg.append('g')
      .attr('transform', 'translate(' + marge.top + ',' + marge.left + ')')
    let dataset = [10, 20, 30, 23, 13, 40, 27, 35, 20]
    let xScale = d3.scaleBand()
      .domain(d3.range(dataset.length))
      .rangeRound([0, width - marge.left - marge.left])
    let xAxis = d3.axisBottom(xScale)
    let yScale = d3.scaleLinear()
      .domain([0, d3.max(dataset)])
      .range([height - marge.top - marge.bottom, 0])
    let yAxis = d3.axisLeft(yScale)
    g.append('g')
      .attr('transform', 'translate(' + 0 + ',' + (height - marge.top - marge.bottom) + ')')
      .call(xAxis)
    g.append('g')
      .attr('transform', 'trnslate(0, 0)')
      .call(yAxis)
    // 绘制矩形和文字
    let gs = g.selectAll('.rect')
      .data(dataset)
      .enter()
      .append('g')

    // 绘制矩形
    let rectPadding = 20
    gs.append('rect')
      .attr('x', function (d, i) {
        return xScale(i) + rectPadding / 2
      })
      .attr('y', function (d) {
        return yScale(d)
      })
      .attr('width', function () {
        return xScale.step() - rectPadding
      })
      .attr('height', function (d) {
        return height - marge.top - marge.bottom - yScale(d)
      })
      .attr('fill', 'lightblue')
      .on('mouseover', function () {
        d3.select(this)
          .transition()
          .duration(1000)
          .attr('fill', 'yellow')
      })
      .on('mouseout', function () {
        d3.select(this)
          .transition()
          .delay(1000)
          .duration(1000)
          .attr('fill', 'lightblue')
      })
    // 绘制文字
    gs.append('text')
      .attr('x', function (d, i) {
        return xScale(i) + rectPadding / 2
      })
      .attr('y', function (d) {
        return yScale(d)
      })
      .attr('dx', function () {
        (xScale.step() - rectPadding) / 2 // eslint-disable-line
      })
      .attr('dy', 20)
      .text(function (d) {
        return d
      })
  }
}
</script>
<style scoped>
</style>
