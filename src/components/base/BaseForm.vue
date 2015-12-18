<style scoped>
  form div{
    padding-top: 2px;
    padding-bottom: 2px;
  }
  form label {
    text-align: right;
    vertical-align: middle;
    padding-right: 5px;
  }
  form > .formheader {
    /*padding-bottom: 5px;
    margin-bottom: 10px;
    border-bottom: 1px solid #e5e5e5*/
  }
</style>

<template>
  <form :class="formtype">
    <div class="formheader">
      <slot name="header"></slot>
    </div>
    <div class="row formbody">
      <div :class="colWidth" v-for="r in fields" v-if="r.xtype != 'hidden'">
        <div class="row">
          <label class="col-md-4">{{r.fieldLabel}}:</label>
          <input class="col-md-6" :type="r.xtype" :name="r.name" :value="record[r.mapping]"/>
        </div>
      </div>
    </div>
    <!-- <div class="aside-footer">
      <button type="button" class="btn btn-default" @click="showRight = false">Close</button>
    </div> -->
    <slot name="footer"></slot>
  </form>
</template>

<script>
export default {
  props: {
    fields: Array,
    col: Number,
    record: {
      type: Object,
      default: function(){return {}}
    }
  },
  data () {
    return {
    }
  },
  components: {
    
  },
  computed: {
    colWidth: function() {
      return 'col-md-'+12/this.col;
    }
  },
  ready() {
    // formFieldsTo3c = [];
    // for(var index = 0; index < this.formFields.length; index++) {

    // } 
  }
}
</script>