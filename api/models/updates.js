const mongoose = require('mongoose');

const updateSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    priority:{type: Number, required: true},
    title: {type: String, required: true},
    text: {type: String, required: true},
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Updates', updateSchema);