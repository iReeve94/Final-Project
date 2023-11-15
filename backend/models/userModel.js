const mongoose = require('mongoose');
require("dotenv").config();


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
},{timestamps:true});
 

const adminSchema =  new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        default: "admin@gmail.com",
    },
    password: {
        type: String,
        required: true,
        default: "123",
    },
}); 

const User = mongoose.model("User", userSchema);
const Admin =  mongoose.model("Admin", adminSchema);
//let admin = new Admin()
//admin.save()

module.exports = {
    User, Admin
}