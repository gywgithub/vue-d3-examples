<template>
  <div id="app">
    <v-app>
      <router-view class="view-position" />
      <vue-particles color="#409eff" class="particles-position" :lineOpacity="0.5" :clickEffect="false" :particlesNumber="60" :particleSize="3"></vue-particles>
    </v-app>
  </div>
</template>
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

.view-position {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
}

.particles-position {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
