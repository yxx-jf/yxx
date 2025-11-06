// 贪吃蛇  执行上下左右函数  改变x,y的坐标  让蛇移动

// 思路： 
// 蛇有头和尾，当蛇移动的时候其实就是 移除尾巴，添加头部
// 因此函数里要操作的数据  只需要删除尾部  改变头部xy轴坐标即可
// 向上向下移动  头只改变y轴
// 向左向右移动  头只改变x轴
// 识别头的方向：
// 如果 头朝左和右  头和身子的y轴相等   如果 头的x轴比尾部的x轴大 就是朝右  反之朝左
// 如果 头朝上和下  头和身子的x轴相等   如果 头的y轴比尾部的y轴大 就是朝下  反之朝上 

var $box = document.querySelector("#box")//box元素

for (var i = 0; i < 30; i++) {//创建元素
  for (var j = 0; j < 30; j++) {
    var $block = document.createElement("div")
    $block.classList.add("block")
    $block.id = ["c", j, i].join("-")
    $box.appendChild($block)
    // $block.textContent = [j, i].join(",")
    for (var k = 0; k < 4; k++) {
      var $span = document.createElement("span")
      $block.appendChild($span)
    }
  }
}


var snake = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }] //小蛇初始坐标
var dict = {}//字典
var food = {}//食物
var code = 39//方向

snake.forEach(function (v) {//在出生点 生成小蛇 
  var id = "#" + ["c", v.x, v.y].join("-")
  document.querySelector(id).classList.add("red")
  dict[[v.x, v.y].join("-")] = true
  document.querySelector(id).style = "transform: rotate(270deg);"
})

drop()//添加食物
document.querySelector("#" + ["c", snake[snake.length - 1].x, snake[snake.length - 1].y].join("-")).classList.remove("red")//删除蛇头的red
document.querySelector("#" + ["c", snake[snake.length - 1].x, snake[snake.length - 1].y].join("-")).classList.add("yellow")//给蛇头染色

var n = null//计时器
var grade = 0//分数
var level = 1//关卡
var speed = 300   //速度
var $start = document.querySelector(".start")//开始
var $go = document.querySelector(".go")//继续
var $pause = document.querySelector(".pause")//暂停
var $remake = document.querySelector(".remake")//重置
var $grade = document.querySelector(".grade")//分数
var $level = document.querySelector(".level")//关卡
var $next = document.querySelector(".next")//下一关
$grade.textContent = ["分数：", grade].join("")//加分


$start.onclick = function () {
  document.addEventListener("keydown", keydown, true)//添加键盘按下事件
  n = setInterval(move, 300)
  $start.style = "display: none;"
  $go.style = "display:block;"
  $pause.style = "display:block;"
  $remake.style = "display:block;"
  $start.textContent = ""
}
$go.onclick = function () {
  document.addEventListener("keydown", keydown, true)//添加键盘按下事件
  n = setInterval(move, 300)
}
$pause.onclick = function () {
  document.removeEventListener("keydown", keydown, true)//移除键盘按下事件
  clearInterval(n)
  n = null
}
$remake.onclick = function () {
  location.reload()
}

function move () {//移动方法
  var old = snake[snake.length - 1]
  var x0 = old.x
  var y0 = old.y

  switch (code) {//上下左右
    case 38:
      var obj = { x: x0, y: y0 - 1 }
      break
    case 40:
      var obj = { x: x0, y: y0 + 1 }
      break
    case 37:
      var obj = { x: x0 - 1, y: y0 }
      break
    case 39:
      var obj = { x: x0 + 1, y: y0 }
      break
  }

  if (dict[[obj.x, obj.y].join("-")]) {//头撞身体尾巴 游戏结束
    clearInterval(n)
    if (confirm("游戏结束，是否再来一局？")) {
      location.reload()
    } else {
      location.reload()
    }
    return
  }

  if (obj.x < 0 || obj.x > 29 || obj.y < 0 || obj.y > 29) {//碰到边界 游戏结束
    clearInterval(n)
    if (confirm("游戏结束，是否再来一局？")) {
      location.reload()
    } else {
      location.reload()
    }
    return
  }

  if (obj.x == food.x && obj.y == food.y) {//小蛇吃东西变大
    document.querySelector("#" + ["c", food.x, food.y].join("-")).classList.remove("green")//删除吃掉的食物
    drop()
    grade += 1//加分
  } else {
    var del_val = snake.shift()//删除开头坐标

    delete dict[[del_val.x, del_val.y].join("-")]//更新字典

    document.querySelector("#" + ["c", del_val.x, del_val.y].join("-")).classList.remove("red")//删除开头坐标对应元素的red类名
    document.querySelector("#" + ["c", del_val.x, del_val.y].join("-")).style = ""
  }




  snake.push(obj)//添加头部坐标

  $grade.textContent = ["分数：", grade].join("")//加分
  if (grade == 2) {
    clearInterval(n)
    speed -= 100
    if (speed <= 37.5) {
      speed = 37.5  //最快速
    }
    document.removeEventListener("keydown", keydown, true)//移除键盘按下事件
    $next.style = "display:block"
    $next.onclick = function () {
      document.addEventListener("keydown", keydown, true)//添加键盘按下事件
      $next.style = "display:none"
      n = setInterval(move, speed)
      level += 1
      grade = 0
      $grade.textContent = ["分数：", grade].join("")//加分
      $level.textContent = ["关卡：", level].join("")//关卡数
    }
  }

  dict[[obj.x, obj.y].join("-")] = true//更新字典

  snake.forEach(function (v) {//给蛇身染色
    var id = "#" + ["c", v.x, v.y].join("-")
    document.querySelector(id).classList.remove("yellow")
    document.querySelector(id).classList.add("red")
    switch (code) {//上下左右
      case 38:
        document.querySelector(id).style = "transform: rotate(180deg);"
        break
      case 40:
        document.querySelector(id).style = "transform: rotate(0deg);"
        break
      case 37:
        document.querySelector(id).style = "transform: rotate(90deg);"
        break
      case 39:
        document.querySelector(id).style = "transform: rotate(270deg);"
        break
    }
  })

  document.querySelector("#" + ["c", obj.x, obj.y].join("-")).classList.remove("red")//删除蛇头的red
  document.querySelector("#" + ["c", obj.x, obj.y].join("-")).classList.add("yellow")//给蛇头染色


}

function drop () {//添加食物
  do {
    var x = Math.floor(Math.random() * 30)
    var y = Math.floor(Math.random() * 30)
  } while (dict[[x, y].join("-")])
  food.x = x
  food.y = y
  document.querySelector("#" + ["c", x, y].join("-")).classList.add("green")//给食物染色
}

function keydown (event) {//键盘事件
  if (event.keyCode >= 37 && event.keyCode <= 40 && Math.abs(code - event.keyCode) != 2) {
    code = event.keyCode
    move()
  }
}

///////////////////////////////////////////////////////////////////////////////


