// Firebase Configs and init
const admin = require ('firebase-admin');
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const firestoreAdmin = admin.firestore();
const authentication = admin.auth();

exports.db = firestoreAdmin;
exports.auth = authentication;