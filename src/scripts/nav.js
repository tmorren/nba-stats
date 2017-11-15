function navbarResponse() {
    var x = document.getElementById("main-nav");
    if (x.className === "main-nav") {
        x.className += " responsive";
    } else {
        x.className = "main-nav";
    }
}

$(document).ready(function(){
    $(".nav-link").click(function(){
        console.log('Here');
        var x = document.getElementById("main-nav");
        x.className = "main-nav";
	})
});
