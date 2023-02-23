const { mongoose } = require('mongoose');

const userCollection = 'usersLogin'

const userShema = new mongoose.Schema({
    firts_name: String,
    last_name: String,
    email: String,
    password: String,
    age: String
});  


const userModel = mongoose.model(userCollection, userShema);


module.exports = userModel; 