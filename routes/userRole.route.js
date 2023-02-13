const express = require('express');
const {createUseRoleValidators} = require("../middlewares/validator.middleware")


// Controllers
const {
	getAllUserRole,
    createUserRole
} = require('../controllers/useRole.controller');


const userRoleRouter = express.Router();

userRoleRouter.post('/', createUseRoleValidators, createUserRole);

userRoleRouter.get('/', getAllUserRole);



module.exports = { userRoleRouter };
