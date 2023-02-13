const {User} = require("../models/user.model");
const { catchAsync } = require("../utils/catchAsync.util.js");
const { AppError } = require("../utils/appError.util");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const login = catchAsync(async (req, res, next) => {

	const { identificationNumber , password } = req.body;


	const user = await User.findOne({ attributes: { exclude: ["createdAt", "updatedAt"] },
		where: { identificationNumber, status: true },
	});
	

	if (!user || !(await bcrypt.compare(password, user.password))) {
		return next(new AppError('Wrong credentials', 400));
	}

	
	user.password = undefined;

	
	const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});

	res.status(200).json({
		status: 'success',
		data: { user, token },
	});
});



module.exports = {login}