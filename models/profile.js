const { DataTypes, Model } = require("sequelize");

function makeModel(sequelize) {
  const Profile = sequelize.define(
    "profile",
    {
      name: DataTypes.STRING,
    },
    { timestamps: false }
  );

  return Profile;
}

module.exports = makeModel;
