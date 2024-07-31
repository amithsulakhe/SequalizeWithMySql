const { DataTypes, Model } = require("sequelize");

function makeModel(sequelize) {
  class Comment extends Model {}
  Comment.init(
    {
      title: DataTypes.STRING,
      commentableId: DataTypes.INTEGER,
      commentableType: DataTypes.STRING,
    },
    { sequelize, modelName: "comment" }
  );
  return Comment;
}

module.exports = makeModel;
