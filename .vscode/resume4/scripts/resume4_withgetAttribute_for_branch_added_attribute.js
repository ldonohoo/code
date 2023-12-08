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
		//console.log("getleaves start"+ this.numLeaves+"!!!");
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
			// get random leaf colors: greens and yellows and oranges (but mostly greens)
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
		const leafFactory = (angle, xpos, ypos, color, leafNo, branch) => {
			// create new div element with unique leaf id!

			// get random leaf shape/profile
			const leafProfile = getLeafProfile(Math.floor(Math.random() * 4));
			const leafRadii = ` ${leafProfile[2]} ${leafProfile[3]} ${leafProfile[4]} ${leafProfile[5]}`;
	
			// create new leaf element
			const leaf = document.createElement("div");
			leaf.setAttribute("id", "leaf" + leafNo);
			// create new attribute for DOM element: store branch number of leaf
			const branchAttribute = document.createAttribute("branch");
			//console.log("creating leaf with branch:"+branch+"....");
			branchAttribute.value = branch;
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
		function findBranch(xpos, ypos, maxLeft, maxTop) {
			//console.log("findbranch here");
			// find what quadrand of tree leaves are in and assign a branch number
			let maxLeft1 = Math.floor(maxLeft/2); 	 //8/2	= 4
			let maxLeft2 = maxLeft- maxLeft1; 		 //8-4 = 4
			//console.log(" maxlft2="+maxLeft2+" ");
			// if division of quadrant is equal set to next number
			if (maxLeft % 2 != 0) { maxLeft2 = maxLeft1 + 1;}  //4+1 = 5
			let maxTop1 = Math.floor(maxTop/2);		//13/2 = 6
			let maxTop2 = maxTop - maxTop1;			//13-6 = 7
			if (maxTop % 2 != 0) { maxTop2 = maxTop1 + 1;}  //4+1 = 5

			//console.log("maxl1:"+maxLeft1+" maxl2:"+maxLeft2+" maxt1:"+maxTop1+" maxt2:"+maxTop2);

			
			if (xpos <= maxTop1 && ypos <= maxLeft1) {   	  // in 1st quadrant  3 <= 6
				//console.log("q1 returning xpos="+xpos+"ypos="+ypos);
				return 1;	//return branch #1
			} else if (xpos < maxTop1 && ypos > maxLeft2) {  // in 2nd quadrant
				//console.log("q2 returning xpos="+xpos+"ypos="+ypos);
				return 2;	//return branch #2
			} else if (xpos > maxTop2 && ypos <= maxLeft1) {  // in 3rd quadrant
				//console.log("q3 returning xpos="+xpos+"ypos="+ypos);
				return 3;	//return branch #3
			} else if (xpos > maxTop2 && ypos > maxLeft2) {   // in 4th quadrant
				//console.log("q4 returning xpos="+xpos+"ypos="+ypos);
				return 4;	//return branch #4
			} else {
				return 1;  //shouldn't get here...
				//console.log("oooops");
			}
 		}

		// populate tree with leaves and append element to .treebox 
		console.log("::getting leaves now:" + this.numLeaves+"!!!");
		let maxLeft = 13.2;  //max xpos from start in rem
		let maxTop = 8;		//max ypos from start in rem
		for (let i = 0; i < this.numLeaves; i++) {
			// random leaf position, leaf angle, and greenish color
			let xpos = remToPixels(Math.random() * maxLeft);
			let ypos = remToPixels(Math.random() * maxTop);
			let branch = findBranch(xpos, ypos, remToPixels(maxLeft), remToPixels(maxTop));
			//console.log("branch found while pop leaves:"+branch+"::::");
			let angle = Math.floor(Math.random() * 359);
			let color = randomColor();
			let newLeaf = leafFactory(angle, xpos, ypos, color, i, branch);
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
		
		function getBranchAttrib(leafNo) {
			let leafId = "leaf" + leafNo;
			// get leaf element 
			let queryLeafId = `#${leafId}`;
			let leaf = document.querySelector(queryLeafId);
			console.log("  leaf: "+leaf.innerHTML);
			console.log("  Attbranch:"+ leaf.getAttribute("branch")+ "]]");
			return leaf.getAttribute("branch");
		}
		function getLeafNos(numLeaves, animLeaves, branchNo) {
			//get random, non-repeatable array of leaf numbers to correspond to leaf element #ids
 			let leafNoArray = [];
			for (let i = 0; i < animLeaves; i++) {
				let leafNo = Math.floor(Math.random() * numLeaves);  
				console.log("in array? "+ leafNoArray.includes(leafNo)  );
				console.log("getbranch? " + leafNo);
				console.log( getBranchAttrib(leafNo), 2000);
				// get a different random leaf number while: 
				//		leaf number is a duplicate OR leaf number is not in right quadrant/branch 
				while (leafNoArray.includes(leafNo) || Number(getBranchAttrib(leafNo)) != branchNo) {
					leafNo = Math.floor(Math.random() * numLeaves);  
				}
				console.log("pushing leafno: "+leafNo);
				leafNoArray.push(leafNo);
			}
			console.log("leaf array:"+ leafNoArray+"!!!");
			return leafNoArray;
		}
		/*  no longer used...
		function getBranchSizes(totalLeavesToAnim) {
			//from the total leaves to be animated, compute the size of each branch
			//      (div total by 4 and make sure remainder is accounted for)
			let q1Leaves = 0, q2Leaves = 0, q3Leaves = 0, q4Leaves = 0;
			let branchSizes = [];
			//divide number of leaves into 4 branches/quadrants
			branchSizes[0] = Math.floor(totalLeavesToAnim/4);
			branchSizes[1] = branchSizes[0];
			branchSizes[2] = branchSizes[0];
			//if not evenly divisible by 4, add extra leaves to 4th branch/quadrant
			if ((totalLeavesToAnim % 4) != 0 ) { 
				branchSizes[3] = (branchSizes[0] * 3) - branchSizes[0]; 
				console.log("remainer...so: q4="+ branchSizes[3]);
			} else {
				branchSizes[3] = branchSizes[0];
			};
			return branchSizes;
		} */
		function getAnimProfiles(numLeaves) {
			// set animation criteria for each breeze- 
			//		e.g.- a stronger breeze has more frequent branch movements so less delays between movements, etc.
			let animProfilesArr = [];
			let totalLeavesToAnim = 0;
			let branchesToAnim = [], branchNumOfLeavesToAnim = [], moveTypes = [], durations = [], delays = [], iters = [], timings = [];
			console.log("type in getanprof: "+type+"  ");
			switch (type) {
				case "strong":
					totalLeavesToAnim = 50;
					// (branch locs equal to quadrants in cartesian sys)
					branchesToAnim = [1, 2, 4, 3];	
					branchNumOfLeavesToAnim = [15, 16, 25, 10];
					//moveTypes has an array of possibilites for each branch...
					moveTypes = [["wiggle", "wiggle"], ["blow"], ["twist"], ["wiggle", "twist"]];
					durations = [400, 400, 600, 300];
					delays = [0, 100, 200, 300];
					iters = [50, 40, 60, 40];
					timings = ["ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out"];
					break;
				case "medium":
					totalLeavesToAnim = 50;
					// (branch locs equal to quadrants in cartesian sys)
					branchesToAnim = [1, 2, 4, 3];	
					branchNumOfLeavesToAnim = [15, 16, 25, 10];
					//moveTypes has an array of possibilites for each branch...
					moveTypes = [["wiggle", "wiggle"], ["blow"], ["twist"], ["wiggle", "twist"]];
					durations = [400, 400, 600, 300];
					delays = [0, 100, 200, 300];
					iters = [50, 40, 60, 40];
					timings = ["ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out"];
					break;
				case "mild":  // a mild breeze is default
				default :    
					totalLeavesToAnim = 10;
					// (branch locs equal to quadrants in cartesian sys)
					branchesToAnim = [1, 2, 4, 3];	
					branchNumOfLeavesToAnim = [1, 3, 5, 1];
					//moveTypes has an array of possibilites for each branch...
					moveTypes = [["wiggle", "wiggle"], ["blow"], ["twist"], ["wiggle", "twist"]];
					durations = [400, 400, 600, 300];
					delays = [0, 100, 200, 300];
					iters = [50, 40, 60, 40];
					timings = ["ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out"];
					console.log("in mild area...");
					break;			
			}
			if (totalLeavesToAnim > numLeaves) { totalLeavesToAnim = numLeaves; }
			console.log("num of branches:"+branchesToAnim.length+"  ");
			for (let i=0; i < branchesToAnim.length; i++) {
				//set array of animation profiles of length branchesToAnim 
				animProfilesArr.push({totalLeavesToAnim: totalLeavesToAnim, 
					branchToAnim: branchesToAnim[i], branchNumOfLeavesToAnim: branchNumOfLeavesToAnim[i],
					branchMoveType: moveTypes[i], branchDuration: durations[i], branchDelay: delays[i],
					branchIter: iters[i], branchTiming: timings[i] });
				console.log(animProfilesArr+"<---all profiles");
				console.log(":"+totalLeavesToAnim + ":"+branchesToAnim[i]+":"+branchNumOfLeavesToAnim[i]+":  "+
					moveTypes[i]+ "  :" + durations[i]+":"+ delays[i]+":"+ iters[i]+ ":"+ timings[i]+"  ooooooo");
			}
			return animProfilesArr;
		}
		function moveBranch(leafNoArray, animProfile) {
			// move each leaf in branch 
			while (leafNoArray.length > 0) {
				// grab first random leaf on this branch to animate
				let leafId = "leaf" + leafNoArray.pop();
				// get leaf element 
				let queryLeafId = `#${leafId}`;
				let leaf = document.querySelector(queryLeafId);
				let randomMoveType = Math.floor(Math.random() * animProfile.branchMoveType.length);
				let moveType = animProfile.branchMoveType[randomMoveType];
				// some leaf animation properties are based on branch but slightly randomized to appear unique
				let duration = animProfile.branchDuration + Math.floor(Math.random() * 650 - 150);
				let iter = animProfile.branchIter + Math.floor(Math.random() * 8);
				let direction = "alternate-reverse";
				let delay = animProfile.branchDelay + Math.floor(Math.random() * 100);
				let timing = animProfile.branchTiming;
				let fillMode = "both";
				console.log("anim:"+ " mt:" + moveType + " dur:"+ duration + " iter:"+ iter + " direc:"+ direction + " del:"+ delay + " timing:"+ timing+ " flmd:" + fillMode);
				leaf.style.transformStyle = "preserve-3d";
				leaf.style.animation = `${moveType} ${duration}ms ${iter} ${direction} ${delay}ms ${timing} ${fillMode}`;
			}
		}
		const motherLeafArray = [];
		// To make a breeze:
		// 			-get animation profiles, which is an array indexed by each branch to animate
		//		 		each branch & contains animation objects
		// 			-loop through the branches desired to animate in order...
		// 			-get array of random leaf numbers for each branch 
		//				passing in # total canopy leaves, # leaves to animate, and branch number
		const animProfiles = getAnimProfiles(this.numLeaves);
		for (let i=0; i<animProfiles.length; i++) {
			console.log("profile"+i+":"+animProfiles[i]+"   ");
			console.log("numleaves: "+this.numLeaves+ "  branch#leavestoanim: "+ animProfiles[i].branchNumOfLeavesToAnim+ "branchToanim: "+animProfiles[i].branchToAnim+"  ");
			motherLeafArray[i] =
				getLeafNos(this.numLeaves, animProfiles[i].branchNumOfLeavesToAnim, animProfiles[i].branchToAnim);
			moveBranch(motherLeafArray[i], animProfiles[i]);
		}	
	}
}	//end canopy

const canopy1 = new Canopy(30);
console.log("canopy is full? "+canopy1.isfull+"  ");
canopy1.getLeaves();
console.log("canopy is full? "+canopy1.isfull+"  ");
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

	

