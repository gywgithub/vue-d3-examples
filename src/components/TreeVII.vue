<template>
  <div class="main">
    <svg class="d3-tree width-100-percent">
      <g class="container" />
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3'
export default {
  data () {
    return {
      nodeId: '',
      nodeName: '',
      zoom: null,
      index: 0,
      duration: 750,
      root: null,
      nodes: [],
      links: [],
      dTreeData: null,
      margin: { top: 20, right: 90, bottom: 30, left: 90 },
      currentNode: null,
      svg: null,
      container: null,
      // nodeObj: null,
      newNodeName: '',
      rootNodeId: null
    }
  },
  mounted () {
    let treeData2 = {
      "name": "Top Level",
      "children": [
        {
          "name": "Level 2: A",
          "children": [
            { "name": "Son of A" },
            { "name": "Daughter of A" }
          ]
        },
        { "name": "Level 2: B" }
      ]
    }

    let treeData = {
      'name': 'flare',
      'children': [
        {
          'name': 'animate',
          'children': [
            { 'name': 'Easing', 'value': 17010 },
            { 'name': 'FunctionSequence', 'value': 5842 },
            {
              'name': 'interpolate',
              'children': [
                { 'name': 'ArrayInterpolator', 'value': 1983 },
                { 'name': 'ColorInterpolator', 'value': 2047 },
                { 'name': 'DateInterpolator', 'value': 1375 },
                { 'name': 'Interpolator', 'value': 8746 },
                { 'name': 'MatrixInterpolator', 'value': 2202 },
                { 'name': 'NumberInterpolator', 'value': 1382 },
                { 'name': 'ObjectInterpolator', 'value': 1629 },
                { 'name': 'PointInterpolator', 'value': 1675 },
                { 'name': 'RectangleInterpolator', 'value': 2042 }
              ]
            },
            { 'name': 'ISchedulable', 'value': 1041 },
            { 'name': 'Parallel', 'value': 5176 },
            { 'name': 'Pause', 'value': 449 },
            { 'name': 'Scheduler', 'value': 5593 },
            { 'name': 'Sequence', 'value': 5534 },
            { 'name': 'Transition', 'value': 9201 },
            { 'name': 'Transitioner', 'value': 19975 },
            { 'name': 'TransitionEvent', 'value': 1116 },
            { 'name': 'Tween', 'value': 6006 }
          ]
        },
        {
          'name': 'display',
          'children': [
            { 'name': 'DirtySprite', 'value': 8833 },
            { 'name': 'LineSprite', 'value': 1732 },
            { 'name': 'RectSprite', 'value': 3623 },
            { 'name': 'TextSprite', 'value': 10066 }
          ]
        },
        {
          'name': 'flex',
          'children': [
            { 'name': 'FlareVis', 'value': 4116 }
          ]
        },
        {
          'name': 'physics',
          'children': [
            { 'name': 'DragForce', 'value': 1082 },
            { 'name': 'GravityForce', 'value': 1336 },
            { 'name': 'IForce', 'value': 319 },
            { 'name': 'NBodyForce', 'value': 10498 },
            { 'name': 'Particle', 'value': 2822 },
            { 'name': 'Simulation', 'value': 9983 },
            { 'name': 'Spring', 'value': 2213 },
            { 'name': 'SpringForce', 'value': 1681 }
          ]
        },
        {
          'name': 'scale',
          'children': [
            { 'name': 'IScaleMap', 'value': 2105 },
            { 'name': 'LinearScale', 'value': 1316 },
            { 'name': 'LogScale', 'value': 3151 },
            { 'name': 'OrdinalScale', 'value': 3770 },
            { 'name': 'QuantileScale', 'value': 2435 },
            { 'name': 'QuantitativeScale', 'value': 4839 },
            { 'name': 'RootScale', 'value': 1756 },
            { 'name': 'Scale', 'value': 4268 },
            { 'name': 'ScaleType', 'value': 1821 },
            { 'name': 'TimeScale', 'value': 5833 }
          ]
        }
      ]
    }
    this.initSvg(treeData)
  },
  computed: {
    treemap () {
      console.log('height: ', this.height)
      console.log('width: ', this.width)
      // return d3.tree().size([this.height, this.width])
      // return d3.tree().size([this.height, this.width]).nodeSize([30, 60])
      return d3.tree().nodeSize([30, 60])
      // return d3.tree(this.root)
    }
  },
  methods: {
    initSvg (treeData) {
      let clientWidth = document.body.clientWidth
      let clientHeight = document.body.clientHeight
      this.width = Math.floor(clientWidth * 0.6)
      this.height = clientHeight - 72

      let margin = ({ top: 10, right: 120, bottom: 10, left: 40 })

      let width = this.width

      let dy = width / 4
      let dx = 30

      // this.nodeObj = d3.hierarchy.prototype.constructor
      this.svg = d3
        .select('svg.d3-tree')
        //  .attr('viewBox',[0, 0, 100, 100])
        .attr('viewBox', [-margin.left, -margin.top, width, dx])
      // .attr('width', this.width)
      // .attr('height', this.height)

      // console.log(this.height)
      let translateTop = (this.height - 120) / 2

      let transform = d3.zoomIdentity
        .translate(this.margin.left, translateTop)
        // .translate(this.margin.left, this.margin.top)
        .scale(1)
      this.container = this.svg.select('g.container')

      // init zoom behavior, which is both an object and function
      this.zoom = d3
        .zoom()
        .scaleExtent([1 / 2, 8])
        .on('zoom', function () {
          d3.select('g.container')
            .attr('transform', d3.event.transform)
        })

      // this.container
      //   .transition()
      //   .duration(750)
      //   .call(this.zoom.transform, transform)

      this.svg.call(this.zoom).on('dblclick.zoom', null)
      // console.log('treeData: ', treeData)
      // console.log(JSON.stringify(treeData))
      this.root = this.getRoot(treeData)
      console.log('xxxxxxxxxx: ', this.root)
      this.update(this.root)
    },
    getRoot (treeData) {
      let root2 = d3.hierarchy(treeData, d => {
        console.log('d.children: ', d.children)
        return d.children
      })
      // root2.x0 = this.height / 2
      root2.x0 = 0
      root2.y0 = 0
      // root2.x = 1000
      // root2.y = 1000
      console.log('root2: ', root2)

      const Node = d3.hierarchy.prototype.constructor
      let root = new Node
      root.x0 = this.height / 2
      root.y0 = 1000
      root.x = 1000
      root.y = 1000
      root.name = 'abc'
      root.data = root2.data

      console.log('11111111111root: ', root)
      return root2
    },
    dblclickNode (d) {
      // Double click the node, and expand the node if there are child nodes
      if (d.children) {
        this.$set(d, '_children', d.children)
        d.children = null
      } else {
        this.$set(d, 'children', d._children)
        d._children = null
      }
      this.$nextTick(() => {
        this.update(d)
      })
    },
    clickNode (d) {
      this.currentNode = d
    },
    diagonal (s, d) {
      return `M ${s.y} ${s.x}
              C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`
    },
    getNodesAndLinks () {
      console.log('getNodesAndLinks this. root ', this.root)
      this.dTreeData = this.treemap(this.root)
      // let t = d3.tree().nodeSize([30, 60])
      // console.log('tttttttttttt ', t)
      // this.dTreeData = t(this.root)
      this.nodes = this.dTreeData.descendants()
      this.links = this.dTreeData.descendants().slice(1)
    },

    // 数据与Dom进行绑定
    update (source) {
      console.log('update')
      this.getNodesAndLinks()
      this.nodes.forEach(d => {
        d.y = d.depth * 180
      })
      let node = this.container.selectAll('g.node').data(this.nodes, d => {
        return d.id || (d.id = ++this.index)
      })
      // Enter any new sources at the parent's previous position.
      let nodeEnter = node
        .enter()
        .append('g')
        .attr('class', 'node')
        .on('click', this.clickNode)
        .on('dblclick', this.dblclickNode)
        .attr('transform', d => {
          return 'translate(' + source.y0 + ',' + source.x0 + ')'
        })

      // Add circle for the nodes
      nodeEnter.append('circle')
        .attr('class', 'node')
        .attr('r', 1e-6)
        .style('fill', function (d) {
          return d._children ? '#c9e4ff' : '#fff'
        })

      nodeEnter
        .append('text')
        .attr('dy', '.35em')
        .attr('x', function (d) {
          return d.children || d._children ? -13 : 13
        })
        .attr('text-anchor', function (d) {
          return d.children || d._children ? 'end' : 'start'
        })
        .text(function (d) { return d.data.name.length > 20 ? d.data.name.substring(0, 20) + '...' : d.data.name })
        .attr('class', 'update')

      // Transition nodes to their new position.
      let nodeUpdate = nodeEnter
        .merge(node)
        .transition()
        .duration(this.duration)
        .attr('transform', function (d) {
          return 'translate(' + d.y + ',' + d.x + ')'
        })

      // Update the node attributes and style
      nodeUpdate.select('circle.node')
        .attr('r', 10)
        .style('fill', function (d) {
          return d._children ? '#c9e4ff' : '#fff'
        })
        .attr('cursor', 'pointer')

      nodeUpdate.select('text').style('fill-opacity', 1)

      // update the text
      node.select('text')
        .attr('dy', '.35em')
        .attr('x', function (d) {
          return d.children || d._children ? -13 : 13
        })
        .attr('text-anchor', function (d) {
          return d.children || d._children ? 'end' : 'start'
        })
        .text(function (d) { return d.data.name.length > 20 ? d.data.name.substring(0, 20) + '...' : d.data.name })

      // Transition exiting nodes to the parent's new position.
      let nodeExit = node
        .exit()
        .transition()
        .duration(this.duration)
        .attr('transform', function (d) {
          return 'translate(' + source.y + ',' + source.x + ')'
        })
        .remove()

      nodeExit.select('circle').attr('r', 1e-6)

      nodeExit.select('text').style('fill-opacity', 1e-6)

      // *************************** Links section *************************** //
      // Update the links…
      let link = this.container.selectAll('path.link').data(this.links, d => {
        return d.id
      })

      // Enter any new links at the parent's previous position.
      let linkEnter = link
        .enter()
        .insert('path', 'g')
        .attr('class', 'link')
        .attr('d', d => {
          let o = { x: source.x0, y: source.y0 }
          return this.diagonal(o, o)
        })
        .attr('fill', 'none')
        .attr('stroke-width', 1)
        .attr('stroke', '#ccc')

      // Transition links to their new position.
      let linkUpdate = linkEnter.merge(link)
      linkUpdate
        .transition()
        .duration(this.duration)
        .attr('d', d => {
          return this.diagonal(d, d.parent)
        })

      // Transition exiting nodes to the parent's new position.
      link
        .exit()
        .transition()
        .duration(this.duration)
        .attr('d', () => {
          let o = { x: source.x, y: source.y }
          return this.diagonal(o, o)
        })
        .remove()
      // Stash the old positions for transition.
      this.nodes.forEach(d => {
        d.x0 = d.x
        d.y0 = d.y
      })
    }
  }
}
</script>
<style>
.d3-tree circle {
  fill: #fff;
  stroke: #54a8ff;
  stroke-width: 2px;
}

.d3-tree .node text {
  font: 12px sans-serif;
}

.d3-tree .link {
  fill: none;
  stroke: #ccc;
  stroke-width: 2px;
}
</style>
<style scoped>
.width-100-percent {
  width: 100%;
  height: calc(100vh - 74px);
}
</style>
