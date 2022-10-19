const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

require('./config/toDo.config');

app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cors());

const Routes = require('./routes/todo.routes');

Routes(app);

const port = 8080;

app.listen(port, () => console.log(`Server is running on port ${port}`));