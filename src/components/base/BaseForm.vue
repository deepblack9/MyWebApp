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
</style>

<template>
  <form :class="formtype">
    <slot name="header" v-if></slot>
    <div class="row">
      <div class="col-md-{{12/col}}" v-for="r in formFields">
        <div class="row">
          <label class="col-md-4">{{r.fieldLabel}}:</label>
          <input class="col-md-6" type="text" :name="r.name" :value="record[r.name]"/>
        </div>
      </div>
    </div>
    <div class="aside-footer">
      <!-- <button type="button" class="btn btn-default" @click="showRight = false">Close</button> -->
    </div>
    <slot name="footer"></slot>
  </form>
</template>

<script>
export default {
  props: {
    col: Number,
    record: {
      type: Object,
      default: function(){return {}}
    }
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
    
  },
  computed: {

  },
  ready() {
    // formFieldsTo3c = [];
    // for(var index = 0; index < this.formFields.length; index++) {

    // } 
  }
}
</script>