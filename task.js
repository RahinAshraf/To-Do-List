let tasks = loadTasks();

function addTask(taskText) {
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };
    tasks.push(task);
    saveTasks(tasks);
    displayTasks(tasks);
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id != taskId);
    saveTasks(tasks);
    displayTasks(tasks);
}

function toggleTaskCompletion(taskId) {
    const task = tasks.find(task => task.id == taskId);
    task.completed = !task.completed;
    saveTasks(tasks);
    displayTasks(tasks);
}

// Initial display of tasks
displayTasks(tasks);
