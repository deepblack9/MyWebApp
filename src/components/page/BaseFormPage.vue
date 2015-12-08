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
  <form>
    <div class="row" v-for="r in formFields">
      <div class="col-md-4" v-for="c in r">
        <label class="col-md-3">{{c.fieldLabel}}</label>
        <input class="col-md-6" type="text" name="{{c.name}}"/>
      </div>
    </div>
  </form>
</template>

<script>
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
    // 'table-bootstrap': TableBootstrap
    // 'table-base': TableBase
  },
  ready() {
    // formFieldsTo3c = [];
    // for(var index = 0; index < this.formFields.length; index++) {

    // } 
  }
}
</script>