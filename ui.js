function displayTasks(tasks) {
    const taskList = document.getElementById('task-list');
    
    // Clear the current task list display
    taskList.innerHTML = '';
    
    if (!tasks || tasks.length === 0) {
        // Display a message if there are no tasks
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'No tasks to display. Add some tasks!';
        taskList.appendChild(emptyMessage);
        return;
    }

    tasks.forEach(task => {
        // Create a list item (li) for each task
        const li = document.createElement('li');
        li.classList.add('task-item');
        li.dataset.id = task.id;

        // Task content container (div for better structure)
        const taskContent = document.createElement('div');
        taskContent.classList.add('task-content');

        // Task text (span for better structure and possible editing)
        const taskText = document.createElement('span');
        taskText.classList.add('task-text');
        taskText.textContent = task.text;
        taskText.title = `Created: ${new Date(task.id).toLocaleString()}`;
        
        // Apply the completed class if task is completed
        if (task.completed) {
            li.classList.add('completed');
            taskText.classList.add('task-completed');
        }

        // Task added date (display formatted date/time for when the task was created)
        const taskDate = document.createElement('span');
        taskDate.classList.add('task-date');
        taskDate.textContent = `Added on: ${new Date(task.id).toLocaleDateString()} ${new Date(task.id).toLocaleTimeString()}`;

        // Edit button
        const editButton = document.createElement('button');
        editButton.classList.add('edit-btn');
        editButton.textContent = 'Edit';
        editButton.setAttribute('aria-label', `Edit task: ${task.text}`);
        editButton.addEventListener('click', () => editTask(task.id));

        // Completion toggle button
        const toggleButton = document.createElement('button');
        toggleButton.classList.add('toggle-btn');
        toggleButton.textContent = task.completed ? 'Mark Incomplete' : 'Mark Complete';
        toggleButton.setAttribute('aria-label', `Toggle completion for task: ${task.text}`);
        toggleButton.addEventListener('click', () => toggleTaskCompletion(task.id));

        // Delete button
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.textContent = 'Delete';
        deleteButton.setAttribute('aria-label', `Delete task: ${task.text}`);
        deleteButton.addEventListener('click', () => deleteTask(task.id));

        // Append task text and buttons to the task content container
        taskContent.appendChild(taskText);
        taskContent.appendChild(taskDate);
        taskContent.appendChild(editButton);
        taskContent.appendChild(toggleButton);
        taskContent.appendChild(deleteButton);

        // Append task content to the list item (li)
        li.appendChild(taskContent);

        // Append the list item to the task list
        taskList.appendChild(li);
    });
}

// Helper function to handle task editing
function editTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) {
        console.error(`editTask: Task with ID ${taskId} not found.`);
        return;
    }

    const newText = prompt('Edit Task', task.text);
    if (newText && newText.trim() !== '') {
        task.text = newText.trim();
        saveTasks(tasks);
        displayTasks(tasks);
    }
}
