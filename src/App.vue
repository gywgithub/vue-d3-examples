<template>
  <div id="app">
    <v-app>
      <router-view />
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
</style>
