const { validationResult } = require('express-validator');

const { USER_SERVICES } = require('../services/index.service')
const ApiError = require('../utility/APIError')
const userService = new USER_SERVICES()

class Controller {

    register = async (req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            throw new ApiError(422, 'Invalid inputs passed , please check your Data ', true, errors.errors)
        }

        const { name, email, password } = req.body

        const user = await userService.registerUser(name, email, password)
        console.log(user)

        res.status(200).json({
            state: true,
            response: 'User Registered successfully',
            user
        })
    }

    login = async (req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            throw new ApiError(422, 'Invalid inputs passed , please check your Data ', true, errors.errors)
        }

        const { email, password } = req.body

        const user = await userService.loginUser(email, password)

        res.status(200).json({
            state: true,
            response: 'User Logged In successfully',
            user
        })
    }

    getAllUsers = async (req, res, next) => {
        const users = await userService.getAllUsers()
        res.status(200).json({
            state: true,
            response: 'All Users were fetched successfully',
            users,
            token: req.token,
            refreshToken: req.refreshToken
        })
    }

}

module.exports = Controller