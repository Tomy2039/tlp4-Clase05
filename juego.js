const { tirarDado } = require("./utils/dado");
const prompt = require("prompt-sync")();

class Juego {
    constructor(tablero) {
        this.tablero = tablero;
    }

    eventoCasilla(jugador) {
        const casilla = this.tablero[jugador.posicion];
        console.log(`${jugador.nombre} cayó en: ${casilla}`);

        switch (casilla) {
            case "fuego":
            case "roca":
                if (!jugador.puedePasar(casilla)) {
                    console.log(`${jugador.nombre}, no podés pasar ${casilla}.`);
                    if (jugador.perderVida()) {
                        const eleccion = this.validarNumero("Elegí un número del 1 al 6: ", 1, 6);
                        const dado = tirarDado();
                        console.log(`Salió: ${dado}`);
                        if (dado === eleccion) {
                            jugador.recuperarVidas();
                            console.log("¡Zafaste! Tenés las 3 vidas de nuevo.");
                        } else {
                            console.log("Nada... seguís con 1 vida.");
                        }
                    }
                } else {
                    console.log(`${jugador.nombre} pasó ${casilla} sin problemas.`);
                }
                break;
            case "monstruo":
                console.log(`¡Monstruo!`);
                prompt("Presioná ENTER para tirar el dado...");
                if (tirarDado() < 4) {
                    console.log("Perdiste contra el monstruo.");
                    jugador.perderVida();
                } else {
                    console.log("Lo derrotaste.");
                }
                break;
            case "trampa":
                console.log(`Caíste en una trampa.`);
                jugador.perderVida();
                break;
            default:
                console.log("Todo tranqui, avanzás.");
        }
    }

    validarNumero(mensaje, min, max) {
        let numero;
        do {
            numero = parseInt(prompt(mensaje));
        } while (isNaN(numero) || numero < min || numero > max);
        return numero;
    }

    jugar(j1, j2) {
        let turno = 0;
        while (true) {
            const jugador = turno % 2 === 0 ? j1 : j2;

            console.log(`\nTurno de ${jugador.nombre} (${jugador.constructor.name})`);
            prompt(`Presioná ENTER para tirar el dado...`);
            const pasos = tirarDado();
            console.log(`${jugador.nombre} sacó ${pasos}`);
            jugador.posicion += pasos;

            if (jugador.posicion >= this.tablero.length - 1) {
                console.log(`${jugador.nombre} ganó.`);
                break;
            }

            this.eventoCasilla(jugador);
            turno++;
        }
    }
}

module.exports = Juego;
