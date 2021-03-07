<template>
  <div>
    <div>
      <h2>Sample Static Tree</h2>
    </div>
    <svg
      ref="svg"
      :view-box.camel="viewbox"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      style="width: 80%; height: 80vh"
      class="container-border"
    >
      <g>
        <g v-for="(v, k) in nodes" :key="k" :cx="v.x" :cy="v.y" r="5">
          <path v-if="v.d" :d="v.d" fill="transparent" stroke="#8e8e8e" />
          <circle
            fill="#9cc9b3"
            fill-opacity="1"
            :cx="v.x"
            :cy="v.y"
            r="12"
            stroke="#9cc9b3"
            stroke-width="2"
          />
          <text
            :x="v.x"
            :y="v.y"
            style="cursor: pointer"
            fill="#656565"
            @click="textClick(v)"
          >
            {{ v.name }}
          </text>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'node',
  data () {
    return {
      treeData: null,
      svgWidth: 0,
      svgHeight: 0,
      rootX: 0,
      rootY: 0,
      nodes: []
    }
  },
  computed: {
    viewbox () {
      return '0 0 ' + this.svgWidth + ' ' + this.svgHeight
    }
  },
  mounted () {
    // 添加一个窗口监控方法, 修改 svg 宽高, https://blog.csdn.net/qq_25386583/article/details/77161478

    let clientWidth = document.body.clientWidth
    let clientHeight = document.body.clientHeight

    this.svgWidth = Math.floor(clientWidth * 0.6)
    this.svgHeight = clientHeight - 72
    this.treeData = {
      'name': 'Top Level',
      'children': [
        { 'name': 'Level 2: A' },
        {
          'name': 'Level 2: B',
          'children': [
            { 'name': 'Level 3: A' },
            { 'name': 'Level 3: B' }
            // ,
            // { 'name': 'Level 3: C' }
          ]
        },
        { 'name': 'Level 2: C' }
      ]
    }
    this.initTree(this.treeData)

    // 更新树效果
    setTimeout(() => {
      this.nodes = []
      this.treeData = {
        'name': 'Top Level',
        'children': [
          { 'name': 'Level 2: C' }
        ]
      }
      this.initTree(this.treeData)
    }, 5000)
  },
  methods: {
    initTree (data) {
      // 根节点坐标设置
      this.rootX = Math.floor(this.svgWidth * 0.5)
      this.rootY = Math.floor(this.svgHeight * 0.4)

      let dx = 0 // node X distance
      let dy = 150 // node Y distance
      let by = 100 // Y axis of Bezier coordinate

      // root node, 第一层
      let root = {}
      root.name = data.name
      root.value = data.value
      root.x = this.rootX
      root.y = this.rootY
      root.pv = 0 // parent node value
      root.px = 0 // parent node X
      root.py = 0 // parent node Y
      root.d = null //  d="M500 200 C 500 500, 100 500, 100 900"

      this.nodes.push(root)

      let self = this

      if (data.children && data.children.length > 0) {
        traverseNode(data.children, root, data.children.length)
      }

      function traverseNode (arr, parentNode, num) {
        let len = arr.length

        // distance 边距需要根据底层的节点个数去实时调整
        dx = self.svgWidth / num
        if (dx < 200) {
          dx = 200
        }
        let childrenArr = []
        let nodeNum = 0
        for (let i = 0; i < len; i++) {
          let obj = {}
          obj.name = arr[i].name
          obj.value = arr[i].value
          if (len > 1) {
            obj.x = i * dx + (dx * 0.5)
          } else {
            // 当前父节点下面只有一个节点, 子节点X坐标和父节点X坐标一致
            obj.x = parentNode.x
          }
          obj.y = Number(parentNode.y + dy)
          let d = 'M' + parentNode.x + ' ' + parentNode.y + ' C ' + parentNode.x + ' ' + Number(parentNode.y + by) + ', ' + obj.x + ' ' + Number(obj.y - by) + ', ' + obj.x + ' ' + obj.y
          obj.d = d
          self.nodes.push(obj)

          // 深度优先 !!!
          // if (arr[i].children && arr[i].children.length > 0) {
          //   traverseNode(arr[i].children, obj)
          // }

          // 广度优先 第一步 !!!
          if (arr[i].children && arr[i].children.length > 0) {
            nodeNum = nodeNum + arr[i].children.length
            let nodeObj = {
              arr: arr[i].children,
              node: obj
            }
            childrenArr = childrenArr.concat(nodeObj)
          }
        }
        // 广度优先 第二步 !!!
        for (let i = 0; i < childrenArr.length; i++) {
          traverseNode(childrenArr[i].arr, childrenArr[i].node, nodeNum)
        }
      }
    },
    textClick (value) {
      console.log(value) // eslint-disable-line
    }
  }
}
</script>

<style scoped>
</style>
