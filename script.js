// Run after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks on page load
    loadTasks();

    // Add event listeners
    addButton.addEventListener('click', () => {
        const text = taskInput.value.trim();
        if (text === "") {
            alert("Please enter a task.");
            return;
        }
        addTask(text, true); // save to Local Storage
        taskInput.value = "";
    });

    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            const text = taskInput.value.trim();
            if (text === "") {
                alert("Please enter a task.");
                return;
            }
            addTask(text, true); // save to Local Storage
            taskInput.value = "";
        }
    });

    // Create and append a task item
    function addTask(taskText, save = true) {
        // Create list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn');

        // Removal logic: update DOM and Local Storage
        removeButton.onclick = function () {
            taskList.removeChild(li);
            removeTaskFromStorage(taskText);
        };

        // Build DOM
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Persist to Local Storage (optional when loading)
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    // Load tasks from Local Storage and render them
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // don't re-save
    }

    // Remove a single task from Local Storage
    function removeTaskFromStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        // Remove only one matching entry (handles duplicates gracefully)
        const index = storedTasks.indexOf(taskText);
        if (index > -1) {
            storedTasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }
});
