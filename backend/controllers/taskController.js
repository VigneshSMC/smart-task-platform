const Task = require('../models/Task')

exports.createTask = async (req, res) => {
    try {
        const { title, description, status, priority } = req.body
        console.log(req.user.id)
        const newTask = new Task({
            title, description, status, priority,
            assignedUser: req.user.id
        })

        const savedTask = await newTask.save()
        return res.status(201).json(savedTask)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.viewTask = async (req, res) => {
    try {

        let filter = {}

        if (req.user.role !== "admin") filter = { assignedUser: req.user.id }
        const tasks = await Task.find(filter)
            .populate('assignedUser', 'name email')
            .lean();

        return res.status(200).json(tasks);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const id = req.params.id

        const task = Task.findById(id)
        if (!task) return res.status(404).json({ message: "Task not found" })
        const { title, description, status, priority } = req.body
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { title, description, status, priority },
            {
                new: true,
                runValidators: true
            }
        ).populate('assignedUser', 'name email')
        res.status(200).json(updatedTask)
    }
    catch (error) {
        res.status(401).json({ error: error.message })
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const id = req.params.id
        const task = Task.findById(id)
        if (!task) return res.status(404).json({ message: "Task not found" })
        const updatedTask = await Task.findByIdAndDelete(id)
        res.status(200).json({ message: "deleted successfully", updatedTask })
    }
    catch (error) {
        res.status(401).json({ error: error.message })
    }
}