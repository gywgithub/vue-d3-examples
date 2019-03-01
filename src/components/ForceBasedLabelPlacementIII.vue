<template>
  <div>
    <h2>Force-based label placement II</h2>
    <svg id="viz"></svg>
  </div>
</template>

<script>
import * as d3 from 'd3'
// import jsonData from '../assets/json/miserables.json'
import jsonData from '../assets/json/simple_force_layout.json'
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
    // this.labelLayout = d3.forceSimulation(this.label.nodes)
      // .force('charge', d3.forceManyBody().strength(-150))
      // .force('link', d3.forceLink(this.label.links).distance(0).strength(0.2))

    this.graphLayout = d3.forceSimulation(this.graph.nodes)
      .force('charge', d3.forceManyBody().strength(-2000))
      .force('center', d3.forceCenter(this.width / 2, this.height / 2))
      .force('x', d3.forceX(this.width / 2).strength(1))
      .force('y', d3.forceY(this.height / 2).strength(1))
      .force('link', d3.forceLink(this.graph.links).id(function (d) { return d.id }).distance(100).strength(1))
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
          self.container.attr('transform', d3.event.transform)        })
    )

    this.link = this.container.append('g').attr('class', 'links')
      .selectAll('line')
      // .data(this.graph.links)
      // .enter()
      // .append('line')
      // .attr('stroke', '#aaa')
      // .attr('stroke-width', '1px')

    self.node = this.container.append('g').attr('class', 'nodes')
      .selectAll('g')
      // .data(this.graph.nodes)
      // .enter()
      // .append('circle')
      // .attr('r', 5)
      // .attr('fill', function (d) { return self.color(d.group) })

    this.labelNode = this.container.append('g').attr('class', 'labelNodes')
      .selectAll('text')
      // .data(this.label.nodes)
      // .enter()
      // .append('text')
      // .text(function (d, i) { return i % 2 === 0 ? '' : d.node.id })
      // .style('fill', '#555')
      // .style('font-family', 'Arial')
      // .style('font-size', 12)
      // .style('pointer-events', 'none')

    this.restart()

    setTimeout(() => {
      let addData = [{ 'id': 'Four', 'group': 4 }, { 'id': 'Five', 'group': 5 }]
      let addLinks = [{'source': 'Four','target': 'Five','value': 3},{'source': 'Five','target': 'Feuilly','value': 4}]
      this.graph.nodes = [...this.graph.nodes, ...addData]
      this.graph.links = [...this.graph.links, ...addLinks]
      addData.forEach(function (d, i) {
        self.label.nodes.push({ node: d })
        self.label.nodes.push({ node: d })
      })
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

      this.labelNode = this.labelNode.data(this.label.nodes, function (d) { 
        console.log('d: ', d)
        return d.id })
      this.labelNode.exit().remove()
      this.labelNode = this.labelNode.enter().append('text').merge(this.labelNode)
        .text(function (d) {
          return d.node.id })
        .style('fill', '#555')
        .style('font-size', 12)
        .style('pointer-events', 'none')

      this.graphLayout.nodes(this.graph.nodes)
      this.graphLayout.force('link').links(this.graph.links)
      this.graphLayout.alpha(1).restart()
    },
    ticked () {
      let self = this
      self.node.call(self.updateNode)
      self.link.call(self.updateLink)

      // self.labelLayout.alphaTarget(0.3).restart()
      self.labelNode.each(function (d, i) {
        if (i % 2 === 0) {
          d.x = d.node.x
          d.y = d.node.y
        } else {
          let b = this.getBBox()
          let diffX = d.x - d.node.x
          let diffY = d.y - d.node.y

          let dist = Math.sqrt(diffX * diffX + diffY * diffY)

          let shiftX = b.width * (diffX - dist) / (dist * 2)
          shiftX = Math.max(-b.width, Math.min(0, shiftX))
          let shiftY = 16
          this.setAttribute('transform', 'translate(' + shiftX + ',' + shiftY + ')')
        }
      })
      self.labelNode.call(self.updateNode)

      // this.labelNode.each(function (d) {
      //   this.setAttribute('transform', 'translate(' + d.x + ',' + d.y + ')')
      // })
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
<style scoped>
svg {
  border: 1px solid #ccc;
}
</style>