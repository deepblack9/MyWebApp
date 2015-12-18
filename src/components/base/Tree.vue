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
  <ul>
	  <item v-if="hasData" v-for="model in treeData"
	    :model="model">
	  </item>
	  <li v-else>没有找到数据</li>
	</ul>
</template>

<script>
import TreeItem from './TreeItem.vue'
// var data = [{
//   name: 'My Tree',
//   children: [
//     { name: 'hello' },
//     { name: 'wat' },
//     {
//       name: 'child folder',
//       children: [
//         {
//           name: 'child folder',
//           children: [
//             { name: 'hello' },
//             { name: 'wat' }
//           ]
//         },
//         { name: 'hello' },
//         { name: 'wat' },
//         {
//           name: 'child folder',
//           children: [
//             { name: 'hello' },
//             { name: 'wat' }
//           ]
//         }
//       ]
//     }
//   ]
// }];
export default {
	props: {
		// treeData: {
		// 	type: Object,
		// 	default: function(){return {name: '没有找到数据'}}
		// },
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
    'item': TreeItem
  },
  events: {
  	// 'tree.nodeSelected': function() {
  	// 	$('.item-label-click').remove('item-label-click')
  	// 	console.log($('.item-label-click'))
  	// }
  }
}
</script>