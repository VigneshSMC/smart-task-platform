const express = require("express")
const router = express.Router()
const { register, login, getProfile } = require('../controllers/authController')
const {
 body
} = require("express-validator");

const {protect} = require('../middleware/authMiddleware')

const validationMiddleware =
require("../middleware/validationMiddleware");


router.post('/register', [body('name').notEmpty().withMessage("Name required"), 
    body("email").isEmail().withMessage("Valid email required"),
    body("password").isLength({min:6}).withMessage("Password must be min 6 characters")
], validationMiddleware,
    register)

router.post('/login', 
    [body("email").isEmail(), body("password").notEmpty()],
    validationMiddleware,
    login)

router.get('/profile',protect ,getProfile);


module.exports = router;