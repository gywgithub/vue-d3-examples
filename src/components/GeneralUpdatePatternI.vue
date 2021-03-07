<template>
  <div>
    <h2>General Update Pattern I</h2>
    <svg width="960" height="500"></svg>
  </div>
</template>
<script>
import * as d3 from 'd3'
export default {
  data () {
    return {}
  },
  mounted () {
    let alphbet = 'abcdefghijklmnopqrstuvwxyz'.split('')
    let svg = d3.select('svg')
    // let width = +svg.attr('width')
    // let height = +svg.attr('height')
    // let g = svg.append('g').attr('transform', 'translate(32, ' + (height / 2) + ')')
    let g = svg.append('g').attr('transform', 'translate(20, 30)')

    function update (data) {
      // DATA JOIN
      // Join new data with old elements, if any.
      let text = g.selectAll('text')
        .data(data)

      // UPDATE
      // Join new data with old elements, if any.
      text.attr('class', 'update')

      // ENTTER
      // Create new elements as needed
      //
      // ENTER + UPDATE
      // After merging the entered elements with the update selection,
      // apply operations to both.
      text.enter().append('text')
        .attr('class', 'enter')
        .attr('x', function (d, i) { return i * 32 })
        .attr('dy', '.35em')
        .merge(text)
        .text(function (d) { return d })

      // EXIT
      // Remove old elements as needed.
      text.exit().remove()
    }

    // The initial display
    update(alphbet)

    // Grad a random sample of letters from the alphabet, in alphabetical order.
    d3.interval(function () {
      update(d3.shuffle(alphbet)
        .slice(0, Math.floor(Math.random() * 26))
        .sort())
    }, 1500)
  }
}
</script>
<style>
text {
  /* font: bold 48px monospace; */
}
.enter {
  fill: green;
}
.update {
  fill: #333;
}
</style>
