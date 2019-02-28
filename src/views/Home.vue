<template>
  <div class="main">
    <div class="left">
      <div class="img-container">
        <img src="../assets/img/logo.png" class="logo-img">
        <img src="../assets/img/d3.svg" class="logo-img">
      </div>
      <h2>Vue D3 Example</h2>
      <ul>
        <li v-for="(item, key) in examples" :key="key" @click="change(item.value, $event)">{{item.label}}</li>
      </ul>
    </div>
    <div class="right">
      <keep-alive>
        <component v-bind:is="componentName"></component>
      </keep-alive>
    </div>
  </div>
</template>
<script>
import HelloWorld from '../components/HelloWorld'
import ModifyingAForceLayout from '../components/ModifyingAForceLayout'
import ModifyingAForceLayoutII from '../components/ModifyingAForceLayoutII'
import ModifyingAForceLayoutIII from '../components/ModifyingAForceLayoutIII'
import GeneralUpdatePatternI from '../components/GeneralUpdatePatternI'
import SelectElementAndBindData from '../components/SelectElementAndBindData'
import UpdateEnterExit from '../components/UpdateEnterExit'
import SelectInsertRemove from '../components/SelectInsertRemove'
import SimpleBarChart from '../components/SimpleBarChart'
import Scale from '../components/Scale'
import Axis from '../components/Axis'
import CompleteHistogram from '../components/CompleteHistogram'
import CompleteHistogramII from '../components/CompleteHistogramII'
import CompleteHistogramIII from '../components/CompleteHistogramIII'
import ForceDirectedGraph from '../components/ForceDirectedGraph'
import BarChartI from '../components/BarChartI'
import BarChartII from '../components/BarChartII'
import Zoomable from '../components/Zoomable'
import ZoomableAddText from '../components/ZoomableAddText'
import ForceBasedLabelPlacement from '../components/ForceBasedLabelPlacement'
import ForceBasedLabelPlacementII from '../components/ForceBasedLabelPlacementII'
export default {
  data () {
    return {
      examples: [
        { 'label': 'HelloWorld', 'value': 'HelloWorld' },
        { 'label': 'Modifying a Force Layout', 'value': 'ModifyingAForceLayout' },
        { 'label': 'Modifying a Force Layout II', 'value': 'ModifyingAForceLayoutII' },
        { 'label': 'Modifying a Force Layout III', 'value': 'ModifyingAForceLayoutIII' },
        { 'label': 'General Update Pattern I', 'value': 'GeneralUpdatePatternI' },
        { 'label': 'SelectElementAndBindData', 'value': 'SelectElementAndBindData' },
        { 'label': 'UpdateEnterExit', 'value': 'UpdateEnterExit' },
        { 'label': 'SelectInsertRemove', 'value': 'SelectInsertRemove' },
        { 'label': 'SimpleBarChart', 'value': 'SimpleBarChart' },
        { 'label': 'Scale', 'value': 'Scale' },
        { 'label': 'Axis', 'value': 'Axis' },
        { 'label': 'CompleteHistogram', 'value': 'CompleteHistogram' },
        { 'label': 'CompleteHistogramII', 'value': 'CompleteHistogramII' },
        { 'label': 'CompleteHistogramIII', 'value': 'CompleteHistogramIII' },
        { 'label': 'ForceDirectedGraph', 'value': 'ForceDirectedGraph' },
        { 'label': 'Bar Chart I', 'value': 'BarChartI' },
        { 'label': 'Bar Chart II', 'value': 'BarChartII' },
        { 'label': 'Zoomable', 'value': 'Zoomable' },
        { 'label': 'Zoomable Add Text', 'value': 'ZoomableAddText' },
        { 'label': 'Force-based label placement', 'value': 'ForceBasedLabelPlacement' },
        { 'label': 'Force-based label placement II', 'value': 'ForceBasedLabelPlacementII' }
      ],
      componentName: 'HelloWorld'
    }
  },
  mounted () {
    document.getElementsByTagName('li')[0].classList.add('selected')
  },
  methods: {
    change (path, event) {
      this.componentName = path
      let el = event.target
      let nodeList = document.getElementsByTagName('li')
      for (const iterator of nodeList) {
        iterator.classList.remove('selected')
      }
      el.classList.add('selected')
    }
  },
  components: {
    HelloWorld,
    ModifyingAForceLayout,
    ModifyingAForceLayoutII,
    ModifyingAForceLayoutIII,
    GeneralUpdatePatternI,
    SelectElementAndBindData,
    UpdateEnterExit,
    SelectInsertRemove,
    SimpleBarChart,
    Scale,
    Axis,
    CompleteHistogram,
    CompleteHistogramII,
    CompleteHistogramIII,
    ForceDirectedGraph,
    BarChartI,
    BarChartII,
    Zoomable,
    ZoomableAddText,
    ForceBasedLabelPlacement,
    ForceBasedLabelPlacementII
  }
}
</script>
<style scoped>
.main {
  display: flex;
}
.left {
  width: 300px;
  height: 100vh;
  box-shadow: 1px 0 5px #ccc;
}
.right {
  width: calc(100% - 300px);
  height: 100vh;
}
.img-container {
  display: flex;
  padding: 0 20px;
}
.logo-img {
  width: 45%;
  object-fit: contain;
  margin: 0 10px;
}
ul {
  padding: 0;
  margin: 0;
  border-top: 1px solid #eee;
  height: calc(100vh - 270px);
  overflow: auto;
}
li {
  cursor: pointer;
  border-bottom: 1px solid #eee;
  list-style: none;
  line-height: 48px;
}
li:hover {
  color: #0080ff;
  background-color: #f4f9ff;
}
li:active {
  background-color: #eee;
}
.selected {
  color: #0080ff;
  font-weight: 700;
}
</style>
