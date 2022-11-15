require("dotenv").config();

const mongoose = require("mongoose");

const db = "toDo";

mongoose
  .connect(process.env.MONGODBSERVER, {
    //   .connect(`mongodb://localhost/${db}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Established connection with db - ${db}`))
  .catch((err) => console.log(err));
