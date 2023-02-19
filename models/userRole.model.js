const { db, DataTypes } = require('../utils/database.util');


const UserRole = db.define('userRole', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		unique:true
	},
	
});

module.exports = { UserRole };