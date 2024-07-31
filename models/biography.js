const { DataTypes } = require("sequelize");

function makeModel(sequelize) {
  const Biography = sequelize.define(
    "Biography",
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      publishedYear: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      //   authorId: DataTypes.INTEGER,
    },
    {
      timestamps: false,
    }
  );
  return Biography;
}

module.exports = makeModel;
