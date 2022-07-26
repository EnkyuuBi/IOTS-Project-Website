const { query } = require("express");
const express = require("express");

const router = express.Router()

const db = require("../firestoreAccess");

// Static routes
router.get("/", (req, res) => 
{
    res.send("User List");
})

router.get("/new", (req, res) =>
{
    res.send("New user");
})

router.post("/", (req, res) =>
{
    res.send("Create User");
})

router.get("/get", (req, res) =>
{
    const number = req.query.number;
    db.db.collection('Sessions').where('Phone Number', '==', number).get().then((query) =>
    {
        if(!query.empty)
        {
            const sessionDoc = query.docs[0];
            const sessionData = sessionDoc.data();
            console.log(sessionData);
            res.json(sessionData);
        }
        else
        {
            res.json([]);
        }
    })
    
})

router.get("/getAll", (req, res) =>
{
    db.db.collection('Sessions').get().then((query) =>
    {
        if(!query.empty)
        {
            const sessionDoc = query.docs[0];
            const sessionData = sessionDoc.data();
            console.log(sessionData);
            res.json(sessionData);
        }
        else
        {
            res.json([]);
        }
    })
    
})



module.exports = router