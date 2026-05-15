const form = document.querySelector('#task-form');
const input = document.querySelector('#task-input');
const taskList = document.querySelector('#task-list');
const filter = document.querySelector('#filter');
const clearCompletedBtn = document.querySelector('#clear-completed');
const taskCount = document.querySelector('#task-count');

let tasks = [];

const renderTasks = () => {
  const mode = filter.value;
  const filtered = tasks.filter((task) => {
    if (mode === 'active') return !task.completed;
    if (mode === 'completed') return task.completed;
    return true;
  });

  taskList.innerHTML = '';

  filtered.forEach((task) => {
    const item = document.createElement('li');
    item.className = `task-item ${task.completed ? 'completed' : ''}`;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleTask(task.id));

    const title = document.createElement('span');
    title.className = 'task-title';
    title.textContent = task.title;

    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'delete';
    remove.textContent = 'Delete';
    remove.addEventListener('click', () => deleteTask(task.id));

    item.append(checkbox, title, remove);
    taskList.append(item);
  });

  const activeCount = tasks.filter((task) => !task.completed).length;
  taskCount.textContent = `${activeCount} active task${activeCount === 1 ? '' : 's'}`;
};

const addTask = (title) => {
  tasks.unshift({
    id: crypto.randomUUID(),
    title,
    completed: false,
  });
  renderTasks();
};

const toggleTask = (id) => {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task,
  );
  renderTasks();
};

const deleteTask = (id) => {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = input.value.trim();
  if (!title) return;
  addTask(title);
  input.value = '';
  input.focus();
});

filter.addEventListener('change', renderTasks);

clearCompletedBtn.addEventListener('click', () => {
  tasks = tasks.filter((task) => !task.completed);
  renderTasks();
});

renderTasks();
