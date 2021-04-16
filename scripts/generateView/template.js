// template.js
module.exports = {
  vueTemplate: compoenntName => {
    return `<template>
  <div class="${compoenntName}">
    ${compoenntName}组件
  </div>
</template>
<script>
export default {
  name: '${compoenntName}',
  data () {
    return {}
  },
  methods: {}
}
</script>
<style lang="scss" scoped>

</style>
`
  }
}
