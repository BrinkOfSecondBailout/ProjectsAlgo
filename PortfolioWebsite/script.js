

function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open")
    icon.classList.toggle("open")
}

var counter = 1;

setInterval(function() {
    document.getElementById('radio' + counter).checked = true;
    counter++;
    if(counter > 4) {
        counter = 1;
    }
}, 5000);

var typed = new Typed(".auto-type", {
    strings: ["Full Stack Developer", "Problem Solver", "Lifelong Learner"],
    typeSpeed: 80,
    backSpeed: 50,
    loop: true
})