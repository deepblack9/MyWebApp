<template>
<div class="panel panel-default" :style="{'height':height+'px'}">
  <div class="panel-heading">
    <h4 class="panel-title">
      <a class="accordion-toggle"
        @click="toggleIsOpen()">
         {{ header }}
      </a>
      <slot name="header"></slot>
    </h4>
  </div>
  <div class="panel-collapse"
    v-el:panel
    v-show="isOpen"
    transition="collapse">
    <div class="panel-body">
      <slot name="body"></slot>
    </div>
  </div>
</div>
</template>

<script>
  export default {
    props: {
      isOpen: {
        type: Boolean,
        default: false
      },
      header: {
        type: String
      },
      height: {
        type: Number,
        default: undefined
      }
    },
    data() {
      return {
        // height: 0
      }
    },
    methods: {
      toggleIsOpen() {
        // this.isOpen = !this.isOpen
        // this.$dispatch('isOpenEvent', this)
      }
    },
    ready() {
      const panel = this.$els.panel
      panel.style.display = 'block'
      // this.height = panel.offsetHeight
      // panel.style.maxHeight = this.height + 'px'
      if (!this.isOpen) panel.style.display = 'none'
    }
  }
</script>

<style>
.accordion-toggle {
  cursor: pointer;
}

.collapse-transition {
  transition: max-height .5s ease;
  overflow: hidden;
}

.collapse-enter, .collapse-leave {
  max-height: 0!important;
}

</style>
