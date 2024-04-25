const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user_routes");
const db = require("./models/index.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
// app.use("/api", userRoutes);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
