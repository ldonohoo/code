
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
leaf.style.rotate = '10deg';
const bigbox = document.getElementById("bigbox");
bigbox.appendChild(leaf);
const leaf2 = document.createElement("div");
leaf2.setAttribute("id", "leaf " + 49);
leaf2.style.borderRadius = "1px 8px .25px 8px";
leaf2.style.background = "#6DC75F";
leaf2.style.width = '12px';
leaf2.style.height = '12px';
leaf2.style.rotate = '75deg';
leaf2.style.backgroundColor = "pink";
bigbox.appendChild(leaf2);

