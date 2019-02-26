<template>
  <div>
    <h2>D3 Hello World</h2>
    <p></p>
    <p></p>
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
