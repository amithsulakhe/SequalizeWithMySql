const { DataTypes } = require("sequelize");
function makeModel(sequelize) {
  const JobPost = sequelize.define("Jobpost", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    jobName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return JobPost;
}

module.exports = makeModel;
