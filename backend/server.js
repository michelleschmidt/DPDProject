require("dotenv").config();

const express = require("express");
const cors = require('cors');

const userRoutes = require("./routes/userRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const blogRoutes = require("./routes/blogRoutes.js");
const appointmentRoutes = require("./routes/appointmentRoutes.js");
const availabilityRoutes = require("./routes/availabilityRoutes.js");

const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');


const app = express();

// Configure CORS to allow requests from your React app's origin
// app.use(cors({
//     origin: 'http://localhost:3000'
// }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/api/users", userRoutes);

app.use("/api/blogs", blogRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/availabilities", availabilityRoutes);

app.use("/api/appointments", appointmentRoutes);



app.use(errorHandler);

//port
const PORT = process.env.PORT || 5000;

//server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
