<template>
  <div id="app">
    <v-app  v-scroll:#scroll-target="onScroll">
      <router-view />
    </v-app>
  </div>
</template>
<script>
export default {
  data () {
    return {
      hidden: false,
      offsetTop: 0
    }
  },
  mounted () {
    console.log('Introduction')
  },
  methods: {
    scrollTop () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    onScroll (e) {
      this.offsetTop = e.target.scrollTop
      console.log(this.offsetTop)
    }
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html,
body,
#app {
  padding: 0 0;
  margin: 0 0;
}

.main {
  height: 100vh;
}

.cursor-pointer {
  cursor: pointer;
}

.text-align-center {
  text-align: center;
}

.text-align-left {
  text-align: left;
}

.container-border {
  border: 1px solid #eee;
}
</style>
