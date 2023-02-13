const { db, DataTypes } = require('../utils/database.util');


const UseRole = db.define('useRole', {
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

module.exports = { UseRole };