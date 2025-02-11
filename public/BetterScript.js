const input = document.getElementById("input");
const listContainer = document.getElementById("listContainer");

function addTask(task = null) {
  let taskTextValue;
  if (task) {
    taskTextValue = task.text;
  } else {
    taskTextValue = input.value;
  }

  if (taskTextValue === "") {
    alert("You must write something!");
    return;
  }

  let li = document.createElement("li");
  li.className = "list flex items-center justify-between bg-white py-2 px-1 rounded-2xl";

  // Store completed state
  if (task && task.completed) {
    li.setAttribute("data-completed", "true");
  } else {
    li.setAttribute("data-completed", "false");
  }

  let div = document.createElement("div");
  div.className = "flex items-center gap-2";

  let img = document.createElement("img");
  if (task && task.completed) {
    img.src = "./images/checked.png";
  } else {
    img.src = "./images/unchecked.png";
  }
  img.className = "w-7 cursor-pointer";

  let taskText = document.createElement("span");
  taskText.innerText = taskTextValue;

  if (task && task.completed) {
    taskText.classList.add("line-through", "text-gray-500");
  }

  let cross = document.createElement("span");
  cross.className = "cross cursor-pointer mr-3 text-gray-700";
  cross.innerText = "X";

  listContainer.append(li);
  li.append(div);
  div.append(img);
  div.append(taskText);
  li.append(cross);
  input.value = "";

  // Toggle completed state
  img.addEventListener("click", function () {
    let isCompleted = li.getAttribute("data-completed") === "true";
    if (isCompleted) {
      img.src = "./images/unchecked.png";
      taskText.classList.remove("line-through", "text-gray-500");
      li.setAttribute("data-completed", "false");
    } else {
      img.src = "./images/checked.png";
      taskText.classList.add("line-through", "text-gray-500");
      li.setAttribute("data-completed", "true");
    }
    saveData();
  });

  // Remove task
  cross.addEventListener("click", function () {
    li.remove();
    saveData();
  });

  saveData();
}

function saveData() {
  let tasks = [];
  document.querySelectorAll(".list").forEach((li) => {
    let text = li.querySelector("span").innerText;
    let completed;
    if (li.getAttribute("data-completed") === "true") {
      completed = true;
    } else {
      completed = false;
    }
    tasks.push({ text, completed });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function retrieveData() {
  let savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    JSON.parse(savedTasks).forEach((task) => addTask(task));
  }
}

// Retrieve tasks on page load
retrieveData();
