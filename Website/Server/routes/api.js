const { query, json } = require("express");
const express = require("express");

const router = express.Router()

const firestore = require("../firestoreAccess");
const fs_db = firestore.db;
const fs_auth = firestore.auth;

// Static routes

// Get user data
router.get("/users/get", (req, res) => {
    const UID = req.query.uid;

    const collectionRef = fs_db.collection("Users");
    collectionRef.where("UID", "==", UID).get()
        .then((snapshot) => {
            if (snapshot.empty) {
                // Should never happen
                res.json([]);
            }
            else {
                res.json(snapshot.docs[0]);
            }
        })
})

router.post("/sessions/create", async (req, res) => {
    var reqBody = req.body;
    var uid = "";

    // Verify user, if there is an error it gets caught
    const userToken = reqBody["User"];
    const decodedToken = await fs_auth.verifyIdToken(userToken)
        .catch((error) => { console.error(err); });

    var num = Math.floor(Math.random() * (999999 + 1)).toString();
    const collectionRef = fs_db.collection("Sessions");

    // Check if id is used elsewhere
    do {
        const docRef = fs_db.collection("Sessions").doc(num);
        const doc = await docRef.get();
        if (doc.exists) {
            num = Math.floor(Math.random() * (999999 + 1)).toString();
        }
        else {
            break;
        }
    } while (1);

    console.log('valid id');
    reqBody["Session_ID"] = num;
    reqBody["User"] = decodedToken.uid;
    const response = {};
    response["Session_ID_Code"] = num;
    res.json(response);

    collectionRef.doc(num).set(reqBody);

})

router.get("/sessions/getAll", async (req, res) => {
    const userToken = req.query.uid;
    
    const decodedToken = await fs_auth.verifyIdToken(userToken)
        .catch((error) => { console.error(error); });
    
    const UID = decodedToken.uid;
    console.log(UID);

    const collectionRef = fs_db.collection("Sessions");
    collectionRef.where("User", "==", UID).get()
        .then((snapshot) => {
            if (snapshot.empty) {
                console.log("no documents");
                res.json([]);
                return;
            }
            else {
                var response = [];
                snapshot.forEach((doc) => {
                    response.push(doc.data());
                });
                res.json(response);
            }
        });
});

router.get("/sessions/get", async (req, res) => {
    const sessionID = req.query.id;
    const sessionDocRef = fs_db.collection("Sessions").doc(sessionID);
    const sessionDoc = await sessionDocRef.get();
    if (sessionDoc.exists) {
        res.json(sessionDoc.data());
    }
    else {
        res.status(400); // Replace with actual error code
        res.send("no document found");
    }
});

module.exports = router