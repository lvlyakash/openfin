const path = require('path');
const openfinLauncher = require('hadouken-js-adapter');
const express = require('express');
const app = express();
const http = require('http');

app.use(express.static('./public'))


//To Launch the OpenFin Application we need a manifestUrl.
const port = 5555;

const manifestUrl = `http://localhost:${port}/app.json`;
const configPath = path.resolve('./public/app.json');

//Start the server server
//app.use(express.static('./public'));
http.createServer(app).listen(port, async () => {
    console.log("Server created, starting OpenFin...");
    openfinLauncher.launch({ manifestUrl: configPath }).catch(err => console.log(err));
});
