const { DataTypes, Model } = require("sequelize");
function makeModel(sequelize) {
  class Account extends Model {}

  Account.init(
    {
      // Model attributes are defined here
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        // allowNull defaults to true
      },
    },
    {
      // Other model options go here
      sequelize, // We need to pass the connection instance
      modelName: "account", // We need to choose the model name
    }
  );
  return Account;
}

module.exports = makeModel;
