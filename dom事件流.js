//参考：https://segmentfault.com/a/1190000003497939
事件流
定义：
1.事件流描述的是从页面中接收事件的顺序,也可理解为事件在页面中传播的顺序。
2.事件就是用户或浏览器自身执行的某种动作。诸如click(点击)、load(加载)、mouseover(鼠标悬停)。
3.事件处理程序响应某个事件的函数就叫事件处理程序(或事件侦听器)。

下面所示例子注册事件的方式均使用DOM2级事件定义的事件处理程序进行注册，兼容性的问题不涉及。'DOM2级事件'定义了两个方法，用于处理指定和删除事件处理程序的操作：addEventListener()和removeEventListener()。所有DOM节点中都包含这两个方法，并且它们都接收3个参数：要处理的事件名、作为事件处理程序的函数和一个布尔值。当这个布尔值为true时，表示在捕获阶段调用事件处理程序；若果是false，表示在冒泡阶段调用事件处理程序。

事件的作用范围讨论
示例1

html

  <div id="wrap">
    <div id="outer">
      <div id="inner"></div>
    </div>
  </div>
css

#wrap {
  width: 200px;
  height: 200px;
  background: orange;
}
#outer {
  position: relative;
  top: 50px;
  left: 50px;
  width: 100px;
  height: 100px;
  background: #eeddff;
}
#inner {
  position: relative;
  top: 25px;
  left:25px;
  width: 50px;
  height: 50px;
  background: #44ddff;
}
js

var wrap = document.getElementById('wrap');
wrap.addEventListener('click',function(){
  alert('789');
},false);
output



问题1:容器元素wrap注册了事件，那么此事件的作用范围是什么？

思考1:根据上面例子，当点击橘色块中(包括被子元素覆盖的部分)任何一部分时，都会弹出789，点击橘色块外面的部分并没有任何反应，那么我们是不是就可以得出这这样结论，元素注册事件的作用范围为元素自身在页面中所占的空间大小，但是真的就是这样吗？下面我们做个试验

试验1:
css代码修改如下,其他部分同上

#wrap {
  width: 200px;
  height: 200px;
  background: orange;
}
#outer {
  position: relative;
  top: 50px;
  left: 50px;
  width: 100px;
  height: 100px;
  background: #eeddff;
}
/*inner中的top被修改*/
#inner {
  position: relative;
  top: 152px;
  left:25px;
  width: 50px;
  height: 50px;
  background: #44ddff;
}
output



结论1：当点击橘色块外浅蓝色部分的时候,同样的也弹出了789,而浅蓝色部分是嵌套在wrap元素之内的元素,故可得出结论,当元素注册了事件,此事件的作用范围为:1.元素自己所占页面空间部分加嵌套元素所占空间范围(若嵌套元素覆盖在容器元素上，则事件的作用范围为容器元素自身所占空间大小)

事件的执行顺序讨论
问题2：根据上面的示例1，那么这里大家可以再思考一个问题，若容器元素wrap以及其嵌套元素outer，inner都注册了click事件，根据试验1得出的结论，那么嵌套在最里层的元素inner所占页面的空间范围内，一共有3个click事件都作用在其上，那么当在inner元素的作用范围内点击页面时，3个事件的事件处理程序执行的顺序又是如何的？

要解决上面我提出的问题2,这就涉及到了两种处理事件流的不同的机制，事件冒泡和事件捕获
事件冒泡
IE的事件流叫事件冒泡，即事件开始时由最具体的元素(文档中嵌套层次最深的节点)接收，然后逐级向上传播到较为不具体的节点。

示例2
将参数设为false，让元素在冒泡阶段调用事件处理程序

css,html代码同示例1
js

var wrap = document.getElementById('wrap');
var outer = document.getElementById('outer');
var inner = document.getElementById('inner');

wrap.addEventListener('click',function(){
  alert('789');
},false);
outer.addEventListener('click',function(){
  alert('456');
},false);
inner.addEventListener('click',function(){
  alert('123');
},false);

结论2:在冒泡阶段调用事件处理程序，上面问题的结果是这样的：当点击页面中心浅蓝色的部分时，先是弹出123，接着弹出456，最后弹出789。因此当容器元素及其嵌套元素都在冒泡阶段调用事件处理程序时：事件按事件冒泡的顺序执行事件处理程序。

事件捕获
Netscape团队提出的另一种事件流叫事件捕获，事件捕获的思想是不太具体的节点应该更早接收到事件，而最具体的节点应该最后接收到事件。

示例3
将参数设为true，让元素在捕获阶段调用事件处理程序

css,html代码同示例1 
js

var wrap = document.getElementById('wrap');
var outer = document.getElementById('outer');
var inner = document.getElementById('inner');
    
wrap.addEventListener('click',function(){
  alert('wrap');
},true);
outer.addEventListener('click',function(){
  alert('outer');
},true);
inner.addEventListener('click',function(){
  alert('inner');
},true);
结论3:在捕获阶段调用事件处理程序，上面问题的结果是这样的：当点击页面中心浅蓝色的部分时，先是弹出wrap，接着弹出outer，最后弹出inner。因此当容器元素及其嵌套元素都在捕获阶段调用事件处理程序时：事件按事件捕获的顺序执行事件处理程序。

问题3:根据思考1，思考2得出的结果，接着又有一个问题我认为需要思考，当同一个元素即在冒泡阶段注册了事件，又在捕获阶段注册了同一事件，那么当事件被触发时，事件的执行顺序又会是如何的？

要解决上面我提出的问题3,这就涉及到了DOM事件流
DOM事件流
“DOM2级事件”规定的事件流包括三个阶段：事件捕获阶段==>处于目标阶段==>事件冒泡阶段。首先发生的是事件捕获阶段，为截获事件提供了机会。然后是实际的目标接收事件。最后一个阶段是冒泡阶段，以下图片来自w3c



示例4
css,html代码同示例1 
js

var wrap = document.getElementById('wrap');
var outet = document.getElementById('outer');
var inner = document.getElementById('inner');

wrap.addEventListener('click',function(){
  alert('789');
},false);
outer.addEventListener('click',function(){
  alert('456');
},false);
inner.addEventListener('click',function(){
  alert('123');
},false);
wrap.addEventListener('click',function(){
  alert('wrap');
},true);
outer.addEventListener('click',function(){
  alert('outer');
},true);
inner.addEventListener('click',function(){
  alert('inner');
},true);
结论4:当点击页面中心浅蓝色部分的时候，先从最不具体的节点捕获事件，先弹出wrap,接着弹出outer。接着处于目标阶段，先弹出123，再弹出inner。紧接着，事件处于冒泡阶段，先弹出456，再弹出789。因此我们可以得出结论，当容器元素及嵌套元素，即在捕获阶段又在冒泡阶段调用事件处理程序时：事件按DOM事件流的顺序执行事件处理程序，且当事件处于目标阶段时，事件调用顺序决定于绑定事件的书写顺序，按上面的例子为，先调用冒泡阶段的事件处理程序，再调用捕获阶段的事件处理程序。
