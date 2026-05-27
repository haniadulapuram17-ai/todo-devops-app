const API_URL = "http://localhost:5000/tasks";

document.addEventListener("DOMContentLoaded", fetchTasks);


// FETCH all tasks
async function fetchTasks() {
    const response = await fetch(API_URL);

    const tasks = await response.json();

    document.getElementById("taskList").innerHTML = "";

    tasks.forEach(task => {
        createTaskElement(task);
    });
}


// ADD task
async function addTask() {
    const input = document.getElementById("taskInput");

    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            text: taskText
        })
    });

    const newTask = await response.json();

    createTaskElement(newTask);

    input.value = "";
}


// CREATE task element
function createTaskElement(task) {
    const li = document.createElement("li");

    li.innerHTML = `
        <span class="${task.completed ? "completed" : ""}"
              onclick="toggleTask('${task._id}')">
              ${task.text}
        </span>

        <button onclick="deleteTask('${task._id}')">
            Delete
        </button>
    `;

    document.getElementById("taskList").appendChild(li);
}


// TOGGLE completed
async function toggleTask(id) {
    await fetch(`${API_URL}/${id}`, {
        method: "PUT"
    });

    fetchTasks();
}


// DELETE task
async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    fetchTasks();
}