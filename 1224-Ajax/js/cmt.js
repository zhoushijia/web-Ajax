$(function () {
  getComment()
  //   添加评论
  $('#btn').on('click', function (e) {
    e.preventDefault()
    const data = $('#form1').serialize()
    $.ajax({
      method: 'POST',
      url: 'http://www.liulongbin.top:3006/api/addcmt',
      data,
      success(res) {
        if (res.status != 201) return alert('添加失败')
        getComment()
        // form标签dom对象的reset()方法重置表单
        $('#form1')[0].reset()
      }
    })
  })
})

//   获取评论
function getComment() {
  $.ajax({
    type: 'GET',
    url: 'http://www.liulongbin.top:3006/api/cmtlist',
    success(res) {
      //   渲染数据到页面
      if (res.status != 200) return alert('评论数据获取失败')
      const rows = []
      $.each(res.data, (i, item) => {
        rows.push(`
                    <li class="list-group-item">
                        <span class="badge" style="background-color: #f0ad4e">评论时间：${item.time}</span>
                        <span class="badge" style="background-color: #5bc0de">评论人：${item.username}</span>
                        ${item.content}
                    </li>
            `)
      })
      //   每次渲染都将之前的数据清空，再将数组转换成字符串
      $('#cmts').empty().append(rows.join(''))
    }
  })
}
