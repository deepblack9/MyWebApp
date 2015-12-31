<template>
  <div class="panel panel-default">
    <div class="panel-heading" v-el:panel-header>
      <!-- <h4 class="panel-title">
        <a class="accordion-toggle"
          @click="toggleIsOpen()"> -->
           {{ header }}{{headerHeight}}
        <!-- </a> -->
        <slot name="header"></slot>
      <!-- </h4> -->
    </div>
    <!-- <div class="panel-collapse"
      v-el:panel
      v-show="isOpen"
      transition="collapse"
    > -->
      <div class="panel-body" v-el:panel-body :style="{height: height + 'px'}">
        <slot name="body"></slot>
      </div>
    <!-- </div> -->
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
        type: Number
      }
    },
    data() {
      return {
        // height: 0
      }
    },
    computed: {
      bodyHeight: function() {
        return this.height-this.headerHeight
      }
    },
    methods: {
      toggleIsOpen() {
        this.isOpen = !this.isOpen
        this.$dispatch('isOpenEvent', this)
      }
    },
    ready() {
      // const panel = this.$els.panel
      // panel.style.display = 'block'
      // this.height = panel.offsetHeight
      // panel.style.maxHeight = this.height + 'px'
      // if (!this.isOpen) panel.style.display = 'none'
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

.panel-body {
  overflow-y: auto;
}

</style>
