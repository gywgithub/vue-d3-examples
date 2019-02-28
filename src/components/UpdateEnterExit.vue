<template>
  <div>
    <div class="update-enter">
      <h2>Update Enter</h2>
      <p>dog</p>
      <p>cat</p>
      <p>pig</p>
    </div>
    <div class="update-exit">
      <h2>Update Exit</h2>
      <p>horse</p>
      <p>ox</p>
      <p>lion</p>
      <p>deer</p>
    </div>
  </div>
</template>
<script>
import * as d3 from 'd3'
export default {
  mounted () {
    // update enter
    let dataset = [3, 6, 9, 12, 15]
    let p = d3.select('.update-enter')
      .selectAll('p')
    let update = p.data(dataset)
    let enter = update.enter()
    update.text(function (d, i) {
      return 'update: ' + d + ' ,index: ' + i
    })
    let pEnter = enter.append('p')
    pEnter.text(function (d, i) {
      return 'enter: ' + d + ' ,index: ' + i
    })

    // update exit
    let dataset2 = [3, 6]
    let p2 = d3.select('.update-exit')
      .selectAll('p')
    let update2 = p2.data(dataset2)
    let exit = update2.exit()
    update2.text(function (d, i) {
      return 'update: ' + d + ' ,index: ' + i
    })
    exit.text(function () {
      return 'exit'
    })

    // add data
    let addDataset = [...dataset, 18, 21]
    setTimeout(() => {
      enterDataset(addDataset)
    }, 2000)

    setTimeout(() => {
      let dataset = [...addDataset, 24, 27]
      enterDataset(dataset)
    }, 3500)

    function enterDataset (dataset) {
      d3.select('.update-enter')
        .selectAll('p')
        .data(dataset)
        .enter()
        .append('p')
        .text(function (d, i) {
          return 'add: ' + d + ' ,index: ' + i
        })
    }
  }
}
</script>
<style>
</style>
