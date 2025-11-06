//data
var id = query_parms("id")//id
var $form = document.querySelector("form")//表格
var $submit = document.querySelector(".submit")//提交按钮

var list = {}//数据

//methods
function render (obj) {//填数据
  for (var i in obj) {
    var $el = document.getElementsByName(`${i}`)[0]
    $el.value = obj[i]
  }
}
function format (data) {//数据格式化
  var arr = data.map(e => {
    var obj = {}
    obj.account = e.attributes.account
    obj.password = e.attributes.password
    obj.username = e.attributes.username
    obj.power = e.attributes.power
    if (obj.power.is_admin) {
      obj.power = "is_admin"
    } else if (obj.power.is_user) {
      obj.power = "is_user"
    }
    return obj
  })
  return arr
}
function send (el, method) {//增|改方式送信
  var data = {}
  for (var i = 0; i < el.length - 2; i++) {
    data[el[i].name] = el[i].value
    if (el[i].name == "power") {
      data[el[i].name] = {}
      data[el[i].name][el[i].value] = true
    }
  }
  if (!Object.values(data).every(function (v) { return v })) {//表单验证
    alert("请将信息填写完整")
    return
  }
  axios({
    url: `http://localhost:1337/api/table-users/${id ? id : ""}`,
    method: method,
    data: {
      "data": data
    }
  }).then(function (res) {
    if (res.status == 200) {
      list = format([res.data.data])[0]
      render(list)
      alert("提交成功")
    }
  })
}
function handel_form_submit (e) {//增|改
  e.preventDefault()
  if (id) {
    send(this, "put")
  } else {
    send(this, "post")
  }
}
function query_parms (key) {//正则查询字符串传参
  if (location.search) {
    var reg = new RegExp(`${key}=([^&]+)`)
    return location.search.match(reg)[1]
  }

}
//mounted
function mounted () {
  if (id) {
    axios({//查
      url: `http://localhost:1337/api/table-users/${id}`,
      method: "get"
    }).then(res => {
      list = format([res.data.data])[0]
      render(list)
    }).catch(res => {
      alert(res.message)
    })
  }
  $form.onsubmit = handel_form_submit
}
mounted()