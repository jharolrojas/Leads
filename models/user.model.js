const { db, DataTypes } = require("../utils/database.util");

const User = db.define("user", {
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
  identificationNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  birthDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  gender: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  profilePicture: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  identificationTypeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userRoleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = { User };
