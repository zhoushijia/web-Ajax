## 注意区分

```js
btn.onclick = function(e) {
    console.log(e);
};
// JS 内置的主动触发事件的一个操作，可以拿到事件对象（e）
btn.click();
```

```js
btn.onclick = function(e) {
    console.log(e);
};
// 把 onclick 当做 btn 对象的普通方法去使用，拿不到事件对象（e）
btn.onclick();
```

## 提交数据一般有两种方式

### 使用 AJAX

```js
$.ajax({
    type: 'POST',
    url: 'http://www.liulongbin.top:3006/api/addbook',
    data: {
        bookname: '水壶',
        author: '令狐冲',
        publisher: '河南'
    },
    success(res) {

    }
});
```

### 使用 FORM 表单

```html
<!-- action: 提交地址，就相当于上面的 url -->
<!-- method: 提交方式，就相当于上面的 type -->
<!-- enctype: application/x-www-form-urlencoded 会把数据转成 key=value&key=value -->
<!-- enctype: multipart/form-data，当涉及到文件上传的时候需要指定这个 -->
<form action="http://www.liulongbin.top:3006/api/addbook" method="POST">
    书名：<input name="bookname"/>
    作者：<input name="author"/>
    出版：<input name="publisher"/>
    <input type="submit"/>
</form>
```

表单提交的缺点：1、会跳转页面 2、之前页面的数据状态会丢失

### 最佳实践

用 【Form 来收集数据】，收集好的数据再用 【AJAX 负责提交】

```html
<form id="form1">
    书名：<input name="bookname"/>
    作者：<input name="author"/>
    出版：<input name="publisher"/>
    <input type="submit"/>
</form>
<script src="./lib/jquery.js"></script>
<script>
// 1. 监听 form 表单的提交事件
$('#form1').on('submit', function(e) {
    // 2. 阻止表单的默认提交行为
    e.preventDefault();
    // 3. 收集表单数据
    // name=ifer&age=18
    let data = $(this).serialize();
    // 4. 调用 AJAX 提交数据
    $.ajax({
        type: 'POST',
        url: 'http://www.liulongbin.top:3006/api/addbook',
        data,
        success(res) {
            console.log(res);
        }
    });
});
</script>
```

## 模板引擎

作用：根据提供的【模板结构】和【数据】生成【最终的拼接好的字符串】

1\. 引入库文件

```html
<script src="./template-web.js"></script>
```

2\. 定义【模板结构】

```html
<script type="text/html" id="tpl-user">
  <h1>{{name}}</h1>
</script>
```

3\. 【准备数据】

```js
const data = {
    name: 'ifer'
};
```

4\. 生成【最终拼接好的字符串】

```js
let resultStr = template('tpl-user', data);
```

5\. 把最终拼接好的字符串渲染到页面

```html
$('body').html(resultStr)
```

## 语法

- 输出

```js
{{name}}
{{name.length > 2 ? '大于2' : '不大于2'}}
```

- 原文输出

```js
// 会解析 HTML 标签，相当于原生当中的 innerHTML
{{@str}}
```

- 条件判断

```js
{{if age > 18}}
    <p>age大于18</p>
{{else}}
    <p>age不大于18</p>
{{/if}}
```

- 循环

```js
{{each arr}}
    <p>{{$index}}</p>
    <p>{{$value}}</p>
{{/each}}
```

## 新闻列表

渲染 tag 标签的时候有两种思路

第一种：先对数据进行加工处理，把原数据中的 tags 转成数据，然后再渲染

```js
$.get('http://www.liulongbin.top:3006/api/news', function (res) {
    if (res.status !== 200) {
        return alert('获取新闻列表数据失败！')
    }
    // 先加工
    res.data.forEach(item => {
        item.tags = item.tags.split(',');
    });
    // 再使用加工好的数据，此时 tags 就是数组啦
    let resultStr= template('tpl-news', res)
    
    $('#news-list').html(resultStr);
});
```

第二种思路：直接在模板里面进行转数组的操作

```html
{{each $value.tags.split(',')}}
    <span>{{$value}}</span>
{{/each}} 
```