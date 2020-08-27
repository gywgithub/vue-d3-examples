<template>
  <div class="force-base-iii">
    <h2>Force-based label placement III</h2>
    <svg id="viz" class="container-border"></svg>
  </div>
</template>

<script>
import * as d3 from 'd3'
import jsonData from '../assets/json/simple_force_layout.json'
// import jsonData from '../assets/json/simple_force_layout_2.json' // 金融数据
// import jsonData from '../assets/json/simple_force_layout_3.json' // 新基建数据
export default {
  name: 'ForceBasedLabelPlacement',
  data () {
    return {
      color: null,
      graph: null,
      label: null,
      labelLayout: null,
      graphLayout: null,
      width: 1250,
      height: 800,
      adjlist: [],
      svg: null,
      container: null,
      link: null,
      node: null,
      labelNode: null
    }
  },
  mounted () {
    let self = this
    this.color = d3.scaleOrdinal(d3.schemeCategory10)
    this.graph = jsonData
    this.label = {
      'nodes': [],
      'links': []
    }
    this.graph.nodes.forEach(function (d, i) {
      self.label.nodes.push({ node: d })
      self.label.nodes.push({ node: d })
      self.label.links.push({
        source: i * 2,
        target: i * 2 + 1
      })
    })

    this.graphLayout = d3.forceSimulation(this.graph.nodes)
      .force('charge', d3.forceManyBody().strength(-500))
      .force('x', d3.forceX(this.width / 2))
      .force('y', d3.forceY(this.height / 2))
      .force('link', d3.forceLink(this.graph.links).id(function (d) { return d.id }).distance(100))
      .on('tick', self.ticked)

    this.graph.links.forEach(function (d) {
      self.adjlist[d.source.index + '-' + d.target.index] = true
      self.adjlist[d.target.index + '-' + d.source.index] = true
    })

    this.svg = d3.select('#viz').attr('width', this.width).attr('height', this.height)
    this.container = this.svg.append('g')

    this.svg.call(
      d3.zoom()
        .scaleExtent([1.6 / 2, 4])
        .on('zoom', function () {
          self.container.attr('transform', d3.event.transform)
        })
    )

    this.link = this.container.append('g').attr('class', 'links')
      .selectAll('line')

    self.node = this.container.append('g').attr('class', 'nodes')
      .selectAll('g')

    this.labelNode = this.container.append('g').attr('class', 'labelNodes')
      .selectAll('text')

    this.restart()

    setTimeout(() => {
      let addData = [{ 'id': 'Four', 'group': 4 }, { 'id': 'Five', 'group': 5 }]
      let addLinks = [{ 'source': 'Four', 'target': 'Five', 'value': 3 }, { 'source': 'Five', 'target': 'Feuilly', 'value': 4 }]
      this.graph.nodes = [...this.graph.nodes, ...addData]
      this.graph.links = [...this.graph.links, ...addLinks]
      this.restart()
    }, 1000)
  },
  methods: {
    restart () {
      let self = this
      this.node = this.node.data(this.graph.nodes, function (d) { return d.id })
      this.node.exit().remove()
      this.node = this.node.enter().append('circle').attr('fill', function (d) {
        return self.color(d.id)
      }).attr('r', 5).merge(this.node)

      this.link = this.link.data(this.graph.links, function (d) {
        return d.source.id + '-' + d.target.id
      })
      this.link.exit().remove()
      this.link = this.link.enter().append('line').merge(this.link)
      this.labelNode = this.labelNode.data(this.graph.nodes, function (d) {
        return d.id
      })
      this.labelNode.exit().remove()
      this.labelNode = this.labelNode.enter().append('text').merge(this.labelNode)
        .text(function (d) {
          return d.id
        })
        .style('fill', '#555')
        .style('font-size', 12)
        .style('pointer-events', 'none')

      this.graphLayout.nodes(this.graph.nodes)
      this.graphLayout.force('link').links(this.graph.links)
    },
    ticked () {
      let self = this
      self.node.call(self.updateNode)
      self.link.call(self.updateLink)

      self.labelNode.each(function (d, i) {
        if (i % 2 === 0) {
          // d.x = d.x
          // d.y = d.y
        } else {
          let b = this.getBBox()
          let diffX = d.x - d.x
          let diffY = d.y - d.y

          let dist = Math.sqrt(diffX * diffX + diffY * diffY)

          let shiftX = b.width * (diffX - dist) / (dist * 2)
          shiftX = Math.max(-b.width, Math.min(0, shiftX))
          let shiftY = 16
          this.setAttribute('transform', 'translate(' + self.fixna(shiftX) + ',' + shiftY + ')')
        }
      })
      self.labelNode.call(self.updateNode)
    },
    updateLink () {
      let self = this
      self.link.attr('x1', function (d) { return self.fixna(d.source.x) })
        .attr('y1', function (d) { return self.fixna(d.source.y) })
        .attr('x2', function (d) { return self.fixna(d.target.x) })
        .attr('y2', function (d) { return self.fixna(d.target.y) })
    },
    updateNode (node) {
      let self = this
      node.attr('transform', function (d) {
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
<style>
.force-base-iii .links line {
  stroke: #999;
  stroke-opacity: 0.6;
}

.force-base-iii .nodes circle {
  stroke: black;
  stroke-width: 0px;
}
</style>
