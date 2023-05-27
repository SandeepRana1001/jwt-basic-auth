const express = require('express')
const { USER_CONTROLLER } = require('../controller/index.controller')
const userController = new USER_CONTROLLER()
const { check } = require('express-validator')
const tryCatch = require('../utility/tryCatch')
const validate_user = require('../middleware/validate-user')

const router = express.Router()

router.post('/register',
    [
        check('name').not().isEmpty().isLength({ min: 3 }),
        check('email').isEmail(),
        check('password').not().isEmpty().isLength({ min: 6 }),
    ]

    , tryCatch(userController.register)
)
router.post('/login',
    [
        check('email').isEmail(),
        check('password').not().isEmpty(),

    ]
    , tryCatch(userController.login)
)

router.get('/', validate_user, tryCatch(userController.getAllUsers))

module.exports = router