'use strict'
const isEmpty = function(obj) {
    if (typeof obj === "object" && !(obj instanceof Array)){
      var hasProp = true;
      for (var prop in obj){
          hasProp = false;
          break;
      }
      if (hasProp){
          return true
      }else{
          return false;
      }
    }
  }

const GetSubJson = function(jsonData, destID, json) {
  for (var i = 0; i < jsonData.length; i++) {
    if (jsonData[i].id == destID)
      json.push(jsonData[i]);
    else {
      if (jsonData[i].hasOwnProperty("children")) {
        GetSubJson(jsonData[i].children, destID, json);
      }
    }
  }
}

const extend = function(o,n,override){
   for(var p in n)
    if(n.hasOwnProperty(p) && (!o.hasOwnProperty(p) || override))o[p]=n[p];
};

exports.isEmpty = isEmpty;

//克隆对象或数组
// Object.prototype.Clone = function(){
//   var objClone;
//   if (this.constructor == Object){
//     objClone = new this.constructor(); 
//   }else{
//     objClone = new this.constructor(this.valueOf()); 
//   }
//   for(var key in this){
//     if ( objClone[key] != this[key] ){ 
//       if ( typeof(this[key]) == 'object' ){ 
//         objClone[key] = this[key].Clone();
//       }else{
//         objClone[key] = this[key];
//       }
//     }
//   }
//   objClone.toString = this.toString;
//   objClone.valueOf = this.valueOf;
//   return objClone; 
// } 