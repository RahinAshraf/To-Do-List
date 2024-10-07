document.getElementById('add-task-btn').addEventListener('click', () => {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();
    if (taskText) {
        addTask(taskText);
        taskInput.value = '';
    }
});

document.getElementById('task-list').addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const taskId = e.target.parentElement.dataset.id;
        deleteTask(taskId);
    } else if (e.target.tagName === 'LI') {
        const taskId = e.target.dataset.id;
        toggleTaskCompletion(taskId);
    }
});
