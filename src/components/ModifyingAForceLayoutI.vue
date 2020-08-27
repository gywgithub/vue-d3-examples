<template>
  <div>
    <h2>Modifying a Force Layout</h2>
    <svg width="960" height="500" class="container-border"></svg>
  </div>
</template>
<script>
import * as d3 from 'd3'
export default {
  data () {
    return {}
  },
  mounted () {
    let svg = d3.select('svg')
    let width = svg.attr('width')
    let height = svg.attr('height')
    let color = d3.scaleOrdinal(d3.schemeCategory10)

    let a = { id: 'a' }
    let b = { id: 'b' }
    let c = { id: 'c' }
    let nodes = [a, b, c]
    let links = []

    let simulation = d3.forceSimulation(nodes)
      .force('charge', d3.forceManyBody().strength(-1000))
      .force('link', d3.forceLink(links).distance(200))
      .force('x', d3.forceX())
      .force('y', d3.forceY())
      .alphaTarget(1)
      .on('tick', ticked)

    let g = svg.append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
    let link = g.append('g').attr('stroke', '#000').attr('stroke-width', 1.5).selectAll('.link')
    let node = g.append('g').attr('stroke', '#fff').attr('stroke-width', 1.5).selectAll('.node')
    restart()

    d3.timeout(function () {
      links.push({ source: a, target: b })
      links.push({ source: b, target: c })
      links.push({ source: c, target: a })
      restart()
    }, 1000)

    // d3.interval(function () {
    //   nodes.pop()
    //   links.pop()
    //   links.pop()
    //   restart()
    // }, 2000, d3.now())

    // d3.interval(function () {
    //   nodes.push(c)
    //   links.push({ source: b, target: c })
    //   links.push({ source: c, target: a })
    //   restart()
    // }, 2000, d3.now() + 1000)

    function restart () {
      // Apply the general update pattern to the nodes
      node = node.data(nodes, function (d) { return d.id })
      node.exit().remove()
      node = node.enter().append('circle').attr('fill', function (d) { return color(d.id) }).attr('r', 8).merge(node)

      // // Apply the general update pattern to the links
      link = link.data(links, function (d) { return d.source.id + '-' + d.target.id })
      link.exit().remove()
      link = link.enter().append('line').merge(link)

      // Update and restart the simulation
      simulation.nodes(nodes)
      simulation.force('link').links(links)
      simulation.alpha(1).restart()
    }

    function ticked () {
      node.attr('cx', function (d) { return d.x })
        .attr('cy', function (d) { return d.y })

      link.attr('x1', function (d) { return d.source.x })
        .attr('y1', function (d) { return d.source.y })
        .attr('x2', function (d) { return d.target.x })
        .attr('y2', function (d) { return d.target.y })
    }
  }
}
</script>
