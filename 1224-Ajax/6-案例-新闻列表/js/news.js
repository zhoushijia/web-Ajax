$(function () {
  // 定义日期过滤函数
  template.defaults.imports.dateFommat = function (date) {
    date = new Date(date)
    const y = date.getFullYear()
    const m = (date.getMonth() + 1).toString().padStart(2, 0)
    const d = date.getDate().toString().padStart(2, 0)
    return y + '-' + m + '-' + d
  }

  // 从后台提取数据  采用模板引擎的写法
  function getNewList() {
    $.ajax({
      method: 'GET',
      url: 'http://www.liulongbin.top:3006/api/news',
      success(res) {
        if (res.status !== 200) return alert('新闻获取失败')
        // 提前对res.data.tags进行处理 jQ中each方法index，和item都不能省略
        $.each(res.data, (index, item) => (item.tags = item.tags.split(',')))
        //   调用模板引擎方法
        let str = template('tpl-news', res)
        //   将得到的字符串添加到容器中
        $('#news-list').html(str)
      }
    })
  }

  getNewList()
})
