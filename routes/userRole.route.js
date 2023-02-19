const express = require('express');
const {createUserRoleValidators} = require("../middlewares/validator.middleware")


// Controllers
const {
	getAllUserRole,
    createUserRole
} = require('../controllers/userRole.controller');


const userRoleRouter = express.Router();

userRoleRouter.post('/', createUserRoleValidators, createUserRole);

userRoleRouter.get('/', getAllUserRole);



module.exports = { userRoleRouter };
