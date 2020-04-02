<template>
  <div>
    <h2>D3 Hello World</h2>
    <p></p>
    <p></p>
    <h2>D3 Example Address</h2>
    <div>
      <a target="_blank" href="http://bl.ocks.org/tgk/6068367">Add and remove nodes</a>
    </div>
    <div>
      <a target="_blank" href="https://bl.ocks.org/adamfeuer/042bfa0dde0059e2b288">d3js Tree Editor</a>
    </div>
  </div>
</template>
<script>
import * as d3 from 'd3'
export default {
  mounted () {
    let p = d3.select('body')
      .selectAll('p')

    p.text('Hello World')
  }
}
</script>
<style>
</style>
