<style scoped>
  #foot{ margin: 0; background-color:#ccc;}
</style>

<template>
  <div class="row" id="foot" :style="{height: height + 'px'}">
    <div class="col-md-12">{{msg}}</div>
  </div>
</template>

<script>
export default {
  props: ['height'],
  data () {
    return {
      msg: 'Hello from Component Foot!!!'
    }
  }
}
</script>
