// function sum(a, b, callback) {
//     let result = a * b;
//     console.log(result)
//     callback()

// }
// sum(7, 6, function () {
//     console.log("hello")
// })

// const { json } = require('express');
// // function add(a, b) {
// //     return a + b;
// // }
// // console.log(add(12, 4))
// var _ = require('lodash');
// var data = ["a", "a", 1, 1, 1, 1, "b", "b", "kitu"]
// var filter = _.uniq(data)
// console.log(filter)
// const jsonString = '{"a";"n";"m"}';

const express = require('express')
const { size } = require('lodash')
const app = express()
// const port = 3000
const db = require('./db');
require('dotenv').config();
const passport = require('./auth')
const PORT = process.env.PORT || 3000;

// body parsher
const bodyParser = require('body-parser')
app.use(bodyParser.json());


//authentication



app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local', { session: false })


// get method ex-
app.get('/', (req, res) => {
    res.send('Hello World! this is express!')
})


//import routers
const personroutes = require('./routes/personroutes');
const classroutes = require('./routes/classroutes');


//use localAuth for authentication
app.use('/person', personroutes)
app.use('/class', classroutes)


//online server shift

app.listen(PORT, () => {
    console.log("server running..")
})


//  Passporet and Authorization completed.....