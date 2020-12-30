$(function () {
  //   封装自己的防抖函数
  function debounce(callback, time) {
    let timer = null
    //   根据用户要求，事件监听需要返回函数
    return function () {
      clearTimeout(timer)
      // 这里的this指向调用者，即事件监听对象
      timer = setTimeout(() => callback.apply(this, arguments), time)
    }
  }

  //   缓存
  const cache = {}

  // 1.监听键入事件
  $('.ipt').on(
    'keyup',
    debounce(function () {
      const msg = $(this).val().trim()
      // 未输入信息，直接返回
      if (msg.length <= 0) return $('#suggest-list').empty().hide()
      //   如果缓存中有，则不发起请求
      if (cache[msg]) return renderList(cache[msg])
      // 有信息 发起请求
      getMsgList(msg)
    }, 500)
  )

  // 2.否则向服务器发起跨域请求
  function getMsgList(msg) {
    $.ajax({
      url: `https://suggest.taobao.com/sug?q=${msg}`,
      dataType: 'jsonp',
      success(res) {
        //   缓存
        cache[msg] = res
        renderList(res)
      }
    })
  }

  // 3.渲染 模板引擎
  function renderList(res) {
    if (res.result.length <= 0) return $('#suggest-list').empty().hide()
    const listStr = template('brandList', res)
    $('#suggest-list').html(listStr).show()
  }
})
