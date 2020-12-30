$(function () {
  // 定义缓存全局对象
  const cacheObj = {}
  // 定义防抖函数
  let timer = null
  //   持续触发事件，不触发一段时间后才执行
  function debounceTimer(keyWords) {
    //   利用延时器 设定防抖
    timer = setTimeout(function () {
      // 延迟发请求
      getBrandList(keyWords)
    }, 500)
  }

  // 监听用户的键盘抬起事件
  $('.ipt').on('keyup', function () {
    //   每次键入都先清除上一次的延时器 防止抖动
    clearTimeout(timer)
    const keyWords = $(this).val().trim()
    if (keyWords.length <= 0) return $('#suggest-list').empty().hide()
    // 在向服务器发起请求前，先查看缓存中是否含有
    if (cacheObj[keyWords]) {
      return renderList(keyWords, cacheObj[keyWords])
    }
    // 从服务器调取数据 防止抖动
    debounceTimer(keyWords)
  })

  //   根据用户输入来从服务器调取数据
  function getBrandList(keyWords) {
    $.ajax({
      url: 'https://suggest.taobao.com/sug?q=' + keyWords,
      dataType: 'jsonp',
      success(res) {
        //   渲染数据
        // cacheObj[keyWords] = res
        renderList(keyWords, res)
      }
    })
  }

  //   渲染数据到页面上
  function renderList(keyWords, res) {
    if (res.result.length <= 0) {
      //   当搜素到的结果为空的时候，需要清空 否则suggest-list对象的边框会显示出来 并且必须return
      //   隐藏suggest-list样式
      return $('#suggest-list').empty().hide()
    }
    const str = template('brandList', res)
    $('#suggest-list').html(str).show()
    // 当成功将后端传来的数据渲染后，缓存
    cacheObj[keyWords] = res
  }
})
