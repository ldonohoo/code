document.getElementById("footer").innerHTML = "copyright lisa 2023";

var coll = document.getElementsByClassName("collapsible");
coll.addEventListener("click", () => 
    (coll.style.display == "block") ? 
    coll.style.display = "none" : 
    coll.style.display="block" );



