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

function spinPhoto() {
	console.log("in here!the photoimg");
    let photo = document.getElementById("photoimg");
	photo.style.animation= "spin-photo 3s both";
	setTimeout( () => { photo.style.animation= "idle-photo 1ms both";}, 3010);
}

function ballDrop() {
    let ball = document.getElementById("ball");
    let name = document.getElementById("name");
    ball.style.animation= "ball-drop 8s both";
}


const canopy = function (numLeaves) {
	this.numLeaves = numLeaves;
	this.full = false;
	function createCanopy() {
		const leafFactory = (angle, xpos, ypos, color, leafNo) => {
			// make new leaf elements in the dom! should be able to move 
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
		};
		function randomColor () {
			let rbg = Math.floor(Math.random() * 5);
			let redComponent = 0,
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
	};
	function breeze (intensity, numLeaves) {
		//function to move an indivual leafNo
		function moveLeaf(leaf, movement, iter, last, direction) {	
			for (i; i < iter; i++) {
				switch (movement) {
					case ("wiggle") :
						let skew = 0;
						//first movement find a random amt to skew
						if (direction === "start") { 
							skew =+ Math.floor(Math.random() * 30 - 5);
						}
						if (direction === "forward") {
							skew =+ last;	
						} else {
							skew =- last;
						}
						leaf.style.transform = `skew ${skew}deg`;
						break;
					case ("twist") :	
						//first movement find a random amt to skew
						if (direction === "start") {
							rotate =+ Math.floor(Math.random() * 30) + last;
						}
						if (direction === "forward") {
							rotate =+ last;	
						} else {
							rotate =- last;
						}
						leaf.style.transform = `rotate ${skew}deg`;
						break;
				}
				setTimeout(delay);	
	
			}
		}
		function moveBranch(leaves, branchNo) {
			let leaf = 0;
			while (leaves.length > 0) {
				leaf = leaves.pop()
				moveLeaf()
			}


		}
		//get non-repeatable array of numbers to match leaves
		let leaves = [];
		let leaves1 = [], leaves2 = [], leaves3 = [];
		let delay1 = 0, delay2 = 0, delay3 = 0;
		for (i = 0; i < numLeaves-1; i++) {
			let leaf = Math.floor(Math.random() * numLeaves);
			while (leaves.includes(leaf)) {
				leaf = Math.floor(Math.random() * numLeaves);
			}
			leaves.push(leaf);
		}
		// set delays for different intensities- 
		//		(a stronger breeze has more frequent branch movements so less delays between movements)
		if (intensity === "strong") {
			delay1 = 100;
			delay2 = 200;
			delay3 = 300;
		} else if (intensity === "medium") {
			delay1 = 500;
			delay2 = 800;
			delay3 = 1000;
		} else {  // mild intensity is default
			delay1 = 1000;
			delay2 = 1200;
			delay3 = 1400;
		}
		//three different delay times for leaf move submits
		delayShort =  Math.floor(Math.random() * delay1);   			  //delay from 0ms-(delay1)ms delay
		delayMed = Math.floor(Math.random() * (delay2+delay1) - delay1);  // delay from (delay1)ms-(delay2)ms 
		delayLong = Math.floor(Math.random() * (delay3+delay2) - delay2); // delay from (delay2)ms-(delay3)ms 
		//submit three different intervals for three "branch" groups of leaves
		while (leaves.length > 0) {
				//process first third of leaves and use setInterval to animate
				while (leaves.length < Math.floor(leaves.length/3)) {
					leaves1 = leaves.pop();
					const branchInterval1;
					clearInterval(branchInterval1);
					branchInterval1 = setInterval(moveBranch(leaves1, branchNo), delayShort);			
				}
				while (leaves.length < Math.floor(leaves.lenght/2)) {
					leaves2 = leaves.pop();
					const branchInterval2;
					clearInterval(branchInterval2);
					branchInterval2 = setInterval(moveBranch(leaves2, branchNo), delayShort);
				}
				while (leaves.length > 0) {
					leaves3 = leaves.pop();
					const branchInterval3;
					clearInterval(branchInterval3);
					branchInterval3 = setInterval(moveBranch(leaves3, branchNo), delayShort);
				}
 			}
		}	
	}  // end breeze



}  
function getDelay() {
	delay = Math.floor(Math.Random() * 100);
	leaf = leaves.pop;
	movementType = Math.floor(Math.Random() * 5);
	switch {
		case 0:
		case 1:
		case 2:
			break;
		case 3:
		case 4:
			break;
		}
}





/*
var id = setInterval(frame, 6);

function frame() {
    if () {
        clearInterval(id);
    } else {
       element style changes 
    }
}


var degrees = 360;
var incrementer = 1;
setInterval(function() {
  var deg = "rotate(" + (degrees * incrementer) + "deg)";
  var obj = document.getElementById("test");
  if (typeof(obj.style.transform) !== "undefined") {
    obj.style.transform = deg;
  } else if (typeof(obj.style.MozTransform) !== "undefined") {
    obj.style.MozTransform= deg;
  } else if (typeof(obj.style.WebkitTransform) !== "undefined") {
   obj.style.WebkitTransform = deg;
  }
  incrementer = incrementer + 1;
}, 1500);


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

document.getElementById("photo").addEventListener("click", spinPhoto);
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

	