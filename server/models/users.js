const mongoose = require('mongoose');
const { Schema } = mongoose;

const usersSchema = new Schema({
    email: { type: String },
    password: { type: String },
});

module.exports = mongoose.model('users', usersSchema);