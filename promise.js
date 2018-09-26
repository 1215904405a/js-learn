// resolve then
function Promise(fn) {
    var state = 'pending',
        value = null,
        callbacks = [];

    this.then = function (onFulfilled) {   // 执行下本作用域对象的回调  并且返回下一次新的对象
        return new Promise(function (resolve) {
            handle({
                onFulfilled: onFulfilled || null,
                resolve: resolve
            });
        });
    };

    function handle(callback) { // 执行回调函数 或者执行新对象的resolve
        if (state === 'pending') {
            callbacks.push(callback);
            return;
        }
        //如果then中没有传递任何东西
        if(!callback.onFulfilled) {
            callback.resolve(value);
            return;
        }

        var ret = callback.onFulfilled(value);
        callback.resolve(ret);
    }

    
    function resolve(newValue) {   // 改变状态
        if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
            var then = newValue.then;
            if (typeof then === 'function') {
                then.call(newValue, resolve);
                return;
            }
        }
        state = 'fulfilled';
        value = newValue;
        setTimeout(function () {
            callbacks.forEach(function (callback) {
                handle(callback);
            });
        }, 0);
    }

    fn(resolve);
}

var p4 = new Promise(function(resolve,reject){
	resolve(12);
});

p4.then(res=>{
console.log(res);
});








简单模拟：
let ref = (value) => {
    if (value && typeof value.then === "function")
        return value;
    return {
        then (callback) {
            return ref(callback(value));
        }
    };
};

let defer = () => {
    let pending = [], value;
    return {
        resolve: function (_value) {
            if (pending) {
                value = ref(_value); // values wrapped in a promise
                for (let i = 0, ii = pending.length; i < ii; i++) {
                    let callback = pending[i];
                    value.then(callback); // then called instead
                }
                pending = undefined;
            }
        },
        promise: {
            then: function (_callback) {
                let result = defer();
                // callback is wrapped so that its return
                // value is captured and used to resolve the promise
                // that "then" returns
                let callback = function (value) {
                    result.resolve(_callback(value));
                };
                if (pending) {
                    pending.push(callback);
                } else {
                    value.then(callback);
                }
                return result.promise;
            }
        }
    };
};

let a = defer();
a.promise.then(function(value){console.log(value);return 2}).then(function(value){console.log(value)});
a.resolve(1);

参考： https://juejin.im/entry/599968f6518825244630f809  https://github.com/kriskowal/q/tree/v1/design
