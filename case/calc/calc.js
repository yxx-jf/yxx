
var $exp = document.querySelector(".screen  h1")// 表达式
var $result = document.querySelector(".screen p")// 结果
var $btn = document.querySelectorAll(".key .btn")// 按键元素组

var res = "" // 存放表达式内容
var style_show = "font-size: 0.94rem; height: 1rem; opacity:1;"  //文字高亮
var style_hide = "font-size: 0.32rem; opacity: 0.6; height: 0.3rem;"  //文字隐显

for (var i = 0; i < $btn.length; i++) {
  $btn[i].onclick = handle_key_click
}

function handle_eq_click () {// 点击等号处理程序
  // res = res.replace(/÷/g, "/").replace(/×/g, "*")
  $result.textContent = "= " + eval(res.replace(/÷/g, "/").replace(/×/g, "*"))
  $result.style = style_show
  $exp.style = style_hide
}

function handle_key_click () {// 点击按键处理程序
  res += this.textContent
  $exp.textContent = res
  var show
  show = res.replaceAll("÷", "/").replaceAll("×", "*")
  if (Number(show.charAt(show.length - 1))) {
    show = eval(show)
  } else {
    show = eval(show.slice(0, show.length - 1))
  }
  $result.textContent = "= " + eval(show)
  $result.style = style_hide
  $exp.style = style_show
}

function handle_clear_click () {//归零
  $exp.textContent = ""
  $result.textContent = "0"
  res = ""
}
function handle_del_click () {//删除
  res = res.slice(0, -1)
  $exp.textContent = res
}
