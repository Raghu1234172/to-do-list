document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("task");
    let categoryInput = document.getElementById("category");
    let taskText = taskInput.value.trim();
    let category = categoryInput.value;

    if (taskText === "") {
        alert("Task cannot be empty!");
        return;
    }

    let task = {
        text: taskText,
        category: category,
        completed: false
    };

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskInput.value = "";
    loadTasks();
}

function loadTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.className = task.completed ? "completed " + task.category.toLowerCase() : task.category.toLowerCase();
        li.innerHTML = `
            <span>${task.text} (${task.category})</span>
            <div>
                <button class="complete" onclick="toggleComplete(${index})">✔</button>
                <button class="edit" onclick="editTask(${index})">✏</button>
                <button class="delete" onclick="deleteTask(${index})">🗑</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function toggleComplete(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function editTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let newTaskText = prompt("Edit task:", tasks[index].text);
    if (newTaskText !== null && newTaskText.trim() !== "") {
        tasks[index].text = newTaskText.trim();
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    }
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function filterTasks() {
    let searchText = document.getElementById("search").value.toLowerCase();
    let filterCategory = document.getElementById("filter").value;
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task, index) => {
        let matchesSearch = task.text.toLowerCase().includes(searchText);
        let matchesFilter = filterCategory === "All" || 
                            (filterCategory === "Completed" && task.completed) ||
                            (filterCategory === task.category);

        if (matchesSearch && matchesFilter) {
            let li = document.createElement("li");
            li.className = task.completed ? "completed " + task.category.toLowerCase() : task.category.toLowerCase();
            li.innerHTML = `
                <span>${task.text} (${task.category})</span>
                <div>
                    <button class="complete" onclick="toggleComplete(${index})">✔</button>
                    <button class="edit" onclick="editTask(${index})">✏</button>
                    <button class="delete" onclick="deleteTask(${index})">🗑</button>
                </div>
            `;
            taskList.appendChild(li);
        }
    });
}
