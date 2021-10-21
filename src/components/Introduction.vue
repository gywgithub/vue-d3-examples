<template>
  <div class="container-width text-align-center">
    <div>
      <!-- vue -->
      <img src="@/assets/img/vue-logo.svg" alt="vue-logo" class="img-size" />
      <h1>The Progressive JavaScript Framework</h1>
      <p>Vuetify is a Vue UI Library with beautifully handcrafted Material Components. No design skills required — everything you need to create amazing applications is at your fingertips.</p>
      <a href="https://vuejs.org/index.html" target="_blank">What is vue.js</a><br /><br />
    </div>
    <div class="margin-top-50">
      <!-- d3 -->
      <img src="@/assets/img/d3.svg" alt="d3-logo" class="img-size" />
      <h1>Data-Driven Documents</h1>
      <p>
        D3.js is a JavaScript library for manipulating documents based on data. D3 helps you bring data to life using HTML, SVG, and CSS. D3’s emphasis on web standards gives you the full capabilities
        of modern browsers without tying yourself to a proprietary framework, combining powerful visualization components and a data-driven approach to DOM manipulation.
      </p>
      <a href="https://d3js.org/" target="_blank">What is d3.js</a><br /><br />
    </div>
    <div class="margin-top-50">
      <!--  vuetify -->
      <img src="@/assets/img/vuetify-logo-light-atom.svg" alt="vuetify-logo" class="img-size" />
      <h1>Material Design Framework</h1>
      <p>Vuetify is a Vue UI Library with beautifully handcrafted Material Components. No design skills required — everything you need to create amazing applications is at your fingertips.</p>
      <a href="https://vuetifyjs.com/en/introduction/why-vuetify/#what-is-vuetify3f" target="_blank">What is Vuetify</a><br /><br />
    </div>
    <v-fab-transition>
      <v-btn v-show="!hidden" color="primary" dark fixed bottom right fab @click="scrollTop">
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
    </v-fab-transition>
  </div>
</template>
<script>
export default {
  data () {
    return {
      hidden: false
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
    }
  }
}
</script>
<style scoped>
.container-width {
  width: calc(100% - 280px);
}
.img-size {
  width: 300px;
  height: 300px;
}
.margin-top-50 {
  margin-top: 50px;
}
</style>
