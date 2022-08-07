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

    // Verify user, if there is an error it gets caught
    const userToken = reqBody["UserID"];
    var decodedToken = '';

    try {
        decodedToken = await fs_auth.verifyIdToken(userToken)
    }
    catch (error) {
        console.error(error);
        return;
    }

    // Create id
    var num = Math.floor(Math.random() * (999999 + 1)).toString();

    // Database functions
    const collectionRef = fs_db.collection("Sessions");

    // Check if id is used elsewhere
    do {
        const docRef = fs_db.collection("Sessions").doc(num);
        const doc = await docRef.get();
        if (doc.exists) {
            num = Math.floor(Math.random() * (999999 + 1 - 10000) + 10000).toString();
        }
        else {
            console.log('valid id');
            break;
        }
    } while (1);


    reqBody["Session_ID"] = num;
    reqBody["UserID"] = decodedToken.uid;
    const response = {
        "Session_ID_Code": num
    };
    res.json(response);

    collectionRef.doc(num).set(reqBody);
})

router.get("/sessions/getAll", async (req, res) => {
    const userToken = req.query.token;

    const decodedToken = await fs_auth.verifyIdToken(userToken)
        .catch((error) => { console.error(error); });

    const UID = decodedToken.token;
    console.log(UID);

    const collectionRef = fs_db.collection("Sessions");
    collectionRef.where("UserID", "==", UID).get()
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
    console.log(`getting specific session: ${req.query.id}`);

    const sessionID = req.query.id;
    const sessionDocRef = fs_db.collection("Sessions").doc(sessionID);
    const sessionDoc = await sessionDocRef.get();
    if (sessionDoc.exists) {
        console.log(`File found:`, sessionDoc.data());
        res.json(sessionDoc.data());
    }
    else {
        res.status(400); // Replace with actual error code
        res.json({ "status": "no such file" });
    }
});

router.post("/sessions/update", async (req, res) => {
    console.log("updating document");

    const sessionUpdate = req.body;
    const sessionID = req.query.id;
    const sessionDocRef = fs_db.collection("Sessions").doc(sessionID);

    // Verify Token
    const userToken = req.query.token;
    var decodedToken;
    try {
        decodedToken = await fs_auth.verifyIdToken(userToken)
    }
    catch (error) {
        console.error(error);
        res.json({ "Status": "Token invalid" });
        return;
    }

    // Verify User
    const sessionDoc = await sessionDocRef.get()
    if (sessionDoc.exists) {
        const sessionUid = sessionDoc.data()["UserID"];
        if (sessionUid != decodedToken.uid) {
            res.json({ "Status": "UID mismatch" });
            return;
        }
    }
    else {
        res.json({ "Status": "File not Found" });
        return;
    }
    console.log("User verified");

    const result = await sessionDocRef.update(sessionUpdate);
    console.log(result);
    const response = {
        "Status": "ok"
    };
    res.json(response);
});

router.get("/sessions/delete", async (req, res) => {
    console.log("deleting document");

    const sessionID = req.query.id;
    const sessionDocRef = fs_db.collection("Sessions").doc(sessionID);

    // Verify Token
    const userToken = req.query.token;
    var decodedToken;
    try {
        decodedToken = await fs_auth.verifyIdToken(userToken)
    }
    catch (error) {
        console.error(error);
        res.json({ "Status": "Token invalid" });
        return;
    }

    // Verify User
    const sessionDoc = await sessionDocRef.get()
    if (sessionDoc.exists) {
        const sessionUid = sessionDoc.data()["UserID"];
        if (sessionUid != decodedToken.uid) {
            res.json({ "Status": "UID mismatch" });
            return;
        }
    }
    else {
        res.json({ "Status": "File not Found" });
        return;
    }
    console.log("User verified");

    const result = await sessionDocRef.delete();
    if (result.ok == true) {
        res.json({ "Status": "ok" });
    }
    else {
        res.json(result);
    }
})
module.exports = router