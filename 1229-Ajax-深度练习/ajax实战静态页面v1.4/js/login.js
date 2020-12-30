$(function () {
  $('form').on('submit', function (e) {
    e.preventDefault()
    const nameVal = $('#username').val().trim()
    const pwdVal = $('#password').val().trim()
    if (nameVal.length <= 0 || pwdVal.length <= 0) return
    const data = $(this).serialize()
    $.ajax({
      method: 'POST',
      url: 'http://192.168.88.31:8080/api/member/login',
      data,
      success(res) {
        if (res.code === 2000) {
          location.href = './goodsList.html'
        } else {
          alert(res.msg)
        }
      }
    })
  })
})
