const express = require('express');
const app = express();
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const databaseModel = require('./model-datastore');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use('/js',express.static(__dirname + '/js'));
app.use('/assets',express.static(__dirname + '/assets'));

server.players = {};

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});

app.post('/players', (req, res) => {
    const lastPollTime = req.body.time;
    const checkIfPlayersChanged = () => {
        const changedPlayers = Object.values(server.players)
            .filter((player) => player.timeChanged >= lastPollTime);
        if (changedPlayers.length) {
            res.send(changedPlayers);
        } else {
            setTimeout(() => { checkIfPlayersChanged() }, 500);
        }
    }
    checkIfPlayersChanged();
});

app.post('/newPlayer', (req, res) => {
    const playerName = req.body.name;
    databaseModel.read(playerName, (err, entity) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        if (entity) {
            console.log('player exists');
            // The player name already exists!
            return res.status(409).send('Player name already exists');
        }
        const player = registerPlayer(playerName);
        res.send(player);
        // Save the player name to the database.
        databaseModel.create(playerName, req.body, (err, savedData) => {
            if (err) {
                return res.status(500).send(err);
            }
        });
    });
});

app.post('/removePlayer', (req, res) => {
    if (!server.players[req.body.name]) {
        return res.sendStatus(200);
    }
    console.log('removal reqeusted');
    server.players[req.body.name].timeChanged = new Date().getTime();
    server.players[req.body.name].remove = true;
    setTimeout(() => { 
        delete server.players[req.body.name];
        console.log('actually removed');
     }, 2000);
    res.sendStatus(200);
});

app.post('/movePlayer', (req, res) => {
    const name = req.body.name;
    const x = req.body.x;
    const y = req.body.y;

    if (!server.players[name]) {
        return res.sendStatus(200);
    }
    
    server.players[name].x = x;
    server.players[name].y = y;
    server.players[name].timeChanged = new Date().getTime(),
    res.sendStatus(200);
});

server.listen(process.env.PORT || 8081,function(){
    console.log('Listening on '+server.address().port);
});

function registerPlayer(name) {
    const player = {
        name,
        x: randomInt(100, 400),
        y: randomInt(100, 400),
        timeChanged: new Date().getTime(),
        remove: false,
    };
    server.players[player.name] = player;
    return player;
}

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}
