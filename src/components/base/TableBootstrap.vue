<style scoped>
.table-container {
  width:100%;
}
</style>

<template>
  <div class="row table-container" :style="{height: height + 'px'}">
    <div id="toolbar">
      <div class="btn-group">
        <button id="table-add" class="btn btn-default" @click="showForm('add')">
          <i class="fa fa-plus"></i>
        </button>
        <button id="table-edit" class="btn btn-default" @click="showForm('edit')" disabled>
          <i class="fa fa-pencil"></i>
        </button>
        <aide :show.sync="showRight" placement="right" header="Title" :width="350">
          <base-form v-if="formType=='add'" :col="1" :record="{}">
          </base-form>
          <base-form v-if="formType=='edit'" :col="1" :record="record">
          </base-form>
          <!-- <div class="aside-footer">
            <button type="button" class="btn btn-default" @click="showRight = false">Close</button>
          </div> -->
        </aide>
        <button id="table-remove" class="btn btn-default" disabled>
          <i class="glyphicon glyphicon-remove"></i>
        </button>
        <button id="table-search" class="btn btn-default" @click="searchModal = true">
          <i class="glyphicon glyphicon-search"></i>
        </button>
        <modal title="查询条件"
               :show.sync="searchModal" 
               effect="zoom" 
               :width="800">
          <div class="modal-body" slot="modal-body">
            <base-form :col="3">
            </base-form>
          </div>
          <div class="modal-footer" slot="modal-footer">
            <button type="button" class="btn btn-primary" @click="query">查询</button>
          </div>
        </modal>
      </div>
    </div>
    <table id="table"
           data-id-field="id"
           
           data-click-to-select="false"
           data-detail-view="true"
           data-detail-formatter="detailFormatter"
           
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
           data-id-table="advancedTable"
           data-advanced-search="true"

           data-side-pagination="server"
           data-url="http://localhost:8080/static/demo/data.json"
           data-response-handler="responseHandler">-->
    </table>
  </div>
</template>

<script>
import Modal from './Modal.vue'
// import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap-table/dist/bootstrap-table.css'
import 'bootstrap-table/dist/bootstrap-table.js'
// import 'bootstrap-table/dist/extensions/toolbar/bootstrap-table-toolbar.js'
import 'bootstrap-table/dist/extensions/export/bootstrap-table-export.js'
import 'bootstrap/js/dropdown.js'
import '../../libs/layer-v2.1/layer/layer.js'
import Aside from './Aside.vue'
import BaseForm from './BaseForm.vue'

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
      searchModal: false,
      record: {},
      formType: 'add'
    }
  },
  components: {
    'modal': Modal,
    'aide': Aside,
    'base-form': BaseForm
  },
  methods: {
    query: function() {

    },
    showForm: function(type) {
      switch(type) {
        case 'add':
          this.formType = 'add';
          break;
        case 'edit':
          this.formType = 'edit';
          break;
      };
      this.showRight = true;
    },
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
        $remove = $('#table-remove'),
        $add = $('#table-add'),
        $edit = $('#table-edit'),
        selections = [],
        cur_selection = null;
    layer.config({
      path: '/src/libs/layer-v2.1/layer/' //layer.js所在的目录，可以是绝对目录，也可以是相对目录
    });
    $('[data-toggle="table"]').bootstrapTable({
      data:this.tableData,
      height: cur_component.getHeight(),
      columns: this.columns.header
    });
    window.operateEvents = {
      'click .like': function (e, value, row, index) {
        alert('You click like action, row: ' + JSON.stringify(row));
      },
      'click .remove': function (e, value, row, index) {
        $table.bootstrapTable('remove', {
            field: 'id',
            values: [row.id]
        });
      }
    };
    // sometimes footer render error.
    setTimeout(function () {
      $table.bootstrapTable('resetView');
    }, 200);
    //点击选中行
    $table.on('click-row.bs.table', function (e, row, $element) {
      $('.success').removeClass('success');
      $($element).addClass('success');
      $edit.prop('disabled', !row);
      cur_component.record = row;
      cur_selection = row['id'];
    });
    // $table.on('dbl-click-row.bs.table', function(e, row, tr) {
    //   this.record = row;
    //   this.showRight = true;
    // });
    $table.on('check.bs.table uncheck.bs.table ' +
            'check-all.bs.table uncheck-all.bs.table', function () {
      $remove.prop('disabled', !$table.bootstrapTable('getSelections').length);
      // save your data, here just save the current page
      selections = cur_component.getIdSelections();
      // push or splice the selections if you want to save all data selections
    });
    $table.on('expand-row.bs.table', function (e, index, row, $detail) {
      if (index % 2 == 1) {
        $detail.html('Loading from ajax request...');
        $.get('LICENSE', function (res) {
          $detail.html(res.replace(/\n/g, '<br>'));
        });
      }
    });
    // $table.on('all.bs.table', function (e, name, args) {
    //   console.log(name, args);
    // });
    $remove.click(function () {
      var ids = cur_component.getIdSelections();
      var index = layer.confirm('确定要删除'+ids.length+'条记录？',{icon: 3,title:'提示',btn: ['删除','取消']}
      , function(){
        $edit.prop('disabled', true);
        cur_selection = null
        $table.bootstrapTable('remove', {
          field: 'id',
          values: ids
        });        
        $remove.prop('disabled', true);
        layer.close(index);
      }, function(){
        layer.close(index);
      });
    });
    $(window).resize(function () {
      $table.bootstrapTable('resetView', {
        height: cur_component.getHeight()
      });
    });
  }
}
</script>