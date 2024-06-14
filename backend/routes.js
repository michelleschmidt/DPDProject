const userRoutes = require("./routes/userRoutes.js");
const doctorRoutes = require("./routes/doctorRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const blogRoutes = require("./routes/blogRoutes.js");
const appointmentRoutes = require("./routes/appointmentRoutes.js");
const availabilityRoutes = require("./routes/availabilityRoutes.js");


app.use("/api/v1/users", userRoutes);



userRouter.get('/api/v1/users/all-users', isLoggedIn, roleCheck('admin'), userController.getUsers);

userRouter.get('/api/v1/users', isLoggedIn, userController.getDoctors);

userRouter.post('/api/v1/users/admin-create', isLoggedIn, roleCheck('admin'), userController.createUser);

userRouter.get('/api/v1/users/:id', isLoggedIn, userController.getUserById);
userRouter.get('/api/v1/users/doctor/:id', isLoggedIn, userController.getDoctorById);

userRouter.put('/api/v1/users/:id', isLoggedIn, userController.updateUser);

userRouter.delete('/api/v1/users/:id', isLoggedIn, roleCheck('admin'), userController.deleteUser);




app.use("/api/v1/blogs", blogRoutes);

app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/availabilities", availabilityRoutes);

app.use("/api/v1/appointments", appointmentRoutes);
