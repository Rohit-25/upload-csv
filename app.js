const express = require("express");
const app = express()
const connectDB = require('./config/db')

const port = 6000;
connectDB();

app.get('/', (req, res) => {
    res.send("hey");
})

app.use('/api/uploadcsv', require("./routes/uploadcsv.routes"))

app.listen(port, () => {
    console.log(`connected to port ${port}`)
})
