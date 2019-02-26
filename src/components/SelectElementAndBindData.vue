<template>
  <div>
    <h2>Select Element And Bind Data</h2>
    <p>dog</p>
    <p>cat</p>
    <p>pig</p>
  </div>
</template>
<script>
import * as d3 from 'd3'
export default {
  mounted () {
    let p = d3.select('body')
      .selectAll('p')

    // // datum bind string
    // let str = 'is an animal'

    // p.datum(str)
    //   .text(function (d, i) {
    //     return '第 ' + i + ' 个元素 ' + d
    //   })

    // data bind array
    let dataset = ['so cute', 'cute', 'fat']
    p.data(dataset)
      .text(function (d, i) {
        return '第 ' + i + ' 个元素 ' + d
      })
  }
}
</script>
<style>
</style>
