function changeWidth(width) {
  var table = document.getElementById("myTable");
  table.style.width = width;
}

function changeBorderAndSpacingWidth(border, spacing) {
  var table = document.getElementById("myTable");
  table.style.border = border;
  table.style.borderSpacing = spacing;
}

function changeColor(color) {
  var table = document.getElementById("myTable");
  table.style.backgroundColor = color;
  var tds = document.querySelectorAll("td");
  for (var i = 0; i < tds.length; i++) {
    tds[i].style.backgroundColor = color;
  }
}

function resetStyle() {
  var table = document.getElementById("myTable");
  // Reset the styles to the original
  table.style.width = "500px";
  table.style.border = "1px solid black";
  table.style.borderSpacing = "2px";
  table.style.backgroundColor = "#fff";
  var tds = document.querySelectorAll("td");
  for (var i = 0; i < tds.length; i++) {
    tds[i].style.backgroundColor = "#fff";
  }
}
