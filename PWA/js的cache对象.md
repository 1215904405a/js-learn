## window.Cache 接口为缓存的 Request / Response  对象对提供存储机制

```
async function(){
  const CACHE_NAME = 'cache_test';
  // 这个caches.open方法返回一个Promise，其中的cache对象新创建出来，如果是以前创建过，就不重新创建。
  let cache = await caches.open(CACHE_NAME);
  // 这个addAll方法可以接受一个地址数组作为参数，这些请求地址的响应数据将会被缓存在cache对象里。addAll返回的是一个Promise。
  cache.addAll(['/', '/admin')
  // add()方法可以接受一个自定义的Request
  cache.add(new Request('/page/1', { /*具体请求参数*/ }));
  // 以数组形式
  let reqCacheData = await cache.keys();  

  console.log(reqCacheData)
  // [Request, Request]
  //展开
  //Request {method: "GET", url: "http://localhost:8080/", headers: Headers, destination: "", referrer: "", …}
  //还提供了两个遍历查看方法
  cache.match()
  cache.matchAll()
}

cache.delete('/page/a');

cache.delete(CACHE_NAME);  
```

[Cache参考](https://developer.mozilla.org/zh-CN/docs/Web/API/Cache)