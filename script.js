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
const t = document.querySelector(".t");
const d = document.querySelector(".d");
const c = document.querySelector(".c");
const stickers = document.querySelector(".stickers");
const stick = document.querySelector(".stick");

// -----event Listeners--------
plus.addEventListener("click", openmodal);
closemodal.addEventListener("click", closemod);
addTask.addEventListener("click", inputValues);

//-------functions-------

// function enterTask(e) {
//   e.preventDefault();
//   const title1 = title.value;
//   const cat1 = category.value;
//   const des1 = descrip.value;
//   e.preventDefault();
//   const newtask = document.createElement("div");
//   newtask.classList.add("stick");
//   newtask.innerHTML = `<div class="tooltip hidden">
//   <div class="delete"><span> Delete</span><i class="fas fa-trash-alt"></i></div>
//   <div class="edit"><span>Edit</span><i class="fas fa-edit"></i></div>
// </div>
// <div class="stickin">
//   <div>
//     <h2 class="t">${title1}</h2>
//     <p class="d">${des1}</p>
//   </div>
//     <i class="fas fa-ellipsis-h c"></i>
// </div>
// <div class="bottom">
//   <i class="fas fa-circle worki"></i>
//   <i class="fas fa-check-square"></i>
// </div>`;
//   stickers.appendChild(newtask);
//   title.value = "";
//   category.value = "";
//   descrip.value = "";
//   closemod();
// }

for (let i = 0; i < dots.length; i++) {
  dots[i].addEventListener("click", function () {
    tooltip[i].classList.toggle("hidden");
  });
}
// ------------modal and tooltips--------

function openmodal() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function closemod() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

//taking user input in an array

function inputValues(e) {
  let titles = [],
    categories = [],
    descriptions = [];

  e.preventDefault();
  let temp1 = title.value;
  titles.push(temp1);
  let temp2 = category.value;
  categories.push(temp2);
  let temp3 = descrip.value;
  descriptions.push(temp3);

  jsonobj = [];
  for (let i = 0; i < titles.length; i++) {
    let tmp = {
      title: titles[i],
      category: categories[i],
      description: descriptions[i],
    };
    jsonobj.push(tmp);
  }

  console.log(jsonobj);
}

//creating a JSON
