const path = require('path');
const openfinLauncher = require('hadouken-js-adapter');
const express = require('express');
const app = express();
const http = require('http');

app.use(express.static('./public'));

// app.post('/', (req, res) => {
//     res.sendFile('login.html')
// });

app.post('/login', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/login.html'));
});

app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/login.html'));
});

app.get('/apps/app1', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/app1.html'));
});
app.get('/apps/app2', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/app2.html'));
});


//To Launch the OpenFin Application we need a manifestUrl.
const port = 5555;

const manifestUrl = `http://localhost:${port}/app.json`;
const configPath = path.resolve('./public/app.json');

//Start the server server
//app.use(express.static('./public'));

http.createServer(app).listen(port, async () => {
    // console.log("Server created, starting OpenFin...");
    // openfinLauncher.launch({ manifestUrl: configPath })
    // .then(console.log(fin.desktop.System.getCookies({name: 'auth'})))
    // .catch(err => console.log(err));

    try {
        //Once the server is running we can launch OpenFin and retrieve the port.
        const port1 = await openfinLauncher.launch({ manifestUrl: configPath });

        //We will use the port to connect from Node to determine when OpenFin exists.
        const fin = await openfinLauncher.connect({
            uuid: 'server-connection', //Supply an addressable Id for the connection
            address: `ws://localhost:${port1}`, //Connect to the given port.
            nonPersistent: true //We want OpenFin to exit as our application exists.
        });
        console.log("Server created, Openfin Start");
        // fin.desktop.System.getCookies({name: 'auth'}, cookies => {
        //     cookies.forEach(cookie => {
        //         console.log(`${cookies.name} ${cookies.expirationDate} ${cookies.content}`);
        //     });
        // });
    } catch (err) {
        console.error(err);
    }




});
