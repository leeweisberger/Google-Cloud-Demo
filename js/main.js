//noinspection JSCheckFunctionSignatures,JSCheckFunctionSignatures,JSCheckFunctionSignatures
var game = new Phaser.Game(24*32, 17*32, Phaser.AUTO, document.getElementById('game'));
game.state.add('Game',Game);
game.state.add('Title',Title);
game.state.start('Title');