# Juego de Cooperación

## Descripción

En este juego, dos bots con lógicas de decisión deben determinar si cooperan o no cooperan entre sí en una serie de rondas. Dependiendo de las decisiones tomadas por ambos bots, se otorgan puntos de acuerdo a las siguientes reglas:

- **Regla 1:** Si ambos bots cooperan, ambos recibirán 3 puntos.
- **Regla 2:** Si solo uno de los bots no coopera, este obtendrá 5 puntos mientras que el otro bot no recibirá puntos.
- **Regla 3:** Si ninguno de los dos bots coopera, ambos recibirán 1 punto.

El objetivo del juego es acumular la mayor cantidad de puntos posibles al final de una serie de rondas.

## Lógica de los Bots

Cada bot debe implementar una lógica de decisión que determine si cooperar o no cooperar en cada ronda del juego. Esta lógica debe retornar un valor booleano:

- `true` si el bot decide cooperar.
- `false` si el bot decide no cooperar.

Además, la lógica del bot puede acceder a los atributos del bot rival si es necesario para tomar su decisión.

## Ganador

El jugador que acumule la mayor cantidad de puntos al final de todas las rondas será declarado como el ganador.

¡Que gane el mejor estratega!

