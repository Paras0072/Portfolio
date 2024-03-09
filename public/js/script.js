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
//send email
const form = document.querySelector("form");
const name = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const message = document.getElementById("mess");
const subject = document.getElementById("subject");

function submitForm() {
  const formData = {
    name: name.value,
    email: email.value,
    phone: phone.value,
    message: message.value,
    subject: subject.value,
  };
  // Send a client-side POST request
  fetch("/sendemail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      // alert("Message sent successfully!");
      swal("Success!", "Message sent successfully!", "success");
      console.log("Success:", data);
    })
    .catch((error) => {
      alert("Error sending message. Please check the console for details.");
      console.error("Error:", error);
    });
}
function checkInputs() {
  const focuses = document.querySelectorAll(".focus");

  for (const focus of focuses) {
    if (focus.value === "") {
      focus.classList.add("error");
      focus.parentElement.classList.add("error");
    }
    if (focuses[1].value != "") {
      checkEmail();
    }
    focuses[1].addEventListener("keyup", () => {
      checkEmail();
    });
    focus.addEventListener("keyup", () => {
      if (focus.value != "") {
        focus.classList.remove("error");
        focus.parentElement.classList.remove("error");
      } else {
        focus.classList.remove("error");
        focus.parentElement.classList.remove("error");
      }
    });
  }
}
function checkEmail() {
  const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
  ///^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})/
  const emailTxtEmail = document.querySelector(".error-txt.email");
  if (!email.value.match(emailRegex)) {
    email.classList.add("error");
    email.parentElement.classList.add("error");

    if (email.value != "") {
      emailTxtEmail.innerText = "Enter a Valid Email Address";
    } else {
      emailTxtEmail.innerText = "Email address can't be blank";
    }
  } else {
    email.classList.remove("error");
    email.parentElement.classList.remove("error");
  }
}



form.addEventListener("submit", (e) => {
  e.preventDefault();
 checkInputs();

 if (
   !name.classList.contains("error") &&
   !email.classList.contains("error") &&
   !phone.classList.contains("error") &&
   !subject.classList.contains("error") &&
   !message.classList.contains("error")
 ){
   console.log("OK");
 
  submitForm();
  form.reset();
  return false;
 }
});


