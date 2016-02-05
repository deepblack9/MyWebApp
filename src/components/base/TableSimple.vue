<style scoped>
.table {
  margin-bottom: 0px;
}
.fixed-table-container table {
  margin-top: 5px;
  table-layout:fixed;
  /*width: 100%;*/
}
.fixed-table-container input[type="radio"],
.fixed-table-container input[type="checkbox"] {
  margin: 0 auto !important;
}
.fixed-table-container .bs-checkbox {
  text-align: center;
  padding: 5px 0;
}
.fixed-table-header {
  overflow: hidden;
}
.fixed-table-body {
  border: 1px solid #ddd;
  margin-top:-1px;
  overflow: auto;
  position: relative;
}
.fixed-table-toolbar .dropdown-menu {
  text-align: left;
  max-height: 300px;
  overflow: auto;
}
.fixed-table-toolbar .btn-group > .btn-group {
  display: inline-block;
  margin-left: -1px !important;
}

.fixed-table-toolbar .btn-group > .btn-group > .btn {
  border-radius: 0;
}
.fixed-table-toolbar .btn-group > .btn-group:first-child > .btn {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.fixed-table-toolbar .btn-group > .btn-group:last-child > .btn {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
.fixed-table-pagination div.pagination,
.fixed-table-pagination .pagination-detail {
  margin-top: 5px;
  margin-bottom: 0px;
}
.fixed-table-pagination div.pagination .pagination {
  margin: 0;
}
.fixed-table-pagination .pagination a {
  padding: 6px 12px;
  line-height: 1.428571429;
}
.fixed-table-pagination .pagination-info {
  line-height: 34px;
  margin-right: 5px;
}
.fixed-table-pagination .btn-group {
  position: relative;
  display: inline-block;
  vertical-align: middle;
}
.fixed-table-pagination .dropup .dropdown-menu {
  margin-bottom: 0;
}
.fixed-table-pagination .page-list {
  display: inline-block;
}
</style>

<template>
  <div class="bootstrap-table" :class="[classes?classes:'table',classes?classes:'table-hover', striped?tableStriped:'', border?'':tableNoBordered]" :style="{height: height + 'px'}">
    <div class="fixed-table-toolbar" v-el:toolbar>
      <div class="btn-group">
        <button id="table-add" class="btn btn-default" @click="showFormModal('add')">
          <i class="fa fa-plus"></i>
        </button>
        <button id="table-edit" class="btn btn-default" @click="showFormModal('edit')">
          <i class="fa fa-pencil"></i>
        </button>
        <form-modal 
          title="编辑角色"
          :show.sync="showForm" 
          effect="zoom" 
          :width="500" 
          :col="1" 
          :fields="formFields" 
          :url="saveUrl" 
          :record="formType=='edit'?selectRow:{}" 
          :model-name="modelName" 
          @after-submit="afterSubmit">
        </form-modal>
        <!-- <modal >
          <div class="modal-body" slot="modal-body">
            <form-modal :col="1" :fields="formFields" :url="saveUrl" :record="formType=='edit'?selectRow:{}" :model-name="modelName" v-ref:data-form>
            </form-modal>
          </div>
          <div class="modal-footer" slot="modal-footer">
            <button type="button" class="btn btn-primary" @click="saveRecord">保存</button>
            <button type="button" class="btn btn-default" @click="showForm = false">取消</button>
          </div>
        </modal> -->
        <button id="table-remove" class="btn btn-default" @click="remove">
          <i class="glyphicon glyphicon-remove"></i>
        </button>
        <button id="table-remove" class="btn btn-default" @click="refresh">
          <i class="glyphicon glyphicon-refresh"></i>
        </button>
        <button id="table-search" class="btn btn-default" @click="searchModal = true">
          <i class="glyphicon glyphicon-search"></i>
        </button>
        <modal title="查询条件"
               :show.sync="searchModal" 
               effect="zoom" 
               :width="800">
          <div class="modal-body" slot="modal-body">
            <form-modal :col="3">
            </form-modal>
          </div>
          <div class="modal-footer" slot="modal-footer">
            <button type="button" class="btn btn-primary" @click="query">查询</button>
          </div>
        </modal>
      </div>
      <slot name="toolbar"></slot>
    </div>
    <div v-el:table-container class="fixed-table-container">
      <div v-el:table-header class="fixed-table-header" v-show='showHeader'>
        <table class="table table-bordered table-striped table-hover table-condensed">
          <thead>
            <tr v-for="row in columns">
              <th v-for="column in row"
                  @click="columnClickHandle(column)"
                  :rowspan="column.rowspan"
                  :colspan="column.colspan"
                  :style="column.style"
                  :class="{'bs-checkbox': column.checkbox}">
                <div v-if="column.checkbox"><input name="btSelectAll" type="checkbox" @click="headCheckHandle"/></div>
                <div v-else>{{column.title}}</div>
              </th>
            </tr>
          </thead>
        </table>
      </div>
      <div v-el:table-body class="fixed-table-body table-responsive"
          :style="{height: height - toolbarHeight - paginationHeight - headerHeight + 'px'}" @scroll="scroll">
        <!-- <div class="fixed-table-loading">
        this.formatLoadingMessage()
        </div> -->
        <table class="table table-bordered table-striped table-hover table-condensed" style="margin-top:-1px">
          <tbody class="fixed-talbe-tbody" :style="{height: height - toolbarHeight - paginationHeight + 'px'}" v-el:table-tbody>
            <tr v-for="row in showData" :class="{'success': selectRow?row[idfield]==selectRow[idfield]:false}" @click="selectRow = row">
              <td v-for="col in tempColumns" :class="{'bs-checkbox': col.checkbox}" :style="col.style">
                <div v-if="col.checkbox"><input type="checkbox" :value="row[idfield]" v-model="checkedItems"/></div>
                <div v-else>{{row[col.field]}}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="fixed-table-footer"><table><tr></tr></table></div>
      <div class="fixed-table-pagination"  :style="{height: paginationHeight+'px'}" style="display: block;" v-if="paginationVAlign === 'bottom' || paginationVAlign === 'both'" v-el:pagination>
        <div class="pull-right pagination-detail">
          <span class="pagination-info">总记录数:{{totalRows}}&nbsp;&nbsp;当前:{{fromRow}}-{{toRow}}&nbsp;&nbsp;</span>
          <span class="page-list">
            每页显示
            <span class="btn-group dropup">
              <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                <span class="page-size">{{pageSize}}</span>
                <span class="caret"></span>
              </button>
              <ul class="dropdown-menu" role="menu">
                <li v-for="value in pageList" @click="changePageSize(pageList[$index])" :class="{active: pageList[$index] == pageSize}"><a href="javascript:void(0)">{{pageList[$index]}}</a></li>
              </ul>
            </span>
            条
          </span>
        </div>
        <div class="pull-left pagination">
          <ul class="pagination">
            <li class="page-first"><a href="#" @click="firstPage"><<</a></li>
            <li class="page-pre"><a href="#" @click="prevPage"><</a></li>
            <li class="page-next"><a href="#" @click="nextPage">></a></li>
            <li class="page-last"><a href="#" @click="lastPage">>></a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'bootstrap/js/dropdown.js'
import Ps from 'perfect-scrollbar'
import 'perfect-scrollbar/dist/css/perfect-scrollbar.css'

import store from '../../store'
const { showAlert, showConfirm, hideConfirm } = store.actions

// import Alert from './Alert.vue'
import Modal from './Modal.vue'
import Aside from './Aside.vue'
import FormModal from './FormModal.vue'

var cachedWidth = null;

// it only does '%s', and return '' when arguments are undefined
var sprintf = function (str) {
    var args = arguments,
        flag = true,
        i = 1;

    str = str.replace(/%s/g, function () {
        var arg = args[i++];

        if (typeof arg === 'undefined') {
            flag = false;
            return '';
        }
        return arg;
    });
    return flag ? str : '';
};
var getFieldIndex = function (columns, field) {
  var index = -1;
  $.each(columns, function (i, column) {
    if (column.field === field) {
      index = i;
      return false;
    }
    return true;
  });
  return index;
};
// http://jsfiddle.net/wenyi/47nz7ez9/3/
var setFieldIndex = function (columns) {
    var i, j, k,
        totalCol = 0,
        flag = [];

    for (i = 0; i < columns[0].length; i++) {
        totalCol += columns[0][i].colspan || 1;
    }

    for (i = 0; i < columns.length; i++) {
        flag[i] = [];
        for (j = 0; j < totalCol; j++) {
            flag[i][j] = false;
        }
    }

    for (i = 0; i < columns.length; i++) {
        for (j = 0; j < columns[i].length; j++) {
            var r = columns[i][j],
                rowspan = r.rowspan || 1,
                colspan = r.colspan || 1,
                index = $.inArray(false, flag[i]);

            if (colspan === 1) {
                r.fieldIndex = index;
                // when field is undefined, use index instead
                if (typeof r.field === 'undefined') {
                    r.field = index;
                }
            }

            for (k = 0; k < rowspan; k++) {
                flag[i + k][index] = true;
            }
            for (k = 0; k < colspan; k++) {
                flag[i][index + k] = true;
            }
        }
    }
};
var getRealHeight = function ($el) {
    var height = 0;
    var children = $el.children
    $el.children().each(function () {
      if (height < $(this).outerHeight(true)) {
        height = $(this).outerHeight(true);
      }
    });
    // for(var index in $el.children) {
    //   if (height < children[index].offsetHeight) {
    //       height = children[index].offsetHeight;
    //   }
    // }
    // $el.children.forEach(function (child) {
    //   if (height < child.offsetHeight) {
    //       height = child.offsetHeight;
    //   }
    // });
    return height;
};
export default {
  props: {
    width: Number,
    height: Number,

    classes: { type: String, default: undefined },
    // locale: undefined,
    // height: undefined,
    // undefinedText: '-',
    // sortName: undefined,
    // sortOrder: 'asc',
    striped: { type: Boolean, default: false },
    border: { type: Boolean, default: true },
    columns: { type: Array, default: function(){return [[]]} },//表头描述，关联数据列
    formFields: { type: Array, default: function() {return []} },//数据表单描述
    modelName: { type: String, default: undefined },//模型名称
    data: { type: Array, default: function(){return []} },//全部数据
    idfield: { type: String, default: undefined },
    // dataField: 'rows',
    // method: 'get',
    queryUrl: { type: String, default: undefined },
    getUrl: { type: String, default: undefined },
    saveUrl: { type: String, default: undefined },
    delUrl: { type: String, default: undefined },
    // ajax: undefined,
    cache: { type: Boolean, default: true },
    contentType: { type: String, default: 'application/json' },
    dataType: { type: String, default: 'json' },
    // ajaxOptions: {},
    // queryParams: function (params) {
    //     return params;
    // },
    // queryParamsType: 'limit', // undefined
    // responseHandler: function (res) {
    //     return res;
    // },
    // pagination: false,
    // onlyInfoPagination: false,
    // sidePagination: 'client', // client or server
    // paginationHAlign: 'right', //right, left
    paginationVAlign: { type: String, default: 'bottom'}, //bottom, top, both
    // paginationDetailHAlign: 'left', //right, left
    // paginationFirstText: '&laquo;',
    // paginationPreText: '&lsaquo;',
    // paginationNextText: '&rsaquo;',
    // paginationLastText: '&raquo;',
    // search: false,
    // strictSearch: false,
    // searchAlign: 'right',
    // selectItemName: 'btSelectItem',
    showHeader: { type: Boolean, default: true }
    // showFooter: false,
    // showColumns: false,
    // showPaginationSwitch: false,
    // showRefresh: false,
    // showToggle: false,
    // buttonsAlign: 'right',
    // smartDisplay: true,
    // minimumCountColumns: 1,
    
    // uniqueId: undefined,
    // cardView: false,
    // detailView: false,
    // detailFormatter: function (index, row) {
    //     return '';
    // },
    // trimOnSearch: true,
    // clickToSelect: false,
    // singleSelect: false,
    // toolbar: undefined,
    // toolbarAlign: 'left',
    // checkboxHeader: true,
    // sortable: true,
    // silentSort: true,
    // maintainSelected: false,
    // searchTimeOut: 500,
    // searchText: '',
    // iconSize: undefined,
    // iconsPrefix: 'glyphicon', // glyphicon of fa (font awesome)
    // icons: {
    //     paginationSwitchDown: 'glyphicon-collapse-down icon-chevron-down',
    //     paginationSwitchUp: 'glyphicon-collapse-up icon-chevron-up',
    //     refresh: 'glyphicon-refresh icon-refresh',
    //     toggle: 'glyphicon-list-alt icon-list-alt',
    //     columns: 'glyphicon-th icon-th',
    //     detailOpen: 'glyphicon-plus icon-plus',
    //     detailClose: 'glyphicon-minus icon-minus'
    // }
  },
  data () {
    return {
      alertType: 'info',
      alertShow: false,
      alertMsg: '',

      confirmShow: false,

      toolbarHeight: 35,
      headerHeight: 0,//表头高度，用于调整表格高度
      // tableHeight: 0,//表格高度
      paginationHeight: 40,//分页高度，用于调整表格高度
      // $tableContainer: $(this.$el).find('.fixed-table-container'),
      // $tableHeader: $(this.$el).find('.fixed-table-header'),
      // $tableBody: $(this.$el).find('.fixed-table-body'),
      // $tableLoading: $(this.$el).find('.fixed-table-loading'),
      // $tableFooter: $(this.$el).find('.fixed-table-footer'),
      // $toolbar: $(this.$el).find('.fixed-table-toolbar'),
      // $pagination: $(this.$el).find('.fixed-table-pagination'),

      tableClass: 'table table-hover',
      tableStriped: 'table-striped',
      tableNoBordered: 'table-no-bordered',

      formType: '',//表单类型（增加、修改）

      showForm: false,
      searchModal: false,

      pageNumber: 1,
      pageSize: 10,
      pageList: [10, 25, 50, 100],
      totalPages: 0,
      totalRows: 0,//记录数
      showData: [],//当前显示的数据
      tempColumns: [],//扁平化的列描述，将符合表头描述整理成1维数组
      header: [],//列属性、样式、事件等
      checkedItems: [],//checkbox选择的行
      selectRow: undefined,//当前选择行
      columnOptions: {
        radio: false,
        checkbox: false,
        checkboxEnabled: true,
        field: undefined,
        title: undefined,
        titleTooltip: undefined,
        'class': undefined,
        align: 'center', // left, right, center
        halign: undefined, // left, right, center
        falign: undefined, // left, right, center
        valign: 'middle', // top, middle, bottom
        width: 60,//undefined,
        sortable: false,
        order: 'asc', // asc, desc
        visible: true,
        switchable: true,
        clickToSelect: true,
        formatter: undefined,
        footerFormatter: undefined,
        events: undefined,
        sorter: undefined,
        sortName: undefined,
        cellStyle: undefined,
        searchable: true,
        searchFormatter: true,
        cardVisible: true
      }
    }
  },
  components: {
    'modal': Modal,
    'aside': Aside,
    'form-modal': FormModal
    // 'alert': Alert
  },
  watch: {
    'height': function() {//表格高度变化后更新滚动条
      Ps.update(this.$els.tableBody);
    },
    'width': function() {
      Ps.update(this.$els.tableBody);
    }
  },
  computed: {
    fromRow: function() {
      return this.pageSize * (this.pageNumber-1) + 1
    },
    toRow: function() {
      return this.pageSize * (this.pageNumber)
    },
    totalPages: function() {
      return ~~((this.totalRows - 1) / this.pageSize) + 1;
    }
  },
  compiled() {
    //处理数据
    this.initData()
    this.initTable()
    this.initHeader()
  },
  ready() {
    this.$nextTick(function() {
      // this.headerHeight = this.$els.tableThead.offsetHeight
      // this.headerHeight = this.$els.tableHeader.offsetHeight
      this.headerHeight = getRealHeight($(this.$els.tableHeader))
      this.paginationHeight = getRealHeight($(this.$els.pagination))
      this.toolbarHeight = getRealHeight($(this.$els.toolbar))
      this.tableHeight = this.height - this.toolbarHeight - this.paginationHeight
      Ps.initialize(this.$els.tableBody);
    })
  },
  methods: {
    refresh: function() {
      console.log('refresh')
      this.data = []
      this.showData = []
      this.initData()
    },
    scroll: function(event) {
      this.$els.tableHeader.scrollLeft = event.target.scrollLeft
    },
    initData: function() {
      var that = this
      if(this.data && this.data.length > 0) {
        this.showData = that.data.slice((this.pageNumber-1)*this.pageSize,this.pageNumber*this.pageSize)
        this.checkedItems = []
      } else {
        if(this.queryUrl) {
          $.get(this.queryUrl,function(data,status) {
            if(status == 'success') {
              that.data = data.data
              that.showData = that.data.slice(0,that.pageSize)
              that.totalRows = data.total
            }
          });
        }
      }
    },
    remove: function() {
      var that = this
      if(this.checkedItems && this.checkedItems.length) {
        showConfirm('确定删除'+this.checkedItems.length+'条数据？', function(){
          $.ajax({  
            type: 'post',
            traditional: true,
            url: that.delUrl,
            data: { 'ids': that.checkedItems },
            success: function(data,status){
              if(status == 'success') {
                that.refresh()
                // for(var index = 0; index < that.showData.length; index++) {
                //   for(var idIndex = 0; idIndex < that.checkedItems.length; idIndex++) {
                //     if(that.checkedItems[idIndex] == that.showData[index][that.idfield]) {
                //       that.showData.$remove(that.showData[index])
                //     }
                //   }
                // }
                // that.totalRows = that.totalRows - that.checkedItems.length
                showAlert('success','删除成功！')
              } else {
                showAlert('danger','删除失败！')
              }
            }
          })
          hideConfirm()
        })
      } else if(this.selectRow) {
        showConfirm('确定删除1条数据？', function() {
            $.ajax({
              type: 'post',  
              traditional: true,  
              url: that.delUrl,  
              data: { 'ids': that.selectRow[that.idfield] },
              success: function(data,status){
                if(status == 'success') {
                  that.refresh()
                  // for(var index = 0; index < that.showData.length; index++) {
                  //   for(var idIndex = 0; idIndex < that.checkedItems.length; idIndex++) {
                  //     if(that.checkedItems[idIndex] == that.showData[index][that.idfield]) {
                  //       that.showData.$remove(that.showData[index])
                  //     }
                  //   }
                  // }
                  // that.totalRows = that.totalRows - that.checkedItems.length
                  showAlert('success','删除成功！')
                } else {
                  showAlert('danger','删除失败！')
                }
              }
            })
            hideConfirm()
          }
        )
      } else {
        showAlert('warning','请选择一条数据！')
      }
    },
    initTable: function () {
      setFieldIndex(this.columns)
      var that = this
      $.each(this.columns, function (i, columns) {
        $.each(columns, function (j, column) {
          column = $.extend({}, that.columnOptions, column);
          if (typeof column.fieldIndex !== 'undefined') {
            that.tempColumns.$set(column.fieldIndex, column);
          }
          that.columns[i].$set(j, column)
        });
      });
    },
    initHeader: function () {
      var that = this,
          visibleColumns = {},
          html = [];

      this.header = {
          fields: [],
          styles: [],
          classes: [],
          formatters: [],
          events: [],
          sorters: [],
          sortNames: [],
          cellStyles: [],
          searchables: []
      };
      $.each(this.columns, function (i, columns) {
          // html.push('<tr>');

          // if (i == 0 && !that.options.cardView && that.options.detailView) {
          //     html.push(sprintf('<th class="detail" rowspan="%s"><div class="fht-cell"></div></th>',
          //         that.options.columns.length));
          // }

          $.each(columns, function (j, column) {
              var text = '',
                  halign = '', // header align style
                  align = '', // body align style
                  style = '',
                  class_ = sprintf(' class="%s"', column['class']),
                  // order = that.options.sortOrder || column.order,
                  unitWidth = 'px',
                  width = column.width;

              if (column.width !== undefined) {
                if (typeof column.width === 'string') {
                  if (column.width.indexOf('%') !== -1) {
                    unitWidth = '%';
                  }
                }
              }
              if (column.width && typeof column.width === 'string') {
                  width = column.width.replace('%', '').replace('px', '');
              }

              halign = sprintf('text-align: %s; ', column.halign ? column.halign : column.align);
              align = sprintf('text-align: %s; ', column.align);
              style = sprintf('vertical-align: %s; ', column.valign);
              style += sprintf('width: %s; ', (column.checkbox || column.radio)?
                  '36px' : (width ? width + unitWidth : undefined));

              if (typeof column.fieldIndex !== 'undefined') {
                that.header.fields[column.fieldIndex] = column.field;
                that.header.styles[column.fieldIndex] = align + style;
                that.header.classes[column.fieldIndex] = class_;
                that.header.formatters[column.fieldIndex] = column.formatter;
                that.header.events[column.fieldIndex] = column.events;
                that.header.sorters[column.fieldIndex] = column.sorter;
                that.header.sortNames[column.fieldIndex] = column.sortName;
                that.header.cellStyles[column.fieldIndex] = column.cellStyle;
                that.header.searchables[column.fieldIndex] = column.searchable;

                if (!column.visible) {
                    return;
                }

                // if (that.options.cardView && (!column.cardVisible)) {
                //     return;
                // }

                visibleColumns[column.field] = column;
              }
              if (column.checkbox) {
                that.header.stateField = column.field;
              }

              column.style = halign + style
              // sprintf(' style="%s"', halign + style),
              // sprintf(' rowspan="%s"', column.rowspan),
              // sprintf(' colspan="%s"', column.colspan),
              // sprintf(' data-field="%s"', column.field),
              // "tabindex='0'",
              // '>');
              // html.push(sprintf('<div class="th-inner %s">', that.options.sortable && column.sortable ?
              //       'sortable both' : ''));
          });
      });
    },
    columnClickHandle: function(column,event) {
      if(column.checkbox) {
        var rows;
        
        // if (!checked) {
        //     rows = this.getSelections();
        // }
        // this.$selectAll.add(this.$selectAll_).prop('checked', checked);
        // this.$selectItem.filter(':enabled').prop('checked', checked);
        // this.updateRows();
        // if (checked) {
        //     rows = this.getSelections();
        // }
        // this.trigger(checked ? 'check-all' : 'uncheck-all', rows);
      } else {
        // sortBy(key)
      }
    },
    headCheckHandle: function(event) {
      this.checkedItems = []
      if(event.target.checked) {
        for(var index = 0; index < this.data.length; index++) {
          this.checkedItems.push(this.data[index][this.idfield])
        }
      }
    },
    firstPage: function() {
      this.pageNumber = 1
      this.initData()
    },
    prevPage: function () {
      if (this.pageNumber > 1) {
        this.pageNumber--
        this.initData()
      }
    },
    nextPage: function () {
      if (this.pageNumber < this.totalPages) {
        this.pageNumber++
        this.initData()
      }
    },
    lastPage: function() {
      this.pageNumber = this.totalPages
      this.initData()
    },
    changePageSize: function (value) {
      this.pageSize = value
      this.initData()
    },
    showFormModal: function(type) {
      switch(type) {
        case 'add':
          this.formType = 'add';
          this.showForm = true;
          break;
        case 'edit':
          if(this.selectRow) {
            this.formType = 'edit';
            this.showForm = true;
          } else {
            showAlert('warning','请选择一条数据！')
          }
        break;
      };
    },
    afterSubmit: function() {
      if(this.formType == 'add') {
        this.data.push(this.selectRow)
        this.refresh()
      } else if(this.formType == 'edit') {

      }
    },
    query: function() {

    }
  },
  events: {
  }
}
</script>