//data
var list = []//数据
var $tbody = document.querySelector("table tbody")//表格
var $form = document.querySelector("form")//表格
var $add = document.querySelector(".add")//添加按钮


//method
function time (v) {//a-a-a-a-a-a 格式生成
  var now = new Date(v)
  var year = now.getFullYear()
  var month = now.getMonth() + 1
  var day = now.getDate()
  var hours = now.getHours()
  var minute = now.getMinutes()
  var second = now.getSeconds()
  return `${year}/${month}/${day}/${hours}:${minute}:${second}`
}
function format (data) {
  var arr = data.map(e => {
    var obj = {}
    obj.id = e.id
    obj.account = e.attributes.account
    obj.password = e.attributes.password
    obj.username = e.attributes.username
    obj.power = e.attributes.power
    obj.time = time(e.attributes.createdAt)
    if (obj.power.is_admin) {
      obj.power = "管理员"
    } else if (obj.power.is_user) {
      obj.power = "用户"
    }
    return obj
  })
  return arr
}
function render (obj) {//画表格
  $tbody.innerHTML = ''
  obj.forEach(e => {//遍历数据 创建行
    var $tr = document.createElement("tr")
    $tr.setAttribute("align", "center")
    $tbody.appendChild($tr)
    for (const i in e) {//遍历数据对象 创建列
      $tr.innerHTML += `<td>${e[i]}</td>`
    }
    $tr.innerHTML += `<td><button uid="${e.id}" class="edit">编辑</button><button uid="${e.id}" class="del">删除</button></td>`
  });
}
function handel_add_click () {//新增按钮
  location.href = `./item.html`
}
function handel_table_click (e) {//改&删
  var $el = e.target
  if ($el.classList.contains("edit")) {//改
    var id = $el.getAttribute("uid") * 1
    location.href = `./item.html?id=${id}&a=1`
  } else if ($el.classList.contains("del")) {//删
    var id = $el.getAttribute("uid") * 1
    axios({
      url: `http://localhost:1337/api/table-users/${id}`,
      method: "delete"
    }).then(function (res) {
      list = list.filter(function (v) {
        return v.id != id
      })
      render(list)
    })
  }
}

//mounted
function mounted () {

  axios({//查
    url: 'http://localhost:1337/api/table-users?populate=*&sort[0]=id',
    method: "get"
  }).then(res => {
    list = format(res.data.data)
    render(list)
  }).catch(res => {
    alert(res.message)
  })
  $tbody.onclick = handel_table_click
  $add.onclick = handel_add_click
}
mounted()
