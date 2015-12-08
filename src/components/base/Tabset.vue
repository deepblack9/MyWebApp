<template>
  <div id="nav-tabs-container">
    <!-- Nav tabs -->
     <ul class="nav nav-tabs" role="tablist">
        <li v-for="r in renderData"
            :id="r.id"
            :class="{
              'active': (r.id === activeId),
              'disabled': r.disabled
            }"
            @click.prevent="handleTabListClick($index, r)"
            :disabled="r.disabled">
            <a href="#">{{r.header}} 
              <span v-if="r.close" class='fa fa-times-circle' @click.prevent="removeTab($index, r)"></span>
            </a>
        </li>
     </ul>

     <!-- Tab panes -->
     <div class="tab-content" v-el:tabContent>
        <slot></slot>
     </div>
  </div>
</template>

<script>
  export default {
    props: {
      effect: {
        type: String,
        default: 'fadein'
      },
      height: Number
    },
    data() {
      return {
        renderData: [],
        activeId: '',
        activeIndex: 0
      }
    },
    watch: {
      'renderData': function (val, oldVal) {
        if (!val[val.length-1].disabled) this.activeId = val[val.length-1].id;
      }
    },
    methods: {
      handleTabListClick(index, el) {
        if (!el.disabled) {
          this.activeId = el.id;
        };
        // this.$dispatch('changeTab', el);
      },
      removeTab(index, el) {
        for(var c in this.renderData) {
          if(this.renderData[c].id == el.id) {
            this.renderData.splice(c,1);
            this.$dispatch('removeTab', el);
            return;
          }
        }
      }
    },
    events: {
      handleTabShow(index,el) {
        $('#'+el.id).trigger('click');
      }
    }
  }
</script>

<style scoped>
  #nav-tabs-container {
    height: 100%;
  }
  .nav-tabs {
    margin-bottom: 5px;
  }
  .nav-tabs a {
    color: #999;
    padding-left: 15px;
    padding-right: 15px;
  }
  .nav-tabs span {
    cursor: pointer;
  }
  .nav-tabs li.action {
    background: #2f4050;
    color: #ffffff;
    cursor: pointer;
  }
</style>
