
const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({

    teacher: {
        type: String,
        require: true

    },

    student: {
        type: String,
        require: true

    },

    Courses: {
        type: String,
        enum: ['java', "py", 'js'],
        require: true

    },

    rollno: {
        type: Number,
        require: true,
        unique: true


    }

})

const Class = mongoose.model('class', classSchema);
module.exports = Class;