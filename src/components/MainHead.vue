<style scoped>
  #head{ margin: 0; background:#ddd;}
</style>

<template>
  <div class="row" id="head" :style="{height: height + 'px'}">
    <div class="col-md-12">{{msg}}</div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['height'],
  data () {
    return {
      msg: 'Hello from Component Head!'
    }
  }
}
</script>