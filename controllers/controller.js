const inc = (init = 0) => () => ++init;
const getId = inc()
const tasks = [
    { id: getId(), title: 'dsg', name: 'Create task', done: false, listId: 1 },
    { id: getId(), title: 'dsg', name: 'Create task', done: false, listId: 2 },
    { id: getId(), title: 'dsg', name: 'Create task', done: false, listId: 2 }]
const lists = [
    { id: 1, name: "A" },
    { id: 2, name: "B" },
]

const createTask = data => {
    return {
        id: getId(),
        title: data.title,
        name: data.name,
        done: false,
        listId: data.listId
    }
}
const createTaskById = data => {
    return {
        id: getId(),
        title: data.title,
        name: data.name,
        done: false,
        listId: parseInt(data.params.listId)
    }
}
function replace(id, data) {

    return {
        id: id,
        title: data.title,
        name: data.name,
        done: false
    }
}
class Controller {
    creat(req, res) {
        const task = createTask(req.body)
        tasks.push(task);
        res.status(201).json(task);

    }
    creatById(req, res) {
        const task = createTaskById(req)
        tasks.push(task);
        res.status(201).json(task);

    }
    read(req, res) {
        res.json(tasks);
    }
    readById(req, res) {

        const listId = parseInt(req.params.listId);
        let list = tasks.filter(task => task.listId == listId);
        if (list.length !== 0) {
            res.json(list)
        } else {
            res.status(404).json({ error: 'List not found' })
        }
    }
    update(req, res) {
        const taskId = parseInt(req.params.id)
        const task = tasks.find(t => t.id === taskId)
        if (task) {
            Object.assign(task, req.body)
            res.json(task)
        } else {
            res.status(404).json({ error: 'Task not found' })
        }
    }
    replace(req, res) {
        const taskId = parseInt(req.params.id)
        const task = tasks.find(t => t.id === taskId)
        if (task) {
            tasks[taskId - 1] = replace(taskId, req.body)
            res.json(task)
        } else {
            res.status(404).json({ error: 'Task not found' })
        }
    }
    delete(req, res) {
        const taskId = parseInt(req.params.id)
        const task = tasks.find(t => t.id === taskId)
        if (task) {
            tasks.splice(taskId - 1, 1)
            res.status(202).json(task)
        } else {
            res.status(404).json({ error: 'Task not found' })
        }
    }
}

module.exports = new Controller()
