const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/', async (req, res) => {

    try {
        
        const usersList = await db.any("SELECT users_name, TO_CHAR(entry_date, 'DD/MM/YYYY') AS reg_date FROM reg_users ORDER BY entry_date;");

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
    let errors = [];

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

            await db.none("INSERT INTO reg_users (users_name, entry_date) VALUES ($1, $2);", [nameCleared, dateCleared])
            
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



function isNameValid(name) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return !specialChars.test(name); 
}

function isDateValid(date) {

    const dateCrleared = new Date(date)
    const today = new Date(new Date().toDateString()); 

    return dateCrleared >= today;
}

module.exports = router;