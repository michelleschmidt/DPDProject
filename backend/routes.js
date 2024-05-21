const userRoutes = require("./routes/userRoutes.js");
const doctorRoutes = require("./routes/doctorRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const blogRoutes = require("./routes/blogRoutes.js");
const appointmentRoutes = require("./routes/appointmentRoutes.js");
const availabilityRoutes = require("./routes/availabilityRoutes.js");


app.use("/api/v1/users", userRoutes);

app.use("/api/v1/blogs", blogRoutes);

app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/availabilities", availabilityRoutes);

app.use("/api/v1/appointments", appointmentRoutes);
