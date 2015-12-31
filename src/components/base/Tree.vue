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
	  <!-- <item v-for="model in treeData" :model="model">
	  </item> -->
    <slot></slot>
	</ul>
</template>

<script>
import TreeItem from './TreeItem.vue'

export default {
	props: {
		// treeData: {
		// 	type: Object,
		// 	default: function(){return {text: '没有找到数据',children:[]}}
		// },
		// url: {
		// 	type: String
		// }
	},
  data: function () {
    return {
      // treeData: [{text: '目录', children:[]}]
    }
  },
  computed: {

  },
  created() {
  	// var vm = this
  	// $.get(this.url,function(data,status) {
  	// 	if(status == 'success') {
  	// 		vm.treeData[0].children.splice(0,vm.treeData[0].children.length)
	  // 		vm.treeData[0].children = data
  	// 	}
  	// });
  },
  ready() {

  },
  components: {
    'item': TreeItem
  },
  events: {
    // 'treeNodeChanged': function(record) {
    //   var menuList = this.treeData[0].children
    //   for(var index = 0; index < menuList.length; index++) {
    //     if(menuList[index].id == record.id) {
    //       this.treeData[0].children.splice(index,1,record)
    //     }
    //   }
    // }
  }
}
</script>