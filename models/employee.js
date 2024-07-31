const { DataTypes } = require("sequelize");

function makeModel(sequelize) {
  const Employee = sequelize.define(
    "employee",
    {
      username: DataTypes.STRING,
      points: DataTypes.INTEGER,
    },
    { timestamps: false }
  );

  return Employee;
}

module.exports = makeModel;
