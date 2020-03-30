<template>
  <div>
    <div class="img-container">
      <img src="../assets/img/vue.png" class="logo-img" />
      <img src="../assets/img/d3.svg" class="logo-img width-30-percent" />
    </div>
    <span>Vue&nbsp;&nbsp;D3&nbsp;&nbsp;V5&nbsp;&nbsp;Examples</span>
    <p class="margin-top-5-percent">
      <a href="https://github.com/gywgithub/vue-d3-examples" target="_blank">Github</a>
      <router-link to="/Examples">Examples</router-link>
      <router-link to="/NextBranch">Next Branch</router-link>
    </p>
  </div>
</template>
<style scoped>
.img-container {
  display: flex;
  padding: 0 20px;
  margin: auto;
  width: 400px;
  margin-top: 6%;
  margin-bottom: 2%;
}
.logo-img {
  object-fit: contain;
  width: 140px;
  height: 140px;
  margin: 0 25px;
}
.width-30-percent {
  width: 34%;
}
span {
  font-size: 50px;
}
a {
  color: #448aff;
  text-decoration: none;
  font-size: 1.05rem;
  border: 1px solid #448aff;
  border-radius: 2rem;
  box-sizing: border-box;
  font-size: 1.05rem;
  letter-spacing: 0.1rem;
  margin: 0.5rem 1rem;
  padding: 0.75em 2rem;
}
a:hover {
  color: #000;
}
.margin-top-5-percent {
  margin-top: 5%;
}
</style>
