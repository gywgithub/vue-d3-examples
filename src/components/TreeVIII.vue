<template>
  <div>
    <v-card class="card-container">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" :disabled="buttonDisabled" @click="addNode">
            <v-icon>mdi-playlist-plus</v-icon>
          </v-btn>
        </template>
        <span>新增节点</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" :disabled="buttonDisabled" @click="deleteNode">
            <v-icon>mdi-delete-outline</v-icon>
          </v-btn>
        </template>
        <span>删除节点</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" :disabled="buttonDisabled" @click="editNode">
            <v-icon>mdi-square-edit-outline</v-icon>
          </v-btn>
        </template>
        <span>编辑节点</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click="showDetails = !showDetails">
            <v-icon v-show="showDetails">mdi-eye-outline</v-icon>
            <v-icon v-show="!showDetails">mdi-eye-off-outline</v-icon>
          </v-btn>
        </template>
        <span v-show="!showDetails">显示详情</span>
        <span v-show="showDetails">关闭详情</span>
      </v-tooltip>
    </v-card>
    <!-- <v-toolbar dense>
      <v-toolbar-title>Toolbars</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" :disabled="buttonDisabled" @click="addNode">
            <v-icon>mdi-playlist-plus</v-icon>
          </v-btn>
        </template>
        <span>新增节点</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" :disabled="buttonDisabled" @click="deleteNode">
            <v-icon>mdi-delete-outline</v-icon>
          </v-btn>
        </template>
        <span>删除节点</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" :disabled="buttonDisabled" @click="editNode">
            <v-icon>mdi-square-edit-outline</v-icon>
          </v-btn>
        </template>
        <span>编辑节点</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click="showDetails = !showDetails">
            <v-icon v-show="showDetails">mdi-eye-outline</v-icon>
            <v-icon v-show="!showDetails">mdi-eye-off-outline</v-icon>
          </v-btn>
        </template>
        <span v-show="!showDetails">显示详情</span>
        <span v-show="showDetails">关闭详情</span>
      </v-tooltip>
    </v-toolbar> -->
    <svg class="d3-tree width-100-percent">
      <g class="container" />
    </svg>
    <v-card v-show="showDetails" class="drawer-container">
      <div class="text-align-left margin-top-10">
        节点ID: &nbsp; {{ nodeId }} &nbsp;&nbsp;&nbsp;&nbsp; 节点名称: &nbsp;
        {{ nodeName }}
      </div>
      <div>
        <v-text-field label="新增(编辑)节点名称" outlined maxlength="50" dense v-model="newNodeName" class="text-height"></v-text-field>
      </div>
    </v-card>
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title class="headline">提示</v-card-title>
        <v-card-text class="subtitle-1 text-align-left">确定要删除节点吗? </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">取消</v-btn>
          <v-btn color="red" text @click="deleteNodeData()">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'TreeVIII',
  data() {
    return {
      showDetails: false,
      nodeId: '1',
      nodeName: 'flare',
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
      NodeObj: null,
      newNodeName: '',
      rootNodeId: null,
      buttonDisabled: false,
      dialog: false
    }
  },
  mounted() {
    let treeData = {
      name: 'flare',
      value: 1,
      children: [
        {
          name: 'util',
          value: 23,
          children: [
            {
              name: 'ssdf',
              value: 104993
            },
            {
              name: 'Geometry',
              value: 13033
            },
            {
              name: 'heap',
              value: 24,
              children: [
                {
                  name: 'FibonacciHeap',
                  value: 9354
                }
              ]
            },
            {
              name: 'math',
              value: 49
            }
          ]
        },
        {
          name: 'vis',
          value: 38,
          children: [
            {
              name: 'Visualization',
              value: 16540
            }
          ]
        }
      ]
    }
    this.rootNodeId = treeData.value
    this.initSvg(treeData)
  },
  computed: {
    treemap() {
      return d3.tree().nodeSize([26, 240])
    }
  },
  methods: {
    initSvg(treeData) {
      let clientWidth = document.body.clientWidth
      let clientHeight = document.body.clientHeight
      this.width = Math.floor(clientWidth * 0.6)
      this.height = clientHeight - 72

      let margin = { top: 10, right: 120, bottom: 10, left: 40 }
      let width = this.width
      let dx = 30

      this.NodeObj = d3.hierarchy.prototype.constructor
      this.svg = d3.select('svg.d3-tree').attr('viewBox', [-margin.left, -margin.top, width, dx])

      const transform = d3.zoomIdentity.translate(this.margin.left, this.margin.top).scale(1)
      this.container = this.svg.select('g.container')
      // init zoom behavior, which is both an object and function
      this.zoom = d3
        .zoom()
        .scaleExtent([1 / 4, 4])
        .on('zoom', function () {
          d3.select('g.container').attr('transform', d3.event.transform)
        })
      this.container.transition().duration(750).call(this.zoom.transform, transform)
      this.svg.call(this.zoom).on('dblclick.zoom', null)
      this.root = this.getRoot(treeData)
      this.update(this.root)
    },
    initDrawer() {
      console.log('init drawer')
      this.newNodeName = ''
      this.nodeId = ''
      this.nodeName = ''
      this.currentNode = null
    },
    addNode() {
      if (!this.newNodeName) {
        console.warn('新增节点名称不能为空')
        return false
      }
      if (!this.currentNode) {
        console.warn('请先选择一个节点')
        return false
      }

      let parent = this.currentNode
      const child = Object.assign(new this.NodeObj(), {
        parent,
        depth: parent.depth + 1
      }) // eslint-disable-line
      let value = parseInt(Math.random() * 9999, 10) + 1
      child.value = value
      child.data = {
        name: this.newNodeName,
        value: value
      }

      if (parent.children) parent.children.push(child)
      else parent.children = [child]

      this.nodes.push(child)
      this.links.push({ source: parent, target: child })

      this.update(parent)

      console.info('新增成功')
    },
    deleteNodeData() {
      this.dialog = false
      if (this.currentNode.parent && this.currentNode.parent.children.length > 0) {
        this.currentNode.parent.children.filter((item, i) => {
          if (item.data && item.data.value === this.currentNode.data.value) {
            this.currentNode.parent.children.splice(i, 1)
            if (this.currentNode.parent.children.length === 0) {
              delete this.currentNode.parent.children
            }
            this.update(this.currentNode)
            this.initDrawer()
          }
        })
      }
    },
    deleteNode() {
      if (!this.currentNode) {
        console.warn('请选择要删除的节点')
        return false
      }
      if (this.currentNode.data.value === this.rootNodeId) {
        console.warn('不能删除根节点')
        return false
      }
      this.dialog = true
    },
    editNode() {
      if (!this.currentNode) {
        console.warn('请选择要编辑的节点')
        return false
      }

      this.currentNode.data.name = this.newNodeName
      let parent = this.currentNode.parent
      this.update(parent)
    },
    async handleDrop(evt) {
      evt.preventDefault()
      if (evt.dataTransfer.files && evt.dataTransfer.files.length) {
        let file = evt.dataTransfer.files[0]
        console.log('file: ', file) // eslint-disable-line
      }
    },
    goBack() {
      if (this.$route.params.data) {
        if (this.$route.params.data.searchType === 'keyword') {
          this.$router
            .push({
              name: 'Search',
              params: { data: this.$route.params.data }
            })
            .catch((err) => {}) // eslint-disable-line
        } else if (this.$route.params.data.searchType === 'title') {
          this.$router
            .push({
              name: 'ArticleDetail',
              params: { data: this.$route.params.data }
            })
            .catch((err) => {}) // eslint-disable-line
        }
      } else {
        this.$router.push({ name: 'ArticleDetail' }).catch((err) => {}) // eslint-disable-line
      }
    },
    getRoot(treeData) {
      let root = d3.hierarchy(treeData, (d) => {
        return d.children
      })
      root.x0 = this.height / 2
      root.y0 = 0
      return root
    },
    dblclickNode(d) {
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
    clickNode(d) {
      this.currentNode = d
      this.nodeId = d.data.value
      this.nodeName = d.data.name
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
    diagonal(s, d) {
      return `M ${s.y} ${s.x}
              C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`
    },
    getNodesAndLinks() {
      this.dTreeData = this.treemap(this.root)
      this.nodes = this.dTreeData.descendants()
      this.links = this.dTreeData.descendants().slice(1)
    },

    // 数据与Dom进行绑定
    update(source) {
      console.log('update')
      this.getNodesAndLinks()
      // this.nodes.forEach(d => {
      //   d.y = d.depth * 18
      // })
      let node = this.container.selectAll('g.node').data(this.nodes, (d) => {
        return d.id || (d.id = ++this.index)
      })
      // Enter any new sources at the parent's previous position.
      let nodeEnter = node
        .enter()
        .append('g')
        .attr('class', 'node')
        // .on('dblclick', this.dblclickNode)
        .attr('transform', (d) => {
          return 'translate(' + source.y0 + ',' + source.x0 + ')'
        })
        .on('click', this.clickNode)

      console.log('---: ', node.enter().selectAll('circle'))

      // Add circle for the nodes
      nodeEnter
        .append('circle')
        .attr('class', 'node')
        .attr('r', 1e-6)
        .style('fill', function (d) {
          return d._children ? '#c9e4ff' : '#fff'
        })
        .append('title')
        .text(function (d) {
          // add title
          return d.value
        })
        .on('click', function () {
          let self = this
          setTimeout(() => {
            d3.select(self)
              .transition()
              .delay(1)
              .style('fill', function () {
                return '#54a8ff'
              })
              .style('stroke-width', function () {
                return '3px'
              })
          }, 100)
        })

      nodeEnter
        .append('text')
        .attr('dy', '.35em')
        .attr('x', function (d) {
          return d.children || d._children ? -14 : 14
        })
        .attr('text-anchor', function (d) {
          return d.children || d._children ? 'end' : 'start'
        })
        .text(function (d) {
          return d.data.name.length > 20 ? d.data.name.substring(0, 20) + '...' : d.data.name
        })
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
      nodeUpdate
        .select('circle.node')
        .attr('r', 10)
        .style('fill', function (d) {
          return d._children ? 'lightsteelblue' : '#fff'
        })
        .style('stroke-width', function () {
          return '2px'
        })
        .attr('cursor', 'pointer')

      nodeUpdate.select('text').style('fill-opacity', 1)

      console.log('node: ', node)

      // update the text
      node
        .select('text')
        .attr('dy', '.35em')
        .attr('x', function (d) {
          return d.children || d._children ? -14 : 14
        })
        .attr('text-anchor', function (d) {
          return d.children || d._children ? 'end' : 'start'
        })
        .text(function (d) {
          return d.data.name.length > 20 ? d.data.name.substring(0, 20) + '...' : d.data.name
        })

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
      let link = this.container.selectAll('path.link').data(this.links, (d) => {
        return d.id
      })

      // Enter any new links at the parent's previous position.
      let linkEnter = link
        .enter()
        .insert('path', 'g')
        .attr('class', 'link')
        .attr('d', (d) => {
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
        .attr('d', (d) => {
          return this.diagonal(d, d.parent)
        })

      // Transition exiting nodes to the parent's new position.
      link
        .exit()
        .transition()
        .duration(this.duration)
        .attr('d', (d) => {
          let o = { x: source.x, y: source.y }
          return this.diagonal(o, o)
        })
        .remove()
      // Stash the old positions for transition.
      this.nodes.forEach((d) => {
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
.card-container {
  padding: 4px;
  text-align: right;
}

.display-flex {
  display: flex;
}

.width-100-percent {
  width: 100%;
  height: calc(100vh - 74px);
}

.drawer-container {
  width: 400px;
  position: fixed;
  top: 130px !important;
  right: 14px !important;
  right: 0;
  z-index: 99;
  padding: 10px;
}

.margin-top-10 {
  margin-top: 10px;
}

.text-height {
  height: 48px;
  margin-top: 20px;
}
</style>
