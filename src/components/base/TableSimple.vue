<style scoped>
table {
  margin-bottom: 0px;
}
.fixed-table-body {
  overflow-x: auto;
  overflow-y: auto;
  height: 100%;
}
</style>

<template>
  <div class="bootstrap-table" :class="[classes?classes:'table',classes?classes:'table-hover', striped?tableStriped:'', border?'':tableNoBordered]" :style="{height: height + 'px'}">
    <div class="fixed-table-toolbar" v-el:toolbar><slot name="toolbar"></slot></div>
    <div class="fixed-table-pagination" style="clear: both;" v-if="paginationVAlign === 'top' || paginationVAlign === 'both'"></div>
    <div class="fixed-table-container" :class="[border?'':'table-no-bordered']" :Style="{height: tableHeight + 'px'}">
      <div class="fixed-table-header" :style="{'margin-right': scrollWidth + 'px'}" v-show='showHeader' v-el:table-header>
        <table class="table table-bordered">
          <tr v-for="row in columns">
            <th v-for="column in row"
                @click="sortBy(key)"
                rowspan="{{column.rowspan}}"
                colspan="{{column.colspan}}"
                style="text-align: center; vertical-align: middle;">
              {{column.title}}
            </th>
          </tr>
        </table>
      </div>
      <div class="fixed-table-body" v-el:table-body>
        <!-- <div class="fixed-table-loading">
        this.options.formatLoadingMessage()
        </div> -->
        <table class="table table-bordered" :style="{'margin-top': headerHeight+'px'}">
          <thead>
            <tr v-for="row in columns">
              <th v-for="column in row"
                  @click="sortBy(key)"
                  rowspan="{{column.rowspan}}"
                  colspan="{{column.colspan}}"
                  :style="{width: column.colspan * column.width}"
                  style="border-bottom: 1px; text-align: center; vertical-align: middle;">
                {{column.title}}
              </th>
            </tr>
          </thead>
          <tbody class="fixed-talbe-tbody">
            <tr v-for="row in data">
              <td v-for="col in header.fields">{{row[col]}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="fixed-table-footer"><table><tr></tr></table></div>
      <div class="fixed-table-pagination" v-if="paginationVAlign === 'bottom' || paginationVAlign === 'both'" v-el:pagination></div>
    </div>
  </div>
</template>

<script>
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
var getScrollBarWidth = function () {
  if (cachedWidth === null) {
    var inner = $('<p/>').addClass('fixed-table-scroll-inner'),
        outer = $('<div/>').addClass('fixed-table-scroll-outer'),
        w1, w2;

    outer.append(inner);
    $('body').append(outer);

    w1 = inner[0].offsetWidth;
    outer.css('overflow', 'scroll');
    w2 = inner[0].offsetWidth;

    if (w1 === w2) {
      w2 = outer[0].clientWidth;
    }

    outer.remove();
    cachedWidth = w1 - w2;
  }
  return cachedWidth;
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
    height: Number,

    classes: { type: String, default: undefined },
    // locale: undefined,
    // height: undefined,
    // undefinedText: '-',
    // sortName: undefined,
    // sortOrder: 'asc',
    striped: { type: Boolean, default: false },
    border: { type: Boolean, default: true },
    columns: { type: Array, default: function(){return [[]]} },
    data: { type: Array, default: function(){return []} },
    // dataField: 'rows',
    // method: 'get',
    url: { type: String, default: undefined },
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
    // totalRows: 0, // server side need to set
    // pageNumber: 1,
    // pageSize: 10,
    // pageList: [10, 25, 50, 100],
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
    // idField: undefined,
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

      header: []
      // columnOptions: {
      //   radio: false,
      //   checkbox: false,
      //   checkboxEnabled: true,
      //   field: undefined,
      //   title: undefined,
      //   titleTooltip: undefined,
      //   'class': undefined,
      //   align: undefined, // left, right, center
      //   halign: undefined, // left, right, center
      //   falign: undefined, // left, right, center
      //   valign: undefined, // top, middle, bottom
      //   width: undefined,
      //   sortable: false,
      //   order: 'asc', // asc, desc
      //   visible: true,
      //   switchable: true,
      //   clickToSelect: true,
      //   formatter: undefined,
      //   footerFormatter: undefined,
      //   events: undefined,
      //   sorter: undefined,
      //   sortName: undefined,
      //   cellStyle: undefined,
      //   searchable: true,
      //   searchFormatter: true,
      //   cardVisible: true
      // }
    }
  },
  components: {
  },
  watch: {
  },
  computed: {
    scrollWidth: function() {
      var fixedBody = this.$els.tableBody.children[0];
      return fixedBody.scrollWidth > fixedBody.clientWidth &&
        fixedBody.scrollHeight > fixedBody.clientHeight + this.$els.tableHeader.offsetHeight ?
            getScrollBarWidth() : 0;
    },
    tableHeight: function() {
      var toolbarHeight = getRealHeight($(this.$els.toolbar)),
          paginationHeight = getRealHeight($(this.$els.pagination))
      return this.height - toolbarHeight - paginationHeight
    },
    headerHeight: function() {
      return 0 - this.$els.tableHeader.offsetHeight
    },
    viewData: function() {
      var result
      for(var row in this.data) {

      }
      result = this.data
      return result
    }
  },
  ready() {
    setFieldIndex(this.columns)
    this.initHeader()
  },
  methods: {
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

              if (column.width !== undefined && (!that.options.cardView)) {
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
              style += sprintf('width: %s; ', (column.checkbox || column.radio) && !width ?
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
          });
      });
    }
  },
  events: {
  }
}
</script>