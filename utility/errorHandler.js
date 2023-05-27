const errorHandler = (error, req, res, next) => {
    console.clear()
    console.log(error.response)
    console.log(error.message)
    return res.status(error.statusCode).send({
        message: error.message,
        errors: JSON.stringify(error.response)
    })
}

module.exports = errorHandler