const { db, DataTypes } = require("../utils/database.util");

const Lead = db.define("lead", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  negotationStatus: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  serviceId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  dni: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  identificationTypeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = { Lead };
