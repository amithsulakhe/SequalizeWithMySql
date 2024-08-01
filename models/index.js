const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("PracticeDB", "root", "Ammu@123", {
  host: "localhost",

  // connection pool to optimize performance
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  dialect:
    "mysql" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
});

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.users = require("./users")(sequelize);
db.accounts = require("./accounts")(sequelize);
db.employee = require("./employee")(sequelize);
db.profile = require("./profile")(sequelize);
db.transaction = require("./transaction")(sequelize);
db.image = require("./image")(sequelize);
db.video = require("./video")(sequelize);
db.comment = require("./comment")(sequelize);

db.candidate = require("./candidate")(sequelize);
db.interview = require("./interview")(sequelize);
db.jobpost = require("./jobpost")(sequelize);

// db.author = require("./author")(sequelize);
// db.bio = require("./biography")(sequelize);
// db.des = require("./description")(sequelize);

// db.author.hasOne(db.bio, { foreignKey: "authorId", as: "bio_graphy" });
// db.bio.belongsTo(db.author, {
//   foreignKey: "authorId",
//   as: "author_based",
// });

db.users.hasMany(db.accounts, { foreignKey: "userId" });
db.accountsData = db.accounts.belongsTo(db.users, {
  foreignKey: "userId",
  as: "users",
});

// one-to-many
// db.author.hasMany(db.bio, { foreignKey: "authorId", as: "bio_graphy" });
// db.bio.belongsTo(db.author, {
//   foreignKey: "authorId",
//   as: "author_based",
// });

// db.bio.hasMany(db.des);
// db.des.belongsTo(db.bio);

// db.author.belongsToMany(db.bio, { through: "junction" });
// db.bio.belongsToMany(db.author, { through: "junction" });

// this is junction model
const Employee_Profile = sequelize.define(
  "Employee_Profile",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    selfGranted: DataTypes.BOOLEAN,
  },
  { timestamps: false }
);

db.grant = Employee_Profile;

//  for insertion of data many-to-many
// db.employee.belongsToMany(db.profile, { through: Employee_Profile });
// db.profile.belongsToMany(db.employee, { through: Employee_Profile });

// we can do this instead of many-to-many => two one-to-many
db.employee.hasMany(db.grant);
db.grant.belongsTo(db.employee);
db.profile.hasMany(db.grant);
db.grant.belongsTo(db.profile);

// these tables are created for many-to-many-many
db.player = sequelize.define("Player", { username: DataTypes.STRING });
db.team = sequelize.define("Team", { name: DataTypes.STRING });
db.game = sequelize.define("Game", { name: DataTypes.STRING });

// Super Many-to-Many relationship between Game and Team
db.gameTeam = sequelize.define("GameTeam", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
});
db.team.belongsToMany(db.game, { through: db.gameTeam });
db.game.belongsToMany(db.team, { through: db.gameTeam });
db.gameTeam.belongsTo(db.game);
db.gameTeam.belongsTo(db.team);
db.game.hasMany(db.gameTeam);
db.team.hasMany(db.gameTeam);

// Super Many-to-Many relationship between Player and GameTeam
db.playerGameTeam = sequelize.define("PlayerGameTeam", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
});
db.player.belongsToMany(db.gameTeam, { through: db.playerGameTeam });
db.gameTeam.belongsToMany(db.player, { through: db.playerGameTeam });
db.playerGameTeam.belongsTo(db.player);
db.playerGameTeam.belongsTo(db.gameTeam);
db.player.hasMany(db.playerGameTeam);
db.gameTeam.hasMany(db.playerGameTeam);

// polymorphic association

db.image.hasMany(db.comment, {
  foreignKey: "commentableId",
  constraints: false,
  scope: {
    commentableType: "image",
  },
});
db.comment.belongsTo(db.image, {
  foreignKey: "commentableId",
  constraints: false,
});

db.video.hasMany(db.comment, {
  foreignKey: "commentableId",
  constraints: false,
  scope: {
    commentableType: "video",
  },
});
db.comment.belongsTo(db.video, {
  foreignKey: "commentableId",
  constraints: false,
});

// sub queries
db.post = sequelize.define(
  "post",
  {
    content: DataTypes.STRING,
  },
  { timestamps: false }
);

db.reaction = sequelize.define(
  "reaction",
  {
    type: DataTypes.STRING,
  },
  { timestamps: false }
);

db.post.hasMany(db.reaction);
db.reaction.belongsTo(db.post);

// Define associations
db.candidate.hasMany(db.interview, { foreignKey: "candid", sourceKey: "id" });
db.interview.belongsTo(db.candidate, {
  foreignKey: "candid",
  as: "_candid",
  targetKey: "id",
});

// Define associations
db.jobpost.hasMany(db.interview, { foreignKey: "jpid", sourceKey: "id" });
db.interview.belongsTo(db.jobpost, {
  foreignKey: "jpid",
  as: "_jpid",
  targetKey: "id",
});

db.sequelize.sync({ force: false });
module.exports = db;
