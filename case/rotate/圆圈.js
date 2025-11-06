window.onload = function () {
  var $box = document.querySelector(".box")
  var $form = document.querySelector("form")
  function rotate (num, radius, Radius, el) {
    el.innerHTML = ""
    var arr = [{ x: 0, y: 0 }]
    for (var i = 1; i < num; i++) {
      arr.push({
        x: Math.cos(i * Math.PI * 2 / (num - 1)) * Radius,
        y: Math.sin(i * Math.PI * 2 / (num - 1)) * Radius
      })
    }
    arr.forEach(function (v) {
      v.x += el.offsetWidth / 2 - radius
      v.y += el.offsetHeight / 2 - radius
      var $round = document.createElement("div")
      $round.className = "round"
      $round.style.width = `${radius * 2}px`
      $round.style.height = `${radius * 2}px`
      $round.style.left = `${v.x}px`
      $round.style.top = `${v.y}px`
      $box.appendChild($round)
    })
  }
  $form.onsubmit = function (e) {
    e.preventDefault()
    var num1 = this.num1.value * 1
    var num2 = this.num2.value * 1
    var num3 = this.num3.value * 1
    rotate(num1, num2, num3, $box)
  }

}