// Import modules
const https = require('https');
const fs = require('fs');
const express = require ('express');
const path = require('path');
const db = require('./firestoreAccess')

// Init modules
const app = express();

// Routing
const usersRouter = require("./routes/users");
const sessionsRouter = require("./routes/sessions");

// Routing values
app.use("/users", usersRouter);
app.use("/sessions", sessionsRouter);

// ExpressJS configs
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// More configs
app.set("view engine", "ejs")


// Config for HTTPS
const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

app.get("/", (req, res) => 
{
    res.send("Nothing to see here");
})

// Activate Server on port
https.createServer(options, app)
.listen(8000, function(error) {
    if (error)
    {
        console.log("something went wrong", error);
    }
    else
    {
        console.log("Server is listening on port: 8000");
    }
});