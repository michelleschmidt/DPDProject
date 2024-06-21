const userRoutes = require("./routes/userRoutes.js");
const doctorRoutes = require("./routes/doctorRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const blogRoutes = require("./routes/blogRoutes.js");
const appointmentRoutes = require("./routes/appointmentRoutes.js");
const availabilityRoutes = require("./routes/availabilityRoutes.js");


app.use("/api/v1/users", userRoutes);



userRouter.get('/api/users/all-users', isLoggedIn, roleCheck('admin'), userController.getUsers);

userRouter.get('/api/users', isLoggedIn, userController.getDoctors);

userRouter.post('/api/users/admin-create', isLoggedIn, roleCheck('admin'), userController.createUser);

userRouter.get('/api/users/:id', isLoggedIn, userController.getUserById);
userRouter.get('/api/users/doctor/:id', isLoggedIn, userController.getDoctorById);

userRouter.put('/api/users/:id', isLoggedIn, userController.updateUser);

userRouter.delete('/api/users/:id', isLoggedIn, roleCheck('admin'), userController.deleteUser);




app.use("/api/blogs", blogRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/v1/availabilities", availabilityRoutes);

app.use("/api/v1/appointments", appointmentRoutes);
