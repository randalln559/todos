const ToDoUser = require('../models/toDoUser.models');

module.exports = {

    login: (req, res) => {
        let { email, psw } = req.query;
        ToDoUser.findOne({ email })
            .then(user => {
                user === 'null' ? res.json({ message: "Login Failed" })
                    : user && user.psw !== psw ? res.json({ message: "Login Failed" })
                        : user.psw !== psw ? res.json({ message: "Login Failed1" })
                            : res.json({ message: "Login Successfull", data: user })
            })
            .catch(err => res.json('Error: ' + err));
    },

    findOne: (req, res) => {
        ToDoUser.findById({ _id: req.params._id })
            .then(oneReminder => res.json(oneReminder))
            .catch(err => res.json(err))
    },

    create: (req, res) => {
        ToDoUser.create(req.body)
            .then(data => res.json(data))
            .catch(err => res.json(err))
    },

    update: (req, res) => {
        ToDoUser.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true, runValidators: true })
            .then(data => {
                data.todosList.push(req.body)
                data.save()
                res.json(data)
            })
            .catch(err => res.json('Error: ' + err));
    },

    updateTodo: (req, res) => {
        ToDoUser.findOne({ _id: req.params._id })
            .then((data) => {
                data.todosList = req.body
                data.save()
                res.json(data.todosList)
            })
            .catch(err => res.json('Error: ' + err));
    },

    delete: (req, res) => {
        ToDoUser.findOne({ _id: req.params._id })
            .then(data => {
                data.todosList = req.body
                data.save()
                res.json(data.todosList)
            })
            .catch(err => console.log(err));
    }

}