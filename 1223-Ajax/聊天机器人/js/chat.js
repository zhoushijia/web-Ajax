$(function () {
  // 重置滚动条到底部
  resetui()

  // 人物发送消息
  $('#btnSend').on('click', function () {
    // 判断用户输入内容是否为空，为空，则清空
    const text = $('#ipt').val().trim()
    if (text.length <= 0) return $('#ipt').val('')
    // 向聊天界面添加内容
    $('#talk_list').append(`<li class="right_word">
    <img src="img/person02.png" /> <span>${text}</span>
    </li>`)
    $('#ipt').val('')
    // 重置滚动条到底部
    resetui()
    // ui机器人自动回复消息
    getMsg(text)
  })

  // ui机器人自动回复消息
  function getMsg(text) {
    $.get('http://www.liulongbin.top:3006/api/robot', { spoken: text }, (res) => {
      if (res.message != 'success') return alert('机器人已经死亡,有事烧纸')
      const msg = res.data.info.text
      // 向聊天界面添加内容
      $('#talk_list').append(`<li class="left_word">
      <img src="img/person01.png" /> <span>${msg}</span>
      </li>`)
      // 重置滚动条到底部
      resetui()
      //ui机器人语音播报
      getVoice(msg)
    })
  }

  //ui机器人语音播报
  function getVoice(msg) {
    $.ajax({
      method: 'GET',
      url: 'http://www.liulongbin.top:3006/api/synthesize',
      data: { text: msg },
      success(res) {
        if (res.status == 200) {
          // 给隐藏的voice对象更改src源链接 audio标签必须设置autoplay属性保证自动播放
          $('#voice').prop('src', res.voiceUrl)
        }
      }
    })
  }

  // 给发送框注册键盘按下事件
  $('#ipt').on('keyup', function (e) {
    if (e.key == 'Enter') $('#btnSend').trigger('click')
  })
})
