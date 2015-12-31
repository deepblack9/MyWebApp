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
      :class="{'item-label': isLabel, 'bold': isFolder }"
      @click="selectNode"
      @dblclick="changeType">
      <span v-if="isFolder" @click.stop="toggle" class="{{open ? 'fa fa-minus-square-o' : 'fa fa-plus-square-o'}}"></span>
      {{model.text}}
    </div>
    <ul v-show="open" v-if="isFolder">
      <item
        v-for="model in model.children"
        :model="model">
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
    handle: {
      type: Function,
      default: function(){}
    }
  },
  data: function () {
    return {
      open: false,
      isLabel: true
    }
  },
  computed: {
    isFolder: function () {
      return this.model.children &&
        this.model.children.length
    }
  },
  methods: {
    selectNode: function(e) {
      this.$dispatch('tree.nodeSelected',this.model)
      $('.item-label-click').removeClass('item-label-click')
      $(e.target).addClass('item-label-click')
    },
    toggle: function () {
      if (this.isFolder) {
        this.open = !this.open
      }
    },
    changeType: function () {
      if (!this.isFolder) {
        Vue.set(this.model, 'children', [])
        this.addChild()
        this.open = true
      }
    },
    addChild: function () {
      this.model.children.push({
        name: 'new stuff'
      })
    }
  },
  enents: {

  },
  ready() {
    
  }
}
</script>