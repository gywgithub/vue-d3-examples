<template>
  <div>
    <h2>Line Chart I</h2>
    <svg width="800" height="500"></svg>
  </div>
</template>
<script>
import * as d3 from 'd3'
export default {
  data () {
    return {}
  },
  async mounted () {
    const svg = d3.select('svg')
    const margin = { top: 20, right: 20, bottom: 30, left: 50 }
    const width = +svg.attr('width') - margin.left - margin.right
    const height = +svg.attr('height') - margin.top - margin.bottom
    const g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    const parseTime = d3.timeParse('%d-%b-%y')

    const x = d3.scaleTime().rangeRound([0, width])

    const y = d3.scaleLinear().rangeRound([height, 0])

    const line = d3
      .line()
      .x(function (d) {
        return x(parseTime(d.date))
      })
      .y(function (d) {
        return y(d.close)
      })

    const data = [
      { date: '24-Apr-07', close: 93.24 },
      { date: '25-Apr-07', close: 95.35 },
      { date: '26-Apr-07', close: 98.84 },
      { date: '27-Apr-07', close: 99.92 },
      { date: '30-Apr-07', close: 99.80 },
      { date: '1-May-07', close: 99.47 },
      { date: '2-May-07', close: 100.39 },
      { date: '3-May-07', close: 100.40 },
      { date: '4-May-07', close: 100.81 },
      { date: '7-May-07', close: 103.92 },
      { date: '8-May-07', close: 105.06 },
      { date: '9-May-07', close: 106.88 },
      { date: '10-May-07', close: 107.34 }
    ]
    x.domain(
      d3.extent(data, function (d) {
        return parseTime(d.date)
      })
    )
    y.domain(
      d3.extent(data, function (d) {
        return d.close
      })
    )

    g.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x).ticks(7))

    g.append('g')
      .call(d3.axisLeft(y))
      .append('text')
      .attr('fill', '#000')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Price ($)')

    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1.5)
      .attr('d', line)
  }
}
</script>
<style scoped></style>
