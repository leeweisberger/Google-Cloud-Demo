var Client = {};
Client.lastPollTime = 0;

Client.addNewPlayer = function (name) {
    $.ajax({
        type: 'POST',
        url: '/newPlayer',
        data: { name },
        success: function (data) {
            game.state.start('Game');
            setTimeout(() =>
                Game.addNewPlayer(data.name, data.x, data.y), 500);
        },
        error: function () {
            alert('Name is already taken!');
        }
    });

};

Client.movePlayer = function(name,x,y){
    $.ajax({
        type: 'POST',
        url: '/movePlayer',
        data: {name, x, y},
    });
};

Client.getPlayers = function(){
    $.ajax({
        type: 'POST',
        url: '/players',
        data: {time: Client.lastPollTime},
        success: (playersToUpdate) => {
                Client.lastPollTime = new Date().getTime();
                for (const player of playersToUpdate) {
                    if (player.remove) {
                        Game.removePlayer(player.name);
                    }
                    else if (!Game.playerMap[player.name]) {
                        Game.addNewPlayer(player.name, Number(player.x), Number(player.y), player.name);
                    } else {
                        Game.movePlayer(player.name, Number(player.x), Number(player.y));
                    }
                }
                Client.getPlayers();
        }
    });
};

Client.removePlayer = function(name) {
    $.ajax({
        type: 'POST',
        url: '/removePlayer',
        data: {name},
    });
}


