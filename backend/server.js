const express = require("express");

const db = require("./models/index.js");

const userRoutes = require("./routes/userRoutes.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/users', userRoutes);




//port
const PORT = process.env.PORT || 7000;

//server
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);

});
