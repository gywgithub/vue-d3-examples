<template>
  <div class="container-svg">
    <h2>Select Insert Remove</h2>
    <p>dog</p>
    <p class="pig">pig</p>
    <p id="cat">cat</p>
    <p>rat</p>
  </div>
</template>
<script>
import * as d3 from 'd3'
export default {
  data () {
    return {}
  },
  mounted () {
    // let p = d3.select('.container-svg')
    //   .select('p')

    // let p = d3.select('.container-svg')
    //   .selectAll('p')
    // p.style('color', 'red')

    // let p = d3.select('.container-svg')
    //   .selectAll('.pig')
    // p.style('color', 'blue')

    // let p = d3.select('.container-svg')
    //   .selectAll('#cat')
    // p.style('color', 'yellow')

    // let dataset = [3, 6, 9, 12]
    // let p = d3.select('.container-svg')
    //   .selectAll('p')
    //   .data(dataset)
    //   .text(function (d, i) {
    //     if (i === 3) {
    //       d3.select(this).style('color', 'red')
    //     }
    //     return d
    //   })

    // let p = d3.select('.container-svg')
    //   .append('p')
    //   .text('another animal')
    //   .style('color', 'red')

    // let p = d3.select('.container-svg')
    //   .insert('p', '.pig')
    //   .text('insert an animal')
    //   .style('color', 'red')

    d3.select('.container-svg')
      .select('.pig')
      .remove()
  }
}
</script>
<style scoped>
</style>
