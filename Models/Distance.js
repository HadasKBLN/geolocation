const debug = require('debug')('model-distance');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Distance = new Schema({
        source: String,
        destination: String,
        distance: Number,
        hits: Number
    });


    // // on every save, add the date
    // Schema.pre('save', function(next) {
    //     let currentDate = new Date();
    //     this.updated_at = currentDate;
    //     if (!this.created_at)
    //         this.created_at = currentDate;
    //     next();
    // });

    // schema.plugin(passportLocalMongoose);


module.exports = mongoose.model('Distance', Distance);
debug("Distance model created");
