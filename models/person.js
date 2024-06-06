const { uniq, isMatch } = require('lodash');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

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
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

});
// bcrypt hashing
personSchema.pre('save', async function (next) {
    const person = this;
    if (!person.isModified('password'))
        return next();
    try {
        //hash pass generate
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(person.password, salt);
        // override pass to hash
        person.password = hashPassword;
        next();
    } catch (err) {
        return next(err);
    }
})
personSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        // use bcrpt to  compare the hash function
        const isMatch = await bcrypt.compare(candidatePassword, this.password)
        return isMatch;
    } catch (error) {
        throw error;
    }
}

const Person = mongoose.model('person', personSchema);
module.exports = Person;