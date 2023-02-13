const { db, DataTypes } = require('../utils/database.util');


const Service = db.define('service', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	description: {
		type: DataTypes.STRING,
		allowNull: false,
		unique:true
	},
    status: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: true
	},
});

module.exports = { Service };