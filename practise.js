var reverse = function(x) {
    let res = 0, sym = 0
    // x < 0
    if(x < 0) {
        sym = 1
        x = 0 - x
    }

    // x > 0
    while(x) {
        res = res * 10 + x % 10
        x = Math.floor(x / 10)
    }
    res = sym === 1 ? Math.max(-res, -2^31) : Math.min(res, 2^31)
    
    return res
}

// let str = '0022333999'
// let reg = /(\w)\1+/g
// str.replace(reg, (item, data) => {
//     // console.log(item, data);
// })

let str = new String('erdli j ')
console.log(str);
let strToString = new String('erdli j ')
let obj = {name: 'name1'}
// console.log(strToString.toString());
// console.log(String.prototype.toString.call(obj));

const a = {val: 2}
a.target = a
let b = JSON.parse(JSON.stringify(a))
console.log(b);
