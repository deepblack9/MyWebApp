<style scoped>
  #mainbody{ margin: 0; padding: 0;}
</style>

<template>
  <div class="row" id="mainbody">
    <main-sidebar></main-sidebar>
    <main-content :height="height"></main-content>
    <slot></slot>
  </div>
</template>

<script>
import MainSidebar from './MainSidebar.vue'
import MainContent from './MainContent.vue'

export default {
  props: {
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
  events: {
    'chengeCurMenu': function(url, text, id) {
      this.$broadcast('chengeCurMenu', url, text, id);
    }
  }
}
</script>