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
            console.log(user)
            console.log(user.get('ethAddress'))
        } catch (error) {
            console.log(error)
        }
    }
}

async function logOut() {
    await Moralis.User.logOut();
    console.log("logged out");
}

document.getElementById("btn-login").onclick = login;
document.getElementById("btn-logout").onclick = logOut;

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

// loading assets
function preload() {
}

// initial setup
function create() {
}

// normally in a game, we have 60 frames per sec => firing update() 60 times a second
function update() {
}
