const { db, DataTypes } = require("../utils/database.util");

const IdentificationType = db.define("identificationType", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = { IdentificationType };
