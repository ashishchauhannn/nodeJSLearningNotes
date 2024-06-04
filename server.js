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
const port = 3000
const db = require('./db');
const Class = require('./models/class')
const bodyParser = require('body-parser')
app.use(bodyParser.json());




app.get('/', (req, res) => {
    res.send('Hello World! this is express!')
})
// app.get('/ex', (req, res) => {
//     res.send('Hello World! this express and its sucks! JOking')
// })
// app.get('/node', (req, res) => {
//     var nd = {
//         name: "hello",
//         size: "does not metter!",
//         age: "45AD"
//     }

//     res.send(nd)

// })

//POST method....

// const data = req.body
// const newPerson = newPerson(data);

// newPerson.save((error, Person) => {
//     if (error) {
//         console.log("err.....", error)
//         res.status(500).json({ error: 'internal' })
//     }
//     else {
//         console.log("saved...")
//         res.status(200).json(savedPerson);
//     }
// })

//POST method for person API....


//GET method 




// post method for class







//import routers

const personroutes = require('./routes/personroutes');
const classroutes = require('./routes/classroutes');
app.use('/person', personroutes)

app.use('/class', classroutes)



app.listen(3000, () => {
    console.log("server running.....")
})



