const input = document.getElementById("input");
const listContainer = document.getElementById("listContainer");

function addTask() {
  if (input.value === "") {
    alert("You must right something!");
  } else {
    let li = document.createElement("li");
    li.className =
      "list flex items-center justify-between bg-white py-2 px-1 rounded-2xl";

    let div = document.createElement("div");
    div.className = "flex items-center gap-2";

    let img = document.createElement("img");
    img.src = "./images/unchecked.png";
    img.className = "w-7 cursor-pointer";

    let taskText = document.createElement("span");
    taskText.innerText = input.value;

    let cross = document.createElement("span");
    cross.className = "cross cursor-pointer mr-3 text-gray-700";
    cross.innerText = "X";

    listContainer.append(li);
    li.append(div);
    div.append(img);
    div.append(taskText);
    li.append(cross);
    saveData()

    img.addEventListener("click", function () {
      if (img.src.includes("unchecked.png")) {
        img.src = "./images/checked.png"; 
        taskText.classList.add("line-through", "text-gray-500"); 
        saveData()
      } else {
        img.src = "./images/unchecked.png"; 
        taskText.classList.remove("line-through", "text-gray-500"); 
        saveData()
      }
    });

    cross.addEventListener("click", function () {
      li.remove();
      saveData()
    });
  }
}

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML)
}

function retriveData(){
    listContainer.innerHTML = localStorage.getItem("data")
}
retriveData()
