// Event listener for adding a new task when the "Add Task" button is clicked
document.getElementById('add-task-btn').addEventListener('click', () => {
    const taskInput = document.getElementById('task-input');
    const prioritySelect = document.getElementById('priority-select');
    const taskText = taskInput.value.trim();
    const priority = prioritySelect.value;

    if (taskText) {
        addTask(taskText, priority); // Add the task with text and priority
        taskInput.value = ''; // Clear the input field after task is added
        prioritySelect.value = 'low'; // Reset the priority to default (e.g., low)
    }
});

// Event listener for handling task actions (delete, toggle complete, and edit)
document.getElementById('task-list').addEventListener('click', (e) => {
    const targetElement = e.target;

    if (targetElement.tagName === 'BUTTON') {
        const taskId = targetElement.parentElement.dataset.id;

        // Check if it's a delete or edit button
        if (targetElement.classList.contains('delete-btn')) {
            deleteTask(taskId); // Delete task
        } else if (targetElement.classList.contains('edit-btn')) {
            const taskTextElement = targetElement.parentElement.querySelector('span');
            const newTaskText = prompt("Edit task:", taskTextElement.textContent);

            if (newTaskText !== null && newTaskText.trim()) {
                editTask(taskId, newTaskText.trim()); // Edit task with new text
            }
        }
    } else if (targetElement.tagName === 'LI') {
        const taskId = targetElement.dataset.id;
        toggleTaskCompletion(taskId); // Mark task as completed or incomplete
    }
});

// Event listener for keyboard shortcuts (e.g., "Enter" to add a task)
document.getElementById('task-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const taskInput = document.getElementById('task-input');
        const taskText = taskInput.value.trim();

        if (taskText) {
            addTask(taskText); // Add task on "Enter" key press
            taskInput.value = ''; // Clear input
        }
    }
});

// Drag-and-drop functionality to reorder tasks
document.getElementById('task-list').addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'LI') {
        e.target.classList.add('dragging');
    }
});

document.getElementById('task-list').addEventListener('dragend', (e) => {
    if (e.target.tagName === 'LI') {
        e.target.classList.remove('dragging');
        reorderTasks(); // Reorder tasks after dragging
    }
});

document.getElementById('task-list').addEventListener('dragover', (e) => {
    e.preventDefault();
    const draggingTask = document.querySelector('.dragging');
    const afterElement = getDragAfterElement(e.clientY);
    const taskList = document.getElementById('task-list');

    if (afterElement === null) {
        taskList.appendChild(draggingTask); // Move the task to the end of the list if no element is after
    } else {
        taskList.insertBefore(draggingTask, afterElement); // Insert before the determined element
    }
});

// Helper function to determine the element after which the dragged item should be placed
function getDragAfterElement(y) {
    const taskItems = [...document.querySelectorAll('#task-list li:not(.dragging)')];

    return taskItems.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// Function to add a new task with a priority level
function addTask(taskText, priority = 'low') {
    const taskList = document.getElementById('task-list');
    const taskId = generateUniqueId(); // Generate a unique ID for each task

    const taskItem = document.createElement('li');
    taskItem.textContent = `${taskText} (Priority: ${priority})`;
    taskItem.setAttribute('data-id', taskId);
    taskItem.setAttribute('draggable', true); // Enable drag-and-drop for the task
    taskItem.classList.add(priority); // Add priority class for styling (e.g., 'low', 'medium', 'high')

    // Add edit and delete buttons
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit-btn');

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');

    taskItem.appendChild(editBtn);
    taskItem.appendChild(deleteBtn);
    taskList.appendChild(taskItem);
}

// Function to generate a unique ID for tasks
function generateUniqueId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

// Function to delete a task by ID
function deleteTask(taskId) {
    const taskItem = document.querySelector(`[data-id="${taskId}"]`);
    if (taskItem) {
        taskItem.remove(); // Remove the task from the DOM
        console.log(`Task ${taskId} deleted.`);
    }
}

// Function to toggle task completion status
function toggleTaskCompletion(taskId) {
    const taskItem = document.querySelector(`[data-id="${taskId}"]`);
    if (taskItem) {
        taskItem.classList.toggle('completed'); // Add or remove the 'completed' class for styling
        console.log(`Task ${taskId} marked as ${taskItem.classList.contains('completed') ? 'completed' : 'incomplete'}.`);
    }
}

// Function to edit a task's text
function editTask(taskId, newTaskText) {
    const taskItem = document.querySelector(`[data-id="${taskId}"]`);
    if (taskItem) {
        const taskPriority = taskItem.classList.contains('high') ? 'high' :
                            taskItem.classList.contains('medium') ? 'medium' : 'low';
        taskItem.textContent = `${newTaskText} (Priority: ${taskPriority})`; // Update task text and priority

        // Re-add the edit and delete buttons after editing
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit-btn');

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');

        taskItem.appendChild(editBtn);
        taskItem.appendChild(deleteBtn);

        console.log(`Task ${taskId} edited.`);
    }
}

// Function to reorder tasks based on their new order after drag-and-drop
function reorderTasks() {
    const tasks = [...document.querySelectorAll('#task-list li')];
    tasks.forEach((task, index) => {
        task.dataset.order = index; // Update the data attribute to reflect the new order
    });
    console.log("Tasks reordered.");
}

// Function to initialize the task manager (e.g., loading tasks from storage, setting up initial event listeners)
function initializeTaskManager() {
    // Load tasks from local storage or other sources here
    console.log("Task manager initialized.");

    // Example: Set up initial tasks or load from storage
    const initialTasks = [
        { text: 'Buy groceries', priority: 'medium' },
        { text: 'Finish project', priority: 'high' },
        { text: 'Exercise', priority: 'low' }
    ];
    initialTasks.forEach(task => addTask(task.text, task.priority));
}

// Run the task manager when the page is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeTaskManager(); // Initialize the task manager
});
