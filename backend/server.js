require("dotenv").config();

const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const blogRoutes = require("./routes/blogRoutes.js");
const appointmentRoutes = require("./routes/appointmentRoutes.js");
const availabilityRoutes = require("./routes/availabilityRoutes.js");
const dashboardRoutes = require("./routes/dashboardRoutes.js")
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");

const app = express();


app.set("trust proxy", 1);

// Configure CORS to allow requests from your React app's origin
app.use(
  cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);

app.use("/api/blogs", blogRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/availabilities", availabilityRoutes);

app.use("/api/appointments", appointmentRoutes);

app.use("/api/search", dashboardRoutes)


app.use(errorHandler);

//port
const PORT = process.env.PORT || 7000;

//server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
