## 1.JSON转换
var targetObj = JSON.parse(JSON.stringify(copyObj))
let arr4 = JSON.parse(JSON.stringify(arr))
缺点：

（1）如果对象里有函数,函数无法被拷贝下来

（2）无法拷贝copyObj对象原型链上的属性和方法

（3）当数据的层次很深，会栈溢出

## 2、函数递归

缺点：

（1）无法保持引用

（2）当数据的层次很深，会栈溢出


```
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
// 拷贝原型
function copyObject(orig) {
    var copy = Object.create(Object.getPrototypeOf(orig));
    copyOwnPropertiesFrom(copy, orig);
    return copy;
  }


  function copyOwnPropertiesFrom(target, source) {
    Object
    .getOwnPropertyNames(source)
    .forEach(function (propKey) {
      var desc = Object.getOwnPropertyDescriptor(source, propKey);
      Object.defineProperty(target, propKey, desc);
    });
    return target;
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
```

## 3、防栈溢出函数
优点：

（1）不会栈溢出

（2）支持很多层级的数据
```
function cloneLoop(x) {
    const root = {};

    // 栈
    const loopList = [
        {
            parent: root,
            key: undefined,
            data: x,
        }
    ];

    while(loopList.length) {
        // 深度优先
        const node = loopList.pop();
        const parent = node.parent;
        const key = node.key;
        const data = node.data;

        // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
        let res = parent;
        if (typeof key !== 'undefined') {
            res = parent[key] = {};
        }

        for(let k in data) {
            if (data.hasOwnProperty(k)) {
                if (typeof data[k] === 'object') {
                    // 下一次循环
                    loopList.push({
                        parent: res,
                        key: k,
                        data: data[k],
                    });
                } else {
                    res[k] = data[k];
                }
            }
        }
    }

    return root;
}
```

## 4、数组clone
```
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
```
