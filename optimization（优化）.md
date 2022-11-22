优化相关

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
