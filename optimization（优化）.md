## 优化相关

https://juejin.cn/post/6844903918804172814

https://vue3js.cn/interview/JavaScript/debounce_throttle.html

function throttled(fn, delay) {
    let timer = null
    let starttime = Date.now()
    return function () {
        let curTime = Date.now() 
        let remaining = delay - (curTime - starttime)
        let context = this
        let args = arguments
        clearTimeout(timer)
        if (remaining <= 0) {
            fn.apply(context, args)
            starttime = Date.now()
        } else {
            timer = setTimeout(fn, remaining);
        }
    }
}

### v8相关：
https://blackglory.me/notes/v8

### 性能测试：
const array = new Array(1000).fill('*');
1、const t0 = performance.now();
for (let i = 0; i < array.length; i++) 
{
  // some code
}
const t1 = performance.now();
console.log(t1 - t0, 'milliseconds');

2、console.time('test');
for (let i = 0; i < array.length; i++) {
  // some code
}
console.timeEnd('test');
3、测试for 和 forEach的性能
function testForEach(x) {
  console.time('test-forEach');
  const res = [];
  x.forEach((value, index) => {
    res.push(value / 1.2 * 0.1);
  });

  console.timeEnd('test-forEach')
  return res;
}

function testFor(x) {
  console.time('test-for');
  const res = [];
  for (let i = 0; i < x.length; i ++) {
    res.push(x[i] / 1.2 * 0.1);
  }

  console.timeEnd('test-for')
  return res;
}
const x = new Array(100000).fill(Math.random());
testForEach(x);
testFor(x);
参考: https://juejin.cn/post/6844904112023142407

