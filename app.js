//Selectors
const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filter = document.querySelector('.filter-todo');

//Glovbal variables
let todosArray;

//Event Listeners
window.onload = getTodos(loadTodos);
todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", checkOrDelete);
filter.addEventListener("click", todoFilter);

//Functions
function addTodo(event) {
  event.preventDefault(); //Prevent form from submitting
  const todoItem = {value: todoInput.value, state: ""};
  //append todo item
  appendTodo(todoItem);
  //Add todo to localStorage
  saveTodosLocally(todoItem);
   todoInput.value = "";
}

//check or delete function
function checkOrDelete(event) {
  const btn = event.target;
  if(btn.classList[0] === "complete-btn") {
    const item = btn.previousElementSibling.innerText;
    btn.parentElement.classList.toggle("completed");
    updateTodosLocally(item);
  } else if (btn.classList[0] === "trash-btn") {
    const todo = btn.parentElement;
    const item = btn.previousElementSibling.previousElementSibling.innerText;
    deleteTodosLocally(item);
    todo.classList.toggle("thanos");
    todo.addEventListener("transitionend", () =>  todo.remove())
  }
}

function todoFilter(event) {
  const todos = document.querySelectorAll(".todo");
  todos.forEach(function(todo) {
    switch (event.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "incomplete":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  })
}

function getTodos(loadTodos) {
  if (localStorage.getItem("todos") === null) {
    todosArray = [];
  } else {
    todosArray = JSON.parse(localStorage.getItem('todos'));
    loadTodos(todosArray);
  }
}
//Save todoList to local storage
function saveTodosLocally(todoItem) {
  todosArray.push(todoItem);
  localStorage.setItem("todos", JSON.stringify(todosArray));
}

//Delete Item from local storage
function deleteTodosLocally(todo) {
  todosArray = JSON.parse(localStorage.getItem('todos'));
  const index = todosArray.findIndex((object => object.value == todo));
  todosArray.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todosArray));
}
//Update Items from local local Storage
function updateTodosLocally(item) {
  const index = todosArray.findIndex((object => object.value == item));
  todosArray[index].state == "completed" ? todosArray[index].state = "" : todosArray[index].state = "completed"
  localStorage.setItem("todos", JSON.stringify(todosArray));
}
// Load Items on screen
function loadTodos(todos) {
  todos.forEach(todoItem => {
    appendTodo(todoItem);
  })
}

function appendTodo(todoItem) {
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');
  (todoItem.state.length > 0) ? todoDiv.classList.add(todoItem.state) : null;
  todoDiv.innerHTML = `
                        <li class="todo-item">${todoItem.value}</li>
                        <button class="complete-btn"><div class="check"></div></button>
                        <button class="trash-btn"><div class="delete">&#x2B;</div></i></button>
                      `;
   todoList.appendChild(todoDiv);
}
