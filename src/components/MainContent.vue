<style scoped>
#content{ 
  margin: 0; 
  padding: 0; 
  overflow: hidden;
  /*overflow-x:hidden;*/
  }
</style>

<template>
  <div id="content" :style="{height: height + 'px', width: width + 'px'}">
    <!-- Nav tabs -->
    <tabs :height="height">
      <!--<router-view 
        keep-alive
        transition
        transition-mode="out-in">
      </router-view>-->
      <tab v-for="r in renderData"
        :id="r.id"
        :header="r.header"
        :disabled="r.disabled"
        :close="r.close">
        <components v-if="r.pageType=='nomal'" :is="r.url" keep-alive :height="height-14-29-10" :width="width"></components>
        <iframe v-if="r.pageType=='iframe'" :src="r.url" width="100%" height="100%" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="yes" allowtransparency="yes"></iframe>
      </tab>
    </tabs>
  </div>
</template>

<script>
import tabs from './base/Tabset.vue'
import tab from './base/Tab.vue'
// import VueRouter from 'vue-router'
import MainHome from './MainHome.vue'
import BaseCrudPage from './page/BaseCrudPage.vue'
import BaseFormPage from './page/BaseFormPage.vue'
import SysMenu from './page/SysMenu.vue'

export default {
  props: {
    id: {
      type: String,
      default: ''
    },
    header: {
      type: String,
      default: '首页'
    },
    disabled: {
      type: String,
      default: false
    },
    url: {
      type: String,
      default: ''
    },
    pageType: {
      type: String,
      default: 'nomal'
    },
    width: Number,
    height: Number
  },
  data() {
    return {
      renderData: [],
      currentView: 'home'
    }
  },
  components: {
    'tabs': tabs,
    'tab': tab,
    'home': MainHome,
    'basecrudpage': BaseCrudPage,
    'baseformpage': BaseFormPage,
    'sysmenu': SysMenu
  },
  ready() {
    this.renderData.push({
      'id': 'tab_home',
      'header': '首页 ',
      'url': 'home',
      'disabled': false,
      'close': false,
      'pageType': 'nomal'
    });
  },
  events: {
    //菜单点击响应事件
    'menu-selected': function(obj) {
      for (var c in this.renderData) {
        if(this.renderData[c].id == 'tab_'+obj.id) {
          this.$broadcast('handleTabShow',c,this.renderData[c]);
          return;
        }
      }
      this.addTab(obj);
    },
    //关闭tab页响应事件
    'removeTab': function(obj) {
      this.closeTab(obj);
    }
  },
  methods: {
    addTab : function (obj) {
      this.renderData.push({
        'id': 'tab_'+obj.id,
        'header': obj.header,
        'url': obj.url,
        'disabled': false,
        'close': true,
        'pageType': obj.pageType
      });
    },
    closeTab : function (obj) {
      for(var c in this.renderData) {
        if(this.renderData[c].id == obj.id) {
          this.renderData.splice(c,1);
          return;
        }
      }
    },
    changeTab: function(el) {
      this.$emit('changeTab',el)
    }
  }
}
</script>
