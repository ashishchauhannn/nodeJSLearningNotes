const { uniq } = require('lodash');
const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: {

        type: String,
        required: true
    },

    age: {

        type: Number,
        require: true
    },

    work: {

        type: String,
        enum: ['dop', 'dir', 'mngr'],
        require: true
    },

    email: {

        type: String,
        require: true,
        unique: true

    },

    address: {

        type: String,
        require: true
    },



});



const Person = mongoose.model('person', personSchema);
module.exports = Person;