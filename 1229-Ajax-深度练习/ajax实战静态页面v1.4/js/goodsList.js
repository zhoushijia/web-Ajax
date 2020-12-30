$(function () {
  //   给购物车提供跳转链接
  $('#cart').on('click', function () {
    location.href = './cart.html'
  })

  getGoodsList()
  //   从服务器获取数据
  function getGoodsList() {
    $.ajax({
      type: 'GET',
      url: 'http://192.168.88.31:8080/api/goods/getlist',
      data: {},
      success(res) {
        console.log(res)
        if (res.code === 2000) {
          // 渲染
          // 生成字符串
          const str = template('tpl-goods', res)
          //   填充到需要的位置
          $('.aui-list-theme-box').html(str)
        } else {
          alert(res.msg)
        }
      }
    })
  }
})
