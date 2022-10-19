const mongoose = require('mongoose');

const db = 'toDo';

mongoose.connect(`mongodb://localhost/${db}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log(`Established connection with db - ${db}`))
    .catch(err => console.log(err));

