
function ballDrop() {
    let ball = document.getElementById("ball");
    let name = document.getElementById("name");
    ball.style.animation= "ball-drop 40s both";
}

function getLeaves() {
	const numLeaves = 20;
	/* make new leaf elements in the dom! should be able to move */
	const leafFactory = (angle, xpos, ypos, leafNo) => {
		/* create new div element with unique leaf id */
		const leaf = document.createElement("div");
		leaf.setAttribute("id", "leaf " + leafNo);
		leaf.style.position = "absolute";
		leaf.style.width = '12px';
		leaf.style.height = '12px';
		leaf.style.borderRadius = "1px 8px .25px 8px";
		leaf.style.background = "#6DC75F";
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
function spraySparkles() {
	alert("sparkle!");
}

/*
function popupSkill(skill) {
	alert("click on box" + skill.innerHTML);
	const popup = document.getElementById("popup");
	const name = skill.innerHTML;
	const para = skill.nextElementSibling.innerHTML;
	popup.innerHTML = name;
	popup.display = "block";
}*/



// Event listeners below:

document.getElementById("name").addEventListener("click", getLeaves);
document.getElementById("photo").addEventListener("click", spraySparkles);

// Set event listeners for skills (fake buttons)


const skills = document.getElementsByClassName("skill-name");
for (i=0; i < skills.length; i++) {
	skills[i].addEventListener("click",  (event) => {
		console.log(event.target.innerHTML);
		const popup = document.getElementById("popup");
		const text = event.target.innerText + "<br>" + 
				event.target.nextElementSibling.innerHTML;
		popup.innerHTML = text;
		popup.style.display = "block";
	});
};


	
    // Now do something with my button

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

