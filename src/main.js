var Vue = require('vue')
// var VueRouter = require('vue-router')
var App = require('./app.vue')
// var {configRouter} = require('./route-config.js')
// import Vue from 'vue'
// import VueRouter from 'vue-router'
// import App from './app.vue'
// import { configRouter } from './route-config'
// require('es6-promise').polyfill()

Vue.config.debug = true;

var root = new Vue({
  el: 'body',
  data: {
  	height: 0
  },
  components: {
    app: App
  }
});

Vue.use(require('vue-resource'))
// install router
// Vue.use(VueRouter);

// 创建一个路由器实例
// const router = new VueRouter({
//   history: true,
//   saveScrollPosition: true
// });

// 定义路由规则
// 每条路由规则应该映射到一个组件。这里的“组件”可以是一个使用 Vue.extend
// 创建的组件构造函数，也可以是一个组件选项对象。
// router.map({
//   '/': {
//     name: 'home',
//     component: require('./components/MainHome.vue')
//   },
//   '/mainbody': {
//     name: 'mainbody',
//     component: require('./components/MainBody.vue')
//   },
//   '/basecrudpage': {
//     name: 'basecrudpage',
//     component: require('./components/page/BaseCrudPage.vue')
//   }
// });

// router.redirect({
//   '*': '/'
// });

// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
// router.start(App, '#app');

// just for debugging
// window.router = router;

// Object.prototype.Clone = function(){
//     var objClone;
//     if (this.constructor == Object){
//         objClone = new this.constructor(); 
//     }else{
//         objClone = new this.constructor(this.valueOf()); 
//     }
//     for(var key in this){
//         if ( objClone[key] != this[key] ){ 
//             if ( typeof(this[key]) == 'object' ){ 
//                 objClone[key] = this[key].Clone();
//             }else{
//                 objClone[key] = this[key];
//             }
//         }
//     }
//     objClone.toString = this.toString;
//     objClone.valueOf = this.valueOf;
//     return objClone; 
// } 

//过滤器：转换json字符串为json对象
Vue.filter('json_decode',function(value){
    return eval ("(" + value + ")");
});

//$("#sidebar").slimScroll({width:'200px',height: '100%'})

window.onload = function(){
  root.height = window.innerHeight;
}
window.onresize = function(){
  root.height = window.innerHeight;
}