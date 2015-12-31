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
  <ul class="metismenu" id="menu">
    <li class="active">
      <a href="#"><i class="fa fa-table"></i> <span class="nav-label">表格</span><span class="glyphicon arrow"></span></a>
  <!-- <ul>
	  <menu-item v-if="hasData" v-for="model in treeData"
	    :model="model">
	  </menu-item>
	  <li v-if="!hasData">没有找到数据</li>
	</ul> -->
</template>

<script>
import MenuTreeItem from './MenuTreeItem.vue'

export default {
	props: {
		URL: {
			type: String
		},
		handle: {
      type: Function,
      default: function(){}
    }
	},
  data: function () {
    return {
      treeData: [{text: '目录', children:[]}]
    }
  },
  computed: {
  	hasData: function() {
  		return this.treeData && 
  			this.treeData[0].children &&
        this.treeData[0].children.length
  	}
  },
  created() {
  	var vm = this
  	$.get(this.URL,function(data,status) {
  		if(status == 'success') {
  			vm.treeData[0].children.splice(0,vm.treeData[0].children.length)
	  		vm.treeData[0].children = data
  		}
  	});
  },
  ready() {

  },
  components: {
    'menu-item': MenuTreeItem
  },
  events: {
  	// 'tree.nodeSelected': function() {
  	// 	$('.item-label-click').remove('item-label-click')
  	// 	console.log($('.item-label-click'))
  	// }
  }
}
</script>