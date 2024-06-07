const express = require('express')
const router = express.Router()
const Person = require('./../models/person') //import model 
const { jwtMiddelWare, generateToken } = require('./../jwt')

// post method for person
router.post('/signup', async (req, res) => {
    try {
        const data = req.body //contains the data
        const newPerson = Person(data); //from model


        //save the new person to database
        const response = await newPerson.save();
        console.log('data has been saved');


        //payload function
        const payload = {
            id: response.id,
            username: response.username
        }


        console.log(JSON.stringify(payload));
        //generate token
        const token = (generateToken(payload));
        console.log("token is:", token)

        res.status(200).json({ response: response, token: token });
    }

    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal error!" });
    }

})
// login route

router.post('/login', async (req, res) => {
    try {
        //extrct user name and password
        const { username, password } = req.body;
        // find username by username
        const user = await Person.findOne({ username: username });

        // if user cant find or exist
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'invalid username or password' })
        }
        const payload = {
            id: user.id,
            username: user.username
        }
        const token = generateToken(payload);

        res.json({ token })
    }
    catch (err) {
        console.error(err)
        res.status(500).json({ error: 'internal server error' })
    }
});





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