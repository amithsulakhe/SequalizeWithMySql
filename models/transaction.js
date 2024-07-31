const { DataTypes } = require("sequelize");

function makeModel(sequelize) {
  const Transaction = sequelize.define(
    "transaction",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return Transaction;
}

module.exports = makeModel;
