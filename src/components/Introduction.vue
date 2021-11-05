<template>
  <div class="container-width">
    <div>
      <!-- vue -->
      <img src="@/assets/img/vue-logo.svg" alt="vue-logo" class="img-size vue-logo" />
      <div class="text-align-center">
        <h1>The Progressive JavaScript Framework</h1>
        <p>Vuetify is a Vue UI Library with beautifully handcrafted Material Components. No design skills required — everything you need to create amazing applications is at your fingertips.</p>
        <a href="https://vuejs.org/index.html" target="_blank">What is vue.js</a><br />
      </div>
    </div>
    <div class="margin-top-40">
      <!-- d3 -->
      <img src="@/assets/img/d3.svg" alt="d3-logo" class="img-size d3-logo" />
      <div class="text-align-center">
        <h1>Data-Driven Documents</h1>
        <p>
          D3.js is a JavaScript library for manipulating documents based on data. D3 helps you bring data to life using HTML, SVG, and CSS. D3’s emphasis on web standards gives you the full capabilities
          of modern browsers without tying yourself to a proprietary framework, combining powerful visualization components and a data-driven approach to DOM manipulation.
        </p>
        <a href="https://d3js.org/" target="_blank">What is d3.js</a><br />
      </div>
    </div>
    <div class="margin-top-40 text-align-center">
      <!--  vuetify -->
      <img src="@/assets/img/vuetify-logo-light-atom.svg" alt="vuetify-logo" class="img-size vuetify-logo" />
      <h1>Material Design Framework</h1>
      <p>Vuetify is a Vue UI Library with beautifully handcrafted Material Components. No design skills required — everything you need to create amazing applications is at your fingertips.</p>
      <a href="https://vuetifyjs.com/en/introduction/why-vuetify/#what-is-vuetify3f" target="_blank">What is Vuetify</a><br /><br />
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  }
}
</script>
<style scoped>
.container-width {
  width: calc(100% - 280px);
  margin: 0 auto;
}
.img-size {
  width: 200px;
  height: 200px;
}
.margin-top-40 {
  margin-top: 40px;
}

.vuetify-logo, .vue-logo, .d3-logo {
  pointer-events: none;
}

.d3-logo {
  width: 180px;
  height: 180px;
}

.vuetify-logo {
  width: 220px;
  height: 220px;
}

@media (prefers-reduced-motion: no-preference) {
  .vuetify-logo {
    animation: vuetify-logo-spin infinite 16s linear;
  }
  .vue-logo {
    animation: 10s linear 0s infinite alternate move-vue-img;
  }
  .d3-logo {
    animation: 10s linear 0s infinite alternate move-d3-img;
  }
}

@keyframes vuetify-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes move-vue-img {
  from {
    margin-left: 0%;
  }

  to {
    margin-left: 80%;
  }
}
@keyframes move-d3-img {
  from {
    margin-left: 80%;
  }

  to {
    margin-left: 0%;
  }
}
</style>
