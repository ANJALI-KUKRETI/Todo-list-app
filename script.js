const plus = document.querySelector(".fa-plus");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closemodal = document.querySelector(".close-modal");
const dots = document.querySelectorAll(".fa-ellipsis-h");
const tooltip = document.querySelectorAll(".tooltip");
const addTask = document.querySelector(".add-task");
const title = document.querySelector(".title");
const category = document.querySelector(".cat");
const descrip = document.querySelector(".des");
const stickers = document.querySelector(".stickers");
const stick = document.querySelector(".stick");

// -----event Listeners--------

plus.addEventListener("click", openmodal);
closemodal.addEventListener("click", closemod);
addTask.addEventListener("click", inputValues);
document.addEventListener("DOMContentLoaded", displayold);

// ------------modal and tooltips--------

function openmodal() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
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
    id: Math.floor(Math.random() * 10 + 1),
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
  const newtask = document.createElement("div");
  newtask.classList.add("stick");
  newtask.innerHTML = `<div class="tooltip hidden">
      <div class="delete"><span> Delete</span><i class="fas fa-trash-alt"></i></div>
      <div class="edit"><span>Edit</span><i class="fas fa-edit"></i></div>
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
      <i class="fas fa-check-square ${checkbox}"></i>
    </div>`;
  stickers.appendChild(newtask);
}

//localstorage

function displayold() {
  let todos = JSON.parse(localStorage.getItem("inputvalues")) || [];
  todos.forEach(function (todo) {
    let title1 = todo.title;
    let cat1 = todo.category;
    let des1 = todo.description;
    let checkbox = todo.completed;
    const newtask = document.createElement("div");
    newtask.classList.add("stick");
    newtask.innerHTML = `<div class="tooltip hidden">
        <div class="delete"><span> Delete</span><i class="fas fa-trash-alt"></i></div>
        <div class="edit"><span>Edit</span><i class="fas fa-edit"></i></div>
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
        <i class="fas fa-check-square ${checkbox}"></i>
      </div>`;
    stickers.appendChild(newtask);
  });
}

//tooltip
for (let i = 0; i < dots.length; i++) {
  dots[i].addEventListener("click", function () {
    tooltip[i].classList.toggle("hidden");
  });
}
