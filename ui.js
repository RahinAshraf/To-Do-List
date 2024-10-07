function displayTasks(tasks) {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.text;
        li.dataset.id = task.id;
        if (task.completed) {
            li.classList.add('completed');
        }
        const button = document.createElement('button');
        button.textContent = 'Delete';
        li.appendChild(button);
        taskList.appendChild(li);
    });
}
