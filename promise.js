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

参考： https://juejin.im/entry/599968f6518825244630f809
