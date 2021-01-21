### 自封装bind方法

 - 因为bind的使用方法是 某函数.bind(某对象，...剩余参数)
   - 所以需要在Function.prototype 上进行编程
 - 将传递的参数中的某对象和剩余参数使用apply的方式在一个回调函数中执行即可
 - 要在第一层获取到被绑定函数的this，因为要拿到那个函数用apply



### 自封装一个apply

 - 首先要先原型上即 Function.prototype上编程
 - 需要拿到函数的引用， 在这里是 this
 - 让 传入对象.fn = this
 - 执行 传入对象.fn(传入参数)
 - 返回执行结果

https://github.com/mqyqingfeng/Blog/issues/12
```js
function myCall(ctx) {
    var ctx = ctx || window
    ctx.fn = this
    let args = []

    for(let i = 1; i < arguments.length; i++) {
        args.push('arguments[' + i + ']')
    }
    let res = eval('ctx.fn(' + args + ')')
    delete ctx.fn
    return res
}

function myApply(ctx, arr) {
    var ctx = ctx || window, arr = arr || []
    ctx.fn = this
    let args = []
    for(let i = 0; i < arr.length; i++) {
        args.push('arr[' + i + ']')
    }
    let res = eval('ctx.fn(' + args + ')')
    delete ctx.fn
    return res
}
fn.bind(this, q)()
function myBin(ctx) {
    var ctx = ctx || window
    let self = this
    let args = []
    args = [].slice.call(arguments, 1)
    let temp = function(){}
    let resBind = function() {
        let argsT = Array.prototype.slice.call(arguments)
        return self.apply(this instanceof temp ? this : ctx, args.concat(argsT))
    }
    temp.prototype = this.prototype
    resBind.prototype = new temp()
    return resBind
}
```

