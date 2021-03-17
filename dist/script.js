//class selections
const welcBtn = document.querySelector(".welcome-btn");
const welcContainer = document.querySelector(".welcome-container");
const loginContainer = document.querySelector(".login-container");
const loginTextInput = document.querySelector(".input-name");
const loginPasswordInput = document.querySelector(".input-password");
const loginSubmitButton = document.querySelector(".login-btn");
const dashboard = document.querySelector(".dashboard");
const userInfo = document.querySelector(".user-info");
const profilePic = document.querySelector(".profile-avatar");
const loginUserName = document.querySelector(".username");
const takeNoteMiniText = document.querySelector(".take-note");
const takeNoteMiniContainer = document.querySelector(
  ".take-note-mini-container"
);
const takeNoteContainerExpand = document.querySelector(".expand-container");
const takeNoteInputExpand = document.querySelector(".text-placeholder");
const takeNoteBodyExpand = document.querySelector(".takenote-body-expand");
const titleInputExpand = document.querySelector(".title-placeholder");
const expandContCloseBtn = document.querySelector(".expand-close-button");

//welcome interaction

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
  accounts.forEach(function (acc, i) {
    if (
      acc.username == loginTextInput.value.toLowerCase() &&
      acc.pin == loginPasswordInput.value
    ) {
      loginContainer.classList.add("hide--login-container");
      dashboard.style.opacity = "1";
      userInfo.style.opacity = "1";

      let profileDpAssign = `<img
      src="/dist/images/avatar/avatar-${i}.png"
      alt="Profile-avatar"
      width="60vh"
    />`;
      //Assigning user name and profile picture
      loginUserName.textContent = acc.name;
      profilePic.insertAdjacentHTML("afterend", profileDpAssign);
    }
  });
});

//Working with take notes
//Extend take a note container

const containerExpand = function () {
  takeNoteMiniText.addEventListener("click", function () {
    takeNoteMiniContainer.style.opacity = "0";

    setTimeout(() => (takeNoteMiniContainer.style.display = "none"), 300);
    takeNoteContainerExpand.classList.add("visible");
    takeNoteInputExpand.focus();

    setTimeout(() => takeNoteContainerExpand.classList.add("opacity"), 200);
  });
};

containerExpand();

//close button

const ExpandcloseBtn = function () {
  expandContCloseBtn.addEventListener("click", function () {
    takeNoteMiniContainer.style.opacity = "100";

    setTimeout(() => (takeNoteMiniContainer.style.display = "block"), 1000);
    takeNoteContainerExpand.classList.remove("visible");

    setTimeout(() => takeNoteContainerExpand.classList.remove("opacity"), 50);
    //reset background color
    assignColor("white");
    //remove contents
    takeNoteBodyExpand.innerHTML = `<input class=" take-a-note-extended text-placeholder" type="text" placeholder=" Take a note..">`;
  });
};

ExpandcloseBtn();

//working with take a note

//place square text box as a place holder - done
//add keydown event listener for enter button and create a new line with a new placeholder

const newLine = function () {
  // let counter = 0;
  document.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && takeNoteBodyExpand.lastElementChild.value != "") {
      takeNoteBodyExpand.insertAdjacentHTML(
        "beforeend",
        `<input class=" take-a-note-extended text-placeholder" type="text" placeholder=" Take a note.."> `
      );
      takeNoteBodyExpand.lastElementChild.focus();
    }
  });
};
newLine();

//delete previous with backspace / delete individual elements on cross

//Pain bucket

const paintColor = document.querySelectorAll(".paint-color");

//change expand container background color
const assignColor = (color) => {
  console.log(takeNoteInputExpand);
  takeNoteContainerExpand.style.backgroundColor = color;
  document
    .querySelectorAll(".text-placeholder")
    .forEach((element) => (element.style.backgroundColor = color));

  titleInputExpand.style.backgroundColor = color;
};

const changeColor = function (colours) {
  colours.forEach(function (color) {
    color.addEventListener("click", function () {
      let bgColor = window
        .getComputedStyle(color, null)
        .getPropertyValue("background-color");
      assignColor(bgColor);
    });
  });
};

changeColor(paintColor);
