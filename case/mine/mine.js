window.onload = function () {
  //data
  var $items = document.querySelector(".items")//DAHEZI
  var $title = document.querySelector(".title")//游戏标题
  var $select = document.querySelector("select")//游戏难度
  var $form = document.querySelector(".self")//提交
  var $msg = document.querySelector(".msg")//游戏规则
  var $tip = document.querySelector(".tip")//帮助按钮
  var $down = null//按下的元素
  var mine_num = 0
  //method
  function render (row, col) {//渲染
    $items.innerHTML = ""
    mine_num = 0
    for (var i = 0; i < row; i++) {//创建棋盘
      for (var j = 0; j < col; j++) {
        var $box = document.createElement("div")//创建元素盒子
        var $item = document.createElement("div")//创建元素
        $item.id = ["o", j, i].join("-")
        $item.style.width = $items.offsetWidth / col + "px"
        $item.style.height = $items.offsetWidth / col + "px"//根据父元素设宽高
        $box.classList.add("box")
        $item.classList.add("item")

        if (Math.random() > 0.9) {//生成地雷
          $box.classList.add("is_mine")
          mine_num++
        }

        $items.appendChild($box)
        $box.appendChild($item)
      }
    }
    document.querySelector(".mine_num").innerHTML = "雷数:" + mine_num
  }

  function calc (id) {//计算格子四周的地雷
    var x = id.split("-")[1] * 1
    var y = id.split("-")[2] * 1
    var num = 0
    var $el = document.querySelector(["#o", x - 1, y - 1].join("-"))
    if ($el && $el.parentElement.classList.contains("is_mine")) {
      num += 1
    }
    $el = document.querySelector(["#o", x, y - 1].join("-"))
    if ($el && $el.parentElement.classList.contains("is_mine")) {
      num += 1
    }
    $el = document.querySelector(["#o", x + 1, y - 1].join("-"))
    if ($el && $el.parentElement.classList.contains("is_mine")) {
      num += 1
    }
    $el = document.querySelector(["#o", x - 1, y].join("-"))
    if ($el && $el.parentElement.classList.contains("is_mine")) {
      num += 1
    }
    $el = document.querySelector(["#o", x + 1, y].join("-"))
    if ($el && $el.parentElement.classList.contains("is_mine")) {
      num += 1
    }
    $el = document.querySelector(["#o", x - 1, y + 1].join("-"))
    if ($el && $el.parentElement.classList.contains("is_mine")) {
      num += 1
    }
    $el = document.querySelector(["#o", x, y + 1].join("-"))
    if ($el && $el.parentElement.classList.contains("is_mine")) {
      num += 1
    }
    $el = document.querySelector(["#o", x + 1, y + 1].join("-"))
    if ($el && $el.parentElement.classList.contains("is_mine")) {
      num += 1
    }
    return num
  }
  function enable (id) {//开启周围为零的格子
    var $el = document.querySelector(`#${id}`)
    if (!$el) {
      return
    } else if ($el.getAttribute("open")) {
      return
    } else if ($el.classList.contains("flag") || $el.classList.contains("question")) {
      return
    }
    $el.setAttribute("open", 1)
    $el.classList.add("open")
    var num = calc(id)
    $el.textContent = num
    var color = ["red", "blue", "aqua", "#999", '#fff', "pink", "yellow", "gold"]
    $el.style.color = color[num]
    if (num == 0) {
      $el.textContent = ""
      var x = id.split("-")[1] * 1
      var y = id.split("-")[2] * 1
      enable(`o-${x - 1}-${y + 1}`)
      enable(`o-${x}-${y + 1}`)
      enable(`o-${x + 1}-${y + 1}`)
      enable(`o-${x - 1}-${y}`)
      enable(`o-${x + 1}-${y}`)
      enable(`o-${x - 1}-${y - 1}`)
      enable(`o-${x}-${y - 1}`)
      enable(`o-${x + 1}-${y - 1}`)
    }
  }
  function handelMineClick (e) {//雷区点击事件
    var $el = e.target
    if ($el.classList.contains("item")) {
      if ($el.classList.contains("flag") || $el.classList.contains("question")) {
        return
      }
      if ($el.parentElement.classList.contains("is_mine")) {
        var mine = document.querySelectorAll(".is_mine")
        Array.from(mine).forEach(function (e) {
          console.log(e.children[0]);
          e.children[0].classList.add("open")
        })
        clearTimeout(n)
        var n = setTimeout(function () {
          alert("游戏结束")
          location.reload()
        }, 100)
      } else {
        enable($el.id)
      }
    }
  }
  function handelMineRightClick (e) {//雷区右键事件
    e.preventDefault()
    var $el = e.target
    if (($el.className == "item" || $el.parentElement.className == "is_mine") && !$el.innerHTML) {
      $el.classList.add("flag")
    } else if ($el.classList.contains("flag")) {
      $el.classList.remove("flag")
      $el.classList.add("question")
    } else if ($el.classList.contains("question")) {
      $el.classList.remove("question")
    }
  }
  function handelMineMouseDown (e) {//雷区按下
    var $el = e.target
    $down = $el
    if ($el.classList.contains("flag") || $el.classList.contains("question")) {
      return
    }
    if ($el.classList.contains("item")) {
      $el.classList.add("down")
    }
  }
  function handelMineMouseUp (e) {//雷区抬起
    $down.classList.remove("down")
    var $el = e.target
    if ($el.classList.contains("item")) {
      $el.classList.remove("down")
    }
  }
  function handelMineMove (e) {//移动事件
    var $el = e.target
    if ($el.classList.contains("item")) {
      $el.style.transition = "all 0.2s"
      $el.style.transform = "scale(1.1)"
      clearTimeout(id)
      var id = setTimeout(function () {
        $el.style.transform = "scale(1)"
      }, 200)
    }
  }
  function handelMineEnter (e) {//雷区移入
    $title.innerHTML = "祝您游戏愉快"
    $title.style.display = "block"
    $title.style.opacity = "1"
    $title.style.transition = "all 1s"
    clearTimeout(show)
    var show = setTimeout(function () {
      $title.style.opacity = "0"
      $title.style.display = "none"
    }, 1500)
  }
  function handelMineLeave () {//雷区移出
    $title.innerHTML = "欢迎再来"
    $title.style.display = "block"
    $title.style.opacity = "1"
    $title.style.transition = "all 1s"
    clearTimeout(show)
    var show = setTimeout(function () {
      $title.style.opacity = "0"
      $title.style.display = "none"
    }, 1500)
  }
  function handelKeyUp (e) {//键盘抬起
    if (e.key == "?" && e.shiftKey) {
      $msg.style.display = "block"
    }
  }
  function handelCloseClick (e) {//规则关闭按钮点击
    var $el = e.target
    if ($el.classList.contains("btn")) {
      $msg.style.display = "none"
    }
  }
  function handelSelectChange () {//下拉框选取
    var num = this.value.split("-")
    var row = num[0] * 1//行
    var col = num[1] * 1//列
    render(row, col)
  }
  function handelFormSubmit (e) {//表单提交
    e.preventDefault()
    var row = x.value * 1
    var col = y.value * 1
    render(row, col)
  }
  function handelTipClick () {//点击帮助按钮
    $msg.style.display = "block"
  }

  //mounted
  (function () {
    render(9, 9)

    $items.onclick = handelMineClick//雷区点击事件

    $items.oncontextmenu = handelMineRightClick//雷区右键事件
    $items.onmousedown = handelMineMouseDown//雷区按下

    $items.onmouseup = handelMineMouseUp//雷区抬起

    // $items.onmousemove = handelMineMove//移动事件

    $items.onmouseenter = handelMineEnter//雷区移入
    $items.onmouseleave = handelMineLeave//雷区移出

    window.onkeyup = handelKeyUp//键盘抬起 提示帮助
    $tip.onclick = handelTipClick//点击帮助按钮

    $msg.onclick = handelCloseClick//规则关闭按钮点击

    $select.onchange = handelSelectChange//下拉框选取

    $form.onsubmit = handelFormSubmit//表单提交

  })()


}