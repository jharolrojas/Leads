const express = require('express');

// Routers
const { usersRouter } = require('./routes/users.route');
const { userRoleRouter } = require('./routes/userRole.route');
const { TypesRouter } = require('./routes/identificationTypes.route');
const { serviceRouter } = require('./routes/service.route');
const { leadRouter } = require('./routes/lead.route');




// Init our Express app
const app = express();

// Enable Express app to receive JSON data
app.use(express.json());

// Define endpoints
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/userRoles', userRoleRouter);
app.use('/api/v1/userTypes', TypesRouter);
app.use('/api/v1/service', serviceRouter);
app.use('/api/v1/lead', leadRouter);

app.use((error,req,res,next)=>{
	res.status(400).json({
		status: "error",
		message:error.message,
		error
	})
})



// Catch non-existing endpoints
app.all('*', (req, res) => {
	res.status(404).json({
		status: 'error',
		message: `${req.method} ${req.url} does not exists in our server`,
	});
});

module.exports = { app };
