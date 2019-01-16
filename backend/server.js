require('dotenv').config()

const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const router = require('./Routes/route');
const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router)


app.listen(3002, (err) => {
    console.log('Server error port 3002')
})

