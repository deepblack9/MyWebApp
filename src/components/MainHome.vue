<style scoped>
  #home{ margin: 0; background:#ddd;}
</style>

<template>
  <div class="row" id="home" :style="{height: height + 'px'}">
    <div class="col-md-12">{{msg}}</div>
  </div>
</template>

<script>
export default {
  props: ['height'],
  data () {
    return {
      msg: 'Hello from Component HomePage!'
    }
  }
}
</script>