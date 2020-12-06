const mongoose = require('mongoose');

const complaintSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: { type: mongoose.Schema.Types.ObjectId , 
        ref: 'User', required: true },
    category:{type: String, required: true},
    text: {type: String, required: true},
    status:{type: String, default: "registered"},
    address: {type: String, required: true },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Complaint', complaintSchema);