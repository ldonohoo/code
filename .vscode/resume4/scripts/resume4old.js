// compute the pixels per rem for a given screen size
//		(used when positioning leaves on tree)
let bodyFontSize = window.getComputedStyle(document.body, null).getPropertyValue("font-size");
pixelsPerRem = parseInt(bodyFontSize.slice(0, -2));
console.log(pixelsPerRem);
const remToPixels = (rem) => { return `${rem * pixelsPerRem}`; };


function ballDrop() {
    let ball = document.getElementById("ball");
    let name = document.getElementById("name");
    ball.style.animation= "ball-drop 40s both";
}

function getLeaves() {
	const numLeaves = 20;
	// make new leaf elements in the dom! should be able to move 
	const leafFactory = (angle, xpos, ypos, leafNo) => {
		// create new div element with unique leaf id 
		const leafPt1 = remToPixels(.06);
		const leafPt2 = remToPixels(.5);
		const leafPt3 = remToPixels(.016);
		const leafPt4 = remToPixels(.5);
		xpos = remToPixels(xpos);
		ypos = remToPixels(ypos);

		const leaf = document.createElement("div");
		leaf.setAttribute("id", "leaf " + leafNo);
		leaf.style.position = "absolute";
		leaf.style.width = remToPixels(.75);
		leaf.style.height = remToPixels(.75);
		//leaf.style.borderRadius = "1px 8px .25px 8px";
		leaf.style.borderRadius = `${leafPt1}px ${leafPt2}px ${leafPt3}px ${leafPt4}px`;
		leaf.style.background = "#6DC75F";
		leaf.style.rotate = `${angle}deg`;
		console.log("position: " + xpos + ",," + ypos);
		console.log("leaf: " + leafPt1 + "," + leafPt2 + ","+ leafPt3 + "," + leafPt4 + ",");
		leaf.style.transform = `translate(${xpos}px, ${ypos}px)`;
		//leaf.style.transform = `translate(${remToPixels(xpos)}, ${remToPixels(ypos)})`;
		return leaf;
	}
	/* populate tree with leaves */ 
	for (i = 1; i < numLeaves; i++) {
		let xpos = Math.floor(Math.random() * 13);
		let ypos = Math.floor(Math.random() * 13);
		let angle = Math.floor(Math.random() * 359);
		console.log("pos:"+xpos+","+ypos)
		let newLeaf = leafFactory(angle, xpos, ypos, i);
		console.log(xpos, ypos, angle);
		document.getElementById("treebox").appendChild(newLeaf);
	
	}
	const newLeaf = leafFactory(68, 32, 96, 42);
	newLeaf.style.backgroundColor = "red";
	document.getElementById("treebox").appendChild(newLeaf);
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

// Set event listeners for skills: open popup box on skill names
const skills = document.getElementsByClassName("skill-name");
for (i=0; i < skills.length; i++) {
	skills[i].addEventListener("click",  (event) => {
		let text = event.target.innerText + "<br><span>" + 
			event.target.nextElementSibling.innerText + "</span>";
		const popup = document.getElementById("popup");
		popup.innerHTML = text;
		if (popup.style.display === "block") {	//close box so you see animation if box already open
			popup.style.display = "none";
			//timeout so you can see new box animation
			setTimeout(() => { popup.style.display = "block";}, 20);
		} else {
		popup.style.display = "block";
		};
	});
}
// event listener to close popup box 
document.querySelector("body").addEventListener("click", (event) => {
	const popup = document.getElementById("popup");
	// close popup box if open and not a selected skill
	if ((popup.style.display === "block") && 
		(event.target.className != "skill-name")) {
		popup.style.display = "none";
	};
});

	
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


