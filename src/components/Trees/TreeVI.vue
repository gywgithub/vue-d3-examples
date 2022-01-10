<template>
  <div>
    <svg class="d3-tree-vi width-100-percent container-border" />
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
    let data = {
      'name': 'flare',
      'value': 1,
      'children': [{
        'name': 'util',
        'value': 23,
        'children': [
          {
            'name': 'ssdf',
            'value': 104993
          },
          {
            'name': 'Geometry',
            'value': 13033
          },
          {
            'name': 'heap',
            'value': 24,
            'children': [
              {
                'name': 'FibonacciHeap',
                'value': 9354
              },
              {
                'name': 'FibonacciHeap2',
                'value': 66
              },
              {
                'name': 'FibonacciHeap3',
                'value': 767,
                'children': [
                  {
                    'name': '333FibonacciHeap',
                    'value': 93541
                  },
                  {
                    'name': '22FibonacciHeap2',
                    'value': 662
                  },
                  {
                    'name': '1FibonacciHeap3',
                    'value': 7673
                  }
                ]
              }
            ]
          },
          {
            'name': 'math',
            'value': 49
          }
        ]
      },
      {
        'name': 'vis',
        'value': 38,
        'children': [{
          'name': 'Visualization',
          'value': 16540
        }]
      }]
    }

    let clientWidth = document.body.clientWidth
    let clientHeight = document.body.clientHeight
    this.width = Math.floor(clientWidth * 0.6)
    this.height = clientHeight - 72
    console.log('width: ' + this.width + ' height: ' + this.height) // eslint-disable-line

    let margin = ({ top: 10, right: 120, bottom: 10, left: 100 })

    let width = this.width

    let dy = width / 4
    let dx = 30

    let tree = d3.tree().nodeSize([dx, dy])
    let diagonal = d3.linkHorizontal().x(d => d.y).y(d => d.x)

    const root = d3.hierarchy(data)

    root.x0 = 0
    root.y0 = 0
    root.descendants().forEach((d, i) => {
      d.id = i
      d._children = d.children
      if (d.depth && d.data.name.length !== 4) d.children = null
    })

    let svg = d3
      .select('svg.d3-tree-vi')
      .attr('viewBox', [-margin.left, -margin.top, width, dx])

    const gLink = svg.append('g')
      .attr('fill', 'none')
      .attr('stroke', '#555')
      .attr('stroke-opacity', 0.4)
      .attr('stroke-width', 1.5)

    const gNode = svg.append('g')
      .attr('cursor', 'pointer')
      .attr('pointer-events', 'all')

    // ****************  zoom ************************
    // add zoom capabilities
    let zoomHandler = d3.zoom()
      .on('zoom', zoomActions)
      .scaleExtent([1 / 2, 8])

    svg.call(zoomHandler).on('dblclick.zoom', null)
    zoomHandler(svg)

    // Zoom functions
    function zoomActions () {
      gNode.attr('transform', d3.event.transform)
      gLink.attr('transform', d3.event.transform)
    }
    // ***********************************************

    function update (source) {
      const duration = d3.event && d3.event.altKey ? 2500 : 250
      const nodes = root.descendants().reverse()
      const links = root.links()

      // Compute the new tree layout.
      tree(root)

      // console.log('root ', root)

      let left = root
      let right = root
      root.eachBefore(node => {
        if (node.x < left.x) left = node
        if (node.x > right.x) right = node
      })

      const height = right.x - left.x + margin.top + margin.bottom

      const transition = svg.transition()
        .duration(duration)
        .attr('viewBox', [-margin.left, left.x - margin.top, width, height])
        // .attr('viewBox', [-240, 0, 846, 10])
        .tween('resize', window.ResizeObserver ? null : () => () => svg.dispatch('toggle'))

      // Update the nodes…
      const node = gNode.selectAll('g')
        .data(nodes, d => d.id)

      // Enter any new nodes at the parent's previous position.
      const nodeEnter = node.enter().append('g')
        .attr('transform', () => `translate(${source.y0},${source.x0})`)
        .attr('fill-opacity', 0)
        .attr('stroke-opacity', 0)
        .on('click', d => {
          d.children = d.children ? null : d._children
          update(d)
        })

      nodeEnter.append('circle')
      // .attr('class', 'node')
      // .attr('r', 1e-6)
      // .style('fill', function (d) {
      //   return d._children ? '#c9e4ff' : '#fff'
      // })

        .attr('r', 10)
        .attr('fill', d => d._children ? '#c9e4ff' : '#fff')
        //  .style('fill', function (d) {
        //           return d._children ? '#c9e4ff' : '#fff'
        //         })
        .attr('stroke-width', 2)
        .attr('stroke', '#c9e4ff')

      nodeEnter.append('text')
        .attr('dy', '0.31em')
        // .attr('x', d => d._children ? -6 : 6)
        .attr('x', d => d._children ? -14 : 14)
        .attr('text-anchor', d => d._children ? 'end' : 'start')
        .text(d => d.data.name)
        .clone(true).lower()
        .attr('stroke-linejoin', 'round')
        .attr('stroke-width', 3)
        .attr('stroke', 'white')

      // Transition nodes to their new position.
      const nodeUpdate = node.merge(nodeEnter).transition(transition)
        .attr('transform', d => `translate(${d.y},${d.x})`)
        // .attr('r', 10)
        // .style('fill', function (d) {
        //   return d._children ? '#c9e4ff' : '#fff'
        // })
        // .attr('cursor', 'pointer')
        .attr('fill-opacity', 1)
        .attr('stroke-opacity', 1)
      console.log(nodeUpdate) // eslint-disable-line

      // Transition exiting nodes to the parent's new position.
      const nodeExit = node.exit().transition(transition).remove()
        .attr('transform', () => `translate(${source.y},${source.x})`)
        .attr('fill-opacity', 0)
        .attr('stroke-opacity', 0)

      console.log(nodeExit) // eslint-disable-line

      // Update the links…
      const link = gLink.selectAll('path')
        .data(links, d => d.target.id)

      // Enter any new links at the parent's previous position.
      const linkEnter = link.enter().append('path')
        .attr('d', () => {
          const o = { x: source.x0, y: source.y0 }
          return diagonal({ source: o, target: o })
        })

      // Transition links to their new position.
      link.merge(linkEnter).transition(transition)
        .attr('d', diagonal)

      // Transition exiting nodes to the parent's new position.
      link.exit().transition(transition).remove()
        .attr('d', () => {
          const o = { x: source.x, y: source.y }
          return diagonal({ source: o, target: o })
        })

      // Stash the old positions for transition.
      root.eachBefore(d => {
        d.x0 = d.x
        d.y0 = d.y
      })
    }

    update(root)
  }
}
</script>
<style scoped>
.width-100-percent {
  width: 100%;
  height: 100vh;
}
</style>
