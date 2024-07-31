const { DataTypes } = require("sequelize");

function makeModel(sequelize) {
  const Description = sequelize.define(
    "Description",
    {
      des: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return Description;
}

module.exports = makeModel;
