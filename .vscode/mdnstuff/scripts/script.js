const myHeading = document.querySelector("h1");

myHeading.textContent = "Hellow World!";

const myImage = document.querySelector("img");

myImage.onclick = () => {
    let imageSrc = myImage.getAttribute("src");
    if (imageSrc === "images/firefox-icon.png") {
        alert(imageSrc);
        myImage.setAttribute("src", "images/tree.png");
    } else {
        myImage.setAttribute("src", "images/firefox-icon.png")
    }
        
}

let myButton = document.querySelector("button");
myButton.onclick = () => setUserName();

function setUserName () {
    const myName = prompt("Please enter your name: ");
    if (!myName) { 
        setUserName();
    }
    localStorage.setItem("name", myName);
    myHeading.textContent= `Mozilla is cool ${myName}!`;

}

if (!localStorage.getItem("name")) {
    setUserName();
} else {
    const storedName = localStorage.getItem("name");
    myHeading.textContent = `Mozilla is cool, ${storedName}!`;
}
