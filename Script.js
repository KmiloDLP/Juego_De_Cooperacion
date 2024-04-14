
class Player {
    constructor(logic) {
        this.Point = 0;
        this.last_Action = Null;
        this.logic = logic;
    }
}


let player_1 = new Player(
    function logic() {

        let response = true
        player_1.last_Action = response;

        return response;
    });

let player_2 = new Player(
    function logic() {

        let response = false
        player_2.last_Action = response;

        return response;
    }
);


function Game() {

    for (let i = 0; i < 5; i++) {

        let player1 = player_1.logic();
        let player2 = player_2.logic();

        if (player1 && player2) {

            player_1.Point += 3;
            player_1.Point += 3;

        } else if (!player1 && player2) {

            player_1.Point += 5;

        } else if (player1 && !player2) {

            player_2.Point += 5;

        } else if (!player1 && !player2) {

            player_1.Point += 1;
            player_2.Point += 1;

        }

        console.log("Turno: " + (i + 1));
        console.log("Player: 01: " + player1 + "  Puntos: " + player_1.Point);
        console.log("Player: 02: " + player2 + "  Puntos: " + player_2.Point);


    }

}

Game();





