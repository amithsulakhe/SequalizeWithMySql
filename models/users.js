const { DataTypes } = require("sequelize");

function makeModel(sequelize) {
  const User = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          notEmpty: true, // Validation: checks that the string is not empty
          len: [4, 20], // Validation: checks that the length is between 4 and 20 characters
        },
        get() {
          const rawValue = this.getDataValue("username");
          return rawValue ? rawValue.toUpperCase() : null;
        },
        // set(value) {
        //   this.setDataValue("username", "UserName is " + value);
        // },
      },
      age: DataTypes.INTEGER,
      gender: DataTypes.STRING,

      // this is virtuals
      fullName: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.username} and age is ${this.age}`;
        },
        set(value) {
          throw new Error("Do not try to set the `fullName` value!");
        },
      },
    },
    {
      paranoid: true,

      // If you want to give a custom name to the deletedAt column
      deletedAt: "destroyTime",
      // Other model options go here
    }
  );

  return User;
}
module.exports = makeModel;
