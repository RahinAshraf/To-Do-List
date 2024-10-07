// Load existing tasks from localStorage
let tasks = loadTasks();

// Function to add a new task with validation, logging, and feedback
function addTask(taskText) {
    console.log(`addTask: Attempting to add a new task with text: "${taskText}"`);
    
    // Validate taskText input
    if (!taskText || typeof taskText !== 'string' || taskText.trim() === '') {
        console.error('addTask: Invalid task text. Task text must be a non-empty string.');
        return;
    }

    // Create the new task object
    const task = {
        id: Date.now(),
        text: taskText.trim(),
        completed: false
    };

    // Add the task to the tasks array
    tasks.push(task);
    console.log('addTask: New task added:', task);

    // Save the updated tasks array
    saveTasks(tasks);
    console.log('addTask: Tasks saved successfully.');

    // Update the display
    displayTasks(tasks);
}

// Function to delete a task with confirmation, logging, and validation
function deleteTask(taskId) {
    console.log(`deleteTask: Attempting to delete task with ID: ${taskId}`);

    // Validate taskId input
    if (!taskId || typeof taskId !== 'number') {
        console.error('deleteTask: Invalid task ID. Task ID must be a number.');
        return;
    }

    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
        console.error(`deleteTask: Task with ID ${taskId} not found.`);
        return;
    }

    const confirmed = confirm(`Are you sure you want to delete the task: "${tasks[taskIndex].text}"?`);
    if (!confirmed) {
        console.log('deleteTask: Task deletion canceled.');
        return;
    }

    // Remove the task
    tasks = tasks.filter(task => task.id !== taskId);
    console.log(`deleteTask: Task with ID ${taskId} deleted successfully.`);

    // Save the updated tasks array
    saveTasks(tasks);
    console.log('deleteTask: Tasks saved successfully.');

    // Update the display
    displayTasks(tasks);
}

// Function to toggle task completion with logging and validation
function toggleTaskCompletion(taskId) {
    console.log(`toggleTaskCompletion: Attempting to toggle completion status for task with ID: ${taskId}`);

    // Validate taskId input
    if (!taskId || typeof taskId !== 'number') {
        console.error('toggleTaskCompletion: Invalid task ID. Task ID must be a number.');
        return;
    }

    // Find the task by ID
    const task = tasks.find(task => task.id === taskId);
    if (!task) {
        console.error(`toggleTaskCompletion: Task with ID ${taskId} not found.`);
        return;
    }

    // Toggle the completed status
    task.completed = !task.completed;
    console.log(`toggleTaskCompletion: Task with ID ${taskId} is now marked as ${task.completed ? 'completed' : 'incomplete'}.`);

    // Save the updated tasks array
    saveTasks(tasks);
    console.log('toggleTaskCompletion: Tasks saved successfully.');

    // Update the display
    displayTasks(tasks);
}

// Function to display tasks with user-friendly logging
function displayTasks(tasks) {
    console.log('displayTasks: Displaying tasks...');

    if (!tasks || tasks.length === 0) {
        console.log('displayTasks: No tasks available to display.');
        return;
    }

    tasks.forEach(task => {
        console.log(`Task ID: ${task.id}, Text: "${task.text}", Completed: ${task.completed}`);
        // Here, you'd implement your UI code to actually display the tasks
    });
}

// Function to clear all tasks with confirmation and logging
function clearAllTasks() {
    console.log('clearAllTasks: Attempting to clear all tasks.');

    const confirmed = confirm('Are you sure you want to clear all tasks? This action cannot be undone.');
    if (!confirmed) {
        console.log('clearAllTasks: Task clearing canceled.');
        return;
    }

    tasks = [];
    console.log('clearAllTasks: All tasks cleared.');

    saveTasks(tasks);
    console.log('clearAllTasks: Tasks saved successfully.');

    displayTasks(tasks);
}

// Function to edit an existing task's text
function editTask(taskId, newText) {
    console.log(`editTask: Attempting to edit task with ID: ${taskId}, new text: "${newText}"`);

    // Validate input
    if (!newText || typeof newText !== 'string' || newText.trim() === '') {
        console.error('editTask: Invalid new task text. Task text must be a non-empty string.');
        return;
    }

    if (!taskId || typeof taskId !== 'number') {
        console.error('editTask: Invalid task ID. Task ID must be a number.');
        return;
    }

    const task = tasks.find(task => task.id === taskId);
    if (!task) {
        console.error(`editTask: Task with ID ${taskId} not found.`);
        return;
    }

    task.text = newText.trim();
    console.log(`editTask: Task with ID ${taskId} updated to: "${task.text}"`);

    saveTasks(tasks);
    console.log('editTask: Tasks saved successfully.');

    displayTasks(tasks);
}

// Initial display of tasks on page load
displayTasks(tasks);

// Example: Adding some event listeners for task actions (assuming you have buttons in your UI)
document.querySelector('#addTaskButton').addEventListener('click', () => {
    const taskText = document.querySelector('#taskInput').value;
    addTask(taskText);
});

document.querySelector('#clearTasksButton').addEventListener('click', () => {
    clearAllTasks();
});
