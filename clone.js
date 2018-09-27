Object.prototype.clone = function() { // 原型
     // Handle null or undefined or function
     if (null == this || "object" != typeof this)
         return this;
     // Handle the 3 simple types, Number and String and Boolean
     if(this instanceof Number || this instanceof String || this instanceof Boolean)
         return this.valueOf();
     // Handle Date
     if (this instanceof Date) {
         var copy = new Date();
         copy.setTime(this.getTime());
         return copy;
     }
     // Handle Array or Object
     if (this instanceof Object || this instanceof Array) {
         var copy = (this instanceof Array)?[]:{};
         for (var attr in this) {
             if (this.hasOwnProperty(attr))
                 copy[attr] = this[attr]?this[attr].clone():this[attr];
         }
         return copy;
     }
     throw new Error("Unable to clone obj! Its type isn't supported.");
}

function clone(obj) { // 对象
     // Handle the 3 simple types, and null or undefined or function
     if (null == obj || "object" != typeof obj) return obj;
 
     // Handle Date
     if (obj instanceof Date) {
         var copy = new Date();
         copy.setTime(obj.getTime());
         return copy;
     }
     // Handle Array or Object
     if (obj instanceof Array | obj instanceof Object) {
         var copy = (obj instanceof Array)?[]:{};
         for (var attr in obj) {
             if (obj.hasOwnProperty(attr))
               copy[attr] = clone(obj[attr]);
         }
         return copy;
     }
     throw new Error("Unable to clone obj! Its type isn't supported.");
 }

function clone(origin) {  //克隆
  let originProto = Object.getPrototypeOf(origin);
  return Object.assign(Object.create(originProto), origin);
}

function clone(obj){
  var buf;
  if(obj instanceof Array){
    buf = [];
    var i = obj.length;
    while(i--){
      buf[i] = clone(obj[i]);
    }
    return buf;
  }else if(obj instanceof Object){
    buf = {};
    for(var k in obj){
      buf[k] = clone(obj[k]);
    }
    return buf;
  }else{
    return obj;
  }
}

Object.getOwnPropertyNames(Object);//获取不可枚举属性


//数组clone
let arr = [{
  'obj1': 1
}, {
  'obj2': 2
}];

// 1
const arr2 = arr.slice();
console.log(arr2);

// 2
const arr3 = [].concat(arr);
console.log(arr3);

// 3
// or use the new ES6 Spread
const arr4 = [...arr];
console.log(arr4);

// 4
const arr5 = Array.from(arr);
console.log(arr5);
//5
var clone = JSON.parse(JSON.stringify(arr));
