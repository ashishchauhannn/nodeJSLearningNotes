const express = require('express')
const router = express.Router()
const Person = require('./../models/person') //import model 


// post method for person
router.post('/', async (req, res) => {
    try {
        const data = req.body //contains the data
        const newPerson = Person(data); //from model
        const response = await newPerson.save();
        console.log('data has been saved');
        res.status(200).json(response);
    }

    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal error!" });
    }

})

//GET method for person

router.get('/', async (req, res) => {

    try {
        const data = await Person.find();
        console.log('data has been fatched');
        res.status(200).json(data);

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal error!" });
    }
})


//parametrised API
router.get('/:worktype', async (req, res) => {
    try {
        const worktype = req.params.worktype;
        if (worktype == 'dop' | worktype == 'dir' | worktype == 'mngr') {
            const workdata = await Person.find({ work: worktype });
            console.log('data has been fatched');
            res.status(200).json(workdata);

        }
        else {
            res.status(404).json({ error: "Internal error!" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal error!" });
    }
})


// update data
router.put('/:id', async (req, res) => {

    try {
        const personID = req.params.id;
        const updatepersondata = req.body;
        const response = await Person.findByIdAndUpdate(personID, updatepersondata, {
            new: true,
            runValidators: true,

        })
        if (!response) {

            return res.status(404).json({ error: "not found" });
        }

        console.log('data has been updated');
        res.status(200).json(response);
    }

    catch (err) {
        console.log(err);
        res.status(500).json({ error: "error" });
    }
})

// delete


router.delete('/:id', async (req, res) => {

    try {
        const personID = req.params.id;

        const response = await Person.findByIdAndDelete(personID)
        if (!response) {

            return res.status(404).json({ error: "person not found" });
        }

        console.log('data has been deleted');
        res.status(200).json({ message: 'data deleted' });
    }

    catch (err) {
        console.log(err);
        res.status(500).json({ error: "error" });
    }
})



// export router in server
module.exports = router;