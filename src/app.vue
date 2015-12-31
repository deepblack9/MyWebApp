<style scoped>
  #container { height:100%; margin: 0; padding: 0;}
</style>

<template>
  <div class="container-fluid" id="container">
    <main-head style="height:60px"></main-head>
    <main-body :style="{height: bodyHeight + 'px'}" :height="bodyHeight"></main-body>
    <main-foot style="height:30px"></main-foot>
  </div>
</template>

<script>
import MainHead from './components/MainHead.vue'
import MainBody from './components/MainBody.vue'
import MainFoot from './components/MainFoot.vue'

export default {
  props: ['height'],
  data() {
    return {
      msg: 'app'
    }
  },
  computed: {
    bodyHeight: function() {
      return this.height-60-30;
    }
  },
  components: {
    'main-head': MainHead,
    'main-body': MainBody,
    'main-foot': MainFoot
  },
  events: {
    'menu-selected': function(obj) {
      this.$broadcast('menu-selected', obj)
    },
    'main-changeTab': function(el) {
      this.$broadcast('main-changeTab',el)
    }
  }
}
</script>