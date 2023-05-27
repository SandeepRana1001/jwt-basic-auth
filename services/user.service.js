const bcrypt = require('bcrypt');
const { User } = require('../model/index.model');
const ApiError = require('../utility/APIError');
const TOKEN_UTILS = require('../utility/token')
const token_utility = new TOKEN_UTILS()

class UserServices {

    constructor() {
        this.SALT_ROUNDS = 10
    }

    /**
     * 
     * @param {string} id - ID of the user to search with 
     * @returns {Object} user - User if found, null if not found
    */

    getUserById = async (id) => {
        let user;
        try {
            user = await User.findById({ _id: id })
        } catch (err) {
            throw new ApiError(500, 'Internal Server Error')
        }
        return user
    }

    /**
     * 
     * @param {string} feature - Search by which field . Ex: email,id,name,password 
     * @param {string} value - value to search for  
     * @returns {Object} user - User if found, null if not found
     */

    getUserByFeature = async (feature, value) => {
        let user;
        try {
            user = await User.findOne({ [feature]: value })
        } catch (err) {
            throw new ApiError(500, 'Internal Server Error')
        }
        return user
    }


    /**
        * Will fetch all users from the system 
        * @returns {Array_Of_Objects} user - List of users found. 
        * @note Password won't be present for any user
    */

    getAllUsers = async () => {
        let users = await User.find({}).select('-password');
        return users
    }

    /**
     * Add a new user to the database
     * @param {string} name - Name of the user to be registered 
     * @param {string} email - Email of the user to be registered 
     * @param {string} password - password of the user to be registered 
     * @returns {object} user - user created 
     */

    registerUser = async (name, email, password) => {
        const existingUser = await this.getUserByFeature('email', email)
        if (existingUser) {
            throw new ApiError(401, 'User Already Registered.')
        }

        const newPassword = await bcrypt.hash(password, this.SALT_ROUNDS)

        const user = await User.create({
            name,
            email,
            password: newPassword
        })

        return {
            _id: user._id,
            name,
            email
        }
    }

    /**
     * Authenticate a user and send the response
     * @param {string} email  - Email of the user
     * @param {string} password  - Password of the user
     * @returns {Object} user - user authenticated 
     */

    loginUser = async (email, password) => {
        const existingUser = await this.getUserByFeature('email', email)

        if (!existingUser) {
            throw new ApiError(401, 'User Not Found.')
        }

        const hashedPassword = existingUser.password
        const compare = await bcrypt.compare(password, hashedPassword)

        if (!compare) {
            throw new ApiError(403, 'Password is incorrect')
        }

        const token = await token_utility.createToken({ _id: existingUser._id }, '1h')
        const refreshToken = await token_utility.createRefreshToken({ _id: existingUser._id }, '1d')

        return {
            _id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email,
            token,
            refreshToken
        }
    }


}

module.exports = UserServices