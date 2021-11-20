<template>
  <div>
    <h2>Line Chart I</h2>
    <svg width="800" height="500"></svg>
  </div>
</template>
<script>
import * as d3 from 'd3'
import { howto, altplot } from '@d3/example-components'
export default {
  data () {
    return {}
  },
  async mounted () {
    // https://observablehq.com/@d3/line-chart
    console.log('mounted')
    console.log(d3)
    console.log(howto)
    console.log(altplot)
  }
}
</script>
<style scoped></style>
