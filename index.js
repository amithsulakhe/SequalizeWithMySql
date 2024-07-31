const express = require("express");
const sequalize = require("./models/index");
const router = require("./routes/router");
const app = express();
const PORT = 1000;

app.use("/data", router);

app.get("/", (req, res) => {
  res.send("Home Page");
});

const start = async () => {
  try {
    await sequalize.sequelize.authenticate();
    console.log("database connected successfully");

    app.listen(PORT, () => {
      console.log("server is running at PORT", PORT);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
