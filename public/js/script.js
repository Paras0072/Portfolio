//toggle icon navbar
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};
// scroll sections

let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 100;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      // active navbar links
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
      // active sections for animation on scroll
      sec.classList.add("show-animate");
    }
    // if want to use animation that repeats on scroll use this
    else {
      sec.classList.remove("show-animate");
    }
  });

  //sticky header
  let header = document.querySelector("header");

  header.classList.toggle("sticky", window.scrollY > 100);

  // remove toggle icon and navbar when click navbar links(scroll)
  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");

  // animation footer on scroll
  let footer = document.querySelector("footer");

  footer.classList.toggle(
    "show-animate",
    this.innerHeight + this.scrollY <= document.scrollingElement.scrollHeight
  );
};
// send mail using nodemailer

// send email
const form = document.querySelector("form");
const fullName = document.getElementById("name");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const Message = document.getElementById("mess");
function sendEmail() {
  const bodyMessage = `Full Name: ${fullName.value}<br>
   phone: ${phone.value}<br>
   email: ${email.value}<br>
   subject: ${subject.value}<br>;
    Message: ${mess.value}`;
     console.log("email", email.value),
       Email.send({
         SecureToken: "89abe5ee-9952-4aa1-a518-c389019a3a07",
         To: "quotes.motivation131@gmail.com",
         From: email.value,
         Subject: subject.value,
         Body: bodyMessage,
       }).then((message) => {
         if (message == "OK") {
           swal("Success!", "Message sent successfully!", "success");
         }
       });
}

function checkInputs() {
 const focuses = document.querySelectorAll(".focus");

 for (const focus of focuses) {
   if (focus.value === "") {
     focus.classList.add("error");
     focus.parentElement.classList.add("error");
   }
//    // if(focuses[1].value !=""){
//    //     checkEmail();
//    // }
//    // focuses[1].addEventListener("keyup",()=>{
//    // checkEmail();

//    // })
//    // focus.addEventListener("keyup", () =>{
//    //   if(focus.value!=""){
//    //    focus.classList.remove("error");
//    //    focus.parentElement.classList.remove("error");

//    // }else{
//    //      focus.classList.remove("error");
//    //      focus.parentElement.classList.remove("error");
//    // }

//    //     })
//  }


}
}  
function checkEmail(){
const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/
 ///^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})/
const emailTxtEmail = document.querySelector(".error-txt.email")
if(!email.value.match(emailRegex)){
email.classList.add("error");
email.parentElement.classList.add("error");

if(email.value != "")
{
   emailTxtEmail.innerText="Enter a Valid Email Address";
}else{
     emailTxtEmail.innerText="Email address can't be blank";
}

}else{
    email.classList.remove("error");
email.parentElement.classList.remove("error");
}



}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  checkInputs();

  if(!fullName.classList.contains("error") && !email.classList.contains("error")&& !phone.classList.contains("error")&&!subject.classList.contains("error")&&!Message.classList.contains("error")){

    console.log("OK")
     sendEmail();
     form.reset();
     return false;
  }

   sendEmail();
})
