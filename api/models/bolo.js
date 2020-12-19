const mongoose = require('mongoose');

const boloSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String, required: true },
    text: {type: String, required: true },
    image: {type: String, required: true},
});

module.exports = mongoose.model('Bolo', boloSchema);