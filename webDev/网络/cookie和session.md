# cookie和session

## 应用场景
cookie: 
登录网站，第一天输入用户名密码登录了，第二天再打开很多情况下就直接打开了。这个时候用到的一个机制就是cookie。

session: 
session一个场景是购物车，添加了商品之后客户端处可以知道添加了哪些商品，而服务器端如何判别呢，所以也需要存储一些信息就用到了session。


## cookie

服务器通过设置`set-cookie`这个响应头，将cookie信息返回给浏览器，浏览器将响应头中的cookie信息保存在本地，当下次向服务器发送HTTP请求时，浏览器会自动将保存的这些cookie信息添加到请求头中。

通过cookie，服务器就会识别出浏览器，从而保证返回的数据是这个用户的。

 - 通过`set-cookie`设置
 - 下次请求会自动带上
 - 键值对，可设置多个


### cookie属性
 - max-age
   - 过期时间有多长
   - 默认在浏览器关闭时失效
 - expires
   - 到哪个时间点过期
 - secure
   - 表示这个cookie只会在https的时候才会发送
 - HttpOnly
   - 设置后无法通过在js中使用document.cookie访问
   - 保障安全，防止攻击者盗用用户cookie
 - domain
   - 表示该cookie对于哪个域是有效的。 


## session

 - 存放在服务器的一种用来存放用户数据的类似HashTable的结构
 - 浏览器第一次发送请求时，服务器自动生成了HashTable和SessionID来唯一标识这个hash表，并将sessionID存放在cookie中通过响应发送到浏览器。浏览器第二次发送请求会将前一次服务器响应中的sessionID随着cookie发送到服务器上，服务器从请求中提取sessionID，并和保存的所有sessionID进行对比，找到这个用户对应的hash表。
   - 一般这个值是有时间限制的，超时后销毁，默认30min
 - 当用户在应用程序的web页面间挑转时，存储在session对象中的变量不会丢失而是在整个用户会话中一直存在下去。
 - session依赖于cookie，因为sessionID是存放在cookie中的。


## sesssion与cookie的区别
 - cookie存在客户端，session存在于服务端。
 - cookie在客户端中存放，容易伪造，不如session安全
 - session会消耗大量服务器资源，cookie在每次HTTP请求中都会带上，影响网络性能
 - 域的支持范围不一样，比方说a.com的Cookie在a.com下都能用，而www.a.com的Session在api.a.com下都不能用



1）cookie数据始终在同源的http请求中携带（即使不需要），即cookie在浏览器和服务器间来回传递。
而sessionStorage和localStorage不会自动把数据发给服务器，仅在本地保存。
cookie数据还有路径（path）的概念，可以限制cookie只属于某个路径下。
（2）存储大小限制也不同，
cookie数据不能超过4k，同时因为每次http请求都会携带cookie，所以cookie只适合保存很小的数据，
如会话标识。
sessionStorage和localStorage 虽然也有存储大小的限制，但比cookie大得多，可以达到5M或更大。
（3）数据有效期不同，
sessionStorage：仅在当前浏览器窗口关闭前有效，自然也就不可能持久保持；
localStorage：始终有效，窗口或浏览器关闭也一直保存，因此用作持久数据；
cookie只在设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭。
（4）作用域不同，
sessionStorage不在不同的浏览器窗口中共享，即使是同一个页面；
localStorage 在所有同源窗口中都是共享的；
cookie也是在所有同源窗口中都是共享的。
（5）Web Storage 支持事件通知机制，可以将数据更新的通知发送给监听者。
Web Storage 的 api 接口使用更方便。