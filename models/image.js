const { DataTypes, Model } = require("sequelize");

function makeModel(sequelize) {
  class Image extends Model {}
  Image.init(
    {
      title: DataTypes.STRING,
      url: DataTypes.STRING,
    },
    { sequelize, modelName: "image" }
  );
  return Image;
}

module.exports = makeModel;
