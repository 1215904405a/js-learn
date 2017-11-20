obj.method.call(this,data);  //获取引用this，参数data
var a = [1,2,3];a.push.call(a,[4,5,6]);console.log(a); // [1, 2, 3, Array(3)]  相当于a.push([4,5,6]);

obj.method.apply(this,array);  //获取引用this，参数array 
var a = [1,2,3];a.push.apply(a,[4,5,6]);console.log(a); // [1, 2, 3, 4, 5, 6] 相当于a.push(4,5,6);

obj.method.bind(this,data);  //获取引用this，不会执行， 只是返回函数  参数与call相同
var a = [1,2,3];a.push.bind(a,[4,5,6])();console.log(a); // [1, 2, 3, Array(3)]

Object.prototype.hasOwnProperty.call(source, key);//为什么这么调用 因为不确定source继承了object
