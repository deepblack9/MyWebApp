<style scoped>
  #sidebar{ height:100%; margin: 0; padding: 0; background:#eeeeee; overflow: auto;}
</style>

<template>
  <div id="sidebar" :style="{width: width+'px', height: height+'px'}">
    <menu-tree 
      :one-at-atime="true" 
      :menu-url="menuUrl"
      @menu-selected="menuSelected">
    </menu-tree>
  </div>
</template>

<script>
// import '../libs/metisMenu.js'
// import '../libs/metisMenu.css'
// import '../libs/sidebar.css'
import MenuTree from './base/MenuTree.vue'


export default {
  props: {
    width: Number,
    height: Number
  },
  data () {
    return {
      menuUrl: CONTEXT_PATH+'/security/getMenuResource.do',
    }
  },
  components: {
    'menu-tree': MenuTree
  },
  ready() {
  },
  methods: {
    menuSelected: function(obj) {
      this.$dispatch('menu-selected', obj);
    }
  },
  events: {
    'main-changeTab': function(el) {
      this.$broadcast('tree-node-selected',el)
    },
    'menu-selected': function() {
      //阻止事件广播
    }
  }
}
</script>