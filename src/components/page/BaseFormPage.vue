<style scoped>
  form > div{
    padding: 3px
  }
  form label {
    text-align: right;
    vertical-align: middle;
  }
</style>

<template>
  <div>
    <base-form :col="3">
      <div id="toolbar" slot="toolbar">
      <button id="add" class="btn btn-default" @click="showRight = true">
        <i class="glyphicon glyphicon-save"></i> 保存
      </button>
    </div>
    </base-form>
  </div>
</template>

<script>
import BaseForm from '../base/BaseForm.vue'

export default {
  props: {
    height: Number
  },
  data () {
    return {
      formFields: [[
        {name:'id',fieldLabel:'Item ID',xtype:'hidden'},
        {name:'name',fieldLabel:'Item Name',xtype:'hidden'},
        {name:'price',fieldLabel:'Item Price',xtype:'hidden'}
        ]],
      data: {
        id: 1,
        name: 2,
        price: '$10'
      }
    }
  },
  components: {
    'base-form': BaseForm
  },
  ready() {
    // formFieldsTo3c = [];
    // for(var index = 0; index < this.formFields.length; index++) {

    // } 
  }
}
</script>