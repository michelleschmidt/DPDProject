const express = require("express");

const db = require("./models/index.js");

const userRoutes = require("./routes/userRoutes.js");
const doctorRoutes = require("./routes/doctorRoutes.js");

const blogRoutes = require('./routes/blogRoutes');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/v1/users', userRoutes);
app.use('/api/v1/doctors', doctorRoutes);

app.use('/api/v1/blogs', blogRoutes);


//port
const PORT = process.env.PORT || 7000;

//server
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);

});
