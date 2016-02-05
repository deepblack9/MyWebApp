<style scoped>
  #container { height:100%; margin: 0; padding: 0;}
  #mainbody{ margin: 0; padding: 0;}
</style>

<template>
  <div class="container-fluid" id="container">
    <main-head style="height:60px">{{width}}</main-head>
    <div class="row" id="mainbody">
      <main-sidebar class="col-md-2" :height="bodyHeight" :width="160"></main-sidebar>
      <main-content class="col-md-12" :height="bodyHeight" :width="width - 160"></main-content>
    </div>
    <!-- <main-body :style="{height: bodyHeight + 'px'}" :height="bodyHeight" :width="width"></main-body> -->
    <main-foot style="height:30px"></main-foot>

    <alert
      :show.sync="alertShow"
      :duration="3000"
      :type="alertType"
      width="200px"
      placement="top"
      dismissable>
      {{alertMsg}}
    </alert>

    <modal :show.sync="confirmShow" width="200" small :callback="confirmCallback">
      <div slot="modal-header" class="modal-header">
        <h4 class="modal-title">信息</h4>
      </div>
      <div slot="modal-body" class="modal-body">{{confirmMsg}}</div>
    </modal>
  </div>
</template>

<script>
import store from './store'

import Alert from './components/base/Alert.vue'
import Modal from './components/base/Modal.vue'
// import Aside from './Aside.vue'

import MainHead from './components/MainHead.vue'
// import MainBody from './components/MainBody.vue'
import MainSidebar from './components/MainSidebar.vue'
import MainContent from './components/MainContent.vue'
import MainFoot from './components/MainFoot.vue'

export default {
  props: ['height','width'],
  data() {
    return {
      msg: 'app'
    }
  },
  computed: {
    bodyHeight() {
      return this.height-60-30;
    },
    alertShow: {
      get: function () {
        return store.state.alert.show
      },
      // setter
      set: function (newValue) {
        if(!newValue) {
          store.actions.hideAlert()
        }
      }
    },
    alertType () {
      return store.state.alert.type
    },
    alertMsg () {
      return store.state.alert.msg
    },
    confirmShow: {
      get: function () {
        return store.state.confirm.show
      },
      // setter
      set: function (newValue) {
        if(!newValue) {
          store.actions.hideConfirm()
        }
      }
    },
    confirmMsg () {
      return store.state.confirm.msg
    },
    confirmCallback () {
      return store.state.confirm.callback
    }
  },
  components: {
    'modal': Modal,
    // 'aside': Aside,
    'alert': Alert,
    'main-head': MainHead,
    // 'main-body': MainBody,
    'main-sidebar': MainSidebar,
    'main-content': MainContent,
    'main-foot': MainFoot
  },
  ready() {
  },
  events: {
    'menu-selected': function(obj) {
      this.$broadcast('menu-selected', obj)
    },
    'main-changeTab': function(el) {
      this.$broadcast('main-changeTab',el)
    }
  }
}
</script>