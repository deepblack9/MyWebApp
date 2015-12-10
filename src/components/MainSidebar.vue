<style scoped>
  #sidebar{ height:100%; margin: 0; padding: 0; background:#0a1012; overflow: auto;}
</style>

<template>
  <div class="col-md-2" id="sidebar">
    <div class="sidebar-nav">
      <ul class="metismenu" id="menu">
        <li class="active">
          <a href="#"><i class="fa fa-table"></i> <span class="nav-label">表格</span><span class="glyphicon arrow"></span></a>
          <ul class="nav nav-second-level">
            <!--<li><a class="J_menuItem" href="#" @click="click('basecrudpage','基本数据维护','crudview','nomal')">基本数据维护</a></li>-->
            <li><a class="J_menuItem" href="#" @click="click('basecrudpage','基本数据维护','basecrudpage','nomal')">基本数据维护</a></li>
            <li><a class="J_menuItem" href="#" @click="click('baseformpage','表单验证','baseformpage','nomal')">表单验证</a></li>
            <li><a class="J_menuItem" href="table_jqgrid.html">jqGrid</a>
            </li>
            <li><a class="J_menuItem" href="table_foo_table.html">Foo Tables</a>
            </li>
            <li><a class="J_menuItem" href="table_bootstrap.html">Bootstrap Table
                <span class="label label-danger pull-right">推荐</span></a>
            </li>
          </ul>
        </li>
        <li>
          <a href="#" aria-expanded="false">Menu 1 <span class="glyphicon 
arrow"></span></a>
          <ul aria-expanded="false">
            <li><a href="#">item 1.1</a></li>
            <li><a href="#">item 1.2</a></li>
            <li>
              <a href="#" aria-expanded="false">Menu 1.3 <span class="fa 
plus-times"></span></a>
              <ul aria-expanded="false">
                <li><a href="#">item 1.3.1</a></li>
                <li><a href="#">item 1.3.2</a></li>
                <li><a href="#">item 1.3.3</a></li>
                <li><a href="#">item 1.3.4</a></li>
              </ul>
            </li>
            <li><a href="#">item 1.4</a></li>
            <li>
              <a href="#" aria-expanded="false">Menu 1.5 <span class="fa 
plus-minus"></span></a>
              <ul aria-expanded="false">
                <li><a href="#">item 1.5.1</a></li>
                <li><a href="#">item 1.5.2</a></li>
                <li><a href="#">item 1.5.3</a></li>
                <li><a href="#">item 1.5.4</a></li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <a href="#" aria-expanded="false">
            <span class="sidebar-nav-item-icon fa fa-github fa-lg"></span>
            <span class="sidebar-nav-item">metisMenu</span>
            <span class="glyphicon arrow"></span>
          </a>
          <ul aria-expanded="false">
            <li>
              <a href="https://github.com/onokumus/metisMenu">
                <span class="sidebar-nav-item-icon fa fa-code-fork"></span>
                Fork
              </a>
            </li>
            <li>
              <a href="https://github.com/onokumus/metisMenu">
                <span class="sidebar-nav-item-icon fa fa-star"></span>
                Star
              </a>
            </li>
            <li>
              <a href="https://github.com/onokumus/metisMenu/issues">
                <span class="sidebar-nav-item-icon fa 
fa-exclamation-triangle"></span>
                Issues
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import '../libs/metisMenu.js'
import '../libs/metisMenu.css'
import '../libs/sidebar.css'

export default {
  data () {
    return {
      msg: 'Hello from Component A!!!',
      treeData: {"data":[{}]}
    }
  },
  ready() {
    // $.ajax({
    //   url: 'http://localhost:9090/security/queryTreeNoAuthResource.action',
    //   success: function(data) {
    //     alert(data);
    //   }
    // })
  },
  methods: {
    click: function(url, text, id, pageType, event) {
      var obj = {
        "id": id,
        "url": url,
        "header": text,
        "pageType": pageType
      };
      this.$dispatch('chengeCurMenu', obj);
      return false;
    }
  }
}
</script>
