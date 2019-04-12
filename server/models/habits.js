const mongoose = require('mongoose');
const { Schema } = mongoose;

const recordSchema = new Schema({
    date: { type: Date },
    times: { type: Number },
})

const habitSchema = new Schema({
    name: { type: String },
    status: { type: String },
    goalPeriod: { type: String },
    target: { type: Number },
    message: { type: String },
    records: { type: [recordSchema] }
})

const habitsSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId },
    habits: { type: [habitSchema] },
});

module.exports = mongoose.model('habits', habitsSchema);