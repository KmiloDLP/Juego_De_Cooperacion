
class Player {
    constructor(logic) {
        this.Point = 0;
        this.last_Action = "Null";
        this.logic = logic;
    }
}


let player_0 = new Player(
    function logic() {

        //logica aleatoria
        let response = Math.random() < 0.5;

        player_0.last_Action = response;

        return response;
    });

let player_1 = new Player(
    function logic() {

        //logica aleatoria
        let response = Math.random() < 0.5;

        player_1.last_Action = response;

        return response;
    }
);


function Game(player1, player2) {

    for (let i = 0; i < 5; i++) {

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
        console.log("Player: 01:  Coperacion: "+answer1 +"  Puntos: " + player_0.Point);
        console.log("Player: 02:  Coperacion: "+answer2 +"  Puntos: " + player_1.Point);

    }

}

Game(player_0, player_1);





