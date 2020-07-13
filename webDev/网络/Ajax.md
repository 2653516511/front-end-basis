# Ajax

[Ajax | MDN](https://developer.mozilla.org/zh-CN/docs/Web/Guide/AJAX)

AJAX是异步的JavaScript和XML（Asynchronous JavaScript And XML）。简单点说，就是使用 XMLHttpRequest 对象与服务器通信。 它可以使用JSON，XML，HTML和text文本等格式发送和接收数据。AJAX最吸引人的就是它的“异步”特性，也就是说他可以在不重新刷新页面的情况下与服务器通信，交换数据，或更新页面。

### 创建一个简单的Ajax

 - 创建 XMLHttpRequest 对象
```js
if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+ ...
    httpRequest = new XMLHttpRequest();
} else if (window.ActiveXObject) { // IE 6 and older
    httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
}
```

 - 绑定onreadystatechange 事件
```js
httpRequest.onreadystatechange = function(){
    // Process the server response here.
};
```

 - 向服务器发送请求
```js
httpRequest.open('GET', 'http://www.example.org/some.file', true);
httpRequest.send();
```

完整的例子
```js
function ajax(url, cb) {
  let xhr;
  if(window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = ActiveXObject("Microsoft.XMLHTTP");
  }
  xhr.onreadystatechange = function() {
    if(xhr.readyState == 4 && xhr.status == 200) {
      cb(xhr.responseText);
    } 
  }
  xhr.open('GET', url, true);
  xhr.send();
}
```

### httpRequest.readyState的值

 - 0 Uninitialized 初始化状态: XMLHttpRequest对象已创建, 或者已被abort()方法重置.(未初始化) or (请求还未初始化)
 - 1 Open 请求还没有被发送: (正在加载) or (已建立服务器链接)
 - 2 Send 未收到响应: Send() 方法已调用,HTTP请求已发送到Web服务器. (加载成功) or (请求已接受)
 - 3 Receiving 所有的相应头部均已接收到. 响应体开始接受,但是还未完成. (交互) or (正在处理请求)
 - 4 Loaded HTTP响应已经完全接收. (完成) or (请求已完成并且响应已准备好)


### 访问服务端返回的数据

 - httpRequest.responseText   返回响应体,字符串格式
    到目前为止接收到的响应体(不含头部), 若没有接受到数据,返回空字符串;
    readyState的值小于3时,该属性的值一定是空字符串; 当为3时,该属性的值可能是整个响应体,也可能是部分响应体.
   - 服务器以文本字符的形式返回
 - httpRequest.responseXML      返回的响应体, xml格式
      到目前为止, 接收到的响应体(不含头部)
   - 以 XMLDocument 对象方式返回，之后就可以使用JavaScript来处理
 - status: 由服务器返回的HTTP状态码(数字格式)
      当readyState小于3时,读取这一属性会导致一个异常

### xhr对象的方法
open()       初始化HTTP请求,但是不发送请求
    语法: open(method, url, async, username, password)
    method: 请求方式. GET, POST, HEAD
    url: 请求地址. 同源策略
    async: 是否异步请求. 默认true(异步); 当为false时,后续对send()的调用将阻塞,直到相应完全接收
    username、password: 为url所需要的授权提供认证资格(可写,可不写)
send()        发送HTTP请求(会打开一个web服务器的网络链接)
    语法: send(body)
    body请求体: get请求时body为null; post请求时body为请求体(字符串 or 对象)
    body由以下几部分组成: 
      之前调用open() 时指定的HTTP方法 url 认证资格(有的话)
      之前调用setRequestHeader() 时指定的请求头部(有的话)
      传递给该方法的body参数
    作用:
      把readyState设置为2, 并打开一个web服务器的网络连接;
      接受部分响应后, send() 或 后台线程 把readyState 设置为3
      接受全部响应后, send() 或 后台线程 把readyState 设置为4
    特殊情况:
      若readyState不是1 (即 无法调用open()方法), 会抛出异常;
      若open() 参数的async 为false, send()方法会阻塞, 不会返回, 直到 readyState为4, 并且服务器的响应被完全接收 才返回


### GET 注意事项

 -  如果不设置响应头 `Cache-Control: no-cache` 浏览器将会把响应缓存下来而且再也不无法重新提交请求。你也可以添加一个总是不同的 GET 参数，比如时间戳或者随机数 (详情见 [bypassing the cache](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Bypassing_the_cache))


### POST 请求
POST请求则需要设置`RequestHeader`告诉后台传递内容的编码方式以及在send方法里传入对应的值
```js
xhr.open("POST", url, true);
xhr.setRequestHeader("Content-Type": "application/x-www-form-urlencoded");
xhr.send("key1=value1&key2=value2");
``` 

### setRequestHeader() 设置请求头
语法: setRequestHeader(name, value)
name 头部的名称: 这个参数不应该包括 空白 冒号 换行
value 头部的值: 这个参数不应该包括 换行
约束: 该方法设置请求头信息, 必须在调用 open() 之后 且 send()调用之前
### getResponseHeader() 获取指定请求头
语法: getResponseHeader(name)
### getAllResponseHeaders() 获取所有请求头
语法: getAllResponseHeaders()

### xhr对象的事件


### Ajax与cookie
 - ajax会自动带上同源的cookie，不会带上不同源的cookie
 - 可以通过前端设置withCredentials为true， 后端设置Header的方式让ajax自动带上不同源的cookie，但是这个属性对同源请求没有任何影响。会被自动忽略。

[withCredentials | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/withCredentials)

```js
var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://example.com/', true);
xhr.withCredentials = true;
xhr.send(null);
```