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

    try {
        // make sure our date input is a date
        const dateCrleared = new Date(date)

        // Back-end validation array for the form
        let errors = [];

        // All fields should be filled
        if (!name || !date) errors.push({ message: "Please enter all fields." });

        // validation function for the date and name are below
        if (date && !isDateValid(date)) errors.push({ message: "Please don't choose the date in the past." });
        if (name && !isNameValid(name)) errors.push({ message: "Please don't use special characters for the name." });

        // additional check - checking if the same user has already registered for that date (not to have double ups)
        const hasUserCheckedIn = await db.oneOrNone("SELECT * FROM reg_users WHERE users_name = $1 AND entry_date = $2;", [name, dateCrleared])

        if (name && date && hasUserCheckedIn) errors.push({ message: "This user already checked in for this date." });

        // if there are errors - we will display them to the user and won't save it to the database
        if (errors.length > 0) {

            res.json({ errors })
            
        } else {

            db.none("INSERT INTO reg_users (users_name, entry_date) VALUES ($1, $2);", [name, dateCrleared])
            
            // the reason we send a success message this was is to maintain the same format as error messages so we can have less code to render is from the frontend
            res.json({ 
                success: [
                    { message: "New User has been added to the list." }
                ] 
            })
        }

    } catch (error) {
        res.json({ error });
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