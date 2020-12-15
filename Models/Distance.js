const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Distance = new Schema({
        source: String,
        destination: String,
        distance: Number,
        hits: Number
    });

module.exports = mongoose.model('Distance', Distance);
