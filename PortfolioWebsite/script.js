

function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open")
    icon.classList.toggle("open")
}


var typed = new Typed(".auto-type", {
    strings: ["Full Stack Developer", "Problem Solver", "Lifelong Learner"],
    typeSpeed: 80,
    backSpeed: 50,
    loop: true
})

// function sendEmail() {
//     Email.send({
//         SecureToken : "85764066-a617-49df-a809-1a515ad943d1",
//         To : 'nguyenduongpa@gmail.com',
//         From : document.getElementById("email").value,
//         Subject : "New Contact Form Inquiry",
//         Body : "Name: " + document.getElementById("name").value
//             + "<br> Email: " + document.getElementById("email").value
//             + "<br> Company: " + document.getElementById("company").value
//             + "<br> Message: " + document.getElementById("message").value
//     }).then(
//         message => alert("Message Sent Successfully")
// );
// }