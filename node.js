fetch('http://127.0.0.1:5500/fontend.html')
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect(); 
    const database = client.db('task_manager');
    const collection = database.collection('tasks');

    // Insert one document
    const doc = {
      title: "Hoàn thành báo cáo hàng tháng",
      // ... các trường khác
    };
    const result = await collection.insertOne(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } finally {
    await client.close();   

  }
}
run().catch(console.dir);
await collection.createIndex({ title: 1 });
await collection.createIndex({ completed: 1 });

const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;


// Middleware để parse JSON
app.use(express.json());

// GET /tasks
app.get('/tasks', async (req, res) => {
    try {
        await client.connect();
        const tasks = await collection.find().toArray();
        res.json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching tasks' });
    } finally {
        await client.close();
    }
});

// POST /tasks
app.post('/tasks', async (req, res) => {
    try {
        await client.connect();
        const result = await collection.insertOne(req.body);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating task' });
    } finally {
        await client.close();
    }
});

// PUT /tasks/:id
app.put('/tasks/:id', async (req, res) => {
    try {
        await client.connect();
        const { id } = req.params;
        const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: req.body });
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating task' });
    } finally {
        await client.close();
    }
});

// DELETE /tasks/:id
app.delete('/tasks/:id', async (req, res) => {
    try {
        await client.connect();
        const { id } = req.params;
        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting task' });
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});