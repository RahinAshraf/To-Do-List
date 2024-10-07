// Function to save tasks to local storage with additional logging and validation
function saveTasks(tasks) {
    // Check if tasks is a valid array
    if (!Array.isArray(tasks)) {
        console.error('saveTasks: Invalid data type. Expected an array.');
        return;
    }
    
    // Check for empty array
    if (tasks.length === 0) {
        console.warn('saveTasks: No tasks to save. The tasks array is empty.');
    } else {
        console.log(`saveTasks: Saving ${tasks.length} task(s) to localStorage.`);
    }

    // Save tasks to localStorage
    try {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        console.log('saveTasks: Tasks successfully saved to localStorage.');
    } catch (error) {
        console.error('saveTasks: Error saving tasks to localStorage.', error);
    }
}

// Function to load tasks from local storage with error handling
function loadTasks() {
    console.log('loadTasks: Attempting to load tasks from localStorage.');
    
    // Try to retrieve tasks from localStorage
    try {
        const tasks = localStorage.getItem('tasks');
        
        // If tasks exist, parse them. Otherwise, return an empty array
        if (tasks) {
            const parsedTasks = JSON.parse(tasks);
            console.log(`loadTasks: Successfully loaded ${parsedTasks.length} task(s) from localStorage.`);
            return parsedTasks;
        } else {
            console.warn('loadTasks: No tasks found in localStorage. Returning an empty array.');
            return [];
        }
    } catch (error) {
        console.error('loadTasks: Error loading or parsing tasks from localStorage.', error);
        return [];
    }
}

// Function to clear tasks from local storage with confirmation and logging
function clearTasks() {
    console.log('clearTasks: Attempting to clear tasks from localStorage.');

    // Check if there are any tasks to clear
    const tasks = localStorage.getItem('tasks');
    if (!tasks) {
        console.warn('clearTasks: No tasks to clear in localStorage.');
        return;
    }
    
    // Attempt to remove tasks
    try {
        localStorage.removeItem('tasks');
        console.log('clearTasks: Tasks successfully cleared from localStorage.');
    } catch (error) {
        console.error('clearTasks: Error clearing tasks from localStorage.', error);
    }
}

// Utility function to check if localStorage is available
function isLocalStorageAvailable() {
    console.log('isLocalStorageAvailable: Checking if localStorage is available.');
    try {
        const test = '__test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        console.log('isLocalStorageAvailable: localStorage is available.');
        return true;
    } catch (error) {
        console.error('isLocalStorageAvailable: localStorage is not available.', error);
        return false;
    }
}

// Example usage of the functions
if (isLocalStorageAvailable()) {
    const myTasks = [
        { id: 1, title: 'Task 1', completed: false },
        { id: 2, title: 'Task 2', completed: true },
    ];

    saveTasks(myTasks);

    const loadedTasks = loadTasks();
    console.log('Loaded Tasks:', loadedTasks);

    clearTasks();
}
