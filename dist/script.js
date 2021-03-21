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
};

const account2 = {
  name: "Shazmeer Ramzeen",
  pin: 1111,
  notes: [],
};

const account3 = {
  name: "Jarrod Philips",
  pin: 0000,
  notes: [],
};

const account4 = {
  name: "Abdullah Hamza",
  pin: 4349,
  notes: [],
};

const accounts = [account1, account2, account3, account4];

//Login
//Generating initials for login

const getinitial = accounts.forEach(function (account) {
  account.username = account.name
    .toLowerCase()
    .split(" ")
    .map((x) => x[0])
    .join("");

  account.assignedClass = account.name.split(" ")[0] + "-card";
});

//Create login access

let loggedInUser;

loginSubmitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  accounts.forEach(function (acc, i) {
    if (
      acc.username == loginTextInput.value.toLowerCase() &&
      acc.pin == loginPasswordInput.value
    ) {
      loggedInUser = acc;
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

const containerExpand = () => {
  takeNoteMiniText.addEventListener("click", () => {
    takeNoteMiniContainer.style.opacity = "0";

    setTimeout(() => (takeNoteMiniContainer.style.display = "none"), 300);
    takeNoteContainerExpand.classList.add("visible");
    takeNoteInputExpand.focus();

    setTimeout(() => takeNoteContainerExpand.classList.add("opacity"), 200);
  });
};
containerExpand();

//declaring function to remove notes container
const removeNotesContainer = () => {
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

const ExpandcloseBtn = () => {
  expandContCloseBtn.addEventListener("click", removeNotesContainer);
};
ExpandcloseBtn();

//working with take a note

//new text area for list item on enter key press
const newLine = () => {
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
      takeNoteBodyExpand.lastElementChild.childNodes[1].focus();

      let deleteBtn = document.querySelectorAll(".delete-item");

      // Button even listeners
      deleteBtn.forEach(function (button, i) {
        if (button.parentElement != takeNoteBodyExpand.lastChild) {
          button.addEventListener("click", function () {
            this.parentElement.remove();
          });
        }
      });
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

((colours) => {
  colours.forEach(function (color) {
    color.addEventListener("click", () => {
      bgColor = window
        .getComputedStyle(color, null)
        .getPropertyValue("background-color");
      assignColor(bgColor);
    });
  });
})(paintColor);

let counter = 0;

//Add items to object array
const addToDoList = () => {
  addBtnExpand.addEventListener("click", function () {
    let NoOfAssignClasses = document.querySelectorAll(
      `.${loggedInUser.assignedClass}`
    ).length;

    if (NoOfAssignClasses == undefined) {
      counter++; //for loop control
    } else {
      counter = NoOfAssignClasses;
    }

    let selectInputValues = Array.from(
      //converts node list to actual array
      document.querySelectorAll(".text-placeholder")
    );
    loggedInUser.notes.push({
      title: titleInputExpand.value,
      text: selectInputValues.map((x) => x.value), //return arr of input values
      backgroundColor: bgColor,
    });

    //create todo cards

    const createCards = () => {
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

        arrayLoop.text.forEach((text) => {
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
        const changeColor = () => {
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
  changeCounter = 0;
  Array.from(document.querySelectorAll(".checkbox")).forEach((check) => {
    //fires before dom elements
    check.addEventListener("change", (e) => {
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

const cardDelete = () => {
  // delete card container
  document.querySelectorAll(".bi-x-square").forEach(function (button) {
    button.addEventListener("click", function () {
      button.parentElement.parentElement.parentElement.remove();
    });
  });
};

//Assign to-do task container

//Assign Task button

const assignTask = () => {
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

          assignedUser.notes.unshift({
            title: assignTaskTitle.value,
            text: [assignTaskText.value],
          });
          closeAssignContainer();

          assignedUserNotes = acc.notes;
          assignedArray = assignedUserNotes.slice(0, 1);

          //create cards
          for (let i = 0; i < 1; i++) {
            let arrayLoop = assignedArray[0];
            cardsArea.insertAdjacentHTML(
              "afterbegin",
              `<div class="col to-do-list d-flex  ${acc.assignedClass}-allocated-task justify-content-center ${acc.assignedClass} mb-3">
                <div class="todo-container">
                  <div class="todo-card-title bg-dark text-light">${arrayLoop.title}<span class = 'h6 text-warning ml-2'>(assigned task)</span><i class="
                  bi bi-x-square card-delete text-danger"></i></div>
                  <div class="todo-card-body d-flex flex-column">`
            );

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
            }
          }
          displayCards(); //display cards
          cardDelete(); // call delete function on assigned cards
          isChecked(); // call ischecked function on assigned cards
          allocatedTasks = document.querySelectorAll(".allocated-task").length;
        }
      });
    });
};

assignTaskAdd();

//assign task close button
const closeAssignContainer = () => {
  modelOverlay.style.visibility = "hidden";
  assignTaskModel.style.visibility = "hidden";
  assignTaskTitle.value = "";
  assignTaskText.value = "";
  userNameInput.value = "";
};

const assignTaskClose = () => {
  assignTaskCloseBtn.addEventListener("click", closeAssignContainer);
};

assignTaskClose();

//Create switch user button

const switchUser = () => {
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

    profilePic.innerHTML = "";
    assignCounter = 0;
  });
};
switchUser();

const displayCards = () => {
  //show cards relevant to logged in user
  let toDoList = document.querySelectorAll(".to-do-list");

  toDoList.forEach((item) => {
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
