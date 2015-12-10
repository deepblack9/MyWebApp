<template>
  <div role="tabpanel" class="tab-pane"
      v-bind:class="{hide:!show}"
      v-show="show"
      :transition="transition"
  >
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      id: {
        type: String
      },
      header: {
        type: String
      },
      disabled: {
        type: Boolean,
        default: false
      },
      close: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        index: 0,
        show: false
      }
    },
    computed: {
      show() {
        return (this.$parent.activeId == this.id)
      },
      transition() {
        return this.$parent.effect
      }
    },
    created() {
      this.$parent.renderData.push({
        id: this.id,
        header: this.header,
        disabled: this.disabled,
        close: this.close
      });
    },
    ready() {
      for (var c in this.$parent.$children) {
        if (this.$parent.$children[c].$el == this.$el) {
          this.index= c;
          break;
        }
      }
    }
  }
</script>

<style scoped>
  .tab-content > .tab-pane {
    display: block;
    margin: 0 5px;
  }
</style>
