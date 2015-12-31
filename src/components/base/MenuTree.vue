<style scoped>
.item {
  cursor: pointer;
}
ul {
  padding-left: 0px;
/*  line-height: 1.5em;*/
  list-style-type: none;
}
</style>

<template>
  <!-- <ul class="metismenu" id="menu"> -->
  <ul class="panel-group">
    <menu-tree-item 
      v-for="model in menuData" 
      :model="model" 
      :top="true" 
      :selected-id="selectedId"
      @menu-node-selected="nodeSelected">
    </menu-tree-item>
    <slot></slot>
  </ul>
</template>

<script>
import MenuTreeItem from './MenuTreeItem.vue'

export default {
	props: {
		oneAtATime: {
      type: Boolean,
      default: false
    },
    menuUrl: {
      type: String
    }
	},
  data: function () {
    return {
      menuData: [{text: '目录', children:[]}],
      selectedId: ''
    }
  },
  computed: {
  },
  ready() {
    var vm = this
    $.ajax({
      url: CONTEXT_PATH+'/security/getMenuResource.do',
      success: function(data) {
        if(data.success) {
          vm.menuData = data.data;
        }
      }
    })
  },
  components: {
    'menu-tree-item': MenuTreeItem
  },
  methods: {
    nodeSelected: function(node) {
      if(node.isFolder) {
        if (this.oneAtATime) {
          node.$parent.$children.forEach((item) => {
            if (node !== item ) {
              item.open = false
            }
          })
        }
        node.open = !node.open
      } else {
        $('.item-label-click').removeClass('item-label-click')
        this.selectedId = node.model.id
        var obj = {
          "id": node.model.id,
          "url": node.model.uri,
          "header": node.model.text,
          "pageType": 'nomal'
        };
        this.$emit('menu-selected',obj)
      }
    }
  },
  events: {
  }
}
</script>