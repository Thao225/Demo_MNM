const mongoose = require('mongoose');   


mongoose.connect('mongodb://localhost/todo-app', { useNewUrlParser: true, useUnifiedTopology: true });
const mongoose = require('mongoose');
mongoose.connection.on("connected",function(){
    console.log("Connected to database")
})
const taskSchema = new mongoose.Schema({
    task: String,
    isCompleted: Boolean,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', taskSchema);
const express = require('express');
const Task = require('./models/Task');

const app = express();
const port = 3000;
let tasks = [];

app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});
// Route để lấy danh sách tất cả các tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
  });
  
  // Route để tạo một task mới
  app.post('/tasks', (req, res) => {
    const newTask = req.body;
    tasks.push(newTask);
    res.json(newTask);
  });
  
  // Route để lấy thông tin một task cụ thể
  app.get('/tasks/:id', (req, res) => {
    const id = req.params.id;
    const task = tasks.find(task => task.id === id);
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ message: 'Task not found'   
   });
    }
  });
  
  // Route để cập nhật thông tin một task
  app.put('/tasks/:id', (req, res) => {
    const id = req.params.id;
    const updatedTask = req.body;
    const index = tasks.findIndex(task => task.id === id);
    if (index !== -1) {
      tasks[index] = { ...tasks[index], ...updatedTask };
      res.json(tasks[index]);
    } else {
      res.status(404).json({ message: 'Task not found'   
   });
    }
  });
  
  // Route để xóa một task
  app.delete('/tasks/:id', (req, res) => {
    const id = req.params.id;
    tasks = tasks.filter(task => task.id !== id);
    res.json({ message: 'Task deleted' });
  });
  
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });


  // Gửi yêu cầu để lấy danh sách công việc
fetch('/api/todos')
.then(response => response.json())
.then(todos => {
  // Hiển thị danh sách công việc lên giao diện
})
.catch(error => console.error('Error:', error));

// Thêm một công việc mới
fetch('/api/todos', {
method: 'POST',
headers: {
  'Content-Type': 'application/json'
},
body: JSON.stringify({ task: 'Learn Fetch API' })
})
.then(response => response.json())
.then(todo => console.log('Todo created:', todo))
.catch(error => console.error('Error:', error));