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
    <alert
      :show.sync="alertShow"
      :duration="3000"
      :type="alertType"
      width="200px"
      dismissable>
      {{alertMsg}}
    </alert>
    <div class="col-md-6">
      <div class="panel panel-default" :style="{height: height + 'px'}">
        <div class="panel-heading">菜单列表
          <div class="panel-tools btn-group pull-right">
            <a @click="refresh"><i class="fa fa-refresh fa-lg"></i></a>
            <a class="dropdown" data-toggle="dropdown"><i class="fa fa-plus fa-lg"></i></a>
            <ul class="dropdown-menu" role="menu">
              <li><a @click="addBrother">添加同级</a></li>
              <li><a @click="addChild">添加下级</a></li>
            </ul>
            <a @click="deleteNode"><i class="fa fa-minus fa-lg"></i></a>
          </div>
        </div>
        <div class="panel-body" :style="{height: height-30-14 + 'px'}">
          <!-- <tree :treeData="treeData"></tree> -->
          <tree>
            <tree-item v-for="model in treeData" :model="model" @node-selected="treeNodeSelected"></tree-item>
          </tree>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <panel header="菜单编辑" :isOpen="true" :height="height-30-14">
        <div slot="header" class="panel-tools pull-right">
          <a @click="saveMenu"><i class="fa fa-save fa-lg"></i></a>
        </div>
        <base-form slot="body" :fields="formFields" :url="saveUrl" :record="currentNode" :col="1">
        </base-form>
      </panel>
    </div>
  </div>
</template>

<script>
// var Utils = require('../../libs/utils.js')
import Utils from '../../libs/utils.js'
import Panel from '../base/Panel.vue'
import Tree from '../base/Tree.vue'
import TreeItem from '../base/TreeItem.vue'
import BaseForm from '../base/BaseForm.vue'
import Alert from '../base/Alert.vue'

var formFields = [{name:'model.resourceId',mapping:'resourceId',fieldLabel:'resourceId',xtype:'hidden'},
    {name:'model.upResourceId',mapping:'upResourceId',fieldLabel:'父资源ID',maxLength:32,xtype:'hidden'},
    {name:'model.resourceCode',mapping:'resourceCode',fieldLabel:'资源代码',allowBlank:false,maxLength:50,width:400},
    {name:'model.text',mapping:'text',fieldLabel:'资源文本',maxLength:100,width:400},
    {name:'model.uri',mapping:'uri',fieldLabel:'链接地址',maxLength:200,columnWidth:1,width:400},
    {name:'model.description',mapping:'description',fieldLabel:'资源描述',columnWidth:1,maxLength:200,width:400},
    {name:'model.icon',mapping:'icon',fieldLabel:'图标样式',maxLength:200,width:400},
    {name:"model.visible", mapping:'visible', fieldLabel:"是否显示", xtype:"hidden"},
    // {
    //   name:"model.visible", hiddenName:"model.visible",mapping:'visible', fieldLabel:"是否显示", xtype:"combo",
    //   editable:false, blankText: '请选择',lazyInit:false,store:booleanStore,valueField:'key',
    //   displayField:'value',triggerAction: 'all',autoShow : true,queryDelay:0,mode: 'local',
    //   listWidth :136,width:400,defaultValue:1
    // },
    {name:"model.enable", mapping:'enable',fieldLabel:"是否可用", xtype:"hidden"},
    // {
    //   name:"model.enable", hiddenName:"model.enable", mapping:'enable',fieldLabel:"是否可用", xtype:"combo",
    //   editable:false, blankText: '请选择',lazyInit:false,store:booleanStore,valueField:'key',
    //   displayField:'value',triggerAction: 'all',autoShow : true,queryDelay:0,mode: 'local',
    //   listWidth :136,width:400,defaultValue:1
    // },    
    {name:'model.leaf',mapping:'leaf',fieldLabel:'叶子节点否',xtype:'hidden'},
    // {name:'model.tabName',mapping:'tabName',fieldLabel:'表英文名称',xtype:'hidden'},
    // {
    //   clearName:'model.tabName',name:'model.tabCnName',hiddenName:'model.tabCnName',mapping:'tabCnName',
    //   fieldLabel:'表中文名称',xtype:'ttcombobox',editable:false,width:400,
    //   onBtnClick:function(val,rawVal){
    //     tabSelWin.show();
    //   }
    // },
    {name:'model.resourceOrder',mapping:'resourceOrder',fieldLabel:'资源顺序',xtype:'text'},
    // {name:'model.expanded',mapping:'expanded',fieldLabel:'展开节点',xtype:'hidden'}
    // {
    //   xtype:'panel',
    //   fieldLabel:'展开节点',
    //   border:false,
    //   layout:'column',
    //   bodyStyle:"background-color:#D6E3F2;height:23px;",
    //   defaults: {
    //       baseCls :'x-plain'
    //   },
    //   items:[
    //     {boxLabel: '否',name: 'model.expanded',mapping:'expanded', inputValue:0,xtype:'radio',width:50,checked:true},
    //     {boxLabel: '是',name: 'model.expanded',mapping:'expanded', inputValue:1, xtype:'radio'}
    //   ]
    // }
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
      treeData: [],
      currentPNode: {},
      currentNode: {},
      alertType: 'info',
      alertShow: false,
      alertMsg: ''
    }
  },
  components: {
    'panel': Panel,
    'tree': Tree,
    'tree-item': TreeItem,
    'base-form': BaseForm,
    'alert': Alert
  },
  created() {
    var vm = this
    //树数据初始化
    $.get(this.treeURL,function(data,status) {
      if(status == 'success') {
        vm.treeData.splice(0,vm.treeData.length)
        vm.treeData = data
      }
    });
    //form数据初始化
    // for(var index = 0; index < this.formFields.length; index++) {
    //   var field = this.formFields[index]
    //   this.$set('currentNode.'+field.mapping,'')
    // }
  },
  methods:{
    showAlert: function(type,msg) {
      this.alertShow = false
        this.alertType = type
        this.alertMsg = msg
        this.alertShow = true
    },
    refresh: function() {
      var vm = this
      $.get(this.treeURL,function(data,status) {
        if(status == 'success') {
          vm.treeData.splice(0,vm.treeData.length)
          vm.treeData = data
          vm.currentNode = {}
        }
      });
    },
    addChild: function() {
      //选中一个节点
      if(!Utils.isEmpty(this.currentNode)) {
        var node = {text:'新建节点',upResourceId:this.currentNode.resourceId}
        // this.$broadcast('tree.selectNode',node)
        //是否有下级
        if(this.currentNode.children) {
          this.currentNode.children.push(node)
        } else {
          this.currentNode.$set('children',[node])
        }
        this.currentNode.expanded = true
        this.currentNode = node
      } else {
        this.showAlert('warning','请选择一个节点！')
      }
    },
    addBrother: function() {
      //选中一个节点
      if(!Utils.isEmpty(this.currentNode)) {
        var node = {text:'新建节点',upResourceId:this.currentNode.upResourceId}
        //是否有下级
        if(this.currentNode.upResourceId) {
          this.currentPNode.children.push(node)
        } else {
          this.treeData.push(node)
        }
        this.currentNode = node
      } else {
        this.showAlert('warning','请选择一个节点！')
      }
    },
    deleteNode: function() {
      var vm = this
      if(!Utils.isEmpty(this.currentNode)) {
        $.post(vm.deleteUrl,
          {
            'model.resourceId': vm.currentNode.resourceId
          },
          function(data,status) {
            if(status == 'success'){
              if(vm.currentPNode) {
                vm.currentPNode.children.$remove(vm.currentNode)
              } else {
                //删除顶层节点
                vm.treeData.$remove(vm.currentNode)
              }
              vm.currentNode = {}
            }
          }
        );
      } else {
        alert('请选择一个节点！')
      }
    },
    saveMenu: function() {
      if(!Utils.isEmpty(this.currentNode))
        this.$broadcast('form.save')
      else {
        this.showAlert('warning','请选择一个节点！')
      }
    },
    treeNodeSelected: function(currModel,parentModel) {
      this.currentNode = currModel
      this.currentPNode = parentModel
    }
  },
  events: {
    'tree.nodeSelected': function(currModel,parentModel) {
      this.currentNode = currModel
      this.currentPNode = parentModel
    },
    'form.post.success': function() {
      this.showAlert('success','节点保存成功！')
    },
    'form.post.error': function(msg) {
      this.showAlert('danger',msg)
    }
  }
}
</script>