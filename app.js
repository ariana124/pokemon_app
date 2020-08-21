const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

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
    const pokemonURL = `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`;

    axios.get(pokemonURL)
        .then (function (response) { 
            //console.log(response);
            const pokemonData = response.data;
            const pokemonSprite = pokemonData.sprites.front_default;
            res.send(`<img src="${pokemonSprite}" width="200" height="200">`);
        })
        .catch (function (error) {
            console.log(error);
            res.send();
        })

});
