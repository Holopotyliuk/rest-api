const express = require('express');
const app = express();
app.use(express.json());

function logRequest({ method, url }, res, next) {
    console.log(`[${new Date().toISOString()}] ${method} ${url}`)
    next();
}

app.use(logRequest)
const inc = (init = 0) => () => ++init;
const getId = inc()
const tasks = [
    { id: getId(), title: 'Task', name: 'Get tasks' },
    { id: getId(), title: 'Task', name: 'Create task' }]
const createTask = data => {
    return {
        id: getId(),
        title: data.title,
        name: data.name,
        done: false
    }
}
app.get('/tasks', (req, res) => res.json(tasks))
app.post('/tasks', (req, res) => {
    const task = createTask(req.body)
    tasks.push(task);
    res.json(task);
})
app.patch('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id)
    const taskToUpdate = tasks.find(task => task.id === taskId)
    if (taskToUpdate) {
        Object.assign(taskToUpdate, req.body);
        res.json(taskToUpdate)
    } else {
        res.status(404).json({ error: 'Task not found' })
    }
})
const port = 4000
app.listen(port, () => {
    console.log(`Server started at localhost:${port}`)
})
//curl localhost:4000/tasks -d '{"name":"Delete task"}' -H "Content-Type: application/json"
//http :4000/tasks name="New Tasks"
//curl -X PATCH localhost:4000/tasks/1 -d '{"name":"Delete task"}' -H 'Content-Type: application/json'