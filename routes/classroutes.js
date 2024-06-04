const express = require('express')
const router = express.Router()
//import model of class
const Class = require('./../models/class')



// post method for class

router.post('/', async (req, res) => {
    try {

        const data = req.body;
        const newclass = Class(data)
        const postdata = await newclass.save()
        console.log('data has been saved');
        res.status(200).json(postdata);

    } catch (error) {

        console.log(error);
        res.status(500).json({ error: "Internal error!" });

    }

})
// get method for class
router.get('/', async (req, res) => {
    try {
        const getdata = await Class.find()
        console.log('data has been fatched');
        res.status(200).json(getdata);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal error!" });
    }
})


module.exports = router;




