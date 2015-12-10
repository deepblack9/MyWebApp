<style scoped>
  #crud{ margin: 0;height:100%;}
</style>

<template>
  <div class="row" id="crud">
    <table-bootstrap 
      :height="height"
      :columns="columns"></table-bootstrap>
  </div>
</template>

<script>
import TableBootstrap from '../base/TableBootstrap.vue'
import BaseFormPage from './BaseFormPage.vue'
// import TableBase from '../base/TableBase.vue'

export default {
  props: {
    height: Number
  },
  data () {
    return {
      // store: {
      //   type: Object
      // },
      columns: {'header': 
      [
        [
          {
            field: 'state',
            checkbox: true,
            rowspan: 2,
            align: 'center',
            valign: 'middle'
          }, {
            title: 'Item ID',
            field: 'id',
            rowspan: 2,
            align: 'center',
            valign: 'middle',
            // footerFormatter: this.totalTextFormatter,
            sortable: true
          }, {
            title: 'Item Detail',
            colspan: 3,
            align: 'center'
          }
        ],
        [
          {
            field: 'name',
            title: 'Item Name',
            sortable: true,
            editable: true,
            // footerFormatter: this.totalNameFormatter,
            align: 'center'
          }, {
            field: 'price',
            title: 'Item Price',
            sortable: true,
            align: 'center',
            editable: {
                type: 'text',
                title: 'Item Price',
                validate: function (value) {
                    value = $.trim(value);
                    if (!value) {
                        return 'This field is required';
                    }
                    if (!/^$/.test(value)) {
                        return 'This field needs to start width $.'
                    }
                    var data = $table.bootstrapTable('getData'),
                        index = $(this).parents('tr').data('index');
                    console.log(data[index]);
                    return '';
                }
            }
            // footerFormatter: this.totalPriceFormatter
          }
          // , {
          //   field: 'operate',
          //   title: 'Item Operate',
          //   align: 'center'
          //   events: operateEvents,
          //   formatter: this.operateFormatter
          // }
        ]
      ]}
    }
  },
  components: {
    'table-bootstrap': TableBootstrap
    // 'table-base': TableBase
  },
  ready() {
    // this.columns = ;
  }
}
</script>