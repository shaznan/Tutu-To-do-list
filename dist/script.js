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
const titleInpcontExpand = document.querySelector(".take-note-title-container");
const expandContCloseBtn = document.querySelector(".expand-close-button");
const addBtnExpand = document.querySelector(".add-btn-expand");
const mainArea = document.querySelector(".main-area");
const cardsArea = document.querySelector(".cards-area");
// const itemsContainer = document.querySelector(".items-container");
const cardBody = document.querySelector(".todo-card-body");
const cardTitle = document.querySelector(".todo-card-title");
const checkBox = Array.from(document.querySelectorAll(".checkbox"));
let cardDeleteBtna = document.querySelectorAll(".bi-x-square");
// const checkBox = Array.from(document.getElementById("test"));
const userNameInput = document.querySelector(".username-input");
const assignTaskBtn = document.querySelector(".Assign-tasks");
const assignTaskModel = document.querySelector(".assign-task-model");
const modelOverlay = document.querySelector(".model-overlay");
const assignTaskAddBtn = document.querySelector(".assign-task-addbtn");
const assignTaskTitle = document.querySelector(".assign-note-title");
const assignTaskText = document.querySelector(".assign-note-text");
const assignTaskCloseBtn = document.querySelector(".assign-task-close-btn");
const switchUserBtn = document.querySelector(".switch-user-btn");

//welcome interaction

welcBtn.addEventListener("click", function () {
  welcContainer.classList.add("hide--welcome-container");
  loginContainer.classList.add("Reveal--login-container");
});

// Accounts

const account1 = {
  name: "Shaznan Fairoze",
  pin: 1234,
  notes: [],
  // class: shaznanCard,
};

const account2 = {
  name: "Shazmeer Ramzeen",
  pin: 1111,
  notes: [],
  // class: shazmmerCard,
};

const account3 = {
  name: "Jarrod Philips",
  pin: 0000,
  notes: [],
  // class: jarrodCard,
};

const account4 = {
  name: "Abdullah Hamza",
  pin: 4349,
  notes: [],
  // class: abdullahCard,
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

  account.assignedClass = account.name.split(" ")[0] + "-card";
});

// let currentAssignedUserClass = assignedUser.name.split(" ")[0] + "-card";

//Create login access

let loggedInUser; //(need to remove = account1)

loginSubmitButton.addEventListener("click", function (e) {
  e.preventDefault();
  accounts.forEach(function (acc, i) {
    if (
      acc.username == loginTextInput.value.toLowerCase() &&
      acc.pin == loginPasswordInput.value
    ) {
      loggedInUser = acc; //logged in User (insert ths)
      // console.log(loggedInUser);
      loginContainer.classList.toggle("Reveal--login-container");
      //show cards relevant to logged in user
      displayCards();
      dashboard.style.opacity = "1";
      userInfo.style.opacity = "1";

      let profileDpAssign = `<img
      src="/dist/images/avatar/avatar-${i}.png"
      alt="Profile-avatar"
      width="60vh"
    />`;
      //Assigning user name and profile picture
      loginUserName.textContent = acc.name;
      profilePic.insertAdjacentHTML("beforeend", profileDpAssign);
      removeNotesContainer();
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

//declaring function to remove notes container
const removeNotesContainer = function () {
  takeNoteMiniContainer.style.opacity = "100";

  setTimeout(() => (takeNoteMiniContainer.style.display = "block"), 1000);
  takeNoteContainerExpand.classList.remove("visible");

  setTimeout(() => takeNoteContainerExpand.classList.remove("opacity"), 50);
  //reset background color
  assignColor("white");
  //remove contents
  takeNoteBodyExpand.innerHTML = `<div class="item-list d-flex">
  <input class=" take-a-note-extended  text-placeholder" type="text" placeholder=" Take a note.."><button class="delete-item "><i class="bi bi-trash-fill"></i></button>                          
</div>`;

  //remove title
  titleInputExpand.value = "";
  //fix bug - Removing typed text in mini container before expand container apears
  takeNoteMiniText.value = "";
};

//close button

const ExpandcloseBtn = function () {
  expandContCloseBtn.addEventListener("click", removeNotesContainer);
};

ExpandcloseBtn();

//working with take a note

//place square text box as a place holder - done
//add keydown event listener for enter button and create a new line with a new placeholder
// let nodeLength;

const newLine = function () {
  document.addEventListener("keydown", function (e) {
    if (
      e.key === "Enter" &&
      takeNoteBodyExpand.lastElementChild.childNodes[1].value != ""
    ) {
      takeNoteBodyExpand.insertAdjacentHTML(
        "beforeend",
        `   <div class="item-list d-flex">
        <input class=" take-a-note-extended text-placeholder" type="text" placeholder=" Take a note.."><button class="delete-item"><i class="bi bi-trash-fill"></i></button>                          
      </div>`
      );
      // takeNoteBodyExpand.lastElementChild.focus();
      takeNoteBodyExpand.lastElementChild.childNodes[1].focus();
      // takeNoteBodyExpand.lastElementChild.childNodes[1].classList.add(
      //   "has-focus"
      // );

      let deleteBtn = document.querySelectorAll(".delete-item");

      // Button even listeners
      deleteBtn.forEach(function (button, i) {
        if (button.parentElement != takeNoteBodyExpand.lastChild) {
          button.addEventListener("click", function () {
            this.parentElement.remove();
          });
        }
      }); //foreach
    }
  });
};
newLine();

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

let bgColor;

const changeColor = function (colours) {
  colours.forEach(function (color) {
    color.addEventListener("click", function () {
      bgColor = window
        .getComputedStyle(color, null)
        .getPropertyValue("background-color");
      assignColor(bgColor);
    });
  });
};

changeColor(paintColor);

//create class for each user

// const createClass = function () {
// let currentUserClass;
// loggedInUser.class =

// };

// createClass();

//add button - push to accounts as objects with property title, list array, and backgroundcolor
//everytime add button is clicked the new object goes inside the array

//create count
// let allocatedTasks = document.querySelectorAll(".allocated-task").length;
// console.log(allocatedTasks);

let counter = 0;

//Add items to object array
const addToDoList = function () {
  addBtnExpand.addEventListener("click", function () {
    // counter++;
    let test = document.querySelectorAll(`.${loggedInUser.assignedClass}`)
      .length;

    if (test == undefined) {
      counter++; //for loop control
    } else {
      counter = test;
    }
    console.log(allocatedTasks);

    console.log(counter);
    // console.log(allocatedTasks);
    let selectInputValues = Array.from(
      //converts node list to actual array
      document.querySelectorAll(".text-placeholder")
    );
    loggedInUser.notes.push({
      title: titleInputExpand.value,
      text: selectInputValues.map((x) => x.value), //return arr of input values
      backgroundColor: bgColor,
    });
    console.log(loggedInUser);

    // console.log(counter);

    //create class for each user
    // let currentUserClass = loggedInUser.name.split(" ")[0] + "-card";
    // loggedInUser.class = currentUserClass;
    // console.log(loggedInUser);
    // console.log(currentUserClass);

    //create todo cards

    // let count =
    const createCards = function () {
      //add title
      for (let i = counter; i < loggedInUser.notes.length; i++) {
        let arrayLoop = loggedInUser.notes[i];
        cardsArea.insertAdjacentHTML(
          "afterbegin",
          `<div class="col to-do-list d-flex justify-content-center ${loggedInUser.assignedClass} mb-3">
            <div class="todo-container">
              <div class="todo-card-title">${arrayLoop.title}<i class="
              bi bi-x-square card-delete"></i></div>
              <div class="todo-card-body d-flex flex-column">`
        );

        arrayLoop.text.forEach(function (text) {
          //add text
          if (text !== "") {
            //if no text entered, don't add empty element
            document.querySelector(".todo-card-body").insertAdjacentHTML(
              "beforeend",
              `  <div class="item row ">
                 <label class="col-1 checkbox-label">
                 <input class="checkbox " type="checkbox" >
                 <span class="checkbox-custom"></span>
    
                 <span class="checkbox-custom"></span>
               </label>
               <div class="label-text fa-md d-inline col-10">${text}</div>
             </div>  `
            );
            // console.log(text, i);
          }
        });

        //create function for colours
        const changeColor = function () {
          let cardTitles = Array.from(
            document.querySelectorAll(".todo-card-title")
          );
          for (b = 0; i < loggedInUser.notes.length; i++) {
            cardTitles[b].style.backgroundColor = arrayLoop.backgroundColor;
          }
        };
        changeColor();
      }
    };

    if (titleInputExpand.value !== "") {
      //create card and close container only if title is entered
      createCards();
      removeNotesContainer();
    } else {
      titleInputExpand.style.color = "red";
      titleInputExpand.value = "Please enter a title!";
      setTimeout(() => {
        //display message for 0.5s
        titleInputExpand.value = "";
        titleInputExpand.style.color = "rgba(0, 0, 0, 0.6)";
      }, 500);
    }

    isChecked(); //calling is checked function after add button is clicked
    cardDelete(); //calling card delete function
  });
};
addToDoList();

const isChecked = function () {
  // console.log(Array.from(document.querySelectorAll(".checkbox")));

  changeCounter = 0;
  Array.from(document.querySelectorAll(".checkbox")).forEach((check) => {
    //fires before dom elements
    check.addEventListener("change", function (e) {
      changeCounter++;
      if (e.target.checked) {
        check.parentElement.parentElement.lastElementChild.classList.add(
          "linethrough"
        );
        check.parentElement.parentElement.style.order = `${changeCounter}`; // moving selected elements to the bottom (oldest => top)
      } else {
        check.parentElement.parentElement.lastElementChild.classList.remove(
          "linethrough"
        );
      }
    });
  });
};

const cardDelete = function () {
  // delete card container
  document.querySelectorAll(".bi-x-square").forEach(function (button) {
    button.addEventListener("click", function () {
      button.parentElement.parentElement.parentElement.remove();
    });
  });
};

//Assign to-do task container

//take username input value compare it with array user name
//create a variable for assigned user
// then take the title and assigned notes and push it to that's users array object
//Add a comment on the title (a template literal on who assigned the task)

//Assign Task button

const assignTask = function () {
  assignTaskBtn.addEventListener("click", function () {
    modelOverlay.style.visibility = "visible";
    assignTaskModel.style.visibility = "visible";
  });
};

assignTask();

//Assign task add button
let allocatedTasks;
// let assignCounter = 0;
const assignTaskAdd = function () {
  document
    .querySelector(".assign-task-addbtn")
    .addEventListener("click", function (e) {
      e.preventDefault();
      accounts.forEach(function (acc, i) {
        if (acc.username == userNameInput.value) {
          let assignedUser = acc;
          // loggedInUser = acc;

          assignedUser.notes.unshift({
            title: assignTaskTitle.value,
            text: [assignTaskText.value],
            // selectInputValues.map((x) => x.value)
          });
          console.log(accounts);
          closeAssignContainer();
          console.log(loggedInUser);
          // let currentAssignedUserClass =
          //   assignedUser.name.split(" ")[0] + "-card";

          // acc.class = currentAssignedUserClass;
          let finaltest;

          finaltest = document.querySelectorAll(
            `.${acc.assignedClass}-allocated-task`
          ).length;

          // console.log(finaltest);

          // assignCounter++;
          // console.log(assignCounter);
          assignedUserNotes = acc.notes;
          // assignedArray = assignedUserNotes.slice(0, finaltest + 1).reverse();
          assignedArray = assignedUserNotes.slice(0, 1);

          //create cards
          for (let i = 0; i < 1; i++) {
            let arrayLoop = assignedArray[0];
            cardsArea.insertAdjacentHTML(
              "afterbegin",
              `<div class="col to-do-list d-flex  ${acc.assignedClass}-allocated-task justify-content-center ${acc.assignedClass} mb-3">
                <div class="todo-container">
                  <div class="todo-card-title bg-dark text-light">${arrayLoop.title}<span class = 'h6 text-warning ml-2'>(assigned task)</span><i class="
                  bi bi-x-square card-delete"></i></div>
                  <div class="todo-card-body d-flex flex-column">`
            );

            // assignCounter = 0;

            // finaltest = document.querySelectorAll(
            //   `.${acc.assignedClass}-allocated-task`
            // ).length;

            // console.log(finaltest);

            let assignedText = arrayLoop.text;
            //add text
            if (assignedText !== "") {
              //if no text entered, don't add empty element
              document.querySelector(".todo-card-body").insertAdjacentHTML(
                "beforeend",
                `  <div class="item row ">
                     <label class="col-1 checkbox-label">
                     <input class="checkbox " type="checkbox" >
                     <span class="checkbox-custom"></span>
        
                     <span class="checkbox-custom"></span>
                   </label>
                   <div class="label-text fa-md d-inline col-10">${assignedText}</div>
                 </div>  `
              );
              // console.log(text, i);
            }
          }
          //end create cards
          displayCards();
          cardDelete();
          isChecked();
          allocatedTasks = document.querySelectorAll(".allocated-task").length;
          // console.log(allocatedTasks);
        }
      });
    });
};

assignTaskAdd();

//assign task close button
const closeAssignContainer = function () {
  modelOverlay.style.visibility = "hidden";
  assignTaskModel.style.visibility = "hidden";
  assignTaskTitle.value = "";
  assignTaskText.value = "";
  userNameInput.value = "";
};

const assignTaskClose = function () {
  assignTaskCloseBtn.addEventListener("click", closeAssignContainer);
};

assignTaskClose();

//Create switch user button

const switchUser = function () {
  switchUserBtn.addEventListener("click", function (e) {
    e.preventDefault();
    //reset previous input values to none
    loginTextInput.value = "";
    loginPasswordInput.value = "";

    //reveal login container
    loginContainer.classList.toggle("Reveal--login-container");
    dashboard.style.opacity = "0";
    userInfo.style.opacity = "0";
    console.log("hi");

    //reset everything
    //1) remove dp
    profilePic.innerHTML = "";
    assignCounter = 0;

    //2) reset counter
    // counter = 0;

    //3) filtering cards

    // loggedInUser.class
    //use filter/find method with object keys and do something
  });
};
switchUser();

const displayCards = function () {
  //show cards relevant to logged in user
  let toDoList = document.querySelectorAll(".to-do-list");

  toDoList.forEach(function (item) {
    if (item.classList.contains(`${loggedInUser.assignedClass}`)) {
      item.style.transform = "scale(1)";
      // check.parentElement.parentElement.style.order =
      item.style.order = -1;
    } else {
      item.style.transform = "scale(0)";
      item.style.order = 1;
    }
  });
};

// const assignTaskUpdateUi = function () {};

// assignTaskUpdateUi();

//

// let userName = userNameInput.value;
// selectAcc = accounts.filter((account) => account.name == userName);
// console.log(selectAcc);

// acc.username == loginTextInput.value.toLowerCase() &&
//   acc.pin == loginPasswordInput.value;

//give cards custom clases based on the names of accounts

/////////////////////////////////////////////////////////////////////

///add classlists for assigned task
// get lenght of assign task
//start counter from there

//give a name to the class
//query selector if equals to logged in user ect
