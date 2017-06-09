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
