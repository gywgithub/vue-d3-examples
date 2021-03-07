<template>
  <div>
    <h2>Modifying a Force Layout II</h2>
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

    let jsonData = {
      'nodes': [
        {
          'id': 'Myriel',
          'group': 1
        },
        {
          'id': 'Napoleon',
          'group': 2
        },
        {
          'id': 'Feuilly',
          'group': 3
        }
      ],
      'links': [
        {
          'source': 'Myriel',
          'target': 'Napoleon',
          'value': 1
        },
        {
          'source': 'Napoleon',
          'target': 'Feuilly',
          'value': 2
        },
        {
          'source': 'Feuilly',
          'target': 'Myriel',
          'value': 3
        }
      ]
    }
    let nodes = jsonData.nodes
    let links = jsonData.links

    let simulation = d3.forceSimulation(nodes)
      .force('charge', d3.forceManyBody().strength(-1000))
      .force('link', d3.forceLink(links).id(function (d) { return d.id }).distance(200))
      .force('x', d3.forceX())
      .force('y', d3.forceY())
      .alphaTarget(1)
      .on('tick', ticked)

    let g = svg.append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
    let link = g.append('g').attr('stroke', '#000').attr('stroke-width', 1.5).selectAll('.link')
    let node = g.append('g').attr('stroke', '#fff').attr('stroke-width', 1.5).selectAll('.node')

    restart()

    // d3.timeout(function () {
    //   links = jsonData.links
    //   console.log('timeout 1000 ', links)
    //   restart()
    // }, 1000)

    function restart () {
      node = node.data(nodes, function (d) { return d.id })
      node.exit().remove()
      node = node.enter().append('circle').attr('fill', function (d) {
        return color(d.id)
      }).attr('r', 8).merge(node)

      link = link.data(links, function (d) {
        return d.source.id + '-' + d.target.id
      })
      link.exit().remove()
      link = link.enter().append('line').merge(link)

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
  },
  methods: {
    ticked () {
      this.node.attr('cx', function (d) { return d.x })
        .attr('cy', function (d) { return d.y })

      this.link.attr('x1', function (d) { return d.source.x })
        .attr('y1', function (d) { return d.source.y })
        .attr('x2', function (d) { return d.target.x })
        .attr('y2', function (d) { return d.target.y })
    }
  }
}
</script>
