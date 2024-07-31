const express = require("express");
const { Op, QueryTypes, DataTypes } = require("sequelize");
const { Sequelize } = require("sequelize");

const db = require("../models/index");
const User = db.users;
const router = express.Router();

router.route("/users").get(async (req, res) => {
  try {
    // raw queries
    // const users = await db.sequelize.query("SELECT * FROM `users`", {
    //   type: QueryTypes.SELECT,

    //   // if we add model:User it return based on sequalize schema if we comment it it directly return data from sql
    //   model: User,
    //   mapToModel: true,
    //   //   plain: true, // it return only first data
    // });

    // const data = await User.findAll({
    //   attributes: [
    //     "gender",
    //     [db.sequelize.fn("SUM", db.sequelize.col("age")), "count"],
    //   ],
    //   group: "gender",
    //   //   where: {
    //   //     id: {
    //   //       [Op.eq]: 2,
    //   //     },
    //   //   },
    //   //   attributes: [
    //   //     [
    //   //       db.Sequelize.fn("CONCAT", db.Sequelize.col("firstName"), " Dev"),
    //   //       "firstName",
    //   //     ],
    //   //   ],
    // });

    // const count = await User.count({
    //   where: {
    //     age: {
    //       [Op.gt]: 25,
    //     },
    //   },
    // });
    // const count = await User.max("id");
    const data = await User.findAll({
      //   paranoid: false,    // it returns soft deleted also
    });
    res.status(200).json({ data });
  } catch (error) {
    res.status(401).json({ msg: "Something went wrong" });
  }
});

router.route("/addUser").get(async (req, res) => {
  try {
    const data = await User.bulkCreate(
      [
        // { username: "a", age: 30, gender: "male" },
        { username: "jane", age: 25, gender: "female" },
        { username: "mike", age: 35, gender: "male" },
        { username: "anna", age: 28, gender: "female" },
      ],
      { validate: true }
    );
    // const data = await User.create(
    //   { firstName: "ajay", lastName: "S" }
    //   //   { fields: ["firstName"] }
    //   // it only add key given in array
    // );
    res.status(200).json({ data });
  } catch (error) {
    res.status(401).json({ msg: error });
  }
});

router.route("/user/:id").get(async (req, res) => {
  try {
    const data = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ data });
  } catch (error) {
    res.status(401).json({ msg: error });
  }
});

router.route("/update/:id").get(async (req, res) => {
  try {
    const data = await User.update(
      {
        username: "kalu",
        age: 30,
        gender: "male",
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ data });
  } catch (error) {
    res.status(401).json({ msg: error });
  }
});

router.route("/one-to-one").get(async (req, res) => {
  try {
    const data = await db.author.create({
      name: "ajy",
      birthdate: new Date("2001-08-10"),
    });

    if (data && data.id) {
      const bio = await db.bio.create({
        content: "dfa",
        publishedYear: 14,
        authorId: 1,
      });

      if (bio && bio.id) {
        const s = await db.des.create({
          des: "dfa",
          BiographyId: 1,
        });
      }
    }
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

router.route("/get-one-to-one").get(async (req, res) => {
  try {
    const data = await db.author.findAll({
      //   attributes: ["name"],
      include: {
        model: db.bio,
        as: "bio_graphy",
        // attributes: ["content"],
      },
    });
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

router.route("/get-one-to-many").get(async (req, res) => {
  try {
    // nested modal
    const data = await db.author.findOne({
      //   attributes: ["name"],
      include: {
        model: db.bio,
        as: "bio_graphy",
        include: {
          model: db.des,
        },
        // attributes: ["content"],
      },
      where: {
        id: 1,
      },
    });
    // lazy loading will work in only findOne method
    // const bio = await data.getBiographies();
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

router.route("/get-many-to-many").get(async (req, res) => {
  try {
    const data = await db.author.findAll({
      //   attributes: ["name"],
      include: {
        model: db.bio,
        // attributes: ["content"],
      },
    });
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

router.route("/insert-into-one-two-many").get(async (req, res) => {
  try {
    const data = await db.accounts.create(
      {
        firstName: "amith",
        lastName: "Sulakhe",
        users: {
          username: "ajaysaf",
          age: 20,
          gender: "male",
        },
      },
      { include: [db.accountsData] }
    );
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

router.route("/insert-into-many-to-many").get(async (req, res) => {
  try {
    // using lazy loading
    // const amidala = await db.employee.create({
    //   username: "p4dm3",
    //   points: 1000,
    // });
    // const queen = await db.profile.create({ name: "Queen" });
    // await amidala.addProfile(queen, { through: { selfGranted: false } });
    // const result = await db.employee.findOne({
    //   where: { username: "p4dm3" },
    //   include: db.profile,
    // });
    // console.log(result);

    // usign eager loading
    // const amidala = await db.employee.create(
    //   {
    //     username: "p4dm3",
    //     points: 1000,
    //     profiles: [
    //       {
    //         name: "Queen",
    //         Employee_Profile: {
    //           selfGranted: true,
    //         },
    //       },
    //     ],
    //   },
    //   {
    //     include: db.profile,
    //   }
    // );

    // const result = await db.employee.findOne({
    //   where: { username: "p4dm3" },
    //   include: db.profile,
    // });

    // => two one-one-two-many
    const result = await db.employee.findAll({
      include: {
        model: db.grant,
        include: db.profile,
      },
    });

    console.log(result);
    res.status(200).json({ result });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

// many-to-many-to-many

router.route("/m2m2m").get(async (req, res) => {
  try {
    await db.player.bulkCreate([
      { username: "s0me0ne" },
      { username: "empty" },
      { username: "greenhead" },
      { username: "not_spock" },
      { username: "bowl_of_petunias" },
    ]);
    await db.game.bulkCreate([
      { name: "The Big Clash" },
      { name: "Winter Showdown" },
      { name: "Summer Beatdown" },
    ]);
    await db.team.bulkCreate([
      { name: "The Martians" },
      { name: "The Earthlings" },
      { name: "The Plutonians" },
    ]);

    // Let's start defining which teams were in which games. This can be done
    // in several ways, such as calling `.setTeams` on each db.game. However, for
    // brevity, we will use direct `create` calls instead, referring directly
    // to the IDs we want. We know that IDs are given in order starting from 1.
    await db.gameTeam.bulkCreate([
      { GameId: 1, TeamId: 1 }, // this db.gameTeam will get id 1
      { GameId: 1, TeamId: 2 }, // this db.gameTeam will get id 2
      { GameId: 2, TeamId: 1 }, // this db.gameTeam will get id 3
      { GameId: 2, TeamId: 3 }, // this db.gameTeam will get id 4
      { GameId: 3, TeamId: 2 }, // this db.gameTeam will get id 5
      { GameId: 3, TeamId: 3 }, // this db.gameTeam will get id 6
    ]);

    // Now let's specify players.
    // For brevity, let's do it only for the second db.game (Winter Showdown).
    // Let's say that that s0me0ne and greenhead played for The Martians, while
    // not_spock and bowl_of_petunias played for The Plutonians:
    await db.playerGameTeam.bulkCreate([
      // In 'Winter Showdown' (i.e. GameTeamIds 3 and 4):
      { PlayerId: 1, GameTeamId: 3 }, // s0me0ne played for The Martians
      { PlayerId: 3, GameTeamId: 3 }, // greenhead played for The Martians
      { PlayerId: 4, GameTeamId: 4 }, // not_spock played for The Plutonians
      { PlayerId: 5, GameTeamId: 4 }, // bowl_of_petunias played for The Plutonians
    ]);

    // Now we can make queries!
    const result = await db.game.findOne({
      where: {
        name: "Winter Showdown",
      },
      include: {
        model: db.gameTeam,
        include: [
          {
            model: db.player,
            through: { attributes: [] }, // Hide unwanted `db.playerGameTeam` nested object from results
          },
          db.team,
        ],
      },
    });
    res.status(400).json({ result });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

router.route("/scopes").get(async (req, res) => {
  try {
    // const users = [
    //   { username: "amith", age: 15, gender: "male" },
    //   { username: "john", age: 20, gender: "male" },
    //   { username: "jane", age: 22, gender: "female" },
    //   { username: "alice", age: 18, gender: "female" },
    //   { username: "bob", age: 21, gender: "male" },
    //   { username: "charlie", age: 19, gender: "male" },
    //   { username: "dave", age: 23, gender: "male" },
    //   { username: "eve", age: 17, gender: "female" },
    //   { username: "frank", age: 16, gender: "male" },
    //   { username: "grace", age: 25, gender: "female" },
    // ];

    // const addData = await db.users.bulkCreate(users);
    db.users.addScope("find-based-on-age", {
      where: {
        gender: "male",
      },
    });

    db.users.addScope("attributes", {
      attributes: ["username", "gender"],
    });

    const result = await db.users
      .scope(["find-based-on-age", "attributes"])
      .findAll({});
    res.status(200).json({ result });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

// use tranaction when one model is dependent on another model
router.route("/transaction").get(async (req, res) => {
  const t = await db.sequelize.transaction();
  try {
    const data = await db.transaction.create(
      {
        name: null,
      },
      { transaction: t }
    );
    await t.commit();
    res.status(200).json({ data });
  } catch (error) {
    await t.rollback();
    res.status(400).json({ msg: "something went wrong" });
  }
});

router.route("/polymorphic-association").get(async (req, res) => {
  try {
    // const imageData = await db.image.create({
    //   title: "Sunset Over the Mountains",
    //   url: "https://example.com/images/sunset-over-mountains.jpg",
    // });

    // const videoData = await db.video.create({
    //   title: "Relaxing Ocean Waves",
    //   text: "ocean",
    // });

    // if (imageData && imageData.id) {
    //   await db.comment.create({
    //     title: "image comement",
    //     commentableId: imageData.id,
    //     commentableType: "image",
    //   });
    // }

    // if (videoData && videoData.id) {
    //   await db.comment.create({
    //     title: "video comement",
    //     commentableId: videoData.id,
    //     commentableType: "video",
    //   });
    // }

    // res.status(200).json({ msg: { imageData, videoData } });

    // findAll
    const result = await db.video.findAll({
      include: db.comment,
    });

    res.status(200).json({ msg: result });
  } catch (error) {
    res.status(400).json({ msg: "something went wrong" });
  }
});

// query interface

router.route("/query-interface").get(async (req, res) => {
  const queryInterface = db.sequelize.getQueryInterface();
  try {
    // creating table using query interface
    // queryInterface.createTable("Person", {
    //   name: DataTypes.STRING,
    //   isBetaMember: {
    //     type: DataTypes.BOOLEAN,
    //     defaultValue: false,
    //     allowNull: false,
    //   },
    // });
    // alter table
    queryInterface.addColumn("Person", "petName", { type: DataTypes.STRING });
    res.status(400).json({ msg: "altered" });
  } catch (error) {
    res.status(400).json({ msg: "something went wrong" });
  }
});

router.route("/sub-queries").get(async (req, res) => {
  try {
    // async function makePostWithReactions(content, reactionTypes) {
    //   const post = await db.post.create({ content });
    //   await db.reaction.bulkCreate(
    //     reactionTypes.map((type) => ({ type, postId: post.id }))
    //   );
    //   return post;
    // }

    // await makePostWithReactions("Hello World", [
    //   "Like",
    //   "Angry",
    //   "Laugh",
    //   "Like",
    //   "Like",
    //   "Angry",
    //   "Sad",
    //   "Like",
    // ]);
    // await makePostWithReactions("My Second Post", [
    //   "Laugh",
    //   "Laugh",
    //   "Like",
    //   "Laugh",
    // ]);

    const data = await db.post.findAll({
      attributes: {
        include: [
          [
            // Note the wrapping parentheses in the call below!
            db.sequelize.literal(`(
                        SELECT COUNT(*)
                        FROM reactions AS reaction
                        WHERE
                            reaction.postId = post.id
                            AND
                            reaction.type = "Laugh"
                    )`),
            "laughReactionsCount",
          ],
        ],
      },
    });
    res.status(400).json({ msg: data });
  } catch (error) {
    res.status(400).json({ msg: "something went wrong" });
  }
});

module.exports = router;
