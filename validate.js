"use strict"

function validateSignForm() {
  const form = document.getElementById("form");
  document.getElementById("signUserNameError").innerHTML = "";
  document.getElementById("emailError").innerHTML = "";

  var userName = document.getElementById("signUserName").value;
  var email = document.getElementById("signEmail").value;
  var atposition = email.indexOf("@");
  var dotposition = email.lastIndexOf(".");

  if (userName === "") {
    document.getElementById("signUserNameError").innerHTML =
      "UserName Is required";
    document.getElementById("signUserName").style.border = "4px solid red";

    return false;
  } else {
    document.getElementById("signUserName").style.border = "4px solid gold";
  }

  if (email === "") {
    document.getElementById("emailError").innerHTML = "Email is Required";
    document.getElementById("signEmail").style.border = "4px solid red";

    return false;
  } else {
    document.getElementById("signEmail").style.border = "4px solid gold";
  }
  if (
    atposition < 1 ||
    dotposition < atposition + 2 ||
    dotposition + 2 >= email.length
  ) {
    document.getElementById("emailError").innerHTML =
      "Please enter a valid e-mail address";
    document.getElementById("signEmail").style.border = "4px solid red";

    return false;
  } else {
    document.getElementById("signEmail").style.border = "4px solid gold";
  }

  return true;
}

function firstPassValidate() {
  // get form values
  const form = document.getElementById("form");
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("password2").value;
  const upperError = document.getElementById("upper");
  const upperyes = document.getElementById("upperyes");
  const lowerError = document.getElementById("lower");
  const loweryes = document.getElementById("loweryes");
  const specialCharError = document.getElementById("specialchar");
  const specialcharyes = document.getElementById("specialcharyes");
  const numberError = document.getElementById("number");
  const numberyes = document.getElementById("numberyes");
  const spaceError = document.getElementById("space");

  // Reset error messages
  document.getElementById("signPasswordError").innerHTML = "";
  document.getElementById("signConfirmPasswordError").innerHTML = "";
  upperError.innerHTML = "";
  lowerError.innerHTML = "";
  specialCharError.innerHTML = "";
  numberError.innerHTML = "";
  spaceError.innerHTML = "";
  loweryes.innerHTML = "";
  specialcharyes.innerHTML = "";
  numberyes.innerHTML = "";
  upperyes.innerHTML = "";

  let deleteimg = '<img src="./images/formicon/Del.png">';
  let okimg = '<img src="./images/formicon/Done.png">';
  if (password === "") {
    document.getElementById("signPasswordError").innerHTML =
      "Password is required";
    document.getElementById("password").style.border = "4px solid red";
    return false;
  } else {
    document.getElementById("password").style.border = "4px solid gold";
  }

  if (!/[A-Z]/.test(password)) {
    upperError.innerHTML = deleteimg + "Uppercase letter is missing";
  } else {
    upperyes.innerHTML = okimg + "Uppercase is available";
  }

  if (!/[a-z]/.test(password)) {
    lowerError.innerHTML = deleteimg + "Lowercase letter is missing";
  } else {
    loweryes.innerHTML = okimg + "Lowercase letter is available";
  }
  if (!/^\S*$/.test(password)) {
    spaceError.innerHTML = deleteimg + "Password must not contain spaces";
  }
  if (!/[\W_]/.test(password.replace(/\s/g, ""))) {
    specialCharError.innerHTML = deleteimg + "Special character is missing";
  } else {
    specialcharyes.innerHTML = okimg + "Special character is available";
  }

  if (!/\d/.test(password)) {
    numberError.innerHTML = deleteimg + "Number is missing";
  } else {
    numberyes.innerHTML = okimg + "Number is Available";
  }
  if (password.length < 6 || password.length > 12) {
    document.getElementById("signPasswordError").innerHTML =
      "Password lenth must be greater than 6 chars and less tahn 12 chars";
    return false;
  }

  if (confirmPassword !== password) {
    document.getElementById("signConfirmPasswordError").innerHTML =
      "password doesn't match!";
    document.getElementById("password2").style.border = "4px solid red";
    return false;
  } else {
    document.getElementById("password2").style.border = "4px solid gold";
  }

  return false; // Prevent form submission for testing purposes
}

// Login Validation function
function validateLoginForm() {
  var loginUserName = document.getElementById("loginUserName").value;
  var loginPassword = document.getElementById("loginPassword").value;

  document.getElementById("userNameError").innerHTML = "";
  document.getElementById("passwordError").innerHTML = "";

  if (loginUserName === "") {
    document.getElementById("userNameError").innerHTML = "UserName is Required";
    document.getElementById("loginUserName").style.border = "4px solid red";
    return false;
  } else {
    document.getElementById("loginUserName").style.border = "4px solid gold";
  }

  if (loginPassword === "") {
    document.getElementById("passwordError").innerHTML = "Password Is Required";
    document.getElementById("loginPassword").style.border = "4px solid red";
    return false;
  } else {
    document.getElementById("loginPassword").style.border = "4px solid gold";
  }

  return false;
}

// Contact form validation
function validatecontactform() {
  var contactUserName = document.getElementById("contactUserName").value;
  var contactEmail = document.getElementById("contactEmail").value;
  var message = document.getElementById("message").value;
  var atposition = contactEmail.indexOf("@");
  var dotposition = contactEmail.lastIndexOf(".");

  document.getElementById("contactNameError").innerHTML = "";
  document.getElementById("contactEmailError").innerHTML = "";
  document.getElementById("contactMessageError").innerHTML = "";

  if (contactUserName === "") {
    document.getElementById("contactNameError").innerHTML =
      "Your Names are Required";
    document.getElementById("contactUserName").style.border = "2px solid red";
    return false;
  } else {
    document.getElementById("contactUserName").style.border = "4px solid gold";
  }

  if (contactEmail === "") {
    document.getElementById("contactEmailError").innerHTML =
      "Email is Required";
    document.getElementById("contactEmail").style.border = "2px solid red";
    return false;
  } else {
    document.getElementById("contactEmail").style.border = "4px solid gold";
  }
  if (
    atposition < 1 ||
    dotposition < atposition + 2 ||
    dotposition + 2 >= contactEmail.length
  ) {
    document.getElementById("contactEmailError").innerHTML =
      "Please enter a valid e-mail address";
    document.getElementById("contactEmail").style.border = "4px solid red";

    return false;
  } else {
    document.getElementById("contactEmail").style.border = "4px solid gold";
  }

  // if(message === ""){
  //   document.getElementById("contactMessageError").innerHTML = "Message is Required!";
  //   document.getElementById("message").style.border = "4px solid red";
  //   return false;
  // }else {
  //   document.getElementById("message").style.border = "4px solid gold";
  // }

  return false;
}

// document.getElementById()

function validateblogform() {
  const form2 = document.getElementById("blogform");
  form2.addEventListener("submit", (event) => {
    event.preventDefault;
  });
  document.getElementById("dashBodyError").innerHTML = "";
  document.getElementById("blogTitleError").innerHTML = "";
  
  var title = document.getElementById("blogTitle").value;
  var blogBody = document.getElementById("dashtextarea").value;

  if (title === "") {
    document.getElementById("blogTitleError").innerHTML =
      "Blog Title Is required";
    return false;
  }

  if (blogBody === "") {
    document.getElementById("dashBodyError").innerHTML =
      "Blog Body Is required";
    return false;
  }
  
  return true;
  
}
function myResetFunction() {
  document.getElementById("blogform").reset();
}
// How long you want the animation to take, in ms
const animationDuration = 2000;
// Calculate how long each ‘frame’ should last if we want to update the animation 60 times per second
const frameDuration = 1000 / 60;
// Use that to calculate how many frames we need to complete the animation
const totalFrames = Math.round(animationDuration / frameDuration);
// An ease-out function that slows the count as it progresses
const easeOutQuad = (t) => t * (2 - t);

// The animation function, which takes an Element
const animateCountUp = (el) => {
  let frame = 0;
  const countTo = parseInt(el.innerHTML, 10);
  // Start the animation running 60 times per second
  const counter = setInterval(() => {
    frame++;
    // Calculate our progress as a value between 0 and 1
    // Pass that value to our easing function to get our
    // progress on a curve
    const progress = easeOutQuad(frame / totalFrames);
    // Use the progress value to calculate the current count
    const currentCount = Math.round(countTo * progress);

    // If the current count has changed, update the element
    if (parseInt(el.innerHTML, 10) !== currentCount) {
      el.innerHTML = currentCount;
    }

    // If we’ve reached our last frame, stop the animation
    if (frame === totalFrames) {
      clearInterval(counter);
    }
  }, frameDuration);
};

// Run the animation on all elements with a class of ‘countup’
const runAnimations = () => {
  const countupEls = document.querySelectorAll(".countup");
  countupEls.forEach(animateCountUp);
};
