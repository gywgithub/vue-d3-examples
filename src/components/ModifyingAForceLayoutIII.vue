<template>
  <div>
    <h2>Modifying a Force Layout III</h2>
    <svg width="960" height="500" class="container-border"></svg>
  </div>
</template>
<script>
import * as d3 from 'd3'
export default {
  data () {
    return {
      g: null,
      node: null,
      link: null,
      nodes: null,
      links: null,
      simulation: null,
      color: null,
      labelNode: null,
      pt: null
    }
  },
  mounted () {
    let self = this
    let svg = d3.select('svg')

    let width = svg.attr('width')
    let height = svg.attr('height')
    this.color = d3.scaleOrdinal(d3.schemeCategory10)

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
    this.nodes = jsonData.nodes
    this.links = jsonData.links

    this.simulation = d3.forceSimulation(this.nodes)
      .force('charge', d3.forceManyBody().strength(-500))
      .force('link', d3.forceLink(this.links).id(function (d) { return d.id }).distance(100))
      .force('x', d3.forceX())
      .force('y', d3.forceY())
      .alphaTarget(1)
      .on('tick', self.ticked)

    this.g = svg.append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')

    this.link = this.g.append('g').attr('stroke', '#666').attr('stroke-width', 1.5).selectAll('.link')
    this.node = this.g.append('g').attr('stroke', '#fff').attr('stroke-width', 1.5).selectAll('.node')
    this.labelNode = this.g.append('g').attr('class', 'labelNodes').selectAll('text')
      .data(this.nodes)
      .enter()
      .append('text')
      .text(function (d) { return d.id })
      .style('fill', '#555')
      .style('font-size', 12)
      .style('pointer-events', 'none')

    this.restart()

    setTimeout(() => {
      this.nodes = [...this.nodes, { 'id': 'Four', 'group': 4 }, { 'id': 'Five', 'group': 5 }]
      this.links = [...this.links, {
        'source': 'Four',
        'target': 'Myriel',
        'value': 3
      },
      {
        'source': 'Five',
        'target': 'Four',
        'value': 4
      }]
      this.restart()
    }, 2000)

    setTimeout(() => {
      this.nodes = [...this.nodes, { 'id': 'Six', 'group': 6 }, { 'id': 'Seven', 'group': 7 }, { 'id': 'Eight', 'group': 8 }]
      this.links = [...this.links, {
        'source': 'Six',
        'target': 'Myriel',
        'value': 6
      },
      {
        'source': 'Seven',
        'target': 'Napoleon',
        'value': 7
      },
      {
        'source': 'Eight',
        'target': 'Feuilly',
        'value': 8
      }]
      this.restart()
    }, 3000)
  },
  methods: {
    restart () {
      let self = this
      this.node = this.node.data(this.nodes, function (d) { return d.id })
      this.node.exit().remove()
      this.node = this.node.enter().append('circle').attr('fill', function (d) {
        return self.color(d.id)
      }).attr('r', 8).merge(this.node)

      this.link = this.link.data(this.links, function (d) {
        return d.source.id + '-' + d.target.id
      })
      this.link.exit().remove()
      this.link = this.link.enter().append('line').merge(this.link)

      this.labelNode = this.labelNode.data(this.nodes, function (d) { return d.id })
      this.labelNode.exit().remove()
      this.labelNode = this.labelNode.enter().append('text').merge(this.labelNode)
        .text(function (d) { return d.id })
        .style('fill', '#555')
        .style('font-size', 12)
        .style('pointer-events', 'none')

      this.simulation.nodes(this.nodes)
      this.simulation.force('link').links(this.links)
      // this.simulation.alpha(1).restart()
    },
    ticked () {
      this.node
        .attr('cx', function (d) { return d.x })
        .attr('cy', function (d) { return d.y })
        // .attr('transform', function (d) {
        //   return 'translate(' + self.fixna(d.x) + ',' + self.fixna(d.y) + ')'
        // })
      // this.node.call(this.updateNode())

      this.link.attr('x1', function (d) { return d.source.x })
        .attr('y1', function (d) { return d.source.y })
        .attr('x2', function (d) { return d.target.x })
        .attr('y2', function (d) { return d.target.y })

      this.labelNode.each(function (d) {
        this.setAttribute('transform', 'translate(' + d.x + ',' + d.y + ')')
      })
    },
    updateNode () {
      let self = this
      this.node.attr('transform', function (d) {
        // console.log(fixna(d.x) + ' , ' + fixna(d.y))
        return 'translate(' + self.fixna(d.x) + ',' + self.fixna(d.y) + ')'
      })
    },
    fixna (x) {
      if (isFinite(x)) return x
      return 0
    }
  }
}
</script>
<style scoped>
</style>
