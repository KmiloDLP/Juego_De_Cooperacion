
let turn = 1;
let cooperative= true;

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

    player_1: new Player(function logic() {// algoritmo drasus

        let response;

        if (players["player_0"].last_Action === false) {
            cooperative = false; 
        }
    
        if (turn <= 5 && cooperative) {
            console.log("Condicion: 1");
            response = true;
        } else if (turn >= 6 && turn <= 8 && cooperative) {
            console.log("Condicion: 2");
            response = true;
        } else {
            console.log("Condicion: 3 (default)");
            response = false;
        }
    
        console.log("cooperative: " + cooperative);
    
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

        console.log("Turno: " + turn); turn++;
        console.log("Player 01:  Coperacion: " + answer1 + "  Puntos: " + player1.Point);
        console.log("Player 02:  Coperacion: " + answer2 + "  Puntos: " + player2.Point);
        console.log("___________________________________________________________________");

        player1.last_Action=answer1;
        player2.last_Action=answer2;

    }
}

function Turn(players) {

    const playerKeys = Object.keys(players);

    for (let i = 0; i < playerKeys.length; i++) {

        const player1 = players[playerKeys[i]];

        for (let j = i + 1; j < playerKeys.length; j++) {

            const player2 = players[playerKeys[j]];
            console.log(`Enfrentamiento: ${playerKeys[i]} vs ${playerKeys[j]}`);
            Game(player1, player2); turn = 1;
            console.log("-----------------------");

        }
    }

    playerKeys.forEach(playerKey => {
        const player = players[playerKey];
        console.log(`${playerKey}: Puntos totales: ${player.Point}`);
    });


}

Turn(players);







