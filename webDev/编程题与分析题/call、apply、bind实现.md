### 自封装bind方法

 - 因为bind的使用方法是 某函数.bind(某对象，...剩余参数)
   - 所以需要在Function.prototype 上进行编程
 - 将传递的参数中的某对象和剩余参数使用apply的方式在一个回调函数中执行即可
 - 要在第一层获取到被绑定函数的this，因为要拿到那个函数用apply

```js
/**
 * 简单版本 
 */
Function.prototype.myBind = (that, ...args) => {
  const funcThis = this;
  return function(..._args) {
    return funcThis.apply(that, args.concat(_args));
  }
}
```

### 自封装一个apply

 - 首先要先原型上即 Function.prototype上编程
 - 需要拿到函数的引用， 在这里是 this
 - 让 传入对象.fn = this
 - 执行 传入对象.fn(传入参数)
 - 返回执行结果

```js
Function.prototype.myApply = function(context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  context = context || window
  context.fn = this
  let result
  // 处理参数和 call 有区别
  if (arguments[1]) {
    result = context.fn(...arguments[1])
  } else {
    result = context.fn()
  }
  delete context.fn
  return result
}
```

call实现
```js
function callTest(context) {
  var context = context || window
  context.fn = this //fn是对象的属性名，最后要删除，所以无所谓什么名字

  var result, arg = []
  for(let i = 1; i<arguments.length; i++) {
    arg.push('argument[' + i + ']')
  }
  result = context.fn(...arg)
  delete context.fn
  return result
}
```
apply实现
```js
function applyTest(context, arr) {
  var context = context || window
  context.fn = this
  var result
  if(!arr) {
    result = context.fn()
  } else {
    var arg = []
    for(let i = 1; i < arr.length; i++) {
      arg.push('arr[' + i + ']')
    }
    result = context.fn(...arg)
  }
  delete context.fn
  return result
}
```

bind实现
```js
function bindTest(context) {
  var context = context || window
  var self = this
  var arg = Array.prototype.slice.call(arguments, 1)
  var bindFun = function () {
    var bindArg = Array.prototype.slice.call(arguments)
    self.apply(this instanceof self ? this:context, arg.concat(bindArg))
  }
  bindFun.prototype = this.prototype
  return bindFun
}
```

