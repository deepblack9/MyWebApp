<style scoped>
  #crud{ margin: 0; height: 100%; }
</style>

<template>
  <div class="row" id="crud">
    <table-simple 
      :url="url"
      :idfield="idfield" 
      :columns="columns" 
      :data="data" 
      :total-rows="totalRows"
      :width="width"
      :height="height">
    </table-simple>
    <!-- <table-bootstrap 
      :height="height"
      :columns="columns"></table-bootstrap> -->
  </div>
</template>

<script>
// import TableBootstrap from '../base/TableBootstrap.vue'
import TableSimple from '../base/TableSimple.vue'

export default {
  props: {
    width: Number,
    height: Number
  },
  data () {
    return {
      url: CONTEXT_PATH+'/security/queryAllRole.do',
      idfield: 'roleId',
      columns: [[
        {
          field: 'state',
          checkbox: true
        },{
          title: '角色名',
          field: 'roleName',
          width: 80
        },{
          title: '是否可用',
          field: 'enable',
          width: 80
        },{
          title: '备注',
          field: 'remark',
          width: 80
        },{
          title: '角色名',
          field: 'roleName',
          width: 80
        },{
          title: '是否可用',
          field: 'enable',
          width: 80
        },{
          title: '备注',
          field: 'remark',
          width: 80
        },{
          title: '角色名',
          field: 'roleName',
          width: 80
        },{
          title: '是否可用',
          field: 'enable',
          width: 80
        },{
          title: '备注',
          field: 'remark',
          width: 80
        },{
          title: '角色名',
          field: 'roleName',
          width: 80
        },{
          title: '是否可用',
          field: 'enable',
          width: 80
        },{
          title: '备注',
          field: 'remark',
          width: 80
        },{
          title: '角色名',
          field: 'roleName',
          width: 80
        },{
          title: '是否可用',
          field: 'enable',
          width: 80
        },{
          title: '备注',
          field: 'remark',
          width: 80
        },{
          title: '角色名',
          field: 'roleName',
          width: 80
        },{
          title: '是否可用',
          field: 'enable',
          width: 80
        },{
          title: '备注',
          field: 'remark',
          width: 80
        },{
          title: '角色名',
          field: 'roleName',
          width: 80
        },{
          title: '是否可用',
          field: 'enable',
          width: 80
        },{
          title: '备注',
          field: 'remark',
          width: 80
        },{
          title: '角色名',
          field: 'roleName',
          width: 80
        },{
          title: '是否可用',
          field: 'enable',
          width: 80
        },{
          title: '备注',
          field: 'remark',
          width: 80
        },{
          title: '角色名',
          field: 'roleName',
          width: 80
        },{
          title: '是否可用',
          field: 'enable',
          width: 80
        },{
          title: '备注',
          field: 'remark',
          width: 80
        }
      ]],
      // columns:[
      //   [
      //     {
      //       field: 'state',
      //       checkbox: true,
      //       rowspan: 2,
      //       align: 'center',
      //       valign: 'middle'
      //     }, {
      //       title: 'Item ID',
      //       field: 'id',
      //       rowspan: 2,
      //       align: 'center',
      //       valign: 'middle',
      //       // footerFormatter: this.totalTextFormatter,
      //       sortable: true
      //     }, {
      //       title: 'Item Detail',
      //       colspan: 3,
      //       align: 'center'
      //     }
      //   ],
      //   [
      //     {
      //       field: 'name',
      //       title: 'Item Name',
      //       sortable: true,
      //       editable: true,
      //       // footerFormatter: this.totalNameFormatter,
      //       align: 'center'
      //     }, {
      //       field: 'price',
      //       title: 'Item Price',
      //       sortable: true,
      //       align: 'center',
      //       editable: {
      //           type: 'text',
      //           title: 'Item Price',
      //           validate: function (value) {
      //               value = $.trim(value);
      //               if (!value) {
      //                   return 'This field is required';
      //               }
      //               if (!/^$/.test(value)) {
      //                   return 'This field needs to start width $.'
      //               }
      //               var data = $table.bootstrapTable('getData'),
      //                   index = $(this).parents('tr').data('index');
      //               console.log(data[index]);
      //               return '';
      //           }
      //       }
      //       // footerFormatter: this.totalPriceFormatter
      //     }
      //     // , {
      //     //   field: 'operate',
      //     //   title: 'Item Operate',
      //     //   align: 'center'
      //     //   events: operateEvents,
      //     //   formatter: this.operateFormatter
      //     // }
      //   ]
      // ],
      data:[],
      totalRows: 0
    }
  },
  components: {
    // 'table-bootstrap': TableBootstrap
    'table-simple': TableSimple
  },
  ready() {
    // this.getData();
    // this.data = [{"id": 0,"name": "Item 0","price": "$0"},
    //             {"id": 1,"name": "Item 1","price": "$1"},
    //             {"id": 2,"name": "Item 2","price": "$2"},
    //             {"id": 3,"name": "Item 3","price": "$3"},
    //             {"id": 4,"name": "Item 4","price": "$4"},
    //             {"id": 5,"name": "Item 5","price": "$5"},
    //             {"id": 6,"name": "Item 6","price": "$6"},
    //             {"id": 7,"name": "Item 7","price": "$7"},
    //             {"id": 8,"name": "Item 8","price": "$8"},
    //             {"id": 9,"name": "Item 9","price": "$9"},
    //             {"id": 10,"name": "Item 10","price": "$10"},
    //             {"id": 11,"name": "Item 11","price": "$11"},
    //             {"id": 12,"name": "Item 12","price": "$12"},
    //             {"id": 13,"name": "Item 13","price": "$13"},
    //             {"id": 14,"name": "Item 14","price": "$14"},
    //             {"id": 15,"name": "Item 15","price": "$15"},
    //             {"id": 16,"name": "Item 16","price": "$16"},
    //             {"id": 17,"name": "Item 17","price": "$17"},
    //             {"id": 18,"name": "Item 18","price": "$18"},
    //             {"id": 19,"name": "Item 19","price": "$19"},
    //             {"id": 20,"name": "Item 20","price": "$20"},
    //             {"id": 21,"name": "Item 21","price": "$21"},
    //             {"id": 22,"name": "Item 22","price": "$22"},
    //             {"id": 23,"name": "Item 23","price": "$23"},
    //             {"id": 24,"name": "Item 24","price": "$24"},
    //             {"id": 25,"name": "Item 25","price": "$25"},
    //             {"id": 26,"name": "Item 26","price": "$26"},
    //             {"id": 27,"name": "Item 27","price": "$27"},
    //             {"id": 28,"name": "Item 28","price": "$28"},
    //             {"id": 29,"name": "Item 29","price": "$29"},
    //             {"id": 30,"name": "Item 30","price": "$30"},
    //             {"id": 31,"name": "Item 31","price": "$31"},
    //             {"id": 32,"name": "Item 32","price": "$32"},
    //             {"id": 33,"name": "Item 33","price": "$33"},
    //             {"id": 34,"name": "Item 34","price": "$34"},
    //             {"id": 35,"name": "Item 35","price": "$35"},
    //             {"id": 36,"name": "Item 36","price": "$36"},
    //             {"id": 37,"name": "Item 37","price": "$37"},
    //             {"id": 38,"name": "Item 38","price": "$38"},
    //             {"id": 39,"name": "Item 39","price": "$39"}]
  },
  methods: {
    
  }
}
</script>