# IOTS Project Website
Front and Backend for IOTS Project Website.
# Deploying
Both the front end and backend are intended to be deployed on the same machine.

Deploying the front end:
- cd into the FrontEnd\my-app folder
- run "npm run dev"

A notif should pop up with the server runnning on a localhost

if you want to access the front end from other machines:
- cd into the FrontEnd/my-app folder
- run "npm run dev -- --host --port <whatever port you want>"

A notif should pop up with the ip address needed to acces the page on the local area network.

Deploying the Backend:
- cd into the Server folder
- run "node https.js"


a notif should pop up with the port number, access localhost:<port number> for the app. The backend is a pure api so you'll only get json data.
