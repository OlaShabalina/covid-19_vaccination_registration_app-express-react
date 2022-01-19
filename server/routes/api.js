const express = require('express');
const router = express.Router();
const { generateListFromDB, insertUserIntoDB } = require('../db/db.queries');
const { isDateValid, isNameValid } = require('../utils/functions');

router.get('/', async (req, res) => {

    try {       
        // generate a list from db
        const usersList = await generateListFromDB();
        res.json({ usersList });

    } catch(error) {
        res.json({ error });
    }
    
});

router.post('/', async (req, res) => {
    const { name, date } = req.body;

    // make sure our date input is a date
    const dateCleared = new Date(date)
    const nameCleared = name.trim();

    // Back-end validation array for the form
    const errors = [];

    // All fields should be filled
    if (!nameCleared || !dateCleared ) errors.push({ message: "Please enter all fields." });

    // validation function for the date and name are below
    if (dateCleared && !isDateValid(dateCleared)) errors.push({ message: "Please choose the date: today or in the future." });
    if (nameCleared && !isNameValid(nameCleared)) errors.push({ message: "Please don't use special characters for the name." });

    // if there are errors - we will display them to the user and won't save it to the database
    if (errors.length > 0) {

        res.json({ errors })
        
    } else {

        try {

            // insert new user into db
            await insertUserIntoDB(nameCleared, dateCleared);

            // the reason we send a success message this was is to maintain the same format as error messages so we can have less code to render is from the frontend
            res.json({ 
                success: [
                    { message: "New User has been added to the list." }
                ] 
            })

        } catch (error) {
            console.log({ error });
        }
    }


})

module.exports = router;