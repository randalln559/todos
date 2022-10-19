const Controller = require('../controllers/toDoUser.controller');

module.exports = app => {
    app.get("/api/login", Controller.login)
    app.get("/api/:_id", Controller.findOne)
    app.post('/api/create', Controller.create);
    app.put('/api/:_id', Controller.update);
    app.put('/api/todoList/:_id', Controller.updateTodo);
    app.put('/delete/:_id', Controller.delete);
}