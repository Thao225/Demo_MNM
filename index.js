import express from 'express';
import { Schema, model, connect } from 'mongoose';
import path from 'path';
// var path = require('path');
const app = express();
const port = 3000;
await connect('mongodb://localhost:27017/todo-app');
// mongoose.connection.on("connected",function(){
//     console.log("Connected to database")
// })
// mongoose.connection.on("disconnected",function(){
//     console.log("Disconnected to database")
// })
try {
    // Kết nối tới cụm MongoDB
    await client.connect();
    console.log('Đã kết nối thành công đến cụm MongoDB');
    // Gọi các hàm truy vấn cơ sở dữ liệu ở đây
    await listDatabases(client);
    // Ngắt kết nối với cụm MongoDB
    await client.close();
    console.log('Đã ngắt kết nối với cụm MongoDB');
  } 
    catch (error) {
    console.error('Đã xảy ra lỗi:', error);
  }

const taskSchema = new Schema({
    task: String,
    isCompleted: Boolean,
    isDelete: Boolean,
    createdAt: { type: Date, default: Date.now }
});

// const Task = mongoose.model('Task', taskSchema);

//Kiểm tra hoạt động server
app.get('/test', function(request, response) {
    console.log("Received 'test' request");
    response.status(200).json({"message":"Success"});
});
//Lưu trữ dữ liệu lện mongodb
app.post("/tasks",function(request, response){
    console.log("Received 'create tasks data' request");
    //lấy dữ liệu từ query của request:
    var newTask = new Task({
        task: request.query.task,
        isCompleted: request.query.isCompleted,
        isDelete: request.query.isDelete
    });
    //Lưu
    newTask.save(function(err){
        //xuất thông báo ra console và phản hồi về client
        if (!err) {
            console.log('Saved new task data');
            response.status(200).json({'message':'Success'});      
        }
        else {
            console.log('No save new task data');
            response.status(400).json({'message':'Error'});      
        }
    });
});

//lấy dữ liệu từ mongodb
app.get('/tasks', (req, res) => {
    console.log('Get task data');
  });

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
      res.status(404).json({ message: 'Task not found'});
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
      res.status(404).json({ message: 'Task not found' });
    }
  });
  
  // Route để xóa một task
  app.delete('/tasks/:id', (req, res) => {
    const id = req.params.id;
    tasks = tasks.filter(task => task.id !== id);
    res.json({ message: 'Task deleted' });
  });


  //Khsi báo thư mục chứa web
  app.use(express.static('public'));
  
  //Sever bắt đầu lắng nghe các request từ client
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });






//   // Gửi yêu cầu để lấy danh sách công việc
// fetch('/api/todos')
// .then(response => response.json())
// .then(todos => {
//   // Hiển thị danh sách công việc lên giao diện
// })
// .catch(error => console.error('Error:', error));

// // Thêm một công việc mới
// fetch('/api/todos', {
// method: 'POST',
// headers: {
//   'Content-Type': 'application/json'
// },
// body: JSON.stringify({ task: 'Learn Fetch API' })
// })
// .then(response => response.json())
// .then(todo => console.log('Todo created:', todo))
// .catch(error => console.error('Error:', error));
