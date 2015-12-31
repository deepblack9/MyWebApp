<style scoped>
.item {
  cursor: pointer;
}
.item-label {
  margin: 0px;
  padding: 3px 10px;
  background-color: #eeeeee;
}
.item-label:hover{
  background-color: #ddd;
}
.item-label-click {
  background-color: #ddd;
}
.bold {
  font-weight: bold;
}
ul {
  padding-left: 0em;
  list-style-type: none;
  /*line-height: 1.5em;*/
  background-color: #eeeeee;
}

/*.collapse-enter, .collapse-leave {
  max-height: 0!important;
}*/

/*.collapse-enter {
  animation:slideleft-in .3s;
}
.collapse-leave {
  animation:slideleft-out .3s;
}
@keyframes slideleft-in {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes slideleft-out {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-100%);
    opacity: 0;
  }
}*/
.collapse-transition {
  transition: max-height .9s ease;
  overflow: hidden;
}
.collapse-enter, .collapse-leave {
  opacity: 0;
  height: 0;
}

.modal-enter, .modal-leave {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>

<template>
  <li class="item">
    <div
      :class="{'item-label': isLabel, 'bold': top, 'item-label-click': isSelected}"
      @click.stop="toggle">
      <span v-for="n in level">&nbsp;&nbsp;</span>
      {{model.text}}
      <span v-if="isFolder" class="pull-right">
        <i class="{{open ? 'fa fa-angle-down' : 'fa fa-angle-left'}}"></i>
      </span>
    </div>
    <ul v-if="isFolder" v-show="open" transition="collapse">
      <item
        v-for="model in model.children"
        :model="model"
        :top="false"
        :level="level+1"
        :selected-id="selectedId"
        @menu-node-selected="nodeSelected">
      </item>
      <!-- <li @click="addChild">+</li> -->
    </ul>
  </li>
</template>

<script>
import Vue from 'vue'

export default {
  name: "item",
  props: {
    top: Boolean,
    model: Object,
    handle: {
      type: Function,
      default: function(){}
    },
    level: {
      type: Number,
      default: 1
    },
    selectedId: {
      type:String,
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
    },
    isSelected: function() {
      return this.model.id == this.selectedId
    }
  },
  methods: {
    toggle: function () {
      //菜单打开事件，发送MenuTree处理
      this.$emit('menu-node-selected',this)
    },
    nodeSelected: function(node) {
      this.$emit('menu-node-selected',node)
    }
  },
  enents: {
    // 'tree-node-selected': function(el) {
    //   if(this.model.id == el.id) {
    //     console.log(this.model.text)
    //   }
    // }
  },
  ready() {
  }
}
</script>