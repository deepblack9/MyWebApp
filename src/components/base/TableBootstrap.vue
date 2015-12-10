<style scoped>
.table-container {
  width:100%;
}
</style>

<template>
  <div class="row table-container" :style="{height: height + 'px'}">
    <div id="toolbar">
      <button id="add" class="btn btn-default" @click="showRight = true">
        <i class="glyphicon glyphicon-plus"></i> Add
      </button>

      <!-- <button class="btn btn-success btn-lg"
        v-on="click:zoomModal = true">
        Zoom modal
      </button>
      <modal title="Zoom Modal" show="{{@zoomModal}}" effect="zoom" width="400">
        <div class="modal-body">...</div>
      </modal> -->

      <aide :show.sync="showRight" placement="right" header="Title" :width="350">
        <base-form :col="1" :record:sync="record">

        </base-form>
        <!-- <div class="aside-footer">
          <button type="button" class="btn btn-default" @click="showRight = false">Close</button>
        </div> -->
      </aide>
      <button id="remove" class="btn btn-default" disabled>
        <i class="glyphicon glyphicon-remove"></i> Delete
      </button>
    </div>
    <table id="table"
           data-click-to-select="false"
           data-detail-view="true"
           data-detail-formatter="detailFormatter"
           data-id-field="id"
           data-minimum-count-columns="2"
           data-maintain-selected="true"
           data-pagination="true"
           data-page-list="[10, 25, 50, 100, ALL]"
           data-toggle="table"
           data-toolbar="#toolbar"
           data-striped=true
           data-search="true"
           data-show-columns="true"
           data-show-export="true"
           data-show-footer="false"
           data-show-pagination-switch="true"
           data-show-refresh="true"
           data-show-toggle="true"
           >

           <!--
           data-side-pagination="server"
           data-url="http://localhost:8080/static/demo/data.json"
           data-response-handler="responseHandler">-->
    </table>
  </div>
</template>

<script>
import Modal from './Modal.vue'
import 'bootstrap-table/dist/bootstrap-table.css'
import 'bootstrap-table/dist/bootstrap-table.js'
import '../../libs/bootstrap/dropdown.js'
import '../../libs/layer-v2.1/layer/layer.js'
import Aside from './Aside.vue'
import BaseForm from './BaseForm.vue'
// import '../../libs/bootstrap-table/extensions/export/bootstrap-table-export.js'

var scripts = [
                'http://rawgit.com/hhurz/tableExport.jquery.plugin/master/tableExport.js',
                'assets/bootstrap-table/src/extensions/editable/bootstrap-table-editable.js',
                'http://rawgit.com/vitalets/x-editable/master/dist/bootstrap3-editable/js/bootstrap-editable.js'
              ];

var data = [{"id": 0,"name": "Item 0","price": "$0"},
            {"id": 1,"name": "Item 1","price": "$1"},
            {"id": 2,"name": "Item 2","price": "$2"},
            {"id": 3,"name": "Item 3","price": "$3"},
            {"id": 4,"name": "Item 4","price": "$4"},
            {"id": 5,"name": "Item 5","price": "$5"},
            {"id": 6,"name": "Item 6","price": "$6"},
            {"id": 7,"name": "Item 7","price": "$7"},
            {"id": 8,"name": "Item 8","price": "$8"},
            {"id": 9,"name": "Item 9","price": "$9"},
            {"id": 10,"name": "Item 10","price": "$10"},
            {"id": 11,"name": "Item 11","price": "$11"},
            {"id": 12,"name": "Item 12","price": "$12"},
            {"id": 13,"name": "Item 13","price": "$13"},
            {"id": 14,"name": "Item 14","price": "$14"},
            {"id": 15,"name": "Item 15","price": "$15"},
            {"id": 16,"name": "Item 16","price": "$16"},
            {"id": 17,"name": "Item 17","price": "$17"},
            {"id": 18,"name": "Item 18","price": "$18"},
            {"id": 19,"name": "Item 19","price": "$19"},
            {"id": 20,"name": "Item 20","price": "$20"},
            {"id": 21,"name": "Item 21","price": "$21"},
            {"id": 22,"name": "Item 22","price": "$22"},
            {"id": 23,"name": "Item 23","price": "$23"},
            {"id": 24,"name": "Item 24","price": "$24"},
            {"id": 25,"name": "Item 25","price": "$25"},
            {"id": 26,"name": "Item 26","price": "$26"},
            {"id": 27,"name": "Item 27","price": "$27"},
            {"id": 28,"name": "Item 28","price": "$28"},
            {"id": 29,"name": "Item 29","price": "$29"},
            {"id": 30,"name": "Item 30","price": "$30"},
            {"id": 31,"name": "Item 31","price": "$31"},
            {"id": 32,"name": "Item 32","price": "$32"},
            {"id": 33,"name": "Item 33","price": "$33"},
            {"id": 34,"name": "Item 34","price": "$34"},
            {"id": 35,"name": "Item 35","price": "$35"},
            {"id": 36,"name": "Item 36","price": "$36"},
            {"id": 37,"name": "Item 37","price": "$37"},
            {"id": 38,"name": "Item 38","price": "$38"},
            {"id": 39,"name": "Item 39","price": "$39"}]
export default {
  props: {
    height: Number,
    columns: Object,
    url: String
  },
  data () {
    return {
      tableData: data,
      showLeft: false,
      showRight: false,
      record: {}
    }
  },
  components: {
    'modal': Modal,
    'aide': Aside,
    'base-form': BaseForm
  },
  methods: {
    totalTextFormatter: function (data) {
      return 'Total';
    },
    totalNameFormatter: function (data) {
      return data.length;
    },
    totalPriceFormatter: function (data) {
      var total = 0;
      $.each(data, function (i, row) {
          total += +(row.price.substring(1));
      });
      return '$' + total;
    },
    operateFormatter: function (value, row, index) {
      return [
          '<a class="like" href="javascript:void(0)" title="Like">',
          '<i class="glyphicon glyphicon-heart"></i>',
          '</a>  ',
          '<a class="remove" href="javascript:void(0)" title="Remove">',
          '<i class="glyphicon glyphicon-remove"></i>',
          '</a>'
      ].join('');
    },
    getIdSelections: function () {
      return $.map($('#table').bootstrapTable('getSelections'), function (row) {
        return row.id
      });
    },
    getHeight: function () {
      return this.height - $('.nav-tabs').outerHeight(true);
    }
  },
  ready() {
    var cur_component = this,
        $table = $('#table'),
        $remove = $('#remove'),
        $add = $('#add'),
        selections = [];
    layer.config({
      path: '/src/libs/layer-v2.1/layer/' //layer.js所在的目录，可以是绝对目录，也可以是相对目录
    });
    $('[data-toggle="table"]').bootstrapTable({
      data:this.tableData,
      height: cur_component.getHeight(),
      columns: this.columns.header
    });
    // window.operateEvents = {
    //   'click .like': function (e, value, row, index) {
    //     alert('You click like action, row: ' + JSON.stringify(row));
    //   },
    //   'click .remove': function (e, value, row, index) {
    //     $table.bootstrapTable('remove', {
    //         field: 'id',
    //         values: [row.id]
    //     });
    //   }
    // };
    // sometimes footer render error.
    setTimeout(function () {
      $table.bootstrapTable('resetView');
    }, 200);
    $table.on('dbl-click-row.bs.table', function(e, row, tr) {
      this.record = row;
      this.showRight = true;
    });
    // $table.on('check.bs.table uncheck.bs.table ' +
    //         'check-all.bs.table uncheck-all.bs.table', function () {
    //   $remove.prop('disabled', !$table.bootstrapTable('getSelections').length);
    //   // save your data, here just save the current page
    //   selections = cur_component.getIdSelections();
    //   // push or splice the selections if you want to save all data selections
    // });
    // $table.on('expand-row.bs.table', function (e, index, row, $detail) {
    //   if (index % 2 == 1) {
    //     $detail.html('Loading from ajax request...');
    //     $.get('LICENSE', function (res) {
    //       $detail.html(res.replace(/\n/g, '<br>'));
    //     });
    //   }
    // });
    // $table.on('all.bs.table', function (e, name, args) {
    //   console.log(name, args);
    // });
    $add.click(function() {
      var index = layer.open({
        type: 1,
        shade: false,
        title: false, //不显示标题
        content: $('#aaa'), //捕获的元素
        cancel: function(index){
          layer.close(index);
          // this.content.show();
          layer.msg('捕获就是从页面已经存在的元素上，包裹layer的结构', {time: 5000, icon:6});
        }
      });
    });
    $remove.click(function () {
      var ids = cur_component.getIdSelections();
      $table.bootstrapTable('remove', {
          field: 'id',
          values: ids
      });
      $remove.prop('disabled', true);
    });
    $(window).resize(function () {
      $table.bootstrapTable('resetView', {
        height: cur_component.getHeight()
      });
    });
  }
}
</script>