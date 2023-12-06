// compute the pixels per rem for a given screen size
//		(used when positioning leaves on tree)
let bodyFontSize = window.getComputedStyle(document.body, null).getPropertyValue("font-size");
pixelsPerRem = parseInt(bodyFontSize.slice(0, -2));
const remToPixels = (rem) => { return `${rem * pixelsPerRem}`; };


//functions:
function openResume() {
	window.open("images/lisa-donohoo-resume.rtf", "_blank");
}

//not currently used....functional but not very interesting 
function ballDrop() {
    let ball = document.getElementById("ball");
    let name = document.getElementById("name");
    ball.style.animation= "ball-drop 8s both";
}

class Canopy {
	constructor(numLeaves) {
		this.numLeaves = numLeaves;
		this.isfull = false;
	}
	getLeaves() {
		console.log("getleaves start"+ this.numLeaves+"!!!");
		//functions to support getleaves:
		// make new leaf elements in the dom! should be able to move 
		function getLeafProfile(profileNum) {
			let profile = [];
			// leaf profiles: "leaves" are made taking boxes and applying
			//				asymetrical border radii.
			//		heights and widths for box size, raidii refers to top, 
			//		right, bottom, left profiles 
			// leaf shapes in rem below to make leaf size responsive:
			const leafWidth1 = remToPixels(.75) + "px";
			const leafHeight1 = remToPixels(.75) + "px";
			const leafWidth2 = remToPixels(1) + "px";
			const leafHeight2 = remToPixels(.5) + "px";
			const sideRadius1 = remToPixels(.06) + "px";
			const sideRadius2 = remToPixels(.5) + "px";
			const sideRadius3 = remToPixels(.016) + "px";
			const sideRadius4 = remToPixels(.5) + "px";
			// four leaf profiles:
			switch (profileNum) {
				case 0: 
					profile = [leafWidth1, leafHeight1, sideRadius1, sideRadius2, sideRadius3, sideRadius4];
					break 
				case 1: 
					profile = [leafWidth1, leafHeight1, sideRadius4, sideRadius1, sideRadius2, sideRadius3];
					break; 
				case 2:
					profile = [leafWidth2, leafHeight2, sideRadius1, sideRadius2, sideRadius3, sideRadius4];
					break;
				case 3:
				default:
					profile = [leafWidth2, leafHeight2, sideRadius4, sideRadius1, sideRadius2, sideRadius3];
				break;
			}
			return profile;
		}
		function randomColor () {
			let rbg = Math.floor(Math.random() * 5);
			let redComponent = 0,
				greenComponent= 0,
				blueComponent = 0; 
			// switch to select leaf color variations: 2/5 yellowish & redish & 3/5 greener (more green leaves)
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
		const leafFactory = (angle, xpos, ypos, color, leafNo) => {
			// create new div element with unique leaf id
			const branchNo = 1;
			// get random leaf shape/profile
			const leafProfile = getLeafProfile(Math.floor(Math.random() * 4));
			const leafRadii = ` ${leafProfile[2]} ${leafProfile[3]} ${leafProfile[4]} ${leafProfile[5]}`;
	
			// create new leaf element
			const leaf = document.createElement("div");
			leaf.setAttribute("id", "leaf" + leafNo);
			// create new attribute for DOM element: store branch number of leaf
			const branchAttribute = document.createAttribute("branch");
			branchAttribute.value = branchNo;
			leaf.setAttributeNode(branchAttribute);
			leaf.style.position = "absolute";
			leaf.style.width = leafProfile[0];
			leaf.style.height = leafProfile[1];
			leaf.style.borderRadius = leafRadii;
			leaf.style.background = color;
			leaf.style.transformOrigin = "center";
			leaf.style.left = `${xpos}px`;
			leaf.style.top = `${ypos}px`;
	
			return leaf;
		}
		// get random leaf colors: greens and yellows and oranges (but mostly greens)

		// populate tree with leaves and append element to .treebox 
		console.log("::getting leaves now:" + this.numLeaves+"!!!");
		for (let i = 0; i < this.numLeaves; i++) {
			// random leaf position, leaf angle, and greenish color
			let xpos = remToPixels(Math.random() * 13);
			let ypos = remToPixels(Math.random() * 8);
			let angle = Math.floor(Math.random() * 359);
			let color = randomColor();
			let newLeaf = leafFactory(angle, xpos, ypos, color, i);
			document.getElementById("treebox").appendChild(newLeaf);
		}
		//tree is full if at least one leaf created in treebox
		if (this.numLeaves > 1) {
			this.isfull = true;  
		} else {
			this.isfull = false;
		}
	}
	breeze(type) {
		//console.log("breeze start: " + type + this.numLeaves);
		function getLeafNos(numLeaves) {
			//get random, non-repeatable array of leaf numbers to correspond to leaf element ids
			let leafNos = [];
			//let numLeaves = 100;
			for (let i = 0; i < numLeaves; i++) {
				let leafNo = Math.floor(Math.random() * numLeaves);
				while (leafNos.includes(leafNo)) {
					leafNo = Math.floor(Math.random() * numLeaves);
				}
				leafNos.push(leafNo);
			}
			console.log("leaf array:"+ leafNos+"!!!");
			return leafNos;
		}
		function getAnimProfile() {
			// set animation criteria for each breeze- 
			//		e.g.- a stronger breeze has more frequent branch movements so less delays between movements, etc.
			let animProfile = "";
			switch (type) {
				case "strong":
					break;
				case "medium":
					break;
				default :    // a mild breeze is default
					break;
			}
			let branch = 1;
			let numLeaves = 15;
			animProfile = { leavesToAnimate: numLeaves, branchMoveType: "wiggle", branchDuration: 500, branchDelay: 0, branchIter: 20,  branchTiming: "ease-in-out"};
			return animProfile;
		}
		function moveBranch(leaves, animProfile) {
			// move each leaf in branch 
			while (leaves.length > 0) {
				// grab first random leaf on this branch to animate
				let leafId = "leaf" + leaves.pop();
				// get leaf element 
				let queryLeafId = `#${leafId}`;
				let leaf = document.querySelector(queryLeafId);
				let moveType = animProfile.branchMoveType;
				// some leaf animation properties are based on branch but slightly randomized to appear unique
				let duration = animProfile.branchDuration + Math.floor(Math.random() * 650 - 150);
				let iter = animProfile.branchIter + Math.floor(Math.random() * 8);
				let direction = "alternate-reverse";
				let delay = animProfile.branchDelay + Math.floor(Math.random() * 100);
				let timing = animProfile.branchTiming;
				let fillMode = "both";
				console.log("anim:"+ " mt:" + moveType + " dur:"+ duration + " iter:"+ iter + " direc:"+ direction + " del:"+ delay + " timing:"+ timing+ " flmd:" + fillMode);
				leaf.style.animation= `${moveType} ${duration}ms ${iter} ${direction} ${delay}ms ${timing} ${fillMode}`;
			}
		}
		// get leaves, get desired animation profile, then
		// 		animate each region of leaves with moveBranch
		const animProfile = getAnimProfile();
		const leafNos = getLeafNos(animProfile.leavesToAnimate);
		moveBranch(getLeafNos(animProfile.leavesToAnimate), animProfile);	
	}
}

const canopy1 = new Canopy(30);
canopy1.getLeaves();
canopy1.breeze("mild");
console.log("wth"+ canopy1);


//getLeaves(200);
//breeze("mild", 180);








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


        //  use dynamic variable name for interval:
        //         e.g.    const leaf45interval = setInterval(moveleaf(leaf, "wiggle", "start"));
        eval('const leaf' + leafNo + 'setInterval(moveLeaf(' + leaf + ', "wiggle", "start") ' + iter + ')')



	*/

function spraySparkles() {
	alert("<great effect here>");
}


// Event listeners below:

//name events
document.getElementById("name").addEventListener("click", openResume);
document.getElementById("name").addEventListener("mouseover", (event) => { 
	if (event.target.querySelector(".tooltiptext2") != null) {
		event.target.querySelector(".tooltiptext2").style.display = "block";	} });
document.getElementById("name").addEventListener("mouseout", (event) => {
	if (event.target.querySelector(".tooltiptext2") != null) {
		event.target.querySelector(".tooltiptext2").style.display = "none"; 	} });
//phone events
document.querySelector(".phone").addEventListener("mouseover", (event) => { 
	if (event.target.querySelector(".tooltiptext2") != null) {
		event.target.querySelector(".tooltiptext2").style.display = "block";	} });
document.querySelector(".phone").addEventListener("mouseout", (event) => {
	if (event.target.querySelector(".tooltiptext2") != null) {
		event.target.querySelector(".tooltiptext2").style.display = "none"; } });
		document.querySelector(".phone").addEventListener("click", (event) => {
			navigator.clipboard.writeText(event.target.innerText);} );
//email events
document.querySelector(".email").addEventListener("mouseover", (event) => { 
	if (event.target.querySelector(".tooltiptext2") != null) {
		event.target.querySelector(".tooltiptext2").style.display = "block";	} });
document.querySelector(".email").addEventListener("mouseout", (event) => {
	if (event.target.querySelector(".tooltiptext2") != null) {
		event.target.querySelector(".tooltiptext2").style.display = "none"; 	} });
document.querySelector(".email").addEventListener("click", (event) => {
			navigator.clipboard.writeText(event.target.innerText); } );
//other random events
document.getElementById("photo").addEventListener("click", spraySparkles);
document.querySelector(".tree").addEventListener("click", spraySparkles);
document.getElementById("ball").addEventListener("click", ballDrop);


/* Set event listeners for skills & tooltips:
		open popup box on skill names
		display tooltip for selected items   */
const skills = document.getElementsByClassName("skill-name");
//add listeners for tooltip popups on mouseover and mouseout
for (i=0; i < skills.length; i++) {
	tooltip = skills[i].innerHTML;
	if (skills[i].querySelector(".tooltiptext")) {
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
	};	
}
//add listeners for tooltip popups on click of skills
for (i=0; i < skills.length; i++) {
	skills[i].addEventListener("click",  (event) => {
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

	

