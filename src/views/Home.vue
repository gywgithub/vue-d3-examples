<template>
  <div class="main justify-center">
    <div class="flex-column margin-top-15vh">
      <div class="d-flex justify-center">
        <img src="../assets/img/vue.png" class="d-flex img-width" />
        <img src="../assets/img/d3.svg" class="d-flex img-width img-d3-padding" />
      </div>
      <div
        class="display-3 font-weight-regular span-margin"
      >Vue&nbsp;&nbsp;D3&nbsp;&nbsp;V5&nbsp;&nbsp;Examples</div>
      <div>
        <v-btn outlined large rounded color="primary" class="margin-0-15 z-index-2" @click="openTab"><v-icon left>mdi-github</v-icon>Github</v-btn>
        <v-btn outlined large rounded color="primary" class="margin-0-15 z-index-2" @click="routerRedirect"><v-icon left>mdi-palm-tree</v-icon>Examples</v-btn>
      </div>
    </div>
    <v-btn fixed icon bottom right @click="changeTheme" class="z-index-2">
      <v-icon v-if="!dark">mdi-brightness-7</v-icon>
      <v-icon v-else>mdi-brightness-4</v-icon>
    </v-btn>
  </div>
</template>
<script>
export default {
  name: 'Home',
  data () {
    return {
      dark: false
    }
  },
  created () {
    if (localStorage.getItem('themeDark') && localStorage.getItem('themeDark') === 'true') {
      this.$vuetify.theme.dark = true
      this.dark = true
    }
  },
  methods: {
    openTab () {
      window.open('https://github.com/gywgithub/vue-d3-examples', '_blank')
    },
    routerRedirect () {
      this.$router.push('/examples')
    },
    changeTheme () {
      this.dark = !this.dark
      localStorage.setItem('themeDark', String(this.dark))
      this.$vuetify.theme.dark = this.dark
    }
  }
}
</script>
<style scoped>
.main {
  text-align: center;
}
.margin-top-15vh {
  margin-top: 15vh;
}

.img-width {
  width: 12% !important;
  margin: 0 35px;
}

.img-d3-padding {
  padding: 10px;
}

.span-margin {
  margin: 20px 0 40px 0;
}

.margin-0-15 {
  margin: 0 15px;
}

.z-index-2 {
  z-index: 2;
}
</style>
