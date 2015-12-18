<style scoped>
.treeView {
  height: 100%;
  margin: 0px;
}
.panel {
  height:100%;
}
.panel-body {
  overflow-y: auto;
}
.panel-tools a {
  padding: 2px;
}
.panel-tools ul>li  {
  padding-left: 5px;
}
.treeView>div {
  padding-left: 5px;
  padding-right: 5px;
}
</style>

<template>
  <div class="row treeView">
    <div class="col-md-6">
      <div class="panel panel-default" :style="{height: height + 'px'}">
        <div class="panel-heading">菜单列表
          <div class="panel-tools btn-group pull-right">
            <a class="dropdown" data-toggle="dropdown"><i class="fa fa-plus fa-lg"></i></a>
            <ul class="dropdown-menu" role="menu">
              <li><a href="#" @click="addBrother">添加同级</a></li>
              <li><a href="#" @click="addChild">添加下级</a></li>
            </ul>
            <a class=""><i class="fa fa-minus fa-lg"></i></a>
          </div>
        </div>
        <div class="panel-body" :style="{height: height-30-14 + 'px'}">
          <tree :treeData="treeData" :URL="treeURL" :height="height">
          </tree>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <panel header="菜单编辑" :isOpen="true" :height="height">
        <div slot="header" class="panel-tools pull-right">
          <a class=""><i class="fa fa-save fa-lg"></i></a>
        </div>
        <base-form slot="body" :fields="formFields" :record="currentNode" :col="1">
        </base-form>
      </panel>
    </div>
    <!-- <div class="col-md-3">
      <div class="panel panel-default" :style="{height: height + 'px'}">
        <div class="panel-heading">菜单编辑
          <div class="panel-tools pull-right">
            <a class=""><i class="fa fa-save fa-lg"></i></a>
          </div>
        </div>
        <div class="panel-body" :style="{height: height-30-14 + 'px'}">
          <base-form :fields="formFields" :record="currentNode" :col="1">
          </base-form>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import Panel from '../base/Panel.vue'
import Tree from '../base/Tree.vue'
import BaseForm from '../base/BaseForm.vue'

var formFields = [{name:'model.resourceId',mapping:'resourceId',fieldLabel:'resourceId',xtype:'hidden'},
    {name:'model.upResourceId',mapping:'upResourceId',fieldLabel:'父资源ID',maxLength:32,xtype:'hidden'},
    {name:'model.resourceCode',mapping:'resourceCode',fieldLabel:'资源代码',allowBlank:false,maxLength:50,width:400},
    {name:'model.text',mapping:'text',fieldLabel:'资源文本',maxLength:100,width:400},
    {name:'model.uri',mapping:'uri',fieldLabel:'链接地址',maxLength:200,columnWidth:1,width:400},
    {name:'model.description',mapping:'description',fieldLabel:'资源描述',columnWidth:1,maxLength:200,width:400},
    {name:'model.icon',mapping:'icon',fieldLabel:'图标样式',maxLength:200,width:400},
    // {
    //   name:"model.visible", hiddenName:"model.visible",mapping:'visible', fieldLabel:"是否显示", xtype:"combo",
    //   editable:false, blankText: '请选择',lazyInit:false,store:booleanStore,valueField:'key',
    //   displayField:'value',triggerAction: 'all',autoShow : true,queryDelay:0,mode: 'local',
    //   listWidth :136,width:400,defaultValue:1
    // },
    // {
    //   name:"model.enable", hiddenName:"model.enable", mapping:'enable',fieldLabel:"是否可用", xtype:"combo",
    //   editable:false, blankText: '请选择',lazyInit:false,store:booleanStore,valueField:'key',
    //   displayField:'value',triggerAction: 'all',autoShow : true,queryDelay:0,mode: 'local',
    //   listWidth :136,width:400,defaultValue:1
    // },    
    {name:'model.leaf',mapping:'leaf',fieldLabel:'叶子节点否',xtype:'numberfield',allowNegative:false,maxLength:1,xtype:'hidden'},
    {name:'model.tabName',mapping:'tabName',fieldLabel:'表英文名称',xtype:'hidden'},
    {
      clearName:'model.tabName',name:'model.tabCnName',hiddenName:'model.tabCnName',mapping:'tabCnName',
      fieldLabel:'表中文名称',xtype:'ttcombobox',editable:false,width:400,
      onBtnClick:function(val,rawVal){
        tabSelWin.show();
      }
    },
    {name:'model.resourceOrder',mapping:'resourceOrder',fieldLabel:'资源顺序',xtype:'numberfield',allowNegative:false,maxLength:5,xtype:'hidden'},
    {
      xtype:'panel',
      fieldLabel:'展开节点',
      border:false,
      layout:'column',
      bodyStyle:"background-color:#D6E3F2;height:23px;",
      defaults: {
          baseCls :'x-plain'
      },
      items:[
        {boxLabel: '否',name: 'model.expanded',mapping:'expanded', inputValue:0,xtype:'radio',width:50,checked:true},
        {boxLabel: '是',name: 'model.expanded',mapping:'expanded', inputValue:1, xtype:'radio'}
      ]
    }
  ];
export default {
  props: {
    height: Number
  },
  data: function () {
    return {
      treeURL: CONTEXT_PATH+'/security/queryTreeAllResc.do',
      getUrl: CONTEXT_PATH+'/security/getSingleResc.do',
      saveUrl: CONTEXT_PATH+'/security/saveResc.do',
      saveOrderUrl: CONTEXT_PATH+'/security/saveOrderResc.do',
      deleteUrl:CONTEXT_PATH+'/security/deleteResc.do',
      formFields: formFields,
      currentNode: {}
    }
  },
  components: {
    'panel': Panel,
    'tree': Tree,
    'base-form': BaseForm
  },
  ready() {
    
  },
  methods:{
    addChild: function () {
      this.model.children.push({
        name: 'new stuff'
      })
    },
    addBrother: function() {

    }
  },
  events: {
    'tree.nodeSelected': function(currModel) {
      var vm = this
      if(!currModel.id) return 
      $.post(this.getUrl,
      {
        'treeNode.id': currModel.id
      },
      function(data,status){
        if(status == 'success') {
          vm.currentNode = data.data
        }
      })
    }
  }
}
</script>