<template>
  <div>
    <h2>Line Chart I</h2>
    <!-- <div id=""></div> -->
    <svg width="600" height="600"></svg>
  </div>
</template>
<script>
import * as d3 from 'd3'
export default {
  data () {
    return {}
  },
  mounted () {
    console.log('---')
    console.log(d3)
    const svg = d3.select('svg')
    console.log(svg)
  }
}
</script>
<style scoped>
</style>
