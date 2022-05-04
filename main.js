/** Connect to Moralis server */
const serverUrl = "https://l1wg6aqgcm8n.usemoralis.com:2053/server";
const appId = "tgy5evtxSIL9DqVelSjRsDzOdxKUCLIJ0J30bDia";
Moralis.start({ serverUrl, appId });

/** Add from here down */
async function login() {
    let user = Moralis.User.current();
    if (!user) {
        try {
            user = await Moralis.authenticate({ signingMessage: "Hello World!" })
            // console.log(user)
            // console.log(user.get('ethAddress'))
            launch();
        } catch (error) {
            console.log(error)
        }
    }
}

async function logOut() {
    await Moralis.User.logOut();
    console.log("logged out");
    location.reload()
}

function launch() {
    let user = Moralis.User.current();
    if(!user){
        console.log("Login using MetaMask")
    }else{
        var game = new Phaser.Game(config);
        console.log(user.get('ethAddress')+" "+" Logged In")
    }
}

document.getElementById("btn-login").onclick = login;
document.getElementById("btn-logout").onclick = logOut;

var config = {
    type: Phaser.AUTO,
    width: 900,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// here we create new game & config properties are used

var platforms
var player1
var cursors

// loading assets
function preload() {
    // here 1st agrument is what we want to refer the image as in future
    // this alone will not show the image
    this.load.image('background', 'assets/BG.png');
    this.load.image('ground', 'assets/Tiles/Tile (2).png')
    this.load.image('player1', 'assets/aaveGotchi.png')
}

// initial setup
function create() {
    // this sets image center at 400 x 300
    // change image size by setScale(0.xx)
    this.add.image(400, 300, "background").setScale(0.55)

    // create platform
    // staticGroup() does not let plartform to be affected by gravity, they remain static
    // refreshBody() helps to match the collision-box with our image sizes
    platforms = this.physics.add.staticGroup();
    platforms.create(565, 400, "ground").setScale(0.5).refreshBody()
    platforms.create(600, 400, "ground").setScale(0.5).refreshBody()
    platforms.create(635, 400, "ground").setScale(0.5).refreshBody()

    // creating player
    player = this.physics.add.sprite(600, 250, 'player1').setScale(0.3).refreshBody();
    player.setBounce(0.2)
    player.setCollideWorldBounds(true)

    // attaching player to platform for colliding
    this.physics.add.collider(player, platforms)

    // adding cursor
    cursors = this.input.keyboard.createCursorKeys();

}

// normally in a game, we have 60 frames per sec => firing update() 60 times a second
// this fx would be getting called all the time... automaticallyyyy
function update() {
    // console.log("Hello");
    if (cursors.left.isDown) {
        player.setVelocityX(-160);

        // player.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
        player.setVelocityX(160);

        // player.anims.play('right', true);
    }
    else {
        player.setVelocityX(0);

        // player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
    }
}
