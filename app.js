const mongoose = require('mongoose')
const errorHandler = require('./utility/errorHandler')
const ApiError = require('./utility/APIError')
const config = require('./configuration/config');
const router = require('./routes/index')

const app = config.app
const URL = config.MONGO_URI
const PORT = config.PORT


app.use('/api', router)

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    throw new ApiError(404, "Not found");
});

app.use(errorHandler)


mongoose.connect(URL, config.options)
    .then(() => {
        console.log(`Connection Established on Port ${PORT}`)
        app.listen(PORT)
    }).catch((err) => {
        console.error('Connection Failed')
        console.log(err)
    })

