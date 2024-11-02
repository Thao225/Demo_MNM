// const taskInput = document.getElementById('task');
// const taskList = document.getElementById('taskList');
// let tasks = []; // Mảng để lưu trữ danh sách công việc

// function addTask() {
//     const taskText = taskInput.value;
//     if (taskText !== '') {
//         tasks.push({ text: taskText, completed: false });
//         renderTasks();
//         taskInput.value = '';
//     }
// }

// function renderTasks() {
//     taskList.innerHTML = '';
//     tasks.forEach(task => {
//         const li = document.createElement('li');
//         li.textContent = task.text;   

//         // Thêm các nút sửa, xóa, đánh dấu hoàn thành vào đây
//         taskList.appendChild(li);
//     });
// }

// function renderTasks() {
//     taskList.innerHTML = '';
//     tasks.forEach((task, index) => {
//         const li = document.createElement('li');
//         li.classList.add('task');
//         li.innerHTML = `
//             <span class="task-text">${task.text}</span>   

//             <button class="delete" data-index="${index}">Xóa</button>
//             <input type="checkbox" class="complete" ${task.completed ? 'checked' : ''}>
//         `;
//         taskList.appendChild(li);
//     });

//     // Xử lý sự kiện xóa
//     const deleteButtons = document.querySelectorAll('.delete');
//     deleteButtons.forEach(button => {
//         button.addEventListener('click', () => {
//             const index = button.dataset.index;   

//             tasks.splice(index, 1);
//             renderTasks();
//         });
//     });

//     // Xử lý sự kiện đánh dấu hoàn thành
//     const checkboxes = document.querySelectorAll('.complete');
//     checkboxes.forEach(checkbox => {
//         checkbox.addEventListener('change', () => {
//             const index = checkbox.parentNode.querySelector('.delete').dataset.index;
//             tasks[index].completed = checkbox.checked;
//             renderTasks();
//         });
//     });
// }

function loadData(){
    var myListContent ="";
    //gọi API trả dữ liệu bằng hàng fetch
    fetch('https://thao225.github.io/Demo_MNM/public/')
    .then(response => response.json())
    .then(todos => {
    // Hiển thị danh sách công việc lên giao diện
    })
    .catch(error => console.error('Error:', error));
    // Thêm một công việc mới
    fetch('https://thao225.github.io/Demo_MNM/public/', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({ task: 'Learn Fetch API' })
    })
    .then(response => response.json())
    .then(todo => console.log('Todo created:', todo))
    .catch(error => console.error('Error:', error));
}

loadData();