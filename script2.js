// Array to store tasks (immutable state)
let tasks = [];

// Function to create task HTML element (pure function)
const createTaskElement = (task, index) => {
  const taskDiv = document.createElement('div');
  taskDiv.className = 'task';
  taskDiv.dataset.index = index;

  const taskDetails = document.createElement('div');
  taskDetails.className = 'details';
  taskDetails.innerHTML = `
    <h3>${task.title}</h3>
    <p>${task.description}</p>
  `;

  const editButton = createButton('Edit', 'edit', () => editTask(index));
  const deleteButton = createButton('Delete', '', () => deleteTask(index));

  taskDiv.appendChild(taskDetails);
  taskDiv.appendChild(editButton);
  taskDiv.appendChild(deleteButton);

  return taskDiv;
};

// Function to create a button element (pure function)
const createButton = (text, className, onClick) => {
  const button = document.createElement('button');
  button.textContent = text;
  button.className = className;
  button.onclick = onClick;
  return button;
};

// Higher-order function: render tasks using map() instead of loops (pure function)
const renderTasks = () => {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = ''; // Clear the list

  tasks.map((task, index) => {
    const taskElement = createTaskElement(task, index);
    taskList.appendChild(taskElement);
  });
};

// Higher-order function: add a task (pure function, using immutability)
const addTask = () => {
  const title = document.getElementById('taskTitle').value;
  const description = document.getElementById('taskDescription').value;

  if (isValidTask(title, description)) {
    tasks = [...tasks, { title, description, completed: false }]; // Immutability
    renderTasks();
    clearForm();
  } else {
    alert('Please fill out both fields!');
  }
};

// Validation function for tasks (pure function)
const isValidTask = (title, description) => title && description;

// Higher-order function: delete a task (pure function, using immutability)
const deleteTask = (index) => {
  tasks = tasks.filter((_, taskIndex) => taskIndex !== index); // Using filter instead of splice
  renderTasks();
};

// Function to edit a task (pure function, using immutability)
const editTask = (index) => {
  const newTitle = prompt('Enter new title:', tasks[index].title);
  const newDescription = prompt('Enter new description:', tasks[index].description);

  if (isValidTask(newTitle, newDescription)) {
    tasks = tasks.map((task, taskIndex) =>
      taskIndex === index ? { ...task, title: newTitle, description: newDescription } : task
    ); // Using map and immutability
    renderTasks();
  } else {
    alert('Both fields are required!');
  }
};

// Function to clear form fields (pure function)
const clearForm = () => {
  document.getElementById('taskTitle').value = '';
  document.getElementById('taskDescription').value = '';
};

// Recursive function to render tasks (replaces loops)
const renderTasksRecursively = (tasksArray, index = 0) => {
  if (index >= tasksArray.length) return;

  const taskElement = createTaskElement(tasksArray[index], index);
  document.getElementById('taskList').appendChild(taskElement);

  renderTasksRecursively(tasksArray, index + 1);
};

// Initial rendering using recursion (if we want to use the recursive function instead of map)
renderTasksRecursively(tasks);

// Usage of higher-order functions in the UI
document.getElementById('addTaskButton').onclick = addTask;
