// compute the pixels per rem for a given screen size
//		(used when positioning leaves on tree)
let bodyFontSize = window.getComputedStyle(document.body, null).getPropertyValue("font-size");
pixelsPerRem = parseInt(bodyFontSize.slice(0, -2));
const remToPixels = (rem) => { return `${rem * pixelsPerRem}`; };

// populate tree with leaves :)
getLeaves();


//functions:
function openResume() {
	window.open("images/lisa-donohoo-resume.rtf", "_blank");
}

function ballDrop() {
    let ball = document.getElementById("ball");
    let name = document.getElementById("name");
    ball.style.animation= "ball-drop 8s both";
}

function getLeaves() {
	const numLeaves = 200;
	// make new leaf elements in the dom! should be able to move 
	const leafFactory = (angle, xpos, ypos, color, leafNo) => {
		// leaf shape in rem below:
		const leafPt1 = remToPixels(.06);
		const leafPt2 = remToPixels(.5);
		const leafPt3 = remToPixels(.016);
		const leafPt4 = remToPixels(.5);
		// create new div element with unique leaf id
		const leaf = document.createElement("div");
		leaf.setAttribute("id", "leaf " + leafNo);
		leaf.style.position = "absolute";
		leaf.style.width = remToPixels(.75) + "px";
		leaf.style.height = remToPixels(.75) + "px";
		leaf.style.borderRadius = `${leafPt1}px ${leafPt2}px ${leafPt3}px ${leafPt4}px`;
		leaf.style.background = color;
		leaf.style.transformOrigin = "center";
		leaf.style.transform = `translate(${xpos}px, ${ypos}px) rotate(${angle}deg)`;

		return leaf;
	}
	
	function randomColor () {
		let rbg = Math.floor(Math.random() * 5);
		let redComponenent = 0,
			greenComponent= 0,
			blueComponent = 0; 
		// switch to select leaf color variations: 2/5 yellow/red & 3/5 greener
		switch (rbg) {
			case 1: 
			case 2:
				redComponent = Math.floor(Math.random() * 188 + 23); //rand 23-210 red
				greenComponent = 210;
				blueComponent = 23;	
				break;
			case 3:
			case 4:
			case 5:
				redComponent = 210;
				greenComponent = Math.floor(Math.random() * 121 + 90); //rand 90-210 green
				blueComponent = 23;
				break;
			default: 
				redComponent = Math.floor(Math.random() * 120);
				greenComponent = Math.floor(Math.random() * 120);
				blueComponent = 23;
				break;
		}
		return `rgb(${redComponent}, ${greenComponent}, ${blueComponent})`;
	}

	/* populate tree with leaves and append element to .treebox */
	for (i = 1; i < numLeaves; i++) {
		// random leaf position, leaf angle, and greenish color
		let xpos = remToPixels(Math.random() * 13);
		let ypos = remToPixels(Math.random() * 8);
		let angle = Math.floor(Math.random() * 359);
		let color = randomColor();
		let newLeaf = leafFactory(angle, xpos, ypos, color, i);
		document.getElementById("treebox").appendChild(newLeaf);
	}

}  // end getLeaves

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
	alert("sparkles!");
}


// Event listeners below:

//name, phone, email tooltip events
document.getElementById("name").addEventListener("click", openResume);
document.getElementById("name").addEventListener("mouseover", (event) => { 
	if (event.target.querySelector(".tooltiptext2") != null) {
		event.target.querySelector(".tooltiptext2").style.display = "block";	} });
document.getElementById("name").addEventListener("mouseout", (event) => {
	if (event.target.querySelector(".tooltiptext2") != null) {
		event.target.querySelector(".tooltiptext2").style.display = "none"; 	} });
document.querySelector(".phone").addEventListener("mouseover", (event) => { 
	if (event.target.querySelector(".tooltiptext2") != null) {
		event.target.querySelector(".tooltiptext2").style.display = "block";	} });
document.querySelector(".phone").addEventListener("mouseout", (event) => {
	if (event.target.querySelector(".tooltiptext2") != null) {
		event.target.querySelector(".tooltiptext2").style.display = "none"; } });
document.querySelector(".email").addEventListener("mouseover", (event) => { 
	if (event.target.querySelector(".tooltiptext2") != null) {
		event.target.querySelector(".tooltiptext2").style.display = "block";	} });
document.querySelector(".email").addEventListener("mouseout", (event) => {
	if (event.target.querySelector(".tooltiptext2") != null) {
		event.target.querySelector(".tooltiptext2").style.display = "none"; 	} });

document.getElementById("photo").addEventListener("click", spraySparkles);
document.querySelector(".phone").addEventListener("click", (event) => {navigator.clipboard.writeText(event.target.innerText);} );
document.querySelector(".email").addEventListener("click", (event) => {navigator.clipboard.writeText(event.target.innerText);} );
document.getElementById("ball").addEventListener("click", ballDrop);


// Set event listeners for skills: open popup box on skill names
const skills = document.getElementsByClassName("skill-name");
for (i=0; i < skills.length; i++) {
	//add listeners for tooltip popups on mouseover and mouseout
	tooltip = skills[i].innerHTML;
	if (skills[i].querySelector(".tooltiptext")) {
		console.log("adding listener for: "+ tooltip + ";");
		skills[i].addEventListener("mouseover",  (event) => { 
			let tooltipDisplay = event.target.querySelector(".tooltiptext");
			if (tooltipDisplay != null) {
				event.target.querySelector(".tooltiptext").style.display = "block";
			} 
		});
		skills[i].addEventListener("mouseout",  (event) => { 
			let tooltipDisplay = event.target.querySelector(".tooltiptext");
			if (tooltipDisplay != null) {
				event.target.querySelector(".tooltiptext").style.display = "none";
			} 
		});
		//event.target.querySelector(".tooltiptext").style.display = "none";			
	};	
}
for (i=0; i < skills.length; i++) {
	//add listeners for skills popups on click
	skills[i].addEventListener("click",  (event) => {
		console.log("firing event:" + event.target.innerHTML);
		let text = event.target.innerText + "<br><span>" + 
			event.target.nextElementSibling.innerHTML + "</span>";
		const popup = document.getElementById("popup");
		const figure = event.target.nextElementSibling.nextElementSibling;
		if (figure)  text = (text + "<span id=popFig>" + figure.innerHTML + "<span>");
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

	