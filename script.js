const plus = document.querySelector(".fa-plus");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closemodal = document.querySelector(".close-modal");
const updateModal = document.querySelector(".modalUp");
const updatebtn = document.querySelector(".update");
const addTask = document.querySelector(".add-task");
const closeUp = document.querySelector(".closeUp");
const title = document.querySelector(".title");
const category = document.querySelector(".cat");
const descrip = document.querySelector(".des");
const title1 = document.querySelector(".title1");
const id1 = document.querySelector(".id1");
const category1 = document.querySelector(".cat1");
const descrip1 = document.querySelector(".des1");
const stickers = document.querySelector(".stickers");
const stick = document.querySelector(".stick");
const work = document.querySelector(".work");
const study = document.querySelector(".studying");
const enter = document.querySelector(".enter");
const code = document.querySelector(".code");
const filtertask = document.querySelector(".filter-todo");

// -----event Listeners--------

plus.addEventListener("click", openmodal);
closemodal.addEventListener("click", closemod);
addTask.addEventListener("click", inputValues);
document.addEventListener("DOMContentLoaded", displayold);
work.addEventListener("click", function () {
  displayold("exercise");
});
study.addEventListener("click", function () {
  displayold("study");
});
enter.addEventListener("click", function () {
  displayold("entertainment");
});
code.addEventListener("click", function () {
  displayold("coding");
});
filtertask.addEventListener("click", sortedTasks);
closeUp.addEventListener("click", closemodalup);

// ------------modal and tooltips--------

function openmodal() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}
function openmodalup() {
  updateModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}
function closemodalup() {
  updateModal.classList.add("hidden");
  overlay.classList.add("hidden");
}

function closemod() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

//json
let jsonobj = [];
function inputValues(e) {
  e.preventDefault();
  let temp = {
    title: title.value,
    category: category.value.toLowerCase(),
    description: descrip.value,
    id: Math.floor(Math.random() * 1000 + 1),
    completed: false,
  };

  jsonobj = JSON.parse(localStorage.getItem("inputvalues")) || [];
  jsonobj.push(temp);
  localStorage.setItem("inputvalues", JSON.stringify(jsonobj));
  title.value = "";
  category.value = "";
  descrip.value = "";
  closemod();
  displayNew();
}

//fresh task
function displayNew() {
  let todos = JSON.parse(localStorage.getItem("inputvalues")) || [];
  let n = todos.length;
  let title1 = todos[n - 1].title;
  let cat1 = todos[n - 1].category;
  let des1 = todos[n - 1].description;
  let checkbox = todos[n - 1].completed;

  let newtask = `<div class="stick">
  <div class="tooltip hidden">
      <div class="delete" data-id="${
        todos[n - 1].id
      }">Delete<i class="fas fa-trash-alt"></i></div>
      <div class="edit" data-id="${
        todos[n - 1].id
      }">Edit<i class="fas fa-edit"></i></div>
    </div>
    <div class="stickin">
      <div>
        <h2 class="t">${title1}</h2>
        <p class="d">${des1}</p>
      </div>
        <i class="fas fa-ellipsis-h c"></i>
    </div>
    <div class="bottom">
      <i class="fas fa-circle ${cat1}"></i>
      <i class="fas fa-check-square ${checkbox}" data-id="${todos[n - 1].id}"
  }></i>
    </div>
    </div>`;
  stickers.insertAdjacentHTML("afterbegin", newtask);

  const deleteTask = document.querySelectorAll(".delete");
  const editTask = document.querySelectorAll(".edit");
  const dots = document.querySelectorAll(".fa-ellipsis-h");
  const tooltip = document.querySelectorAll(".tooltip");
  const completedTask = document.querySelectorAll(".fa-check-square");

  dots[0].addEventListener("click", function (e) {
    tooltip[0].classList.toggle("hidden");
  });

  deleteTask.forEach(function (element) {
    element.addEventListener("click", function (e) {
      removeLocalTodos(e);
    });
  });

  editTask.forEach(function (element) {
    element.addEventListener("click", function (e) {
      editContent(e);
    });
  });

  //---------complete--------------
  completedTask.forEach(function (element) {
    element.addEventListener("click", function (e) {
      completeTasks(e);
    });
  });
}

//---------localstorage---------
function displayold(category1) {
  stickers.innerHTML = "";
  let todos = JSON.parse(localStorage.getItem("inputvalues")) || [];

  if (
    category1 == "exercise" ||
    category1 == "study" ||
    category1 == "entertainment" ||
    category1 == "coding"
  ) {
    let newarr = [];
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].category == category1) newarr.push(todos[i]);
    }
    allrounder(newarr);
  } else {
    allrounder(todos);
  }
}

//-----------remove local todos------------
function removeLocalTodos(todo) {
  let todos = JSON.parse(localStorage.getItem("inputvalues")) || [];
  const toDelete = todo.target.dataset.id;
  const temp = todos.filter((todo) => todo.id != toDelete);
  localStorage.setItem("inputvalues", JSON.stringify(temp));
  displayold();
  // console.log(toDelete);
  // console.log(temp);
}

function completeTasks(todo) {
  let todos = JSON.parse(localStorage.getItem("inputvalues")) || [];
  const done = todo.target.dataset.id;
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id == done) {
      todos[i].completed = true;
    }
  }
  localStorage.setItem("inputvalues", JSON.stringify(todos));
  displayold();
}

function sortedTasks(e) {
  stickers.innerHTML = "";
  let todos = JSON.parse(localStorage.getItem("inputvalues")) || [];
  if (e.target.value == "completed") {
    let newarr = [];
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].completed == true) newarr.push(todos[i]);
    }
    allrounder(newarr);
  } else if (e.target.value == "uncompleted") {
    let newarr = [];
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].completed == false) newarr.push(todos[i]);
    }
    allrounder(newarr);
  } else {
    allrounder(todos);
  }
}

function allrounder(taken) {
  taken.forEach(function (todo) {
    let title1 = todo.title;
    let cat1 = todo.category;
    let des1 = todo.description;
    let checkbox = todo.completed;
    let newtask = `<div class="stick">
  <div class="tooltip hidden" >
      <div class="delete" data-id="${todo.id}">Delete<i class="fas fa-trash-alt"></i></div>
      <div class="edit" data-id="${todo.id}">Edit<i class="fas fa-edit"></i></div>
    </div>
    <div class="stickin">
      <div>
        <h2 class="t">${title1}</h2>
        <p class="d">${des1}</p>
      </div>
        <i class="fas fa-ellipsis-h c"></i>
    </div>
    <div class="bottom">
      <i class="fas fa-circle ${cat1}"></i>
      <i class="fas fa-check-square ${checkbox}" data-id="${todo.id}"></i>
    </div>
    </div>`;
    stickers.insertAdjacentHTML("afterbegin", newtask);
  });

  const deleteTask = document.querySelectorAll(".delete");
  const editTask = document.querySelectorAll(".edit");
  const dots = document.querySelectorAll(".fa-ellipsis-h");
  const tooltip = document.querySelectorAll(".tooltip");
  const completedTask = document.querySelectorAll(".fa-check-square");
  for (let i = 0; i < dots.length; i++) {
    dots[i].addEventListener("click", function (e) {
      tooltip[i].classList.toggle("hidden");
    });
  }

  deleteTask.forEach(function (element) {
    element.addEventListener("click", function (e) {
      removeLocalTodos(e);
    });
  });

  editTask.forEach(function (element) {
    element.addEventListener("click", function (e) {
      editContent(e);
    });
  });

  //---------complete--------------
  completedTask.forEach(function (element) {
    element.addEventListener("click", function (e) {
      completeTasks(e);
    });
  });
}

// --------------edit functionality------------
function editContent(todo) {
  let todos = JSON.parse(localStorage.getItem("inputvalues")) || [];
  const toedit = todo.target.dataset.id;
  // console.log(toedit);
  const temp = todos.filter((todo) => todo.id == toedit);
  openmodalup();
  // console.log(temp);
  title1.value = temp[0].title;
  descrip1.value = temp[0].description;
  category1.value = temp[0].category;
  id1.value = temp[0].id;
}

updatebtn.addEventListener("click", function (e) {
  e.preventDefault();
  let todos = JSON.parse(localStorage.getItem("inputvalues")) || [];
  let titleInput = title1.value;
  let categoryInput = category1.value;
  let descripInput = descrip1.value;
  let id = id1.value;

  function updatedArr(td) {
    if (td.id == id) {
      return {
        title: titleInput,
        category: categoryInput,
        completed: false,
        description: descripInput,
        id: id,
      };
    } else {
      return td;
    }
  }
  const newTodos = todos.map(updatedArr);
  localStorage.setItem("inputvalues", JSON.stringify(newTodos));
  closemodalup();
  displayold();
});
