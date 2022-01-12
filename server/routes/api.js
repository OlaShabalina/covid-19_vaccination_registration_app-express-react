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

    // will keep a proper casing for db input, ex: -> Olga or Olga Shabalina

    const nameCleared = name.charAt(0).toUpperCase() + name.slice(1);

    // Back-end validation array for the form
    let errors = [];

    // All fields should be filled
    if (!name || !date) errors.push({ message: "Please enter all fields." });

    //  date should be today or later
    const dateCleared = new Date((date));
    const today = new Date();

    if (date && dateCleared < today) errors.push({ message: "Please don't choose the past dates" });

    // name shouldn't have special characters

    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    
    if (specialChars.test(name)) errors.push({ message: "Please don't use special characters for the name" });

    // checking if the same user has already registered for that date (not to have double ups)

    const hasUserCheckedIn = await db.oneOrNone("SELECT * FROM reg_users WHERE users_name = $1 AND entry_date = $2;", [nameCleared, dateCleared])

    if (hasUserCheckedIn) errors.push({ message: "This user already checked in for this date." });

    // we will need the list of users for rendering results on the same page while displaying errors
    const usersList = await db.any("SELECT users_name, TO_CHAR(entry_date, 'DD/MM/YYYY') AS reg_date FROM reg_users ORDER BY entry_date;");

    // if there are errors - we will display them to the user
    if (errors.length > 0) {

        res.json({ errors, usersList })
        
    } else {

        db.none("INSERT INTO reg_users (users_name, entry_date) VALUES ($1, $2);", [nameCleared, dateCleared])
        res.redirect('/')
    }

})


module.exports = router;