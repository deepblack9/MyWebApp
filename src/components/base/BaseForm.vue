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
  form > .formheader {
    /*padding-bottom: 5px;
    margin-bottom: 10px;
    border-bottom: 1px solid #e5e5e5*/
  }
</style>

<template>
  <div class="formheader">
    <slot name="header"></slot>
  </div>
  <div class="row formbody">
    <form :class="formtype" v-el:form>
      <div :class="colWidth" v-for="r in fields"> <!-- v-show="r.xtype!='hidden'" -->
        <div class="row">
          <label class="col-md-4">{{r.fieldLabel}}:</label>
          <input class="col-md-6" :type="text" :name="r.name" v-model="model[r.mapping]" :value="record[r.mapping]">
        </div>
      </div>
    </form>
  </div>
  <div class="formfooter">
    <slot name="footer"></slot>
  </div>  
</template>

<script>
import '../../libs/json2.js'

export default {
  props: {
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
      this.model = Object.assign({}, this.model, this.record)
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
  },
  events: {
    'form.save': function() {
      console.log($(this.$els.form).serialize())
      console.log(this.url)
      var vm = this
      $.ajax({
        type:'POST',
        url:this.url,
        data: $(this.$els.form).serialize(),//JSON.stringify(this.model),
        dataType: 'json',
        success:function(res){
          if(res.success) {
            var data = JSON.parse(res.data)
            for(var p in data) {
              vm.record[p] = vm.model[p] = data[p]
              // vm.model[p] = data[p]
              vm.$dispatch('form.post.success')
            }
          }
        },
        error:function(res) {
          var error = JSON.parse(res.responseText);
          // _self.alert.txt = error.error_msg;
          // _self.alert.show = true;
          // _self.alert.hideFn();
          vm.$dispatch('form.post.error',error.error_msg)
          return false;
        }
      });
    }
  }
}
</script>