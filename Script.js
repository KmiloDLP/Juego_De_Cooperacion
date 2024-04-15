class Player {
    constructor(logic) {
        this.Point = 0;
        this.last_Action = "Null";
        this.logic = logic;
    }
}

const players = {

    player_0: new Player(function logic() {
 
        let response = Math.random() < 0.5;
        return response;
    }),
    player_1: new Player(function logic() {

        let response = false;
        return response;

    })
};

function Game(player1, player2) {
    for (let i = 0; i < 10; i++) {
        let answer1 = player1.logic();
        let answer2 = player2.logic();

        if (answer1 && answer2) {
            player1.Point += 3;
            player2.Point += 3;
        } else if (!answer1 && answer2) {
            player1.Point += 5;
        } else if (answer1 && !answer2) {
            player2.Point += 5;
        } else if (!answer1 && !answer2) {
            player1.Point += 1;
            player2.Point += 1;
        }

        console.log("Turno: " + (i + 1));
        console.log("Player 01:  Coperacion: " + answer1 + "  Puntos: " + player1.Point);
        console.log("Player 02:  Coperacion: " + answer2 + "  Puntos: " + player2.Point);
    }
}

function Turn(players) {

    const playerKeys = Object.keys(players);

    for (let i = 0; i < playerKeys.length; i++) {

        const player1 = players[playerKeys[i]];

        for (let j = i + 1; j < playerKeys.length; j++) {

            const player2 = players[playerKeys[j]];
            console.log(`Enfrentamiento: ${playerKeys[i]} vs ${playerKeys[j]}`);
            Game(player1, player2);
            console.log("-----------------------");

        }
    }

    playerKeys.forEach(playerKey => {
        const player = players[playerKey];
        console.log(`${playerKey}: Puntos totales: ${player.Point}`);
    });


}

Turn(players);







