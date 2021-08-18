"use strict";

class Users {
  constructor(name, pin) {
    this.name = name;
    this.pin = pin;
    this.notes = [];
  }
}

const account1 = new Users("Shaznan Fairoze", "1234");
const account2 = new Users("Shazmeer Ramzeen", "1111");
const account3 = new Users("Jarrod Phillips", "0000");
const account4 = new Users("Abdullah Hamza", "4349");

class App {
  #loggedInUser;
  #accounts = [account1, account2, account3, account4];
  #paintColor = document.querySelectorAll(".paint-color");
  #bgColor;
  counter = 0;
  arrayLoop;
  #changeCounter;
  allocatedTasks;
  #itemAssign;

  constructor() {
    //welcome btn
    welcBtn.addEventListener("click", this._welcMessage.bind(this));
    //get initials/assign unique class
    this.#accounts.forEach(this._getInitial);
    //loginBtn
    loginSubmitBtn.addEventListener("click", this._initiateLogin.bind(this));
    //expand take notes container
    this._containerExpand();
    //expandCont close btn
    this._expandCloseBtn();
    //display new line in notes Cont
    document.addEventListener("keydown", this._newLine.bind(this));
    //assign and display Cont Colour
    this._executeApplyColor();
    //Add todo list card
    this._addToDoList();
    //assigntask model visibility
    this._assignTaskvisibility();
    //addAssigntask
    addAssignTaskBtn.addEventListener(
      "click",
      this._initiateAssignTaskAdd.bind(this),
    );
    //Assign task close Btn
    this._assignTaskClose();

    //create switch User
    this._switchUser();
  }

  _welcMessage() {
    welcContainer.classList.add("hide--welcome-container");
    loginContainer.classList.add("Reveal--login-container");
  }

  _getInitial(account) {
    account.username = account.name
      .toLowerCase()
      .split(" ")
      .map((x) => x[0])
      .join("");

    account.assignedClass = account.name.split(" ")[0] + "-card";
  }

  _initiateLogin(e) {
    e.preventDefault();
    this.#accounts.forEach(this._initializeLogin.bind(this));
  }

  _initializeLogin(acc, i) {
    if (
      acc.username == loginTextInput.value.toLowerCase() &&
      acc.pin == loginPasswordInput.value
    ) {
      this.#loggedInUser = acc;
      loginContainer.classList.toggle("Reveal--login-container");
      //show cards relevant to logged in user
      this._displayCards(); //add once display cards is added
      dashboard.style.opacity = "1";
      userInfo.style.opacity = "1";

      let profileDpAssign = `<img
        src="/dist/images/avatar/avatar-${i}.png"
        src="./images/avatar/avatar-${i}.png"
        
        alt="Profile-avatar"
        width="60vh"
      />`;
      //Assigning user name and profile picture
      loginUserName.textContent = acc.name;
      profilePic.insertAdjacentHTML("beforeend", profileDpAssign);
      this._removeNotesContainer(); // add later
    }
  }

  _containerExpand() {
    takeNoteMiniText.addEventListener("click", () => {
      takeNoteMiniContainer.style.opacity = "0";

      setTimeout(() => (takeNoteMiniContainer.style.display = "none"), 300);
      takeNoteContainerExpand.classList.add("visible");
      takeNoteInputExpand.focus();

      setTimeout(() => takeNoteContainerExpand.classList.add("opacity"), 200);
    });
  }
  _removeNotesContainer() {
    takeNoteMiniContainer.style.opacity = "100";
    setTimeout(() => (takeNoteMiniContainer.style.display = "block"), 1000);
    takeNoteContainerExpand.classList.remove("visible");
    setTimeout(() => takeNoteContainerExpand.classList.remove("opacity"), 50);
    //reset background color
    this._assignColor("white");
    //remove contents
    takeNoteBodyExpand.innerHTML = `<div class="item-list d-flex">
    <input class=" take-a-note-extended  text-placeholder" type="text" placeholder=" Take a note.."><button class="delete-item "><i class="bi bi-trash-fill"></i></button>                          
  </div>`;
    //remove title
    titleInputExpand.value = "";
    //fix bug - Removing typed text in mini container before expand container apears
    takeNoteMiniText.value = "";
  }

  _expandCloseBtn() {
    expandContCloseBtn.addEventListener("click", this._removeNotesContainer);
  }

  _newLine(e) {
    if (
      e.key === "Enter" &&
      takeNoteBodyExpand.lastElementChild.childNodes[1].value != ""
    ) {
      takeNoteBodyExpand.insertAdjacentHTML(
        "beforeend",
        `   <div class="item-list d-flex">
          <input class=" take-a-note-extended text-placeholder" type="text" placeholder=" Take a note.."><button class="delete-item"><i class="bi bi-trash-fill"></i></button>                          
        </div>`,
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
  }

  _assignColor(color) {
    takeNoteContainerExpand.style.backgroundColor = color;
    document
      .querySelectorAll(".text-placeholder")
      .forEach((element) => (element.style.backgroundColor = color));

    titleInputExpand.style.backgroundColor = color;
  }

  _executeApplyColor() {
    this.#paintColor.forEach((color) => {
      color.addEventListener("click", () => {
        this.#bgColor = window
          .getComputedStyle(color, null)
          .getPropertyValue("background-color");
        this._assignColor(this.#bgColor);
      });
    });
    // console.log("hi");
  }

  //Add items to object array
  _addToDoList() {
    addBtnExpand.addEventListener("click", this._test.bind(this));
    // this._titleValidation();
  }

  _test() {
    let NoOfAssignClasses = document.querySelectorAll(
      `.${this.#loggedInUser.assignedClass}`,
    ).length;

    if (NoOfAssignClasses == undefined) {
      this.counter++; //for loop control
    } else {
      this.counter = NoOfAssignClasses;
    }

    let selectInputValues = Array.from(
      //converts node list to actual array
      document.querySelectorAll(".text-placeholder"),
    );
    this.#loggedInUser.notes.push({
      title: titleInputExpand.value,
      text: selectInputValues.map((x) => x.value), //return arr of input values
      backgroundColor: this.#bgColor,
    });

    this._titleValidation();
  }

  _createCards() {
    //add title
    for (let i = this.counter; i < this.#loggedInUser.notes.length; i++) {
      console.log(i);
      this.arrayLoop = this.#loggedInUser.notes[i];
      cardsArea.insertAdjacentHTML(
        "afterbegin",
        `<div class="col to-do-list d-flex justify-content-center ${
          this.#loggedInUser.assignedClass
        } mb-3">
                  <div class="todo-container">
                    <div class="todo-card-title">${
                      this.arrayLoop.title
                    }<i class="
                    bi bi-x-square card-delete"></i></div>
                    <div class="todo-card-body d-flex flex-column">`,
      );

      this.arrayLoop.text.forEach((text) => {
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
                   </div>  `,
          );
          // console.log(text, i);
        }
      });

      //create function for colours
      let cardTitles = Array.from(
        document.querySelectorAll(".todo-card-title"),
      );
      console.log(cardTitles);

      cardTitles[0].style.backgroundColor = this.arrayLoop.backgroundColor;
      // this._changeColor();
    }
  }

  _titleValidation() {
    if (titleInputExpand.value !== "") {
      //create card and close container only if title is entered
      this._createCards();
      this._removeNotesContainer();
    } else {
      titleInputExpand.style.color = "red";
      titleInputExpand.value = "Please enter a title!";
      setTimeout(() => {
        //display message for 0.5s
        titleInputExpand.value = "";
        titleInputExpand.style.color = "rgba(0, 0, 0, 0.6)";
      }, 500);
    }

    this._isChecked(); //calling is checked function after add button is clicked----------------------------------------------
    this._cardDelete(); //calling card delete function---------------------------------------------------
  }

  _isChecked() {
    this.#changeCounter = 0;
    Array.from(document.querySelectorAll(".checkbox")).forEach((check) => {
      //fires before dom elements
      check.addEventListener("change", (e) => {
        this.#changeCounter++;
        if (e.target.checked) {
          console.log(check);
          check.closest(".item").lastElementChild.classList.add("linethrough");
          check.closest(".item").style.order = `${this.#changeCounter}`; // moving selected elements to the bottom (oldest => top)
        } else {
          check
            .closest(".item")
            .lastElementChild.classList.remove("linethrough");
        }
      });
    });
  }

  _cardDelete() {
    // delete card container
    document.querySelectorAll(".bi-x-square").forEach(function (button) {
      button.addEventListener("click", function () {
        button.closest(".to-do-list").remove();
      });
    });
  }

  _assignTaskvisibility() {
    assignTaskBtn.addEventListener("click", function () {
      modelOverlay.style.visibility = assignTaskModel.style.visibility =
        "visible";
    });
  }

  _initiateAssignTaskAdd(e) {
    e.preventDefault();
    this.#accounts.forEach(this._assignTaskAdd.bind(this));
    // });
  }

  _assignTaskAdd(acc, i) {
    if (acc.username == userNameInput.value) {
      let assignedUser = acc;

      assignedUser.notes.unshift({
        title: assignTaskTitle.value,
        text: [assignTaskText.value],
      });
      console.log(this.#loggedInUser);
      this._closeAssignContainer();

      let assignedUserNotes = acc.notes;
      let assignedArray = assignedUserNotes.slice(0, 1);

      //create cards
      for (let i = 0; i < 1; i++) {
        let arrayLoop = assignedArray[0];
        cardsArea.insertAdjacentHTML(
          "afterbegin",
          `<div class="col to-do-list d-flex  ${acc.assignedClass}-allocated-task justify-content-center ${acc.assignedClass} mb-3">
                  <div class="todo-container">
                    <div class="todo-card-title bg-dark text-light">${arrayLoop.title}<span class = 'h6 text-warning ml-2'>(assigned task)</span><i class="
                    bi bi-x-square card-delete text-danger"></i></div>
                    <div class="todo-card-body d-flex flex-column">`,
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
                   </div>  `,
          );
        }
      }
      this._displayCards(); //display cards
      this._cardDelete(); // call delete function on assigned cards
      this._isChecked(); // call ischecked function on assigned cards
      this.allocatedTasks = document.querySelectorAll(".allocated-task").length;
    }
  }

  _closeAssignContainer() {
    modelOverlay.style.visibility = assignTaskModel.style.visibility = "hidden";
    assignTaskTitle.value = assignTaskText.value = userNameInput.value = "";
  }

  _displayCards() {
    //show cards relevant to logged in user
    let toDoList = document.querySelectorAll(".to-do-list");

    const display = (scale, order) => {
      this.#itemAssign.style.transform = `scale(${scale})`;
      this.#itemAssign.style.order = order;
    };

    toDoList.forEach((item) => {
      this.#itemAssign = item;
      item.classList.contains(`${this.#loggedInUser.assignedClass}`)
        ? display(1, -1)
        : display(0, 1);
    });
  }

  _assignTaskClose() {
    assignTaskCloseBtn.addEventListener("click", this._closeAssignContainer);
  }

  _switchUser() {
    switchUserBtn.addEventListener("click", function (e) {
      e.preventDefault();
      //reset previous input values to none
      loginTextInput.value = loginPasswordInput.value = "";

      //reveal login container
      loginContainer.classList.toggle("Reveal--login-container");
      dashboard.style.opacity = userInfo.style.opacity = "0";

      profilePic.innerHTML = "";
      this.assignCounter = 0;
    });
  }
}

//Calling class app
new App();
