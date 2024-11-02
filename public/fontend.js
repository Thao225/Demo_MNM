const taskInput = document.getElementById('task');
const taskList = document.getElementById('taskList');
let tasks = []; // Mảng để lưu trữ danh sách công việc

function addTask() {
    const taskText = taskInput.value;
    if (taskText !== '') {
        tasks.push({ text: taskText, completed: false });
        renderTasks();
        taskInput.value = '';
    }
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.text;   

        // Thêm các nút sửa, xóa, đánh dấu hoàn thành vào đây
        taskList.appendChild(li);
    });
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.classList.add('task');
        li.innerHTML = `
            <span class="task-text">${task.text}</span>   

            <button class="delete" data-index="${index}">Xóa</button>
            <input type="checkbox" class="complete" ${task.completed ? 'checked' : ''}>
        `;
        taskList.appendChild(li);
    });

    // Xử lý sự kiện xóa
    const deleteButtons = document.querySelectorAll('.delete');
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const index = button.dataset.index;   

            tasks.splice(index, 1);
            renderTasks();
        });
    });

    // Xử lý sự kiện đánh dấu hoàn thành
    const checkboxes = document.querySelectorAll('.complete');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const index = checkbox.parentNode.querySelector('.delete').dataset.index;
            tasks[index].completed = checkbox.checked;
            renderTasks();
        });
    });
}