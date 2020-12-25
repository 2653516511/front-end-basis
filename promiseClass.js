class Promise {
    constructor(params) {
        this.PromiseState = 'pending'
        this.PromiseResult = null
        let self = this
        this.callback = []

        function resolve(data) {
            if(self.PromiseState !== 'pending') return
            // 改变状态
            self.PromiseState = 'fulfilled'
            self.PromiseResult = data
            // 调用成功的回调函数
            // self.callback.onresolve(data)
            setTimeout(() => {
                self.callback.forEach(item => {
                    item.onresolve(data)
                })
            });
        }
        function reject(data) {
            if(self.PromiseState !== 'pending') return
            // 改变状态
            self.PromiseState = 'rejected'
            self.PromiseResult = data
            // 调用失败的回调函数
            // self.callback.onreject(data)
            setTimeout(() => {
                self.callback.forEach(item => {
                    item.onreject(data)
                })
            });
        }

        try{
            params(resolve, reject)
        } catch(e) {
            self.PromiseState = 'rejected'
            self.PromiseResult = e
        }   
    }

    // 原型上的
    then (onresolve, onreject) {
        if(typeof onresolve !== 'function') {
            onresolve = value => value
        }
        if(typeof onreject !== 'function') {
            onreject = reason => {
                throw reason
            }
        }
        let self = this
        let runFn = function(type) {
            // 调用成功回调函数
            let result = type(self.PromiseResult)
            // 判断
            if(result instanceof Promise) {
                // 如果是promise的实例的话，继续调用then方法
                result.then(v => {
                    resolve(v)
                }, r => {
                    reject(r)
                })
            } else {
                // 返回的直接是一个值或者undefined，是成功
                resolve(result)
            }
        }
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(this.PromiseState === 'fulfilled') {
                    try {
                        runFn(onresolve)
                    } catch(e) {
                        reject(e)
                    }
                    
                }
                if(this.PromiseState === 'rejected') {
                    try{
                        runFn(onreject)
                    } catch(e) {
                        reject(e)
                    }
                    
                }
                // 保存回调
                if(this.PromiseState === 'pending') {
                    this.callback.push({
                        onresolve: function(data) {
                            try{
                                runFn(onresolve)
                            } catch(e) {
                                reject(e)
                            }
                            
                        },
                        onreject: function(data) {
                            try{
                                runFn(onreject)
                            } catch(e) {
                                reject(e)
                            }
                            
                        }
                    })
                }
            });
        })
        
        
    }
    catch (onreject) {
        return this.then(undefined, onreject)
    }

    // 类本身的，不能被继承，所以定为静态的
    static resolve (value) {
        return new Promise((resolve, reject) => {
            if(value instanceof Promise) {
                value.then((v) => {
                    resolve(v)
                }, (r) => {
                    reject(r)
                })
            } else {
                resolve(value)
            }
        })
    }
    static reject (value) {
        return new Promise((resolve, reject) => {
            reject(value)
        })
    }
    static all (promises) {
    
        // promises是一个数组
        return new Promise((resolve, reject) => {
            let count = 0, results = []
            for(let i = 0; i < promises.length; i++) {
                promises[i].then((v) => {
                    count++
                    // 这里还要注意结果的顺序，不能直接push
                    results[i] = v
                    if(count === promises.length) {
                        resolve(results)
                    }
                }, (r) => {
                    reject(r)
                })
            }
        })
    }
    static race (promises) {
        return new Promise((resolve, reject) => {
            for(let i = 0; i < promises.length; i++) {
                promises[i].then(v => {
                    // 修改返回对象的状态为 成功
                    resolve(v)
                }, v => {
                    // 修改返回对象的状态为 失败
                    reject(r)
                })
            }
        })
    }

}