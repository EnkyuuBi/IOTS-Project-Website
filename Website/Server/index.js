// Import modules
const https = require('https');
const fs = require('fs')
const express = require ('express');
const cors = require('cors');

// Init modules
const app = express();

// Config for HTTPS
const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

// ExpressJS configs
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

// More configs
app.set("view engine", "ejs")

// Routing
const apiRouter = require("./routes/api");

// Routing values
app.use("/api", apiRouter);


// Actual
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
