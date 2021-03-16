//class selections
const welcBtn = document.querySelector(".welcome-btn");
const welcContainer = document.querySelector(".welcome-container");
const loginContainer = document.querySelector(".login-container");
const loginTextInput = document.querySelector(".input-name");
const loginPasswordInput = document.querySelector(".input-password");
const loginSubmitButton = document.querySelector(".login-btn");
const dashboard = document.querySelector(".dashboard");
const userInfo = document.querySelector(".user-info");

welcBtn.addEventListener("click", function () {
  welcContainer.classList.add("hide--welcome-container");
  loginContainer.classList.add("Reveal--login-container");
});

// Accounts

const account1 = {
  name: "Shaznan Fairoze",
  pin: 1234,
  title: [],
  takeNotes: [],
};

const account2 = {
  name: "Shazmeer Ramzeen",
  pin: 1111,
  title: [],
  takeNotes: [],
};

const account3 = {
  name: "Jarrod Philips",
  pin: 0000,
  title: [],
  takeNotes: [],
};

const account4 = {
  name: "Abdullah Hamza",
  pin: 4349,
  title: [],
  takeNotes: [],
};

const accounts = [account1, account2, account3, account4];

//Login
//Generating initials

const getinitial = accounts.forEach(function (account) {
  account.username = account.name
    .toLowerCase()
    .split(" ")
    .map((x) => x[0])
    .join("");
});

//Create login access

loginSubmitButton.addEventListener("click", function (e) {
  e.preventDefault();
  accounts.forEach(function (acc) {
    if (
      acc.username == loginTextInput.value.toLowerCase() &&
      acc.pin == loginPasswordInput.value
    ) {
      loginContainer.classList.add("hide--login-container");
      dashboard.style.opacity = "1";
      userInfo.style.opacity = "1";
    }
  });
});
