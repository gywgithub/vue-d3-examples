<template>
  <div>
    <h2>TreeIII</h2>
    <div>tree editor with node create, delete, and rename</div>
    <div class="container container-border">
      <div class="width-300">
        Current Node
        <br />
        <br />
        Id: {{currentNode.id}}
        <br />
        <br />
        Name: {{currentNode.data.name}}
      </div>
      <div class="width-300">
        New Node
        <br />
        <br />Name:
        <!-- <input type="text" v-model="newNode.name" /> -->
        <v-text-field
          v-model="newNode.name"
          label="New node name"
        ></v-text-field>
      </div>
      <div class="width-300">
        <v-btn small color="primary" @click="addNode">Add Node</v-btn>
        <br />
        <br />
        <v-btn small color="success" @click="addSomeNodes">Add Some Nodes</v-btn>
        <br />
        <br />
        <v-btn small color="secondary" @click="renameNode">Rename Node</v-btn>
        <br />
        <br />
        <v-btn small color="error" @click="deleteNode">Delete Node</v-btn>
      </div>
    </div>
    <svg id="vizTreeIII" class="container-border" />
  </div>
</template>
<script>
import * as d3 from 'd3'
export default {
  data () {
    return {
      root: null,
      svg: null,
      duration: null,
      treeData: {
        'name': 'Top Level'
        // 'children': [
        //   {
        //     'name': 'Level 2: A',
        //     'children': [
        //       { 'name': 'Son of A' },
        //       { 'name': 'Daughter of A' }
        //     ]
        //   },
        //   { 'name': 'Level 2: B' }
        // ]
      },
      i: null,
      treemap: null,
      currentNode: {
        id: null,
        data: { name: '' }
      },
      newNode: {
        id: 0,
        name: ''
      },
      nodeObj: null
    }
  },
  mounted () {
    // Set the dimensions and margins of the diagram
    var margin = { top: -200, right: 90, bottom: 30, left: 90 }
    var width = 960 - margin.left - margin.right
    var height = 500 - margin.top - margin.bottom

    // append the svg object to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    // var svg = d3.select('#viz').attr("viewBox', [-10, -10, width, height])
    // var svg = d3.select('body').append('svg')
    //   .attr('width', width + margin.right + margin.left)
    //   .attr('height', height + margin.top + margin.bottom)
    this.svg = d3.select('#vizTreeIII')
      .attr('viewBox', [-10, -10, width, height])
      .append('g')
      .attr('transform', 'translate(' +
        margin.left + ',' + margin.top + ')')

    this.nodeObj = d3.hierarchy.prototype.constructor
    this.i = 0
    // this.root = null
    this.duration = 750

    // declares a tree layout and assigns the size
    this.treemap = d3.tree().size([height, width])

    // Assigns parent, children, height, depth
    this.root = d3.hierarchy(this.treeData, function (d) { return d.children })
    this.root.x0 = height / 2
    this.root.y0 = 0

    // Collapse after the second level
    // root.children.forEach(collapse)

    // ****************  zoom ************************
    // add zoom capabilities
    let zoomHandler = d3.zoom()
      .on('zoom', zoomActions)
      .scaleExtent([1 / 2, 8])

    this.svg.call(zoomHandler).on('dblclick.zoom', null)
    zoomHandler(this.svg)

    // Zoom functions
    function zoomActions () {
      // gNode.attr('transform', d3.event.transform)
      // gLink.attr('transform', d3.event.transform)
    }
    // ***********************************************

    this.update(this.root)
  },
  methods: {
    addSomeNodes () {
      console.log('add some nodes') // eslint-disable-line
      let addData = {
        'name': 'addFibonacciHeap3',
        'id': 1767,
        'children': [
          {
            'name': 'add333FibonacciHeap',
            'id': 1,
            'children': [
              {
                'name': '335fff',
                'id': 4,
                'children': [
                  {
                    'name': '666',
                    'id': 6
                  },
                  {
                    'name': '777',
                    'id': 7,
                    'children': [
                      {
                        'name': '9',
                        'id': 9
                      },
                      {
                        'name': '10',
                        'id': 10
                      },
                      {
                        'name': '1111',
                        'id': 11
                      }
                    ]
                  },
                  {
                    'name': '888',
                    'id': 8,
                    'children': [
                      {
                        'name': '12',
                        'id': '12'
                      }
                    ]
                  }
                ]
              },
              {
                'name': 'vxfff',
                'id': 5
              }
            ]
          },
          {
            'name': 'add22FibonacciHeap2',
            'id': 2
          },
          {
            'name': 'add1FibonacciHeap3',
            'id': 3
          }
        ]
      }

      let arr = []

      cycleData(addData)

      function cycleData (obj) {
        arr.push({
          id: obj.id,
          name: obj.name
        })
        if (obj.children && obj.children.length > 0) {
          let len = obj.children.length
          for (let i = 0; i < len; i++) {
            cycleData(obj.children[i])
          }
        }
      }

      var self = this

      addN(addData, this.currentNode)

      function addN (node, parent) {
        let nodeObj = d3.hierarchy.prototype.constructor
        let child = Object.assign(new nodeObj, { parent, depth: parent.depth + 1 }) // eslint-disable-line
        child.id = node.id
        child.data = {
          name: node.name
        }
        if (parent.children) parent.children.push(child)
        else parent.children = [child]

        self.nodes.push(child)
        self.links.push({ source: parent, target: child })

        self.update(parent)

        if (node.children && node.children.length > 0) {
          let len = node.children.length
          for (let i = 0; i < len; i++) {
            addN(node.children[i], child)
          }
        }
      }
    },
    addNode () {
      let min = 100
      let max = 999
      let id = parseInt(Math.random() * (max - min + 1) + min, 10)
      let parent = this.currentNode

      let child = Object.assign(new this.nodeObj, { parent, depth: parent.depth + 1 }) // eslint-disable-line
      child.id = id
      child.data = {
        name: this.newNode.name
      }
      if (parent.children) parent.children.push(child)
      else parent.children = [child]

      this.nodes.push(child)
      this.links.push({ source: parent, target: child })

      this.update(parent)
    },
    renameNode () {
      this.currentNode.data.name = this.newNode.name
      let parent = this.currentNode.parent
      this.update(parent)
    },
    deleteNode () {
      let self = this
      if (this.currentNode.parent && this.currentNode.parent.children.length > 0) {
        this.currentNode.parent.children.filter((item, i) => {
          if (item.id && (item.id === self.currentNode.id)) {
            self.currentNode.parent.children.splice(i, 1)
            if (this.currentNode.parent.children.length === 0) {
              delete this.currentNode.parent.children
            }
            this.update(this.currentNode)
          }
        })
      } else {
        console.log('node is empty') // eslint-disable-line
      }
    },
    update (source) {
      let self = this
      // Assigns the x and y position for the nodes
      var treeMapData = this.treemap(this.root)

      // Compute the new tree layout.
      this.nodes = treeMapData.descendants()
      this.links = treeMapData.descendants().slice(1)

      // Normalize for fixed-depth.
      this.nodes.forEach(function (d) { d.y = d.depth * 180 })

      // ****************** Nodes section ***************************

      // Update the nodes...
      var node = this.svg.selectAll('g.node')
        .data(self.nodes, function (d) { return d.id || (d.id = ++self.i) })

      // Enter any new modes at the parent's previous position.
      var nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        .attr('transform', function () {
          return 'translate(' + source.y0 + ',' + source.x0 + ')'
        })
        .on('click', self.click)

      // Add Circle for the nodes
      nodeEnter.append('circle')
        .attr('class', 'node')
        .attr('r', 1e-6)
        .style('fill', function (d) {
          return d._children ? 'lightsteelblue' : '#fff'
        })

      // Add labels for the nodes
      nodeEnter.append('text')
        .attr('dy', '.35em')
        .attr('x', function (d) {
          return d.children || d._children ? -13 : 13
        })
        .attr('text-anchor', function (d) {
          return d.children || d._children ? 'end' : 'start'
        })
        .text(function (d) { return d.data.name })

      // UPDATE
      var nodeUpdate = nodeEnter.merge(node)

      // update the text
      node.select('text')
        .attr('dy', '.35em')
        .attr('x', function (d) {
          return d.children || d._children ? -13 : 13
        })
        .attr('text-anchor', function (d) {
          return d.children || d._children ? 'end' : 'start'
        })
        .text(function (d) { return d.data.name })

      // Transition to the proper position for the node
      nodeUpdate.transition()
        .duration(self.duration)
        .attr('transform', function (d) {
          return 'translate(' + d.y + ',' + d.x + ')'
        })

      // Update the node attributes and style
      nodeUpdate.select('circle.node')
        .attr('r', 10)
        .style('fill', function (d) {
          return d._children ? 'lightsteelblue' : '#fff'
        })
        .attr('cursor', 'pointer')

      // Remove any exiting nodes
      var nodeExit = node.exit().transition()
        .duration(self.duration)
        .attr('transform', function () {
          return 'translate(' + source.y + ',' + source.x + ')'
        })
        .remove()

      // On exit reduce the node circles size to 0
      nodeExit.select('circle')
        .attr('r', 1e-6)

      // On exit reduce the opacity of text labels
      nodeExit.select('text')
        .style('fill-opacity', 1e-6)

      // ****************** links section ***************************

      // Update the links...
      var link = this.svg.selectAll('path.link')
        .data(self.links, function (d) { return d.id })

      // Enter any new links at the parent's previous position.
      var linkEnter = link.enter().insert('path', 'g')
        .attr('class', 'link')
        .attr('d', function () {
          var o = { x: source.x0, y: source.y0 }
          return diagonal(o, o)
        })

      // UPDATE
      var linkUpdate = linkEnter.merge(link)

      // Transition back to the parent element position
      linkUpdate.transition()
        .duration(self.duration)
        .attr('d', function (d) { return diagonal(d, d.parent) })

      // Remove any exiting links
      link.exit().transition()
        .duration(self.duration)
        .attr('d', function () {
          var o = { x: source.x, y: source.y }
          return diagonal(o, o)
        })
        .remove()

      // Store the old positions for transition.
      this.nodes.forEach(function (d) {
        d.x0 = d.x
        d.y0 = d.y
      })

      // Creates a curved (diagonal) path from parent to the child nodes
      function diagonal (s, d) {
        let path = `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`
        return path
      }
    },
    // Toggle children on click.
    click (d) {
      this.currentNode = d
      if (d.children) {
        d._children = d.children
        d.children = null
      } else {
        d.children = d._children
        d._children = null
      }
      this.update(d)
    }
  }
}
</script>
<style>
#vizTreeIII circle {
  fill: #fff;
  stroke: steelblue;
  stroke-width: 3px;
}

#vizTreeIII .node text {
  font: 12px sans-serif;
}

#vizTreeIII .link {
  fill: none;
  stroke: #ccc;
  stroke-width: 2px;
}
</style>
<style scoped>
.container {
  display: flex;
  margin: 10px 0;
  text-align: left;
  width: 100%;
}
.width-300 {
  width: 300px;
  margin: 0 10px;
}
</style>
