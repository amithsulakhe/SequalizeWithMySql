const { DataTypes } = require("sequelize");
function makeModel(sequelize) {
  const Candidate = sequelize.define("Candidate", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    // Other fields
  });

  return Candidate;
}

module.exports = makeModel;
