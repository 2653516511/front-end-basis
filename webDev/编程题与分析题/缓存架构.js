// 缓存架构 => 自个儿实现一个

if (!window.caches) {
    window.caches = function () {
        window.caches = {}
        window.cachesArr = [[], []]

        // 加设计模式之后，改进的思维
        return {
            get: function (api) {
                let state = 0
                let stateFun = [
                    function (resolve, reject) {
                        resolve(caches[api])
                    },
                    function (resolve, reject) {
                        resolve(JSON.parse(localStorage.getItem(api)))
                    },
                    function (resolve, reject) {
                        this.set(api).then((res) => {
                            let name = ''
                            let type = 0

                            if(res.data.ishot) {
                                type = 1
                                if (cachesArr[1].length > 3) {
                                    name = cachesArr[1].shift()
                                    localStorage.removeItem(name)
                                }
                                localStorage.setItem(api, JSON.stringify(res))
                            } else {
                                if (cachesArr[0].length > 3) {
                                    name = cachesArr[1].shift()
                                    delete caches[name]
                                }
                                caches[api] = res
                            }

                            cachesArr[type].push(res)
                            resolve(res)
                        })
                        
                    }
                ]

                return new Promise ((resolve, reject) => {
                    if (localStorage.getItem(api)) {
                        state = 1
                    } else {
                        state = 2
                    }
                    resolve(stateFun[state])
                })




// 原始实现思维
                return new Promise ((resolve, reject) => {
                    // caches, localStorage, 状态缓存（内存）
                    if (caches[api]) {
                        resolve(caches[api])
                    } else {
                        if (localStorage.getItem(api)) {
                            resolve(JSON.parse(localStorage.getItem(api)))
                        } else {
                            this.set(api).then((res) => {
                                let name = ''
                                if (res.data.ishot) {
                                    if (cachesArr[1].length > 3) {
                                        name = cachesArr[1].shift()
                                        localStorage.removeItem(name)
                                    }
                                    localStorage.setItem(api, JSON.stringify(res))
                                    cachesArr[1].push(api)
                                } else {
                                    if (cachesArr[0].length > 3) {
                                        name = cachesArr[0].shift()
                                        delete caches[name]
                                    }
                                    caches[api] = res
                                    cachesArr[0].push(api)
                                }
                                
                                resolve(res)
                            })
                        }
                    }
                })
            },
            set: function () {

            },
            remove: function () {

            }
        }
    }
}
