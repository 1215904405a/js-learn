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
