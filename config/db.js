const mongoose = require("mongoose");
const mongoUrl = 'mongodb://localhost:27017/Noapp';

const connectDB = () => {
    mongoose
        .connect(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then((res) => {
            console.log('Connected to database successfully');

        })
        .catch(err => console.error(err));
}

module.exports = connectDB;
