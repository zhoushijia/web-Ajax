$(function () {
  // 用户名正则
  const regUser = /^\w{4,16}$/
  //   email正则
  const regEmail = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/
  //   密码正则
  const regPwd = /^\w{6,16}$/

  // 定义对象用来存储input框输入信息是否符合要求
  const checkObj = {}
  $('input').each((index, dom) => {
    checkObj['#' + dom.id] = false
  })
  //   验证输入信息
  checkMsg('#username', regUser)
  checkMsg('#email', regEmail)
  checkMsg('#password', regPwd)
  surePwd('#checkPwd', '#password')

  //   表单提交
  $('form').on('submit', function (e) {
    e.preventDefault()
    let flag = true
    for (let k in checkObj) {
      // 如果input框输入有任一不符合 则false
      if (!checkObj[k]) {
        flag = false
        break
      }
    }
    if (flag) {
      // 这里不能采用这个传参数
      //   const data = $(this).serialize()
      const data = { username: $('#username').val(), password: $('#password').val(), email: $('#email').val() }
      console.log(data)
      $.ajax({
        method: 'POST',
        url: 'http://192.168.88.31:8080/api/member/register',
        data,
        success(res) {
          console.log(res)
          if (res.code === 2000) {
            location.href = './login.html'
          } else {
            alert(res.msg)
          }
        }
      })
    } else {
      alert('输入信息存在不符合要求')
    }
  })

  //   封装正则验证函数
  function checkMsg(id, reg) {
    $(id).on('blur', function () {
      if (reg.test(this.value)) {
        $(this).siblings('span').addClass('success').removeClass('error').html(`恭喜您输入正确`)
        checkObj[id] = true
      } else {
        $(this).siblings('span').addClass('error').removeClass('success').html(`格式不正确，请从新输入 `)
        checkObj[id] = false
      }
    })
  }

  //   核实再次输入密码是否一致
  function surePwd(sureId, id) {
    $(sureId).on('blur', function () {
      if ($(id).val() == $(this).val() && $(this).val().trim().length != 0) {
        $(this).siblings('span').addClass('success').removeClass('error').html('密码核实正确')
        checkObj[sureId] = true
      } else {
        $(this).siblings('span').addClass('error').removeClass('success').html('密码不一致，请从新输入')
        checkObj[sureId] = false
      }
    })
  }
})
