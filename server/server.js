const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Task = require("./models/Task");

const app = express();
const PORT =  5000;

app.use(cors());
app.use(express.json());


mongoose.connect("mongodb://25eg505t04_db_user:Oml5myoknsAozcup@ac-df7wi5t-shard-00-00.p8amehd.mongodb.net:27017,ac-df7wi5t-shard-00-01.p8amehd.mongodb.net:27017,ac-df7wi5t-shard-00-02.p8amehd.mongodb.net:27017/?ssl=true&replicaSet=atlas-pmvrid-shard-0&authSource=admin&appName=Cluster0")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


// GET all tasks
app.get("/tasks", async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});


// POST new task
app.post("/tasks", async (req, res) => {
    const task = new Task({
        text: req.body.text
    });

    const savedTask = await task.save();
    res.json(savedTask);
});


// DELETE task
app.delete("/tasks/:id", async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
});


// TOGGLE completed
app.put("/tasks/:id", async (req, res) => {
    const task = await Task.findById(req.params.id);

    task.completed = !task.completed;

    const updatedTask = await task.save();

    res.json(updatedTask);
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});