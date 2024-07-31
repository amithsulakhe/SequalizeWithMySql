const { DataTypes, Model } = require("sequelize");

function makeModel(sequelize) {
  class Video extends Model {}
  Video.init(
    {
      title: DataTypes.STRING,
      text: DataTypes.STRING,
    },
    { sequelize, modelName: "video" }
  );
  return Video;
}

module.exports = makeModel;
