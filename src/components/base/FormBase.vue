<style scoped>
  form div{
    padding-top: 2px;
    padding-bottom: 2px;
  }
  form label {
    text-align: right;
    vertical-align: middle;
    padding-right: 5px;
  }
</style>

<template>
  <div class="form">
    <div class="formheader">
      <slot name="header"></slot>
    </div>
    <div slot="body" class="row">
      <form :class="formtype" v-el:form>
        <div :class="colWidth" v-for="r in fields" v-show="r.xtype!='hidden'">
          <div class="row">
            <label class="col-md-3">{{r.fieldLabel}}:</label>
            <input v-if="!r.xtype || r.xtype == 'text' || r.xtype == 'hidden'" class="col-md-8" :type="r.xtype" :name="r.mapping" v-model="model[r.name]" :value="record[r.mapping]">
            <select v-if="r.xtype == 'select'" class="col-md-8" v-model="model[r.name]">
              <option v-for="option in r.options" v-bind:value="option.value">
                {{ option.text }}
              </option>
            </select>
            <textarea v-if="r.xtype == 'textarea'" class="col-md-8" :name="r.mapping" v-model="model[r.name]" :value="record[r.mapping]">{{record[r.mapping]}}</textarea>
          </div>
        </div>
      </form>
    </div>
    <div class="form-footer pull-right">
      <slot name="footer">
      </slot>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

import store from '../../store'
const { showAlert, showConfirm, hideConfirm } = store.actions

export default {
  props: {
    modelName: { type: String, default: 'model' },
    fields: Array,
    col: Number,
    url: String,
    record: {
      type: Object,
      default: function(){return {}}
    }
  },
  data () {
    return {
      model: {}
    }
  },
  components: {
  },
  watch: {
    'record': function() {
      // this.model = Object.assign({}, this.model, this.record)
      for(var arr in this.record) {
        Vue.set(this.model, this.modelName+'.'+arr, this.record[arr])
      }
    }
  },
  computed: {
    colWidth: function() {
      return 'col-md-'+12/this.col;
    }
  },
  ready() {
  },
  methods: {
    submit: function() {
      var vm = this
      $.ajax({
        type:'POST',
        traditional: true,
        url:vm.url,
        data: this.model,//$(this.$els.form).serialize(),//JSON.stringify(this.model),
        dataType: 'json',
        success:function(res){
          if(res.success) {
            // var data = JSON.parse(res.data)
            for(var p in res.data) {
              vm.record[p] = vm.model[p] = res.data[p]
              // vm.model[p] = data[p]
              showAlert('success','保存成功！')
              // vm.$dispatch('form.post.success')
            }
          }
        },
        error:function(res) {
          console.log(res.responseText)
          var error = JSON.parse(res.responseText)
          // _self.alert.txt = error.error_msg;
          // _self.alert.show = true;
          // _self.alert.hideFn();
          showAlert('danger',error.error_msg)
          // vm.$dispatch('form.post.error',error.error_msg)
          return false;
        }
      })
    }
  },
  events: {
    // 'form.save': function() {
    //   var vm = this
    //   $.ajax({
    //     type:'POST',
    //     traditional: true,
    //     url:vm.url,
    //     data: this.model,//$(this.$els.form).serialize(),//JSON.stringify(this.model),
    //     dataType: 'json',
    //     success:function(res){
    //       if(res.success) {
    //         // var data = JSON.parse(res.data)
    //         for(var p in res.data) {
    //           vm.record[p] = vm.model[p] = res.data[p]
    //           // vm.model[p] = data[p]
    //           showAlert('success','保存成功！')
    //           // vm.$dispatch('form.post.success')
    //         }
    //       }
    //     },
    //     error:function(res) {
    //       console.log(res.responseText)
    //       var error = JSON.parse(res.responseText)
    //       // _self.alert.txt = error.error_msg;
    //       // _self.alert.show = true;
    //       // _self.alert.hideFn();
    //       showAlert('danger',error.error_msg)
    //       // vm.$dispatch('form.post.error',error.error_msg)
    //       return false;
    //     }
    //   })
    // }
  }
}
</script>