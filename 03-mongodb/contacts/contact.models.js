const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    subscription: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String },
})

module.exports = mongoose.model('contact', contactSchema);