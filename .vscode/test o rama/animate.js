
function bounce() {

    var ball = document.getElementById("ball");

    ball.style.backgroundColor = "pink";
    ball.style.top = "100%";
    ball.style.left = "70%";

}

const leaf = document.createElement("div");


leaf.setAttribute("id", "leaf " + 42);
leaf.style.borderRadius = "1px 8px .25px 8px";
leaf.style.background = "#6DC75F";
leaf.style.width = '12px';
leaf.style.height = '12px';

var bigbox = document.getElementById("bigbox");
bigbox.appendChild(leaf);
