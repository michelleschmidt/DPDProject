require("dotenv").config();

const express = require("express");

const userRoutes = require("./routes/userRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const blogRoutes = require("./routes/blogRoutes.js");
const appointmentRoutes = require("./routes/appointmentRoutes.js");
const availabilityRoutes = require("./routes/availabilityRoutes.js");

const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/api/v1/users", userRoutes);

app.use("/api/v1/blogs", blogRoutes);

app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/availabilities", availabilityRoutes);

app.use("/api/v1/appointments", appointmentRoutes);



app.use(errorHandler);

//port
const PORT = process.env.PORT || 7000;

//server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
