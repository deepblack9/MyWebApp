<style scoped>
.item {
  cursor: pointer;
}
.item-label {
  margin: 2px;
  padding: 3px 10px;
  background-color: #eeeeee;
}
.item-label:hover{
  background-color:#ddd
}
.item-label-click {
  background-color: #ddd;
}
.bold {
  font-weight: bold;
}
ul {
  padding-left: 1em;
/*  line-height: 1.5em;*/
  list-style-type: none;
}
</style>

<template>
  <li class="item">
    <div
      :class="{'item-label': isLabel, 'bold': isFolder, 'item-label-click': isSelected}"
      @click="selectNode"
      @dblclick="changeType">
      <span v-if="isFolder" @click.stop="toggle" class="{{isExpanded ? 'fa fa-minus-square-o' : 'fa fa-plus-square-o'}}"></span>
      {{model.text}}
    </div>
    <!-- <ul v-show="open" v-if="isFolder"> -->
    <ul v-show="isExpanded" v-if="isFolder">
      <item
        v-for="child in model.children"
        :model="child"
        :pmodel="model">
        <!-- @node-selected="childNodeSelected"> -->
      </item>
      <!-- <li @click="addChild">+</li> -->
    </ul>
  </li>
</template>

<script>
import Vue from 'vue'
import TreeItem from './TreeItem.vue'

export default {
  name: "item",
  props: {
    model: Object,
    pmodel: {
      type: Object,
      default: function(){ return null}
    },
    handle: {
      type: Function,
      default: function(){}
    }
  },
  data: function () {
    return {
      open: false,
      isLabel: true,
      isSelected: false
    }
  },
  ready() {
    this.selectNode;
  },
  computed: {
    isFolder: function () {
      return this.model.children &&
        this.model.children.length
    },
    isExpanded: function () {
      return this.model.expanded &&
        this.model.expanded == 1
    }
  },
  methods: {
    // childNodeSelected: function(selectModel,selectPModel) {
    //   this.model.expanded = true
    //   this.$emit('node-selected',selectModel,selectPModel)
    // },
    selectNode: function(e) {
      // this.$emit('node-selected',this.model,this.pmodel)
      this.$dispatch('tree.nodeSelected',this.model,this.pmodel)
      $('.item-label-click').removeClass('item-label-click')
      $(e.target).addClass('item-label-click')
    },
    toggle: function () {
      if (this.isFolder) {
        this.model.expanded = !this.model.expanded
      }
    },
    changeType: function () {
      if (!this.isFolder) {
        Vue.set(this.model, 'children', [])
        this.addChild()
        this.model.expanded = true
      }
    },
    addChild: function () {
      this.model.children.push({
        name: 'new stuff'
      })
    }
  },
  enents: {
  }
}
</script>