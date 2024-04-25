const db = require('../models/index.js')

class userService {
    async create(data){
        const user = await db.User.create(data);
        return user;

        }
}