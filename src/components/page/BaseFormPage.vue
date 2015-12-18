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
    <base-form :fields="formFields" :col="3">
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
      formFields: [
        {name:'id',fieldLabel:'Item ID',xtype:'text'},
        {name:'name',fieldLabel:'Item Name',xtype:'text'},
        {name:'price',fieldLabel:'Item Price',xtype:'text'},
        {name:'id',fieldLabel:'Item ID',xtype:'text'},
        {name:'name',fieldLabel:'Item Name',xtype:'text'},
        {name:'price',fieldLabel:'Item Price',xtype:'text'},
        {name:'id',fieldLabel:'Item ID',xtype:'text'},
        {name:'name',fieldLabel:'Item Name',xtype:'text'},
        {name:'price',fieldLabel:'Item Price',xtype:'text'},
        {name:'id',fieldLabel:'Item ID',xtype:'text'},
        {name:'name',fieldLabel:'Item Name',xtype:'text'},
        {name:'price',fieldLabel:'Item Price',xtype:'text'},
        {name:'id',fieldLabel:'Item ID',xtype:'text'},
        {name:'name',fieldLabel:'Item Name',xtype:'text'},
        {name:'price',fieldLabel:'Item Price',xtype:'text'},
        {name:'id',fieldLabel:'Item ID',xtype:'text'},
        {name:'name',fieldLabel:'Item Name',xtype:'text'},
        {name:'price',fieldLabel:'Item Price',xtype:'text'}
      ],
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
    console.log('page: '+ this.formFields.length)
    // formFieldsTo3c = [];
    // for(var index = 0; index < this.formFields.length; index++) {

    // } 
  }
}
</script>