// Array to store tasks
let tasks = [];

// Function to render tasks
function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = ''; // Clear the list

  tasks.forEach((task, index) => {
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task';

    const taskDetails = document.createElement('div');
    taskDetails.className = 'details';
    taskDetails.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description}</p>
    `;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteTask(index);

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'edit';
    editButton.onclick = () => editTask(index);

    taskDiv.appendChild(taskDetails);
    taskDiv.appendChild(editButton);
    taskDiv.appendChild(deleteButton);

    taskList.appendChild(taskDiv);
  });
}

// Function to add a task
function addTask() {
  const title = document.getElementById('taskTitle').value;
  const description = document.getElementById('taskDescription').value;

  if (title && description) {
    tasks.push({ title, description, completed: false });
    renderTasks();
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDescription').value = '';
  } else {
    alert('Please fill out both fields!');
  }
}

// Function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Function to edit a task
function editTask(index) {
  const newTitle = prompt('Enter new title:', tasks[index].title);
  const newDescription = prompt('Enter new description:', tasks[index].description);

  if (newTitle && newDescription) {
    tasks[index].title = newTitle;
    tasks[index].description = newDescription;
    renderTasks();
  } else {
    alert('Both fields are required!');
  }
}

// Initial rendering
renderTasks();
