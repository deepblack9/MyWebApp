<style scoped>
  #mainbody{ margin: 0; padding: 0;}
</style>

<template>
  <div class="row" id="mainbody">
    <main-sidebar class="col-md-2" :width="160"></main-sidebar>
    <main-content class="col-md-12" :height="height" :width="width - 160"></main-content>
    <slot></slot>
  </div>
</template>

<script>
import MainSidebar from './MainSidebar.vue'
import MainContent from './MainContent.vue'

export default {
  props: {
    width: Number,
    height: Number
  },
  data () {
    return {
      msg: 'Hello from Component Body!'
    }
  },
  components: {
    'main-sidebar': MainSidebar,
    'main-content': MainContent
  },
  methods: {
    // changeTab: function(el) {

    // }
  },
  events: {
    
  }
}
</script>