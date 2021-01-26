## 1. 什么是BFC？
    Formatting context(格式化上下文)是W3C CSS2.1规范中的一个概念。 其是页面中的一块渲染区域，有一套渲染规则。 它决定了其子元素将如何定位，以及和其他元素的关系 和 相互作用。
    BFC即Block Formatting Contexts(块级格式化上下文)， 它属于上述中的其中一种规范。 具有BFC特性的元素 可以看作是 隔离了的独立容器， 容器里面的元素不会在布局上影响到外面的元素。 BFC有普通容器所没有的特性。

## 2. 怎样可以触发BFC？
    浮动元素：float除了none以外的值
    绝对定位元素：position( absolute, fixed)
    display为inline-block, table-cells, flex
    overflow除了visible以外的值(hidden, auto, scroll)

## 3. BFC的特性以及应用有哪些？
    解决margin叠加问题：上下两个div，margin-bottom和margin-top会产生覆盖，取大的一个
```js
<style>
    #div1 { 
        width: 150px; height: 80px; background: red; margin-bottom: 30px;
        /* border: 1px red solid;  */           
        /* overflow: auto; */
        /* position: absolute; */
        /* float: left; */
        display: inline-block;
    }
    #div2 { height: 80px; width: 80px; background: blue; margin-top: 30px;}
</style>
<body>
    <div id="div1"></div>
    <div id="div2"></div>
</body>
```

    解决margin传递问题:子设margin了之后，父也就有margin了，所以为了防止这种情况出现，需要给父加BFC
```js
<style>
    #div1 { 
        width: 150px; height: 200px; background: red; 
        /* border: 1px red solid;  */           //为什么设成边框的不会产生margin的传递问题
        /* overflow: auto; */
        /* position: absolute; */
        /* float: left; */
        display: inline-block;
    }
    #div2 { height: 150px; width: 80px; background: blue; margin-top: 30px;}
</style>
<body>
    <div id="div1">
        <div id="div2"></div>
    </div>
</body>
```

    解决浮动问题：子设浮动之后，脱离文档流，父不设height，其高度为1px，没有撑开
```js
<style>
    #div1 { 
        width: 150px; border: 1px red solid; 
        /* overflow: auto; */
        /* position: absolute; */
        /* float: left; */
        display: inline-block;
    }
    #div2 { height: 150px; width: 80px; background: blue; float: left;}
</style>
<body>
    <div id="div1">
        <div id="div2"></div>
    </div>
</body>
```

    解决覆盖问题
```js
<style>
    #div1 { width: 150px; height: 90px; background: red; float: left;}
    #div2 { height: 150px; background: blue; overflow: auto;}
</style>
<body>
    <div id="div1"></div>
    <div id="div2">eeeeeeeeesssss</div>         //div中的文字不会覆盖，但是div会覆盖
</body>
// 这个方法也可以实现左边固定，右边自适应的布局
```

### 补充：子div不给宽度，只给高度，其就会向上找第一个块级元素的宽度，一致