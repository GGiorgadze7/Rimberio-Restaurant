// burger menu
const burgerBtn = document.querySelector(".burger-btn");
const nav = document.querySelector(".burger-nav");

burgerBtn.addEventListener("click", () => {
  nav.classList.toggle("nav-active");
  burgerBtn.classList.toggle("burger-nav");
});

// register user

const regFirstName = document.querySelector("#regFirstName");
const regLastName = document.querySelector("#regLastName");
const regEmail = document.querySelector("#regEmail");
const regPassword = document.querySelector("#regPassword");
const regNumber = document.querySelector("#regNumber");
const regReset = document.querySelector("#regReset");
const regSubmit = document.querySelector("#regSubmit");
const regForm = document.querySelector(".reg-form");
const regText = document.querySelector(".regtext");
const signText = document.querySelector(".signtext");
const regBtn = document.querySelector(".regbtn");
const signBtn = document.querySelector(".signbtn");
const signDiv = document.querySelector(".singin-div");

regBtn.addEventListener("click", () => {
  regForm.classList.toggle("hidden");
  signInForm.classList.toggle("hidden");
  signBtn.classList.toggle("hidden");
  regBtn.classList.toggle("hidden");
  regText.classList.toggle("hidden");
  signText.classList.toggle("hidden");
  signDiv.classList.toggle("style-remove");
});

signBtn.addEventListener("click", () => {
  regForm.classList.toggle("hidden");
  signInForm.classList.toggle("hidden");
  signBtn.classList.toggle("hidden");
  regBtn.classList.toggle("hidden");
  regText.classList.toggle("hidden");
  signText.classList.toggle("hidden");
  signDiv.classList.toggle("style-remove");
});

regForm.addEventListener("submit", (e) => {
  e.preventDefault();
  userRegister();
});

async function userRegister() {
  const registrData = {
    phoneNumber: regNumber.value,
    password: regPassword.value,
    email: regEmail.value,
    firstName: regFirstName.value,
    lastName: regLastName.value,
    role: "user",
  };

  let resp = await fetch("https://rentcar.stepprojects.ge/api/Users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(registrData),
  });

  if (!resp.ok) {
    let msg = await resp.text();

    alert(msg);
    return;
  }

  let data = await resp.json();
  console.log(data);
  regForm.reset();
}

const signEmail = document.querySelector("#signin-email");
const signInPassword = document.querySelector("#signin-pas");
const signInForm = document.querySelector(".signin-form");
const signInsubmit = document.querySelector("#signinsubmit");

signInsubmit.addEventListener("click", (e) => {
  e.preventDefault();
  userSignIn();
});

async function userSignIn() {
  const signInData = {
    email: signEmail.value,
    password: signInPassword.value,
    role: "user",
  };

  let resp = await fetch("https://rentcar.stepprojects.ge/api/Users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(signInData),
  });

  if (!resp.ok) {
    let msg = await resp.text();

    alert(msg);
    return;
  }

  let data = await resp.json();
  console.log(data);

  localStorage.setItem("token", data.token);
  signInForm.reset();
}
