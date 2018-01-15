var Game = {};

Game.init = function(){
    game.stage.disableVisibilityChange = true;
};

Game.preload = function() {
    game.load.tilemap('map', 'assets/map/example_map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.spritesheet('tileset', 'assets/map/tilesheet.png',32,32);
    game.load.image('sprite','assets/sprites/sprite.png');        
};

Game.create = function(){
    Game.playerMap = {};
    var map = game.add.tilemap('map');
    map.addTilesetImage('tilesheet', 'tileset'); // tilesheet is the key of the tileset in map's JSON file
    var layer;
    for(var i = 0; i < map.layers.length; i++) {
        layer = map.createLayer(i);
    }
    layer.inputEnabled = true; // Allows clicking on the map ; it's enough to do it on the last layer
    layer.events.onInputUp.add(Game.getCoordinates, this);
};

Game.getCoordinates = function(layer,pointer){
    Client.movePlayer(Game.playerMap.myPlayer, pointer.worldX,pointer.worldY);
};

Game.addNewPlayer = function(name,x,y){
    if (!Game.playerMap.myPlayer) {
        Game.playerMap.myPlayer = name;
        Client.getPlayers();
    }
    Game.playerMap[name] = {sprite: game.add.sprite(x,y,'sprite'), name}
    console.log(name);
    const style = { font: "12px Arial", align: "center"};
    text = game.add.text(0,0, name, style);
    Game.playerMap[name].sprite.addChild(text);
};

Game.movePlayer = function(name,x,y){
    var player = Game.playerMap[name].sprite;
    var distance = Phaser.Math.distance(player.x,player.y,x,y);
    var playerTween = game.add.tween(player);
    var duration = distance*10;
    playerTween.to({x,y}, duration);
    playerTween.start();
};

Game.removePlayer = function (name) {
    if (Game.playerMap[name]) {
        Game.playerMap[name].sprite.destroy();
        delete Game.playerMap[name];
    }
};

window.onbeforeunload = function (e) {
  // Remove the current player when the tab is closed.
  Client.removePlayer(Game.playerMap.myPlayer);
};