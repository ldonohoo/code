function ballDrop() {

    var ball = document.getElementById("ball");
    var name = document.getElementById("name");
    ball.style.animation= "ball-drop 40s both";
    
    name.style.backgroundColor = "pink";
}

function getLeaves() {

	const numLeaves = 20;
	
	/* make new leaf elements in the dom! should be able to move */
	const leafFactory = (angle, xpos, ypos, leafNo) => {
		/* create new div element with unique leaf id */
		const leaf = document.createElement("div");
		leaf.setAttribute("id", "leaf " + leafNo);
		leaf.style.width = '12px';
		leaf.style.height = '12px';
		leaf.style.borderRadius = "1px 8px .25px 8px";
		leaf.style.background = "#6DC75F";
		leaf.style.background = "red";
		leaf.style.position = "absolute";
		leaf.style.transform = `translate(${xpos}px, ${ypos}px)`;
		leaf.style.transform = `rotate(${angle})`;
		return leaf;
	}
	/* populate tree with leaves */ 
	var treebox = document.getElementById("treebox");
	for (i = 1; i < numLeaves; i++) {
		var xpos = Math.floor(Math.random() * 300);
		var ypos = Math.floor(Math.random() * 200);
		var angle = Math.floor(Math.random() * 180);
		var newLeaf = leafFactory(angle, xpos, ypos, i);
		console.log(xpos, ypos, angle);
		treebox.appendChild(newLeaf);
	}

}


	/*
	wiggle: function() {
		this.style.transform = "skew(10deg,10deg)";
	},
	twist: function() {
		this.style.transform = "rotate(10deg)";
	};
	-find random angle
	-find random x, y within tree Range
	-make a leaf
	*/


