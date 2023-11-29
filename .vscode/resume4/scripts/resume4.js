

function bouncePhoto () {
	let photo = document.getElementById("photoimg");
	photo.style.animation= "bounce-photo .2sec both";
	alert("wowsers");
}


function ballDrop() {

    let ball = document.getElementById("ball");
    let name = document.getElementById("name");
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
		leaf.style.position = "absolute";
		leaf.style.transform = `translate(${xpos}px, ${ypos}px)`;
		leaf.style.transform = `rotate(${angle})`;
		return leaf;
	}
	/* populate tree with leaves */ 
	for (i = 1; i < numLeaves; i++) {
		let xpos = Math.floor(Math.random() * 300);
		let ypos = Math.floor(Math.random() * 200);
		let angle = Math.floor(Math.random() * 180);
		let newLeaf = leafFactory(angle, xpos, ypos, i);
		console.log(xpos, ypos, angle);
		document.getElementById("treebox").appendChild(newLeaf);
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


// Event listeners here:

document.getElementById("name").addEventListener("click", getLeaves);
//document.getElementById("photo").addEventListener("mouseover", bouncePhoto);

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


