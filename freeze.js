/**********简谈JS 对象之扩展、密封及冻结三大特性*********/

  // react 冻结props对象 限制只用state渲染
  // vue用Object.freeze来创建data数据。渲染很多静态数据时，可以取消双向绑定来提速
//Vue 实现双向绑定的基本原理
(function(w){
  w.t = {};
  Object.defineProperty(t,'hello',{
    set: function(val){
      document.getElementById('a').value = val;
      document.getElementById('b').innerText = val;
    }
  });
  // w.t = {
  //   set hello(val){
  //     document.getElementById('a').value = val;
  //     document.getElementById('b').innerText = val;
  //   }
  // }
  document.addEventListener('keyup',function(e){
    t.hello = e.target.value;
  });
  // t.hello = 'qqqqq';
}(window));



/******** 对象的属性配置 *******/
(function(){
  //新对象默认是可扩展的无论何种方式创建的对象
  // {}相当于是 new Object()    所有字面量的对象都是函数Object的实例
  var test = {a:1};
  //任何对象都有构造函数
  console.log('constructor: ' + (test.constructor === Object.prototype.constructor));
  console.log('constructor: ' + (test.constructor === Object));
  console.log(typeof Object); //function
  console.log(typeof new Object()); //object

  // function Test(x, y) {
  //   this.x = x;
  //   this.y = y;
  // }

  // Test.prototype.toString = function () {
  //   return '(' + this.x + ', ' + this.y + ')';
  // };
  // test = new Test();
  // console.log(test.constructor === Test); //test 原型链就近取值
  // console.log(test.__proto__.__proto__.constructor === Object);
  // console.log(Test === Test.prototype.constructor); //constructor只是一个引用 指向Test函数本身

  //3种方式等价
  // test = {a: 1};
  // test = new Object();test.a = 1;
  test = Object.create({},{// __proto__    null 不会继承Object
      "a":{
          value : 1,
          configurable : true,//可配置
          enumerable : true,//可枚举
          writable : true//可写
      }
  });
  Object.isExtensible(test);//true


                                  /****/
  //属性的配置
  test = Object.create({},{
      "a":{
          value : 1,
          configurable : false,//不可配置
          enumerable : true,//可枚举 Object.assign
          writable : true,//可写
          // set:function(newValue){   //不能和value writable共存
          //   console.log("你要赋值给我,我的新值是"+newValue);
          // }
      }
  });

  // Object.getOwnPropertyDescriptor(Object.prototype, 'toString').enumerable;
  // Object.getOwnPropertyDescriptor([], 'length').enumerable;
  // ES6规定，所有Class的原型的方法都是不可枚举的。


  // Object.defineProperty(test,"a",{
  //   value: 1,
  //   configurable : true,//不可配置
  //   enumerable : true,//可枚举
  //   writable : true//可写
  // })

  // for..in循环 包括继承（原型链继承)           
  //构造函数继承 function A(){this.a=1;} function B(){A.call(this);this.b=2;} var b = new B();
  // 相当于function B(){this.a=1;this.b=2;}）
  // Object.keys方法  不包括继承 es6扩展Object.values和Object.entries
  // JSON.stringify方法 不包括继承
  // Object.getOwnPropertyNames()方法返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组。
  
  // test = Object.create({b:2},{
  //     "a":{
  //         value : 1,
  //         configurable : false,//不可配置
  //         enumerable : true,//可枚举
  //         writable : true//可写
  //     }
  // });
  // for(var item in test){console.log(item)};
  // console.log(Object.keys(test));
  // console.log(JSON.stringify(test));


  // Object.getOwnPropertyNames(test); 获取不可枚举属性 不包括继承
  // test.hasOwnProperty('a'); 不包括继承

  Object.isExtensible(test);//true
  // Object.getOwnPropertyDescriptors(Object);

//遍历都遵守的规则
// 首先遍历所有属性名为数值的属性，按照数字排序。
// 其次遍历所有属性名为字符串的属性，按照生成时间排序。
// 最后遍历所有属性名为 Symbol 值的属性，按照生成时间排序。
}());


/******** 不可扩展 ********/
// Object.preventExtensions() 方法让一个对象变的不可扩展，也就是永远不能再添加新的属性。
// 能修改已有属性的可枚举性、可配置性、可写性   可删除属性 修改属性值
(function(){
  // var b = {a:1,b:2};
  // function Point(x, y) {
  //   this.x = x;
  //   this.y = y;
  // }

  // Point.prototype.toString = function () {
  //   return '(' + this.x + ', ' + this.y + ')';
  // };


  class Point { //es6优化展示对象
    constructor(x, y) {
      this.a = x;
      this.b = y;
    }

    toString() {
      return '(' + this.a + ', ' + this.a + ')';
    }
  }
  var b = new Point(1, 2);

  Object.preventExtensions(b); //可以删除 修改属性
  console.log(Object.isExtensible(b));

  // delete b.a;

  // b.b = 4;
    //在严格模式中,为不可扩展对象添加属性将抛出错误
  (function fail(){
      "use strict";
      // b.d = "4";//throws a TypeError
  })();
  // Object.defineProperty(b,"d",{value : 5});//抛出 TypeError 异常
  // Object.defineProperty(b,"a",{value : 3,configurable: false});
  console.log(b);
}());


/********* 密封特性 ********/
//对象不能添加新的属性，不能删除已有属性，
//不能修改已有属性的可枚举性、可配置性、可写性、配置访问器属性
//可以修改已有属性的值的对象
(function () {
  var obj = {
      prop:function(){},
      foo:"bar"
  };
  obj.foo = "baz";
  obj.lumpy = "woof";
  delete obj.prop;

  var o = Object.seal(obj);//将 obj 密封,且返回原对象
  console.log(o === obj);//true
  console.log(Object.isSealed(obj) === true);//true

  //仍然可以修改密封对象上的属性的值
  obj.foo = "quux";//修改成功

  //但不能把密封对象的属性进行重新配置,譬如讲数据属性重定义成访问器属性.
  //Object.defineProperty(obj,"foo",{get : function(){return "g";}});//抛出 TypeError
  //Object.defineProperty(obj,"foo",{value : 3,configurable: true});//抛出 TypeError 异常

  //任何除修改属性值以外的操作都会失败
  obj.quaxxor = "the friendly duck";//静默失败,属性没有成功添加
  delete obj.foo;//静默失败,属性没有删除成功

  //在严格模式中,会抛出 TypeError 异常
  (function fail(){
      "use strict";
      //delete obj.foo;//抛出 TypeError 异常
      //obj.sparky = "arf";//抛出 TYpeError 异常
  })();

  // Object.defineProperty(obj,"ohai",{value :17});//添加属性失败
  // Object.defineProperty(obj,"foo",{value : "eit"});//修改成功
})();


/********* 冻结 **********/
// Object.freeze() vs const   https://stackoverflow.com/questions/33124058/object-freeze-vs-const
(function(){
  const obj = { //声明一个只读的常量
    a: 1,
    b: 2
  };
  obj.a = 13;
  obj.newField = 3;
  console.log(obj);
  // obj = {}; //抛出 TypeError 异常
}());
// 冻结对象是指那些不能添加新的属性，不能修改已有属性的值，不能删除已有属性，以及不能修改已有属性的可枚举性、可配置性、可写性的对象。也就是说，这个对象永远是不可变的。
(function () {
    var obj = {
        prop:function(){},
        foo:"bar",
        deep: {
          a: 1,
          b: 2
        }
    };

    //可以添加新的属性,已有的属性可以被修改或删除
    obj.foo = "baz";
    obj.lumpy = "woof";
    delete obj.prop;

    Object.freeze(obj);

    console.log(Object.isFrozen(obj) === true);//true

    //对冻结对象的任何操作都会失败
    obj.foo = "quux";//静默失败;
    obj.quaxxor = "the friendly duck";//静默失败

    //在严格模式中会抛出 TypeError 异常
    (function () {
        "use strict";
        // obj.foo = "sparky";//抛出 TypeError 异常
        // delete obj.quaxxor;//抛出 TypeError 异常
        // obj.sparky = "arf";//抛出 TypeError 异常

        //可以改变子对象
        // obj.deep.a = "100";
        // console.log(obj);

        //可以改变本身标识
        // obj = {}; 结合const
    })();

    //使用 Object.defineProperty方法同样会抛出 TypeError 异常
    // Object.defineProperty(obj,"ohai",{value:17});//抛出 TypeError 异常
    // Object.defineProperty(obj,"foo",{value:"eit"});//抛出 TypeError 异常
})();

/******** 深冻结 ********/
(function () {
    var obj = {
        internal :{}
    };
    Object.freeze(obj);//浅冻结
    obj.internal.a = "aValue";
    console.log(obj.internal.a);//"aValue"

    //想让一个对象变得完全冻结,冻结所有对象中的对象,可以使用下面的函数.
    function deepFreeze(o){
        var prop,propKey;
        Object.freeze(o);//首先冻结第一层对象
        for(propKey in o){
            prop = o[propKey];
            if(!o.hasOwnProperty(propKey) || !(typeof prop === "object") || Object.isFrozen(prop)){
                continue;
            }
            deepFreeze(prop);//递归
        }
    }

    deepFreeze(obj);
    (function () {
        "use strict";
        // obj.internal.b = "bValue";
    })();
    // obj.internal.b = "bValue";//静默失败
    console.log(obj.internal.b);//undefined
})();
