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

regBtn.addEventListener("click", () => {
  regForm.classList.toggle("hidden");
  signInForm.classList.toggle("hidden");
  signBtn.classList.toggle("hidden");
  regBtn.classList.toggle("hidden");
  regText.classList.toggle("hidden");
  signText.classList.toggle("hidden");
});

signBtn.addEventListener("click", () => {
  regForm.classList.toggle("hidden");
  signInForm.classList.toggle("hidden");
  signBtn.classList.toggle("hidden");
  regBtn.classList.toggle("hidden");
  regText.classList.toggle("hidden");
  signText.classList.toggle("hidden");
});

regSubmit.addEventListener("click", (e) => {
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

// login user

const signEmail = document.querySelector("#signin-email");
const signInPassword = document.querySelector("#signin-pas");
const signInForm = document.querySelector(".signin-form");

signInForm.addEventListener("submit", (e) => {
  e.preventDefault();
  userSignIn();
});

async function userSignIn() {
  if (!signEmail.value || !signInPassword.value) {
    alert("შეავსეთ ყველა ველი");
    return;
  }

  const signInData = {
    email: signEmail.value,
    password: signInPassword.value,
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
