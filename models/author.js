const { DataTypes } = require("sequelize");

function makeModel(sequelize) {
  const Author = sequelize.define(
    "Author",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birthdate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return Author;
}

module.exports = makeModel;
