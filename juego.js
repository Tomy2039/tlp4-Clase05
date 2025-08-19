import { tirarDado } from "./utils/dado.js";
import promptSync from "prompt-sync";

const prompt = promptSync();

export default class Juego {
  constructor(tablero) {
    this.tablero = tablero;
  }

  eventoCasilla(jugadorActual) {
    const casillaActual = this.tablero[jugadorActual.posicion];
    console.log(`${jugadorActual.nombre} cayó en: ${casillaActual}`);

    switch (casillaActual) {
      case "fuego":
      case "roca":
        if (!jugadorActual.puedePasar(casillaActual)) {
          console.log(`${jugadorActual.nombre}, no podés pasar ${casillaActual}.`);
          if (jugadorActual.perderVida()) {
            const numeroElegido = this.validarNumero("Elegí un número del 1 al 6: ", 1, 6);
            const resultadoDado = tirarDado();
            console.log(`Salió: ${resultadoDado}`);
            if (resultadoDado === numeroElegido) {
              jugadorActual.recuperarVidas();
              console.log("¡Zafaste! Tenés las 3 vidas de nuevo.");
            } else {
              console.log("Nada... seguís con 1 vida.");
            }
          }
        } else {
          console.log(`${jugadorActual.nombre} pasó ${casillaActual} sin problemas.`);
        }
        break;

      case "monstruo":
        console.log("¡Monstruo!");
        prompt("Presioná ENTER para tirar el dado...");
        if (tirarDado() < 4) {
          console.log("Perdiste contra el monstruo.");
          jugadorActual.perderVida();
        } else {
          console.log("Lo derrotaste.");
        }
        break;

      case "trampa":
        console.log("Caíste en una trampa.");
        jugadorActual.perderVida();
        break;

      default:
        console.log("Todo tranqui, avanzás.");
    }
  }

  validarNumero(mensaje, minimo, maximo) {
    let numero;
    do {
      numero = parseInt(prompt(mensaje));
    } while (isNaN(numero) || numero < minimo || numero > maximo);
    return numero;
  }

  jugar(jugadorUno, jugadorDos) {
    let numeroDeTurno = 0;

    while (true) {
      const jugadorEnTurno = numeroDeTurno % 2 === 0 ? jugadorUno : jugadorDos;

      console.log(`\nTurno de ${jugadorEnTurno.nombre} (${jugadorEnTurno.constructor.name})`);
      prompt("Presioná ENTER para tirar el dado...");
      const pasosAvanzados = tirarDado();
      console.log(`${jugadorEnTurno.nombre} sacó ${pasosAvanzados}`);
      jugadorEnTurno.posicion += pasosAvanzados;

      const indiceUltimaCasilla = this.tablero.length - 1;
      if (jugadorEnTurno.posicion >= indiceUltimaCasilla) {
        console.log(`${jugadorEnTurno.nombre} ganó.`);
        break;
      }

      this.eventoCasilla(jugadorEnTurno);
      numeroDeTurno++;
    }
  }
}