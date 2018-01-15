var Title = {};

Title.init = function(){
    game.stage.disableVisibilityChange = true;
};

Title.preload = function() {
    game.plugins.add(PhaserInput.Plugin);
            game.plugins.add(PhaserNineSlice.Plugin);
            game.load.nineSlice('input', 'assets/inputfield.png', 15);
            game.load.nineSlice('btn', 'assets/submit.png', 20, 23, 27, 28);
};

Title.create = function(){
    //Here's the input field for the user's name
            const userBg = game.add.nineSlice(game.width / 2+ 5, 180, 'input', null, 200, 50);
            userBg.anchor.set(0.5);
            Title.user = game.add.inputField(game.width / 2 - 85, 180 - 17, {
                font: '18px Arial',
                fill: '#212121',
                fillAlpha: 0,
                fontWeight: 'bold',
                forceCase: PhaserInput.ForceCase.upper,
                width: 150,
                max: 20,
                padding: 8,
                borderWidth: 1,
                borderColor: '#000',
                borderRadius: 6,
                placeHolder: 'Username',
                textAlign: 'center',
                zoom: true
            });
            Title.user.blockInput = false;
           
            button = game.add.button(game.width / 2 - 85, 260, 'btn', onClick);
            button.scale.setTo(0.3, 0.3);
};

function onClick () {
    Client.addNewPlayer(Title.user.value);
}