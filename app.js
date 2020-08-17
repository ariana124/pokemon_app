const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

// app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, function(req, res) {
    console.log("Server is running on port 3000.");
});

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {

    const pokemonName = req.body.pokemon;
    console.log(pokemonName);
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`;

    https.get(url, function(response) {

        console.log(response.statusCode);

        response.on("data", function(data) {

            //console.log(data);
            const pokemonData = JSON.parse(data);
            console.log(pokemonData);
        });
    });

});
