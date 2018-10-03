1.模仿块级作用域
function A(num) {
    //核心代码
   (funnction(){
    for(var i = 0; i<num; i++) {
      num++;
    }
    })()
    //核心代码结束
    console.log(i)//underfined
  }
  注意看核心代码部分，我们用刚刚讲到的匿名自执行函数在内部形成了一个闭包，这个闭包在哪呢？一直强调，闭包的本质是函数，其实在这里闭包就是那个匿名函数，这个闭包可以到函数A内部的活动变量，又能保证自己内部的变量在自执行后直接销毁，这个应该不难理解了
  
  2.存储变量
  function B(){
    var x = 100;
    return {
        function(){
            return x
        }
    }
}
var m = B()//运行B函数，生成活动变量 x被m引用

3.封装私有变量
unction Person(){
    var name = 'default';
    this.getName:function(){
        return name;
    }
    this,setName:function(value){
        name = value;
    }
}
console.log(Person.getName())//default
console.log(Person.setName('mike'))
console.log(Person.getName())//mike
