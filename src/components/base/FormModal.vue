<template>
  <div role="dialog"
    v-bind:class="{
    'modal':true,
    'fade':effect === 'fade',
    'zoom':effect === 'zoom'
    }"
    >
    <div v-bind:class="{'modal-dialog':true,'modal-lg':large,'modal-sm':small}" role="document"
      v-bind:style="{width: optionalWidth}">
      <div class="modal-content">
        <slot name="modal-header">
          <div class="modal-header">
            <button type="button" class="close" @click="close"><span>&times;</span></button>
            <h4 class="modal-title" >{{title}}</h4>
          </div>
        </slot>
        <slot name="modal-body">
          <div class="modal-body">
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
        </slot>
        <slot name="modal-footer">
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="submit">保存</button>
            <button type="button" class="btn btn-default" @click="show = false">取消</button>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

import store from '../../store'
const { showAlert, showConfirm, hideConfirm } = store.actions

import getScrollBarWidth from './utils/getScrollBarWidth.js'
import EventListener from './utils/EventListener.js'

  export default {
    props: {
      modelName: { type: String, default: 'model' },
      fields: Array,
      col: Number,
      url: String,
      record: { type: Object, default: function(){return {}} },

      title: { type: String, default: '' },
      show: { require: true, type: Boolean, twoWay: true },
      width: { default: null },
      callback: { type: Function, default() {} },
      effect: { type: String, default: null },
      backdrop: { type: Boolean, default: true },
      large: { type: Boolean, default: false },
      small: { type: Boolean, default: false }
    },
    data () {
      return {
        model: {}
      }
    },
    watch: {
      'record': function() {
        // this.model = Object.assign({}, this.model, this.record)
        for(var arr in this.record) {
          Vue.set(this.model, this.modelName+'.'+arr, this.record[arr])
        }
      },
      'show': function() {
        if(!this.show) {
          this.model = {}
        }
      }
    },
    ready() {
      this.$watch('show', (val)=> {
        const el = this.$el
        const body = document.body
        const scrollBarWidth =  getScrollBarWidth()
        if (val) {
          el.querySelector('.modal-content').focus()
          el.style.display = 'block'
          setTimeout(()=> el.classList.add('in'), 0)
          body.classList.add('modal-open')
          if (scrollBarWidth !== 0) {
            body.style.paddingRight = scrollBarWidth + 'px'
          }
          if (this.backdrop) {
            this._blurModalContentEvent = EventListener.listen(this.$el, 'click', (e)=> {
              if (e.target === el) this.show = false
            })
          }
        } else {
          if (this._blurModalContentEvent) this._blurModalContentEvent.remove()
          el.classList.remove('in')
          setTimeout(()=> {
            el.style.display = 'none'
            body.classList.remove('modal-open')
            body.style.paddingRight = '0'
          }, 300)
        }
      }, { immediate: true })
    },
    computed: {
      optionalWidth: function() {
        if( this.width === null ) {
          return null;
        } else if( Number.isInteger(this.width) ) {
          return this.width + "px";
        }
        return this.width;
      },
    },
    methods: {
      submit() {
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
              if(vm.record === {}) {
                console.log(vm.record)
              } else {
                for(var p in res.data) {
                  vm.record[p] = vm.model[p] = res.data[p]
                }
                vm.close()
                showAlert('success','保存成功！')
                vm.$emit('after-submit')
              }
            }
          },
          error:function(res) {
            // var error = JSON.parse(res.responseText)
            showAlert('danger','保存失败！')
            // vm.$dispatch('form.post.error',error.error_msg)
            return false;
          }
        })
      },
      close() {
        this.show = false
      }
    }
  }
</script>
<style>
form div{
    padding-top: 2px;
    padding-bottom: 2px;
  }
form label {
  text-align: right;
  vertical-align: middle;
  padding-right: 5px;
}
.modal {
  transition: all 0.3s ease;
}
.modal.in {
  background-color: rgba(0,0,0,0.5);
}
.modal.zoom .modal-dialog {
    -webkit-transform: scale(0.1);
    -moz-transform: scale(0.1);
    -ms-transform: scale(0.1);
    transform: scale(0.1);
    top: 300px;
    opacity: 0;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
}
.modal.zoom.in .modal-dialog {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
    -webkit-transform: translate3d(0, -300px, 0);
    transform: translate3d(0, -300px, 0);
    opacity: 1;
}
</style>
