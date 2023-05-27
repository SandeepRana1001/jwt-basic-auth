const express = require('express')
const dotenv = require('dotenv')
const helmet = require('helmet')
const cors = require('cors')

dotenv.config()
const app = express()

// app.use(helmet())


app.use(express.json())

app.use(express.urlencoded({ extended: true }))

// enable cors
app.use(cors());
app.options("*", cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    next();
});


const MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT || 8001
const SECRET = process.env.SECRET_KEY

module.exports = {
    app,
    MONGO_URI,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    PORT,
    SECRET
}
