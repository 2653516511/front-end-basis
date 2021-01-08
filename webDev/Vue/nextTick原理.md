---nextTick是保证在dom渲染完之后，进行cb操作。
---利用的就是js中异步任务中的宏任务和微任务，因为在同步任务完成之后，才会执行异步任务：首先会执行微任务队列中的程序，然后执行宏任务中的程序。
---callbacks是一个数组，会将所有需要在dom更新之后的操作都放在该数组中:

./nextTick.png
```js
nextTick(cb)   //调用nextTick传入cb
callbacks.push(cb)      //将回调函数存入数组中
timerFunc()             //调用timerFunc
返回promise             //支持promise的写法

```

，然后在异步任务中执行数组中的每一个item。

---用到的 异步任务 有：
    ----首先判断是否支持promise，支持的话，直接用Promise.then(微任务)执行；
    ----若不支持，会判断是否支持MutationObserver(微任务：会在指定的DOM发生变化时调用https://hacks.mozilla.org/2012/05/dom-mutationobserver-reacting-to-dom-changes-without-killing-browser-performance/)，支持，则直接用；
    ----若不支持，会判断是否支持setImmediate(宏任务，Node.js环境)回调，支持，则直接用；
    ----若不支持，最终会使用setTimeout(宏任务)回调