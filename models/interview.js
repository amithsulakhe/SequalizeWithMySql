const { DataTypes } = require("sequelize");

function makeModel(sequelize) {
  const Interview = sequelize.define("Interview", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    candid: {
      type: DataTypes.INTEGER,
    },
    jpid: {
      type: DataTypes.INTEGER,
    },

    // Other fields
  });
  return Interview;
}

module.exports = makeModel;
