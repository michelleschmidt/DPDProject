const User = require('../models/user_model.js');
const userService = require('../services/user_service.js')

data = {
      title: 'Ms.',
      first_name: 'Helena',
      last_name: 'Mensah',
      street: 'Alois gaessl 4',
      city: 'Pfarrkirchen',
      postcode: 84347,
      state: 'bayern',
      country: 'Germany',

};

exports.createUser = async (req, res) => {
  try {
    const service = new userService();
    const user = await service.create(data);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};







// exports.createUser = async (req, res) => {
//   try {

//     // Create a new user record
//     const newUser = await User.create({
//       title: 'Ms.',
//       first_name: 'Olivia',
//       last_name: 'Okoro',
//       street: 'Alois gaessl 4',
//       city: 'Pfarrkirchen',
//       postcode: 84347,
//       state: 'bayern',
//       country: 'Germany',
//       role: 'admin',
//     });

//     res.status(201).json({ success: true, data: newUser });
//     console.log('User created successfully:', newUser.first_name);
//   } catch (error) {
//     console.error('Error creating user:', error);
//   }
// };


// class UserController {
//   async createUser(req, res) {
//     try {
//       // const { title, first_name, last_name, street, city, postcode, state, country, role} = req.body;
      
//       // Create a new user record
//       const newUser = await User.create({
//         title: 'Ms.',
//         first_name: 'Olivia',
//         last_name: 'Okoro',
//         street: 'Alois gaessl 4',
//         city: 'Pfarrkirchen',
//         postcode: 84347,
//         state: 'bayern',
//         country: 'Germany',
//         role: 'admin',
//       });

//       res.status(201).json({ success: true, data: newUser });
//       console.log('User created successfully:', newUser.first_name);
//     } catch (error) {
//       console.error('Error creating user:', error);
//       res.status(500).json({ success: false, error: 'Internal Server Error' });
//     }
//   }
// }

module.exports = UserController;