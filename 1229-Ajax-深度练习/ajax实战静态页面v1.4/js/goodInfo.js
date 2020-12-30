$(function () {
  //   给购物车提供跳转链接
  $('#cart').on('click', function () {
    location.href = './cart.html'
  })

  let goodId = location.search
  console.log(goodId)

  $.ajax({
    type: 'GET',
    url: 'http://192.168.88.31:8080/api/goods/getinfo' + goodId,
    success(res) {
      if (res.code === 2000) {
        console.log(res)
        $('.aui-product-name').children('h2').html(res.data.name)
        $('.aui-product-content').children('h2').html(res.data.content)
        $('.aui-product-price ').children('h2').html(`<i>￥</i>${res.data.price}`)
        $('.main_img').find('li:first-child img').prop('src', `http://192.168.88.31:8080/${res.data.fileurl}`)
      } else {
        alert(res.msg)
      }
    }
  })
})
