let arr = [1,3,[4,6,[7,[8]]], 3, [2]]
// arr = arr.flat(Infinity)

// arr = arr.toString().split(',').map(item => Number(item))
// arr = JSON.stringify(arr).replace(/\[|\]/g, '').split(',').map(item => parseFloat(item))

// while(a=arr.some(item => Array.isArray(item))) {
//     arr = [].concat(...arr)
// }

console.log(arr);


let url = 'http://www.dahhlw.com:8081/src/main.js?id=1&name=name1#idd'
// let regexp = /^((http|https):\/\/)?((\W+.)+[^\:]):(\W)*((\/\W+)*[^\?])(\W*[^\#])(\W*)$/i
let regexps = /^(?:(http|https|ftp):\/\/)?((?:[\w-]+\.)+[a-z0-9]+):(\d*)((?:\/[^/?#]*)+)\?([^#]*)?(#.+)$/i
console.log(url.match(regexps));


//LC
let str = 'w- 2 1 r'
let reg = /^(\s*-?)(\s*\d+)+[^\D]*/g
let res = reg.exec(str)
let sym, out
if(res) {
    out = res[0]
    if(out[0] === '-'){
        sym = '-'
        out = out.slice(1).replace(/\s*/g, '') - 0
    }
    sym ? out = 0-out:out
} else {
    out = 0
}

console.log(out);

git reset --hard b3ae29884ec924a02e71ed3f7db7be21203e8208


//链式调用
~function(){
    function add(n) {
        n = Number(this + n)
        return isNaN(n) ? 0 : n 
    }
    function minut(n) {
        n = Number(this - n)
        return isNaN(n) ? 0 : n
    }
    ['add', 'minut'].forEach(item => {
        Number.prototype[item] = eval(item)
    })
}()
console.log((5).add(3).minut('e'));


// callback  compared with forEach in es6, this each function can control for cycle,
        //but forEach
function each(arr, cb) {
    for(let i = 0; i < arr.length; i++) {
        let flag = cb(arr[i], i)
        if(flag === false) {
            break
        }
    }
}
let arr = [1,2,4]
each(arr, function(item, index) {
    console.log(item, index);
    if(index > 3) {
        return false
    }
})



// 斐波那契数列
let lineNum = function(n) {
    if(n <= 1) return 1
    let arr = [1,1]
    let resLen = n + 1 - 2
    for(let i = 0; i < resLen; i++) {
        let firItem = arr[arr.length-2],
            secItem = arr[arr.length-1]
        let sum = firItem + secItem
        arr.push(sum)
    }
    return arr[arr.length-1]
}
console.log(lineNum(4));



// 柯里化
function add(...args) {
    // todo
    
    return [...args].reduce((sum, cur) => sum + cur)
}
// add(1,2)
// add(1)(2)
function curr(fn, len) {
    // todo
    var len = len || fn.length
    return function(...args) {
        if(args.length >= len) {
            return fn(...args)
        } else {
            return curr(fn.bind(null, ...args), len - args.length)
        }
    }
}
// let res = curr(add, 3)
// console.log(res(1,2)(3));
// console.log(res(1)(2,3));

function cu(fn){
    let args = Array.prototype.slice.call(arguments, 1)
    let _cu = function() {
        if(arguments.length !== 0) {
            args.push(...arguments)
            return _cu()
        } else {
            return fn.apply(this, args)
        }
    }
    return _cu
}

// let res = cu(add)
// console.log(res(1,2)());
// console.log(res(1)(2)());

// function cur(fn) {
//     return function curri(...args) {
//         if(args.length >= fn.length) {
//             return fn.apply(this, args)
//         } else {
//             return function(...arg) {
//                 return curri.apply(this, args.concat(arg))
//             }
//         }
//     }
// }

function adds(a, b, c){
    console.log('2', this);
    return a + b + c
}
let res = cur(adds)
// res(1,2,3)
// res(1,2)(3)
function cur(fn) {
    return function c(...args){
        if(args.length >= fn.length) {
            console.log('1', this);
            return fn(...args)
            // return fn.apply(this, args)
        } else {
            return function(...arg) {
                args = args.concat(arg)
                return c(...args)
            }
        }
    }
}

console.log(res(1,2,3));
console.log(res(1,2)(3));

//  正则表达式

// 必须有 字母数字字符 组合，不能有 空格
// let reg = /^(?=\S[0-9])(?=[A-z])(?=\S[^0-9A-z])\S{3,10}$/
//?必须包含?字母数字字符
//?let?regexp?=?/^(?=.*[0-9])(?=.*[A-Za-z])(?=.*[^0-9A-Za-z]).{3,10}$/
//?以tx开头，只能包含?字母数字，且必须?有字母数字
// let?regexp?=?/^tx(?=.*[0-9])(?=.*[A-z])[0-9A-z]{3}$/
// 字母数字字符 至少两种组合
let regexp = /^(?![0-9]+$)(?![A-z]+$)(?![^0-9A-z]+$).{3,10}$/
// ?let?regexp?=?/^(?:(?=.*[0-9].*)(?=.*[A-Za-z].*)(?=.*[,\.#%'\+\*\-:;^_`].*))[,\.#%'\+\*\-:;^_`0-9A-Za-z]{3,10}$/
let?str?=?'!!!1'
let?res?=?regexp.test(str)
console.log(res);

//?--必须包含?数字,字母,符号?3项组合的?正则表达式
//?^(?:(?=.*[0-9].*)(?=.*[A-Za-z].*)(?=.*[,\.#%'\+\*\-:;^_`].*))[,\.#%'\+\*\-:;^_`0-9A-Za-z]{8,10}$
//?--不为 纯数字或字母的正则表达式?用于密码验证
//?^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$
//?--密码为8~20位数字,英文,符号至少两种组合的字符
//?^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?![,\.#%'\+\*\-:;^_`]+$)[,\.#%'\+\*\-:;^_`0-9A-Za-z]{8,20}$


// setTimeout 模拟 setInterval

// setInterval setTimeout
function inter(fn, delay) {
    var delay = delay || 0, timeout = null
    // var cb = function(time) {
    //     // console.log('4', time);
    //     return time
    // }
    // clearTimeout(timeout)
    timeout = setTimeout(() => {
        fn()
        // console.log('t', timeout);
        // cb(timeout)
        inter(fn, delay)
        // setTimeout(() => {
        //    inter(fn, delay)
        // }, delay)
    }, delay)
    console.log('timeout', timeout);
    return timeout
    // console.log('3', timeout);
    // return cb()
}
let i = 0
function fn() {
    console.log(i++);
}
let res = inter(fn, 1000)
console.log(res);

// 正则中\b的使用
let str = 'an是ok的d——2@'
let reg = /\b[a-z]+\b/ig
let res = str.replace(reg, val => {
    console.log('val', val);
    return ' ' + val + ' '
})
console.log('res', res);


//promise和async模拟


let arr = ['flow', 'flow', 'flow', 'flpp']
// let out = findSamePro(arr)
// console.log('out', out);
function findSamePro(arr) {
    // 
    if (arr.length <= 1) {
        return arr
    }
    let res = arr[0]
    for (let i = 1; i < arr.length; i++) {
        let cur = arr[i]
        let j = 0
        for (; j < res.length && j < cur.length; j++) {
            if (res[j] !== cur[j]) {
                break
            }
        }
        // console.log('j', j);
        // res = res.substr(0, j)
        // res = res.substring(0, j)
        res = res.slice(0, j)
        if (res === '') {
            return ''
        }
    }

    return res
}

// getresNumarrays() {
    let out = function(show, time) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(show);
                resolve()
            }, time)
        })
    }
    // out(1111, 1000)
    //     .then(() => {
    //         return out(2222, 2000)
    //     })
    //     .then(() => {
    //         return out(3333, 3000)
    //     })
    //     .catch(error => console.log(error))

    // let out = function(show, time) {
    //     setTimeout(() => {
    //         console.log(show);
    //     }, time);
    // }
    ~async function(){
        await out(1111, 1000)
        await out(2222, 2000)
        await out(3333, 3000)
    }()

    const fnasync = function(value){
        return new Promise(function(resolve,reject){
            setTimeout(()=>{
                console.log(value)
                resolve()
            })
        })
    }
    fnasync(1111, 1000)
    .then(() => {
      return fnasync(2222, 2000)
    })
    .then(() => {
      return fnasync(3333, 3000)
    }).catch(err => {console.log(err)})



