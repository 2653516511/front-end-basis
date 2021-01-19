// 长度为6-16个字符，支持字母数字和@符号组成，不能使用空格
// let valiInfo = /^[0-9A-z@]{6,16}$/g

// 密码为8-16位字母数字组合，可含特殊符号！
let valiInfo = /^\S{8,16}$/g
let str = '2 2333@@a3'
console.log(valiInfo.test(str));
